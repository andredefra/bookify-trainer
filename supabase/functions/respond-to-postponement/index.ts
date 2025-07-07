import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const response = url.searchParams.get('response'); // 'accept' or 'decline'

    if (!token || !response) {
      return new Response(
        `<html><body><h1>Invalid Link</h1><p>This link is missing required parameters.</p></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    let tokenData;
    try {
      tokenData = JSON.parse(atob(token));
    } catch (error) {
      return new Response(
        `<html><body><h1>Invalid Token</h1><p>This link appears to be corrupted.</p></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    const { postponement_id, participant_id } = tokenData;

    if (!postponement_id || !participant_id) {
      return new Response(
        `<html><body><h1>Invalid Token</h1><p>This link is missing required information.</p></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    // Check if response already exists
    const { data: existingResponse, error: checkError } = await supabase
      .from('session_postponement_responses')
      .select('*')
      .eq('postponement_id', postponement_id)
      .eq('participant_id', participant_id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing response:', checkError);
      return new Response(
        `<html><body><h1>Database Error</h1><p>Unable to process your response. Please try again later.</p></body></html>`,
        { status: 500, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    if (existingResponse && existingResponse.response !== 'pending') {
      return new Response(
        `<html><body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #f59e0b;">Response Already Recorded</h1>
          <p>You have already responded to this postponement request.</p>
          <p><strong>Your previous response:</strong> ${existingResponse.response === 'accepted' ? 'Accepted' : 'Declined'}</p>
          <p style="color: #6b7280; font-size: 14px;">If you need to change your response, please contact your trainer directly.</p>
        </body></html>`,
        { status: 200, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    // Update the response
    const { error: updateError } = await supabase
      .from('session_postponement_responses')
      .update({
        response: response === 'accept' ? 'accepted' : 'declined',
        responded_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('postponement_id', postponement_id)
      .eq('participant_id', participant_id);

    if (updateError) {
      console.error('Error updating response:', updateError);
      return new Response(
        `<html><body><h1>Error</h1><p>Unable to record your response. Please try again later.</p></body></html>`,
        { status: 500, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    // Get updated postponement data to check if all responses are in
    const { data: postponement, error: postponementError } = await supabase
      .from('session_postponements')
      .select('*, session_postponement_responses(*)')
      .eq('id', postponement_id)
      .single();

    if (postponementError) {
      console.error('Error fetching postponement:', postponementError);
    } else {
      const responses = postponement.session_postponement_responses || [];
      const pendingCount = responses.filter((r: any) => r.response === 'pending').length;
      const acceptedCount = responses.filter((r: any) => r.response === 'accepted').length;
      const declinedCount = responses.filter((r: any) => r.response === 'declined').length;

      let newStatus = 'collecting_responses';
      if (pendingCount === 0) {
        if (acceptedCount === responses.length) {
          newStatus = 'fully_accepted';
        } else if (declinedCount === responses.length) {
          newStatus = 'rejected';
        } else {
          newStatus = 'partially_accepted';
        }
      }

      // Update postponement status
      const { error: statusUpdateError } = await supabase
        .from('session_postponements')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', postponement_id);

      if (statusUpdateError) {
        console.error('Error updating postponement status:', statusUpdateError);
      }

      // If someone declined and needs a refund, create refund record
      if (response === 'decline' && existingResponse?.requires_refund) {
        const { error: refundError } = await supabase
          .from('session_refunds')
          .insert({
            postponement_response_id: existingResponse.id,
            participant_id: participant_id,
            trainer_id: postponement.trainer_id,
            amount: existingResponse.refund_amount,
            status: 'pending'
          });

        if (refundError) {
          console.error('Error creating refund record:', refundError);
        }
      }
    }

    const responseHtml = `
      <html>
        <head>
          <title>Response Recorded</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background-color: #f9f9f9;
            }
            .container {
              background-color: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 500px;
              margin: 0 auto;
            }
            .success {
              color: #16a34a;
            }
            .declined {
              color: #dc2626;
            }
            .info {
              color: #2563eb;
              background-color: #eff6ff;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .footer {
              color: #6b7280;
              font-size: 14px;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="${response === 'accept' ? 'success' : 'declined'}">
              ${response === 'accept' ? '✅ Response Recorded' : '❌ Response Recorded'}
            </h1>
            <p>
              Thank you for responding to the postponement request.
            </p>
            <p>
              <strong>Your response:</strong> ${response === 'accept' ? 'Accepted the new time' : 'Declined the new time'}
            </p>
            ${response === 'decline' && existingResponse?.requires_refund ? `
              <div class="info">
                <strong>Refund Processing</strong><br>
                A full refund will be processed within 5-7 business days.
              </div>
            ` : ''}
            <div class="info">
              Your trainer has been notified of your response.
            </div>
            <div class="footer">
              You can close this window. If you have any questions, please contact your trainer directly.
            </div>
          </div>
        </body>
      </html>
    `;

    return new Response(responseHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in respond-to-postponement function:", error);
    return new Response(
      `<html><body><h1>Error</h1><p>An unexpected error occurred: ${error.message}</p></body></html>`,
      {
        status: 500,
        headers: {
          "Content-Type": "text/html",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);