import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Gemini 2.0 Flash - Schnell und intelligent
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// TOOL IMPLEMENTATIONS
// ============================================

async function searchResources(query: string, type: string = 'all') {
  const results: any[] = [];

  if (type === 'all' || type === 'blog') {
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, category_label')
      .eq('published', true)
      .textSearch('title', query, { type: 'websearch' })
      .limit(3);

    if (blogPosts) {
      results.push(...blogPosts.map(p => ({
        type: 'blog',
        id: p.id,
        title: p.title,
        url: `/blog/${p.slug}`,
        excerpt: p.excerpt,
        category: p.category_label
      })));
    }
  }

  if (type === 'all' || type === 'glossary') {
    const { data: glossaryTerms } = await supabase
      .from('glossary_terms')
      .select('id, term, slug, teaser')
      .eq('is_published', true)
      .textSearch('term', query, { type: 'websearch' })
      .limit(3);

    if (glossaryTerms) {
      results.push(...glossaryTerms.map(t => ({
        type: 'glossary',
        id: t.id,
        title: t.term,
        url: `/glossar/${t.slug}`,
        excerpt: t.teaser
      })));
    }
  }

  return results;
}

async function getWeather(city: string) {
  try {
    // Geocoding
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=de&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return { error: `Stadt "${city}" nicht gefunden` };
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Weather
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe/Berlin&forecast_days=3`
    );
    const weatherData = await weatherResponse.json();

    const weatherCodes: Record<number, string> = {
      0: 'Klar',
      1: 'Überwiegend klar',
      2: 'Teilweise bewölkt',
      3: 'Bewölkt',
      45: 'Nebelig',
      48: 'Nebel mit Reif',
      51: 'Leichter Nieselregen',
      53: 'Nieselregen',
      55: 'Starker Nieselregen',
      61: 'Leichter Regen',
      63: 'Regen',
      65: 'Starker Regen',
      71: 'Leichter Schneefall',
      73: 'Schneefall',
      75: 'Starker Schneefall',
      80: 'Regenschauer',
      81: 'Starke Regenschauer',
      95: 'Gewitter'
    };

    return {
      city: name,
      current: {
        temperature: weatherData.current.temperature_2m,
        condition: weatherCodes[weatherData.current.weather_code] || 'Unbekannt',
        windSpeed: weatherData.current.wind_speed_10m
      },
      forecast: weatherData.daily.time.map((date: string, i: number) => ({
        date,
        tempMax: weatherData.daily.temperature_2m_max[i],
        tempMin: weatherData.daily.temperature_2m_min[i],
        rainProbability: weatherData.daily.precipitation_probability_max[i]
      })),
      recommendation: getOutdoorRecommendation(weatherData)
    };
  } catch (error) {
    return { error: 'Wetterdaten konnten nicht abgerufen werden' };
  }
}

function getOutdoorRecommendation(weather: any): string {
  const temp = weather.current.temperature_2m;
  const code = weather.current.weather_code;

  if (code >= 61 && code <= 67) return 'Heute regnerisch - Indoor-Aktivitäten empfohlen';
  if (code >= 71 && code <= 77) return 'Schnee! Perfekt für Winteraktivitäten mit warmer Kleidung';
  if (temp < 5) return 'Kühl draußen - warm anziehen für einen kurzen Spaziergang';
  if (temp > 25) return 'Warm! Sonnenschutz nicht vergessen, vielleicht Wasserspiele?';
  if (code <= 2) return 'Perfektes Wetter für Outdoor-Aktivitäten!';
  return 'Gutes Wetter für einen Spaziergang - Jacke einpacken';
}

function createExercise(type: string, target: string, context: string) {
  const exercises: Record<string, any> = {
    breathing: {
      parent: {
        name: '4-7-8 Beruhigende Atmung',
        description: 'Diese Atemtechnik aktiviert Ihr parasympathisches Nervensystem und hilft, Stress abzubauen.',
        steps: [
          'Finden Sie eine bequeme Position',
          'Atmen Sie durch die Nase ein und zählen Sie bis 4',
          'Halten Sie den Atem und zählen Sie bis 7',
          'Atmen Sie durch den Mund aus und zählen Sie bis 8',
          'Wiederholen Sie dies 4 Mal'
        ],
        duration: '3 Minuten',
        tip: 'Ideal vor schwierigen Gesprächen oder wenn Sie merken, dass Ihre Geduld nachlässt.'
      },
      child: {
        name: 'Luftballon-Atmung',
        description: 'Spielerische Atemübung, die Kindern hilft, sich zu beruhigen.',
        steps: [
          'Stell dir vor, du hast einen bunten Luftballon im Bauch',
          'Atme tief ein - der Ballon wird größer und größer',
          'Halte kurz an - der Ballon ist jetzt riesengroß!',
          'Atme ganz langsam aus - sssssss - die Luft entweicht',
          'Der Ballon wird wieder ganz klein'
        ],
        duration: '2 Minuten',
        tip: 'Lassen Sie Ihr Kind die Farbe des Ballons wählen - das erhöht die Bindung zur Übung.'
      }
    },
    mindfulness: {
      parent: {
        name: '5-4-3-2-1 Erdung',
        description: 'Diese Übung bringt Sie zurück ins Hier und Jetzt, wenn die Gedanken kreisen.',
        steps: [
          'Nennen Sie 5 Dinge, die Sie SEHEN',
          'Nennen Sie 4 Dinge, die Sie HÖREN',
          'Nennen Sie 3 Dinge, die Sie FÜHLEN (körperlich)',
          'Nennen Sie 2 Dinge, die Sie RIECHEN',
          'Nennen Sie 1 Ding, das Sie SCHMECKEN'
        ],
        duration: '5 Minuten',
        tip: 'Perfekt in Momenten der Überforderung oder wenn Sie gedanklich abschweifen.'
      },
      child: {
        name: 'Safari-Spiel',
        description: 'Achtsamkeitsübung als Entdeckungsreise.',
        steps: [
          'Wir gehen jetzt auf Safari in deinem Zimmer/draußen',
          'Findest du etwas Rotes? Zeig mir!',
          'Findest du etwas, das weich ist?',
          'Findest du etwas, das ein Geräusch macht?',
          'Findest du etwas, das gut riecht?'
        ],
        duration: '5-10 Minuten',
        tip: 'Variieren Sie die Kategorien - Formen, Größen, Temperaturen...'
      }
    },
    communication: {
      parent: {
        name: 'Ich-Botschaften',
        description: 'Kommunizieren Sie Ihre Gefühle ohne Vorwürfe.',
        template: 'Wenn [Situation], dann fühle ich mich [Gefühl], weil [Bedürfnis]. Ich wünsche mir [Bitte].',
        examples: [
          'Wenn du mich beim Reden unterbrichst, fühle ich mich nicht gehört, weil mir wichtig ist, dass wir einander zuhören. Ich wünsche mir, dass du mich ausreden lässt.',
          'Wenn das Zimmer so unaufgeräumt ist, fühle ich mich gestresst, weil mir Ordnung hilft, mich zu entspannen. Ich wünsche mir, dass wir zusammen aufräumen.'
        ],
        duration: '10 Minuten zum Üben',
        tip: 'Üben Sie zuerst mit weniger emotionalen Themen, bevor Sie diese Technik in Konflikten einsetzen.'
      },
      family: {
        name: 'Familien-Meeting',
        description: 'Strukturiertes Gespräch für bessere Familienkommunikation.',
        steps: [
          'Jeder bekommt reihum 2 Minuten ungestörte Redezeit',
          'Runde 1: Was lief diese Woche gut?',
          'Runde 2: Was war schwierig?',
          'Runde 3: Was wünsche ich mir für nächste Woche?',
          'Gemeinsam: Ein Plan für eine schöne Familienaktivität'
        ],
        duration: '15-20 Minuten',
        tip: 'Wählen Sie einen festen Zeitpunkt (z.B. Sonntagabend) und machen Sie es zur Tradition.'
      }
    }
  };

  const exercise = exercises[type]?.[target] || exercises[type]?.parent;

  if (!exercise) {
    return {
      name: 'Individuelle Übung',
      description: `Eine auf Ihre Situation angepasste ${type}-Übung`,
      context: context,
      note: 'Ich erstelle gerne eine passende Übung basierend auf Ihrem Anliegen.'
    };
  }

  return {
    ...exercise,
    context: context,
    type: type,
    target: target
  };
}

async function setReminder(sessionId: string, message: string, delayHours: number, type: string) {
  const scheduledFor = new Date(Date.now() + delayHours * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('chat_reminders')
    .insert({
      session_id: sessionId,
      reminder_type: type,
      message: message,
      scheduled_for: scheduledFor.toISOString()
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    reminder: {
      id: data.id,
      message: message,
      scheduledFor: scheduledFor.toISOString(),
      type: type
    }
  };
}

function offerAppointment(reason: string, urgency: string) {
  const urgencyTexts: Record<string, string> = {
    normal: 'Wenn Sie möchten, können wir gerne einen persönlichen Beratungstermin vereinbaren.',
    soon: 'Ich würde Ihnen empfehlen, zeitnah einen persönlichen Termin zu vereinbaren.',
    urgent: 'Bei diesem Thema rate ich Ihnen dringend zu einem persönlichen Gespräch.'
  };

  return {
    recommendation: urgencyTexts[urgency] || urgencyTexts.normal,
    reason: reason,
    urgency: urgency,
    bookingUrl: '/kontakt',
    note: 'In einem persönlichen Gespräch kann ich viel gezielter auf Ihre individuelle Situation eingehen.'
  };
}

// ============================================
// PROCESS TOOL CALLS
// ============================================

async function processToolCall(toolName: string, args: any, sessionId: string) {
  console.log(`Processing tool: ${toolName}`, args);

  switch (toolName) {
    case 'search_resources':
      return await searchResources(args.query, args.type);

    case 'get_weather':
      return await getWeather(args.city);

    case 'create_exercise':
      return createExercise(args.type, args.target, args.context);

    case 'set_reminder':
      return await setReminder(sessionId, args.message, args.delay_hours, args.type);

    case 'offer_appointment':
      return offerAppointment(args.reason, args.urgency);

    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}

// ============================================
// JANIKE SYSTEM PROMPT
// ============================================

const JANIKE_SYSTEM_PROMPT = `Du bist "Janike" - die digitale Therapeutin von Rückenwind Eltern, basierend auf Janike Arent.

DEINE IDENTITÄT:
- Du bist Janike Arent, eine erfahrene Kinder- und Familientherapeutin mit über 20 Jahren Berufserfahrung
- Du bist Fachautorin und eine anerkannte Expertin für die emotionalen Bedürfnisse von Kindern
- Dein Ansatz ist warmherzig, einfühlsam und lösungsorientiert
- Du sprichst Eltern mit "Sie" an, bist aber dennoch nahbar und verständnisvoll

DEINE EXPERTISE:
- Kindliche Entwicklungsphasen und -krisen
- Eltern-Kind-Bindung und Beziehungsaufbau
- Verhaltensauffälligkeiten bei Kindern (ADHS, Ängste, Wutanfälle)
- Stressbewältigung und Burnout-Prävention für Eltern
- Geschwisterbeziehungen und Familiendynamik
- Trennungskinder und Patchwork-Familien
- Schulprobleme und Lernstörungen
- Emotionale Regulation bei Kindern und Eltern

DEIN KOMMUNIKATIONSSTIL:
- Warm, einfühlsam, nie belehrend
- Du hörst zuerst zu und stellst verständnisvolle Fragen
- Du validierst Gefühle: "Das klingt wirklich erschöpfend. Es ist völlig verständlich, dass Sie sich so fühlen."
- Du gibst konkrete, umsetzbare Tipps statt allgemeiner Ratschläge
- Du nutzt eine bildhafte Sprache, die Eltern anspricht

DEINE TOOLS:
Du hast Zugriff auf hilfreiche Werkzeuge. Nutze sie proaktiv:

1. search_resources - Finde passende Blog-Artikel und Glossar-Einträge
2. get_weather - Prüfe das Wetter für Outdoor-Empfehlungen
3. create_exercise - Erstelle personalisierte Übungen
4. set_reminder - Setze Erinnerungen für Follow-ups
5. offer_appointment - Biete persönliche Beratung an

WICHTIGE RICHTLINIEN:
- Stelle NIEMALS Diagnosen
- Bei Anzeichen von Kindeswohlgefährdung oder Krise: Sofort auf professionelle Hilfe hinweisen
- Bei Suizidgedanken: Notfallnummern nennen (Telefonseelsorge: 0800 111 0 111)
- Du ersetzt keine professionelle Therapie

Antworte immer auf Deutsch.`;

// ============================================
// GEMINI TOOL DEFINITIONS
// ============================================

const GEMINI_TOOLS = {
  function_declarations: [
    {
      name: "search_resources",
      description: "Durchsucht Blog-Artikel und Glossar nach relevanten Inhalten zu einem Thema",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Suchbegriff oder Thema" },
          type: { type: "string", enum: ["blog", "glossary", "all"], description: "Art der Ressource (blog, glossary, oder all)" }
        },
        required: ["query"]
      }
    },
    {
      name: "get_weather",
      description: "Ruft das aktuelle Wetter für eine Stadt ab, um Outdoor-Aktivitäten zu empfehlen",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "Name der Stadt (z.B. Berlin, München)" }
        },
        required: ["city"]
      }
    },
    {
      name: "create_exercise",
      description: "Erstellt eine personalisierte therapeutische Übung",
      parameters: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["breathing", "mindfulness", "communication"], description: "Art der Übung" },
          target: { type: "string", enum: ["parent", "child", "family"], description: "Für wen ist die Übung" },
          context: { type: "string", description: "Kontext oder Situation, für die die Übung gedacht ist" }
        },
        required: ["type", "target", "context"]
      }
    },
    {
      name: "set_reminder",
      description: "Setzt eine Erinnerung für den Nutzer (z.B. für Übungen oder Check-ins)",
      parameters: {
        type: "object",
        properties: {
          message: { type: "string", description: "Text der Erinnerung" },
          delay_hours: { type: "number", description: "In wie vielen Stunden soll erinnert werden" },
          type: { type: "string", enum: ["exercise", "checkin", "tip", "followup"], description: "Art der Erinnerung" }
        },
        required: ["message", "delay_hours", "type"]
      }
    },
    {
      name: "offer_appointment",
      description: "Bietet einen persönlichen Beratungstermin an, wenn das Thema komplexer ist",
      parameters: {
        type: "object",
        properties: {
          reason: { type: "string", description: "Grund für die Terminempfehlung" },
          urgency: { type: "string", enum: ["normal", "soon", "urgent"], description: "Dringlichkeit" }
        },
        required: ["reason", "urgency"]
      }
    }
  ]
};

// ============================================
// MAIN HANDLER
// ============================================

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, stream = false } = await req.json();

    console.log('Janike Chat - Message:', message, 'Session:', sessionId);

    // Get chat history
    const { data: chatHistory } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(20);

    // Get user context
    const { data: userContext } = await supabase
      .rpc('get_chat_context', { p_session_id: sessionId });

    // Build context string
    let contextString = '';
    if (userContext?.profile) {
      const profile = userContext.profile;
      if (profile.display_name) contextString += `\nNutzer: ${profile.display_name}`;
      if (profile.children?.length) {
        contextString += `\nKinder: ${profile.children.map((c: any) => `${c.name} (${c.age} Jahre)`).join(', ')}`;
      }
      if (profile.main_concerns?.length) {
        contextString += `\nHauptthemen: ${profile.main_concerns.join(', ')}`;
      }
    }

    // Build conversation history for Gemini
    const geminiHistory = (chatHistory || []).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Initial Gemini request with tools
    let response = await fetch(
      `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: JANIKE_SYSTEM_PROMPT + (contextString ? `\n\nKONTEXT:${contextString}` : '') }]
            },
            {
              role: 'model',
              parts: [{ text: 'Ich verstehe. Ich bin Janike und stehe bereit, einfühlsam zu helfen.' }]
            },
            ...geminiHistory,
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          tools: [GEMINI_TOOLS],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 2048,
            topP: 0.9,
          }
        }),
      }
    );

    let data = await response.json();
    console.log('Gemini Response:', JSON.stringify(data, null, 2));

    // Process tool calls if any
    const toolResults: any[] = [];
    let candidate = data.candidates?.[0];

    while (candidate?.content?.parts?.some((p: any) => p.functionCall)) {
      const functionCalls = candidate.content.parts.filter((p: any) => p.functionCall);

      for (const part of functionCalls) {
        const { name, args } = part.functionCall;
        console.log(`Tool call: ${name}`, args);

        const result = await processToolCall(name, args, sessionId);
        toolResults.push({ tool: name, result });

        // Log tool call
        await supabase.from('chat_tool_calls').insert({
          session_id: sessionId,
          tool_name: name,
          tool_input: args,
          tool_output: result
        });
      }

      // Continue conversation with tool results
      response = await fetch(
        `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: JANIKE_SYSTEM_PROMPT }]
              },
              {
                role: 'model',
                parts: [{ text: 'Ich verstehe. Ich bin Janike.' }]
              },
              ...geminiHistory,
              {
                role: 'user',
                parts: [{ text: message }]
              },
              {
                role: 'model',
                parts: functionCalls
              },
              {
                role: 'user',
                parts: toolResults.map(tr => ({
                  functionResponse: {
                    name: tr.tool,
                    response: tr.result
                  }
                }))
              }
            ],
            tools: [GEMINI_TOOLS],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 2048,
            }
          }),
        }
      );

      data = await response.json();
      candidate = data.candidates?.[0];
    }

    // Extract final text response
    const aiResponse = candidate?.content?.parts
      ?.filter((p: any) => p.text)
      ?.map((p: any) => p.text)
      ?.join('\n')
      || 'Es tut mir leid, ich konnte keine Antwort generieren. Bitte versuchen Sie es erneut.';

    // Save messages
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      content: message,
    });

    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'assistant',
      content: aiResponse,
      metadata: toolResults.length > 0 ? { toolResults } : null
    });

    return new Response(JSON.stringify({
      response: aiResponse,
      toolResults: toolResults.length > 0 ? toolResults : undefined,
      model: GEMINI_MODEL
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in janike-chat:', error);
    return new Response(JSON.stringify({
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
