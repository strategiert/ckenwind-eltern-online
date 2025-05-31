
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

    // Get IP address and user agent for GDPR compliance
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active, confirmed_at')
      .eq('email', email)
      .single();

    let confirmationToken: string;

    if (existingSubscriber) {
      if (existingSubscriber.is_active && existingSubscriber.confirmed_at) {
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
        // Generate new confirmation token for existing unconfirmed subscriber
        confirmationToken = crypto.randomUUID();
        
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            confirmation_token: confirmationToken,
            consent_given: true,
            consent_timestamp: new Date().toISOString(),
            ip_address: ipAddress,
            user_agent: userAgent,
            is_active: false, // Will be activated after confirmation
            subscribed_at: new Date().toISOString()
          })
          .eq('email', email);

        if (updateError) {
          console.error('Error updating subscription:', updateError);
          throw updateError;
        }
      }
    } else {
      // Create new subscription
      confirmationToken = crypto.randomUUID();
      
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({ 
          email,
          confirmation_token: confirmationToken,
          consent_given: true,
          consent_timestamp: new Date().toISOString(),
          ip_address: ipAddress,
          user_agent: userAgent,
          is_active: false // Will be activated after confirmation
        });

      if (insertError) {
        console.error('Error creating subscription:', insertError);
        throw insertError;
      }
    }

    // Send confirmation email using Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const confirmationUrl = `${supabaseUrl}/functions/v1/newsletter-confirm?token=${confirmationToken}`;
    
    const emailResponse = await resend.emails.send({
      from: 'Rückenwind Eltern <newsletter@rueckenwind-eltern.de>',
      to: [email],
      subject: 'Bitte bestätigen Sie Ihre Newsletter-Anmeldung',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center;">Newsletter-Anmeldung bestätigen</h1>
          
          <p>Vielen Dank für Ihr Interesse an unserem Newsletter!</p>
          
          <p>Um Ihre Anmeldung abzuschließen und unsere DSGVO-Bestimmungen zu erfüllen, klicken Sie bitte auf den folgenden Link:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background-color: #8B5CF6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Anmeldung bestätigen
            </a>
          </div>
          
          <p>Nach der Bestätigung erhalten Sie regelmäßig:</p>
          <ul>
            <li>Praktische Tipps für den Familienalltag</li>
            <li>Neue Blog-Artikel direkt in Ihr Postfach</li>
            <li>Exklusive Inhalte nur für Newsletter-Abonnenten</li>
          </ul>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            Falls Sie diese E-Mail irrtümlich erhalten haben, können Sie sie einfach ignorieren. 
            Ohne Bestätigung wird keine Newsletter-Anmeldung aktiviert.
          </p>
          
          <p>Herzliche Grüße,<br>
          Das Team von Rückenwind Eltern</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            Rückenwind Eltern - Ihr vertrauensvoller Begleiter im Familienalltag
          </p>
        </div>
      `,
    });

    console.log('Confirmation email sent:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Vielen Dank! Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte klicken Sie auf den Link in der E-Mail.' 
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
