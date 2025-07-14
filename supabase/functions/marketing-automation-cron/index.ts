import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.3";

const handler = async (req: Request): Promise<Response> => {
  try {
    console.log("Running marketing automation cron job");
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get active automation rules
    const { data: rules, error: rulesError } = await supabase
      .from('automation_rules')
      .select(`
        *,
        template:email_templates(*)
      `)
      .eq('is_active', true);

    if (rulesError) {
      console.error("Error fetching rules:", rulesError);
      return new Response(JSON.stringify({ error: "Failed to fetch rules" }), { status: 500 });
    }

    console.log(`Found ${rules?.length || 0} active rules`);

    for (const rule of rules || []) {
      if (rule.trigger_type === 'package_expiry') {
        // Find packages expiring in X days
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + rule.days_before_expiry);
        const targetDateStr = targetDate.toISOString().split('T')[0];

        const { data: assignments } = await supabase
          .from('gym_package_assignments')
          .select('*')
          .eq('status', 'active')
          .eq('end_date', targetDateStr);

        for (const assignment of assignments || []) {
          // Send email via marketing email function
          await supabase.functions.invoke('send-marketing-email', {
            body: {
              templateId: rule.template_id,
              assignmentId: assignment.id
            }
          });
        }
      }
    }

    return new Response(JSON.stringify({ success: true, processed: rules?.length || 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Cron job error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

serve(handler);