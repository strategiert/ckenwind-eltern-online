
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    const { email }: SubscribeRequest = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email address is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Sie sind bereits für unseren Newsletter angemeldet!' 
          }),
          { 
            status: 200, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        );
      } else {
        // Reactivate inactive subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            is_active: true, 
            subscribed_at: new Date().toISOString() 
          })
          .eq('email', email);

        if (updateError) {
          console.error('Error reactivating subscription:', updateError);
          throw updateError;
        }
      }
    } else {
      // Create new subscription
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (insertError) {
        console.error('Error creating subscription:', insertError);
        throw insertError;
      }
    }

    // Send welcome email using Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const emailResponse = await resend.emails.send({
      from: 'Rückenwind Eltern <newsletter@rueckenwind-eltern.de>',
      to: [email],
      subject: 'Willkommen bei unserem Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center;">Willkommen bei Rückenwind Eltern!</h1>
          
          <p>Vielen Dank für Ihre Anmeldung zu unserem Newsletter!</p>
          
          <p>Sie erhalten ab sofort regelmäßig:</p>
          <ul>
            <li>Praktische Tipps für den Familienalltag</li>
            <li>Neue Blog-Artikel direkt in Ihr Postfach</li>
            <li>Exklusive Inhalte nur für Newsletter-Abonnenten</li>
          </ul>
          
          <p>Falls Sie sich jemals abmelden möchten, finden Sie den Abmelde-Link in jeder E-Mail.</p>
          
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

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Vielen Dank! Sie wurden erfolgreich für unseren Newsletter angemeldet.' 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );

  } catch (error: any) {
    console.error('Error in newsletter subscription:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
};

serve(handler);
