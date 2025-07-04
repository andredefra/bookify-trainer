import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  subject: string;
  firstName: string;
  lastName: string;
  email: string;
  gym: string;
  city: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, firstName, lastName, email, gym, city, message }: ContactFormRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "MyPersonal Fit <onboarding@resend.dev>",
      to: ["andrea.mypersonal.fit@gmail.com"],
      subject: `New Contact Form Request: ${subject} - ${gym} - ${city}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            Nuovo messaggio di contatto - MyPersonal Fit
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Dettagli del contatto:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">Oggetto:</td>
                <td style="padding: 8px 0;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Nome:</td>
                <td style="padding: 8px 0;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Cognome:</td>
                <td style="padding: 8px 0;">${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0066cc;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Palestra:</td>
                <td style="padding: 8px 0;">${gym}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Città:</td>
                <td style="padding: 8px 0;">${city}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #0066cc;">Messaggio:</h3>
            <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <div style="text-align: center; color: #666; font-style: italic;">
            <p>Messaggio inviato dal form di contatto MyPersonal Fit</p>
            <p>Puoi rispondere direttamente a: <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);