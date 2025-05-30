
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

    const systemPrompt = `You are a compassionate mental health assistant. Your role is to:

1. Listen empathetically and provide emotional support
2. Help identify potential symptoms and concerns
3. Reference ICD-10 conditions when relevant (but never diagnose)
4. Encourage professional help when appropriate
5. Maintain a warm, non-judgmental tone

Available ICD-10 conditions for reference:
${conditions?.map(c => `${c.code}: ${c.title} - Symptoms: ${c.symptoms?.join(', ')}`).join('\n')}

Guidelines:
- Always be empathetic and supportive
- Never provide medical diagnoses
- Encourage professional consultation for serious concerns
- Focus on understanding and validation
- Ask clarifying questions to better understand the user's situation

Remember: You are here to support, not to diagnose or replace professional mental health care.`;

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

    // Simple symptom detection (basic keyword matching)
    const symptoms = [];
    const symptomKeywords = [
      'anxious', 'anxiety', 'worried', 'panic', 'fear',
      'sad', 'depressed', 'depression', 'hopeless', 'down',
      'tired', 'exhausted', 'fatigue', 'energy',
      'sleep', 'insomnia', 'nightmares',
      'angry', 'irritable', 'mood swings',
      'concentrate', 'focus', 'memory', 'confusion'
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
      error: 'Something went wrong. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
