import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PostponementRequest {
  postponement_id: string;
  participants: Array<{
    id: string;
    email: string;
    name: string;
  }>;
  session_details: {
    original_start: string;
    original_end: string;
    new_start: string;
    new_end: string;
    reason?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const { postponement_id, participants, session_details }: PostponementRequest = await req.json();

    console.log('Processing postponement request:', { postponement_id, participant_count: participants.length });

    // Format dates for email
    const formatDateTime = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    const originalDateTime = formatDateTime(session_details.original_start);
    const newDateTime = formatDateTime(session_details.new_start);

    // Send email to each participant
    const emailPromises = participants.map(async (participant) => {
      try {
        const responseUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/respond-to-postponement?token=${encodeURIComponent(btoa(JSON.stringify({ postponement_id, participant_id: participant.id })))}`;

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h1 style="color: #2563eb; margin-bottom: 20px;">Session Postponement Request</h1>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Hi ${participant.name},
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Your trainer has requested to postpone your upcoming session. Here are the details:
              </p>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Original Session:</h3>
                <p style="color: #374151; margin: 5px 0;"><strong>Date & Time:</strong> ${originalDateTime}</p>
                
                <h3 style="color: #1f2937; margin-top: 20px;">New Proposed Time:</h3>
                <p style="color: #374151; margin: 5px 0;"><strong>Date & Time:</strong> ${newDateTime}</p>
                
                ${session_details.reason ? `
                  <h3 style="color: #1f2937; margin-top: 20px;">Reason:</h3>
                  <p style="color: #374151; margin: 5px 0;">${session_details.reason}</p>
                ` : ''}
              </div>

              <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  <strong>Important:</strong> Please respond within 24 hours. If you decline, we'll process a full refund automatically.
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${responseUrl}&response=accept" 
                   style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
                  Accept New Time
                </a>
                <a href="${responseUrl}&response=decline" 
                   style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
                  Decline & Get Refund
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
                If you have any questions, please contact your trainer directly or reply to this email.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #9ca3af; font-size: 12px; text-align: center;">
                This is an automated message from your fitness training platform.
              </p>
            </div>
          </div>
        `;

        const result = await resend.emails.send({
          from: "Training Platform <onboarding@resend.dev>",
          to: [participant.email],
          subject: "Session Postponement - Action Required",
          html: emailHtml,
        });

        console.log(`Email sent to ${participant.email}:`, result);
        return { success: true, email: participant.email, result };
      } catch (error) {
        console.error(`Failed to send email to ${participant.email}:`, error);
        return { success: false, email: participant.email, error: error.message };
      }
    });

    const emailResults = await Promise.all(emailPromises);
    const successCount = emailResults.filter(r => r.success).length;
    const failCount = emailResults.filter(r => !r.success).length;

    console.log(`Email summary: ${successCount} sent, ${failCount} failed`);

    // Update postponement status
    const { error: updateError } = await supabase
      .from('session_postponements')
      .update({ 
        status: 'collecting_responses',
        updated_at: new Date().toISOString()
      })
      .eq('id', postponement_id);

    if (updateError) {
      console.error('Error updating postponement status:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Postponement notifications sent`,
        details: {
          total_participants: participants.length,
          emails_sent: successCount,
          emails_failed: failCount,
          email_results: emailResults
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in handle-session-postponement function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);