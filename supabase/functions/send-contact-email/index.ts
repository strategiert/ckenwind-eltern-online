
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// EmailJS-Konfiguration
const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID") || "";
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID") || "";
const EMAILJS_USER_ID = Deno.env.get("EMAILJS_USER_ID") || "";

const handler = async (req: Request): Promise<Response> => {
  // CORS präflight Anfrage behandeln
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Alle Felder müssen ausgefüllt werden" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // EmailJS API aufrufen
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: {
          from_name: name,
          reply_to: email,
          subject: subject,
          message: message
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("EmailJS Fehler:", errorData);
      throw new Error(`EmailJS Fehler: ${response.status} ${errorData}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "E-Mail erfolgreich gesendet" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return new Response(
      JSON.stringify({ error: "Fehler beim Senden der E-Mail", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
