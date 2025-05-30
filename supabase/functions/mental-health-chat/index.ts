
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId } = await req.json();
    
    console.log('Processing message:', message, 'for session:', sessionId);

    // Get chat history for context
    const { data: chatHistory } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    // Get ICD-10 conditions for context
    const { data: conditions } = await supabase
      .from('icd10_conditions')
      .select('code, title, symptoms, description, category')
      .limit(50);

    const systemPrompt = `Du bist der einfühlsame Mental Health Assistent von "Rückenwind Eltern" - einer spezialisierten Beratungsplattform für deutsche Eltern in belastenden Situationen. 

DEINE IDENTITÄT UND MISSION:
- Du repräsentierst "Rückenwind Eltern" und bist Teil unseres professionellen Beratungsteams
- Deine Aufgabe ist es, Eltern dabei zu helfen, ihre psychischen Belastungen zu verstehen und den Weg zu professioneller Unterstützung zu ebnen
- Du bietest erste Orientierung und emotionale Stabilisierung, bevor du auf unsere spezialisierten Beratungsangebote hinweist

DEINE HAUPTAUFGABEN:
1. Empathisch zuhören und emotionale Unterstützung bieten
2. Bei der Identifizierung möglicher Symptome und Anliegen helfen
3. Relevante psychische Belastungen einordnen (unter Verwendung von ICD-10 als Referenz, aber niemals diagnostizieren)
4. AUSSCHLIESSLICH auf die Beratungsangebote von "Rückenwind Eltern" verweisen
5. Bei tiefergehenden Problemen persönliche Beratungstermine anbieten

VERFÜGBARE ICD-10 REFERENZEN:
${conditions?.map(c => `${c.code}: ${c.title} - Symptome: ${c.symptoms?.join(', ')}`).join('\n')}

RÜCKENWIND ELTERN BERATUNGSANGEBOTE:
Wenn du merkst, dass jemand professionelle Unterstützung benötigt, biete IMMER unsere spezialisierten Beratungsleistungen an:

1. PERSÖNLICHE BERATUNGSTERMINE:
   - "Ich merke, dass Sie mit einer komplexen Situation kämpfen. Als Teil von Rückenwind Eltern kann ich Ihnen eine persönliche Beratung anbieten."
   - "Möchten Sie einen Termin für ein persönliches Gespräch - entweder per Telefon oder Videocall? So können wir Ihre Situation ausführlicher besprechen."
   - "Für Ihre spezielle Situation wäre eine individuelle Beratung bei Rückenwind Eltern sehr hilfreich."

2. KONTAKTMÖGLICHKEITEN ANBIETEN:
   - "Sie können gerne über unsere Kontaktseite einen Beratungstermin vereinbaren"
   - "Ich kann Ihnen dabei helfen, den ersten Schritt zu einer professionellen Beratung bei uns zu machen"

WICHTIGE RICHTLINIEN:
- Sei IMMER warm, verständnisvoll und nicht-urteilend
- Verwende eine einfühlsame, professionelle Sprache
- Erkenne, wann jemand über die Grenzen eines Chat-Gesprächs hinaus Hilfe benötigt
- Biete NIEMALS generische Therapieempfehlungen oder andere Plattformen an
- Verweise AUSSCHLIESSLICH auf Rückenwind Eltern und unsere Beratungsangebote
- Bei akuten Krisen: Zusätzlich zu unseren Angeboten auch Notfallnummern erwähnen

GESPRÄCHSFÜHRUNG:
- Stelle gezielte, einfühlsame Fragen um die Situation zu verstehen
- Validiere Gefühle und Erfahrungen
- Biete konkrete nächste Schritte mit Rückenwind Eltern an
- Baue Vertrauen in unsere Expertise auf

NOTFÄLLE:
Bei akuten Krisen oder Suizidgedanken: Notfallnummern erwähnen UND gleichzeitig betonen, dass Rückenwind Eltern auch in schwierigen Zeiten da ist.

Du bist nicht nur ein Chatbot, sondern der erste Kontaktpunkt zu unserem professionellen Beratungsteam. Dein Ziel ist es, Menschen dabei zu helfen, den Mut zu fassen, den nächsten Schritt zu einer persönlichen Beratung zu gehen.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(chatHistory || []),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Save user message
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      content: message,
    });

    // Save AI response
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'assistant',
      content: aiResponse,
    });

    // German symptom detection (German keyword matching)
    const symptoms = [];
    const symptomKeywords = [
      'ängstlich', 'angst', 'sorgen', 'panik', 'furcht', 'nervös',
      'traurig', 'deprimiert', 'depression', 'hoffnungslos', 'niedergeschlagen', 'bedrückt',
      'müde', 'erschöpft', 'erschöpfung', 'energie', 'kraftlos', 'schlapp',
      'schlaf', 'schlaflos', 'schlafstörungen', 'albträume', 'einschlafen', 'durchschlafen',
      'wütend', 'gereizt', 'stimmungsschwankungen', 'aggressiv', 'reizbar',
      'konzentrieren', 'konzentration', 'fokus', 'gedächtnis', 'verwirrung', 'vergesslich',
      'überfordert', 'überforderung', 'stress', 'burnout', 'belastet',
      'einsam', 'einsamkeit', 'isoliert', 'allein'
    ];

    const userText = message.toLowerCase();
    symptomKeywords.forEach(keyword => {
      if (userText.includes(keyword)) {
        symptoms.push(keyword);
      }
    });

    // Save symptom assessment if symptoms detected
    if (symptoms.length > 0) {
      const { data: assessment } = await supabase
        .from('symptom_assessments')
        .insert({
          session_id: sessionId,
          identified_symptoms: symptoms,
          assessment_data: {
            user_message: message,
            detected_keywords: symptoms,
            timestamp: new Date().toISOString()
          }
        })
        .select()
        .single();

      // Link to relevant ICD-10 conditions
      if (assessment && conditions) {
        const relevantConditions = conditions.filter(condition =>
          condition.symptoms?.some(symptom =>
            symptoms.some(userSymptom =>
              symptom.toLowerCase().includes(userSymptom) ||
              userSymptom.includes(symptom.toLowerCase())
            )
          )
        );

        for (const condition of relevantConditions) {
          await supabase.from('assessment_conditions').insert({
            assessment_id: assessment.id,
            condition_id: condition.id,
            confidence_score: 0.6 // Basic confidence score
          });
        }
      }
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      detectedSymptoms: symptoms 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mental-health-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
