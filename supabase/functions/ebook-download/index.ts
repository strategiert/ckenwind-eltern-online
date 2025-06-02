
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EbookDownloadRequest {
  firstName: string;
  email: string;
  dataConsent: boolean;
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
    const { firstName, email, dataConsent }: EbookDownloadRequest = await req.json();

    // Validate input
    if (!firstName || !email || !dataConsent) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Alle Felder sind erforderlich und die Datenschutzerklärung muss akzeptiert werden.' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' 
        }),
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

    // Check if user already downloaded the ebook
    const { data: existingDownload } = await supabase
      .from('ebook_downloads')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingDownload) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Sie haben das E-Book bereits angefordert. Bitte überprüfen Sie Ihr E-Mail-Postfach.' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Store the download request in database
    const { error: insertError } = await supabase
      .from('ebook_downloads')
      .insert({
        first_name: firstName,
        email: email.toLowerCase(),
        consent_given: dataConsent,
        consent_timestamp: new Date().toISOString(),
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown'
      });

    if (insertError) {
      console.error('Error storing ebook download:', insertError);
      throw insertError;
    }

    console.log('E-Book download request stored successfully for:', email);

    // Send E-Book via email using Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const emailResponse = await resend.emails.send({
      from: 'Rückenwind Eltern <ebook@rueckenwind-eltern.de>',
      to: [email],
      subject: 'Ihr kostenloses E-Book: Wege aus dem elterlichen Burnout',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center;">Vielen Dank für Ihr Interesse!</h1>
          
          <p>Liebe/r ${firstName},</p>
          
          <p>vielen Dank für Ihr Interesse an unserem E-Book "Wege aus dem elterlichen Burnout"!</p>
          
          <p>Wie versprochen erhalten Sie hier Ihr kostenloses Exemplar. Das E-Book enthält:</p>
          <ul>
            <li>Ursachen des elterlichen Burnouts verstehen</li>
            <li>Praktische Selbstfürsorge-Übungen für Eltern</li>
            <li>Sofort anwendbare Strategien für mehr Energie</li>
            <li>Alltagstaugliche Tools für weniger Stress</li>
            <li>Wege zu einem harmonischeren Familienleben</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://zcbotbornmmlmpylkcyr.supabase.co/storage/v1/object/public/ebooks/wege-aus-dem-elterlichen-burnout.pdf" 
               style="background-color: #8B5CF6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
               E-Book jetzt herunterladen
            </a>
          </div>
          
          <p><strong>Bonus:</strong> Sie haben sich automatisch für unseren Newsletter angemeldet und erhalten regelmäßig weitere wertvolle Tipps für den Familienalltag direkt in Ihr Postfach.</p>
          
          <p>Falls Sie Fragen haben oder Unterstützung benötigen, zögern Sie nicht, uns zu kontaktieren.</p>
          
          <p>Herzliche Grüße,<br>
          Janike Arent<br>
          Rückenwind Eltern</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            Sie erhalten diese E-Mail, weil Sie unser E-Book angefordert haben.<br>
            Rückenwind Eltern - Ihr vertrauensvoller Begleiter im Familienalltag
          </p>
        </div>
      `,
    });

    console.log('E-Book email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'E-Book wurde erfolgreich an Ihre E-Mail-Adresse gesendet!' 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );

  } catch (error: any) {
    console.error('Error in ebook download function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
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
