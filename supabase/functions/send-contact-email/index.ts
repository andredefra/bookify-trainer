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
    const { subject, firstName, lastName, gym, city, message }: ContactFormRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "MyPersonal Fit <onboarding@resend.dev>",
      to: ["andrea.mypersonal.fit@gmail.com"],
      subject: `Nuovo contatto: ${subject}`,
      html: `
        <h2>Nuovo messaggio di contatto</h2>
        <p><strong>Oggetto:</strong> ${subject}</p>
        <p><strong>Nome:</strong> ${firstName}</p>
        <p><strong>Cognome:</strong> ${lastName}</p>
        <p><strong>Palestra:</strong> ${gym}</p>
        <p><strong>Città:</strong> ${city}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Inviato dal form di contatto MyPersonal Fit</em></p>
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