import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendMarketingEmailRequest {
  templateId: string;
  testEmail?: string;
  isTest?: boolean;
  assignmentId?: string;
  clientData?: {
    email: string;
    name?: string;
    packageData?: any;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      templateId, 
      testEmail, 
      isTest = false, 
      assignmentId, 
      clientData 
    }: SendMarketingEmailRequest = await req.json();

    console.log("Processing email request:", { templateId, isTest, assignmentId });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the email template
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', templateId)
      .single();

    if (templateError || !template) {
      console.error("Template not found:", templateError);
      return new Response(
        JSON.stringify({ error: "Template not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Template found:", template.name);

    let emailData: any = {};
    let recipientEmail = "";
    let recipientName = "";

    if (isTest && testEmail) {
      // Test email
      recipientEmail = testEmail;
      recipientName = "Test User";
      emailData = {
        clientName: "Test User",
        gymName: "Test Gym",
        packageName: "Test Package",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        expiryDate: "2024-12-31",
        sessionsTotal: "10",
        sessionsUsed: "3",
        daysLeft: "7",
        discountPercentage: "20",
        offerExpiry: "2024-12-31"
      };
    } else if (clientData) {
      // Direct client data provided
      recipientEmail = clientData.email;
      recipientName = clientData.name || "";
      emailData = clientData.packageData || {};
    } else if (assignmentId) {
      // Fetch assignment data
      const { data: assignment, error: assignmentError } = await supabase
        .from('gym_package_assignments')
        .select(`
          *,
          package:gym_packages(*)
        `)
        .eq('id', assignmentId)
        .single();

      if (assignmentError || !assignment) {
        console.error("Assignment not found:", assignmentError);
        return new Response(
          JSON.stringify({ error: "Assignment not found" }),
          { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log("Assignment found:", assignment.id);

      // For real emails, we would need to get client email from somewhere
      // For now, using a placeholder
      recipientEmail = "client@example.com"; // This should come from client data
      recipientName = "Client Name"; // This should come from client data

      // Build email data from assignment
      emailData = {
        clientName: recipientName,
        gymName: "Your Gym", // This should come from gym data
        packageName: assignment.package?.title || "Package",
        startDate: assignment.start_date,
        endDate: assignment.end_date || "",
        expiryDate: assignment.end_date || "",
        sessionsTotal: assignment.sessions_total?.toString() || "0",
        sessionsUsed: assignment.sessions_used?.toString() || "0",
        daysLeft: assignment.end_date ? 
          Math.ceil((new Date(assignment.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)).toString() : "0",
        discountPercentage: "20", // This would come from automation rules
        offerExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid request: missing required data" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Replace variables in subject and content
    let subject = template.subject;
    let content = template.content;

    Object.entries(emailData).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g');
      subject = subject.replace(regex, value as string);
      content = content.replace(regex, value as string);
    });

    console.log("Sending email to:", recipientEmail);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Marketing <onboarding@resend.dev>", // Replace with your verified domain
      to: [recipientEmail],
      subject: subject,
      html: content,
    });

    console.log("Email sent successfully:", emailResponse);

    // Record the campaign (skip for test emails)
    if (!isTest && assignmentId) {
      const { error: campaignError } = await supabase
        .from('email_campaigns')
        .insert({
          gym_id: template.gym_id,
          template_id: templateId,
          assignment_id: assignmentId,
          recipient_email: recipientEmail,
          recipient_name: recipientName,
          subject: subject,
          content: content,
          status: 'sent',
          sent_at: new Date().toISOString()
        });

      if (campaignError) {
        console.error("Error recording campaign:", campaignError);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id,
      recipient: recipientEmail 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-marketing-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error",
        details: error.toString() 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);