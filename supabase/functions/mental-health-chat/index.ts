
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

    const systemPrompt = `Du bist ein einfühlsamer und verständnisvoller Mental Health Assistent für deutsche Eltern. Deine Aufgabe ist es:

1. Empathisch zuzuhören und emotionale Unterstützung zu bieten
2. Bei der Identifizierung möglicher Symptome und Anliegen zu helfen
3. Relevante ICD-10 Diagnosen zu erwähnen (aber niemals zu diagnostizieren)
4. Professionelle Hilfe zu empfehlen, wenn angemessen
5. Einen warmen, nicht-urteilenden Ton zu bewahren

Verfügbare ICD-10 Diagnosen als Referenz:
${conditions?.map(c => `${c.code}: ${c.title} - Symptome: ${c.symptoms?.join(', ')}`).join('\n')}

Wichtige Richtlinien:
- Sei immer empathisch und unterstützend
- Stelle niemals medizinische Diagnosen
- Ermutige zur professionellen Beratung bei ernsteren Anliegen
- Konzentriere dich auf Verständnis und Bestätigung
- Stelle klärende Fragen, um die Situation des Nutzers besser zu verstehen
- Antworte IMMER auf Deutsch
- Verwende eine warme, verständnisvolle Sprache
- Berücksichtige den deutschen kulturellen Kontext

Du bist für Eltern in Deutschland da, die Unterstützung bei psychischen Belastungen suchen. Bedenke auch typische Herausforderungen des Elternseins wie Erschöpfung, Überforderung, Sorgen um die Kinder, etc.

Denke daran: Du bist hier, um zu unterstützen, nicht um zu diagnostizieren oder professionelle psychische Gesundheitsversorgung zu ersetzen.`;

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
