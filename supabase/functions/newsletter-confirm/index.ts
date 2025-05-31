
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(
        `<html><body><h1>Ungültiger Bestätigungslink</h1><p>Der Bestätigungslink ist ungültig oder abgelaufen.</p></body></html>`,
        { 
          status: 400, 
          headers: { 'Content-Type': 'text/html', ...corsHeaders } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find subscriber by confirmation token
    const { data: subscriber, error: selectError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, confirmed_at')
      .eq('confirmation_token', token)
      .single();

    if (selectError || !subscriber) {
      console.error('Error finding subscriber:', selectError);
      return new Response(
        `<html><body><h1>Bestätigungslink nicht gefunden</h1><p>Der Bestätigungslink ist ungültig oder bereits verwendet worden.</p></body></html>`,
        { 
          status: 404, 
          headers: { 'Content-Type': 'text/html', ...corsHeaders } 
        }
      );
    }

    if (subscriber.confirmed_at) {
      return new Response(
        `<html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
            <h1 style="color: #8B5CF6; text-align: center;">Bereits bestätigt</h1>
            <p>Ihre Newsletter-Anmeldung wurde bereits bestätigt. Sie erhalten unseren Newsletter in Kürze.</p>
            <p style="text-align: center;">
              <a href="/" style="color: #8B5CF6;">Zurück zur Website</a>
            </p>
          </body>
        </html>`,
        { 
          status: 200, 
          headers: { 'Content-Type': 'text/html', ...corsHeaders } 
        }
      );
    }

    // Confirm the subscription
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        confirmed_at: new Date().toISOString(),
        is_active: true,
        confirmation_token: null // Clear the token after use
      })
      .eq('confirmation_token', token);

    if (updateError) {
      console.error('Error confirming subscription:', updateError);
      throw updateError;
    }

    // Send welcome email
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const emailResponse = await resend.emails.send({
      from: 'Rückenwind Eltern <newsletter@rueckenwind-eltern.de>',
      to: [subscriber.email],
      subject: 'Willkommen bei unserem Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center;">Willkommen bei Rückenwind Eltern!</h1>
          
          <p>Vielen Dank für die Bestätigung Ihrer Newsletter-Anmeldung!</p>
          
          <p>Sie erhalten ab sofort regelmäßig:</p>
          <ul>
            <li>Praktische Tipps für den Familienalltag</li>
            <li>Neue Blog-Artikel direkt in Ihr Postfach</li>
            <li>Exklusive Inhalte nur für Newsletter-Abonnenten</li>
          </ul>
          
          <p>Falls Sie sich jemals abmelden möchten, finden Sie den Abmelde-Link in jeder Newsletter-E-Mail.</p>
          
          <p>Herzliche Grüße,<br>
          Das Team von Rückenwind Eltern</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            Rückenwind Eltern - Ihr vertrauensvoller Begleiter im Familienalltag
          </p>
        </div>
      `,
    });

    console.log('Welcome email sent:', emailResponse);

    // Return success page
    return new Response(
      `<html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center;">Newsletter-Anmeldung bestätigt!</h1>
          <p>Vielen Dank! Ihre Newsletter-Anmeldung wurde erfolgreich bestätigt.</p>
          <p>Sie erhalten in Kürze eine Willkommens-E-Mail und dann regelmäßig unseren Newsletter mit wertvollen Tipps und neuen Artikeln.</p>
          <p style="text-align: center;">
            <a href="/" style="background-color: #8B5CF6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Zurück zur Website</a>
          </p>
        </body>
      </html>`,
      { 
        status: 200, 
        headers: { 'Content-Type': 'text/html', ...corsHeaders } 
      }
    );

  } catch (error: any) {
    console.error('Error in newsletter confirmation:', error);
    
    return new Response(
      `<html><body><h1>Fehler</h1><p>Bei der Bestätigung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.</p></body></html>`,
      { 
        status: 500, 
        headers: { 'Content-Type': 'text/html', ...corsHeaders } 
      }
    );
  }
};

serve(handler);
