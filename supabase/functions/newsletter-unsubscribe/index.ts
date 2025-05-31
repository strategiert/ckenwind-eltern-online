
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
        `<html><body><h1>Ungültiger Abmelde-Link</h1><p>Der Abmelde-Link ist ungültig.</p></body></html>`,
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

    // Find subscriber by unsubscribe token
    const { data: subscriber, error: selectError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, is_active')
      .eq('unsubscribe_token', token)
      .single();

    if (selectError || !subscriber) {
      console.error('Error finding subscriber:', selectError);
      return new Response(
        `<html><body><h1>Abmelde-Link nicht gefunden</h1><p>Der Abmelde-Link ist ungültig oder bereits verwendet worden.</p></body></html>`,
        { 
          status: 404, 
          headers: { 'Content-Type': 'text/html', ...corsHeaders } 
        }
      );
    }

    if (!subscriber.is_active) {
      return new Response(
        `<html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
            <h1 style="color: #8B5CF6; text-align: center;">Bereits abgemeldet</h1>
            <p>Sie sind bereits von unserem Newsletter abgemeldet.</p>
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

    // Unsubscribe the user
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('unsubscribe_token', token);

    if (updateError) {
      console.error('Error unsubscribing:', updateError);
      throw updateError;
    }

    console.log(`User ${subscriber.email} successfully unsubscribed`);

    // Return success page
    return new Response(
      `<html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center;">Erfolgreich abgemeldet</h1>
          <p>Sie wurden erfolgreich von unserem Newsletter abgemeldet.</p>
          <p>Es tut uns leid, dass Sie gehen. Ihre E-Mail-Adresse wurde aus unserer Newsletter-Liste entfernt.</p>
          <p>Sie können sich jederzeit wieder anmelden, falls Sie Ihre Meinung ändern.</p>
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
    console.error('Error in newsletter unsubscribe:', error);
    
    return new Response(
      `<html><body><h1>Fehler</h1><p>Bei der Abmeldung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.</p></body></html>`,
      { 
        status: 500, 
        headers: { 'Content-Type': 'text/html', ...corsHeaders } 
      }
    );
  }
};

serve(handler);
