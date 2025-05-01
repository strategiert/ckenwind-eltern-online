
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const SMTP_HOST = "mail.privateemail.com"; // Namecheap Private Email SMTP-Server
const SMTP_PORT = 465;
const SMTP_USERNAME = "info@rueckenwind-eltern.de"; // Ihre E-Mail-Adresse
const SMTP_PASSWORD = Deno.env.get("EMAIL_PASSWORD"); // Passwort aus Umgebungsvariablen
const EMAIL_RECIPIENT = "info@rueckenwind-eltern.de"; // Empfänger-E-Mail-Adresse

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

    // E-Mail an Sie senden
    const client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: true,
        auth: {
          username: SMTP_USERNAME,
          password: SMTP_PASSWORD,
        },
      },
    });

    await client.send({
      from: SMTP_USERNAME,
      to: EMAIL_RECIPIENT,
      subject: `Kontaktformular: ${subject}`,
      content: `
        Name: ${name}
        E-Mail: ${email}
        Betreff: ${subject}
        
        Nachricht:
        ${message}
      `,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    await client.close();

    // Auch eine Bestätigungsmail an den Absender senden
    const confirmationClient = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: true,
        auth: {
          username: SMTP_USERNAME,
          password: SMTP_PASSWORD,
        },
      },
    });

    await confirmationClient.send({
      from: SMTP_USERNAME,
      to: email,
      subject: "Vielen Dank für Ihre Kontaktanfrage",
      content: `
        Hallo ${name},
        
        vielen Dank für Ihre Kontaktanfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.
        
        Mit freundlichen Grüßen
        Das Team von Rückenwind Eltern
      `,
      html: `
        <h2>Vielen Dank für Ihre Kontaktanfrage</h2>
        <p>Hallo ${name},</p>
        <p>vielen Dank für Ihre Kontaktanfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
        <p>Mit freundlichen Grüßen<br>Das Team von Rückenwind Eltern</p>
      `,
    });

    await confirmationClient.close();

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
