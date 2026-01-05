import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GEMINI_MODEL = 'gemini-3-flash-preview';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface TopicGeneratorRequest {
  action: 'gap-analysis' | 'expand-keywords' | 'suggest-related' | 'bulk-suggest' | 'fill-queue';
  category?: string;
  count?: number;
  baseTerm?: string;
  minQueueSize?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: TopicGeneratorRequest = await req.json();
    const { action, category, count = 10, baseTerm, minQueueSize = 10 } = request;

    let result: any;

    switch (action) {
      case 'gap-analysis':
        result = await performGapAnalysis(category, count);
        break;

      case 'expand-keywords':
        if (!baseTerm) throw new Error('baseTerm erforderlich');
        result = await expandKeywords(baseTerm, count);
        break;

      case 'suggest-related':
        if (!baseTerm) throw new Error('baseTerm erforderlich');
        result = await suggestRelated(baseTerm, count);
        break;

      case 'bulk-suggest':
        result = await bulkSuggest(category, count);
        break;

      case 'fill-queue':
        result = await fillQueueIfNeeded(minQueueSize, count);
        break;

      default:
        throw new Error(`Unbekannte Aktion: ${action}`);
    }

    return new Response(JSON.stringify({
      success: true,
      action,
      result
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in topic-generator:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Gap-Analyse: Findet fehlende Begriffe basierend auf existierenden Tags
 */
async function performGapAnalysis(category: string | undefined, count: number): Promise<{ suggestions: any[] }> {
  // Lade existierende Begriffe
  const { data: existingTerms } = await supabase
    .from('glossary_terms')
    .select('term, tags')
    .eq('is_published', true);

  // Lade bereits vorgeschlagene Topics
  const { data: existingSuggestions } = await supabase
    .from('topic_suggestions')
    .select('topic');

  const existingSet = new Set([
    ...(existingTerms?.map(t => t.term.toLowerCase()) || []),
    ...(existingSuggestions?.map(s => s.topic.toLowerCase()) || [])
  ]);

  // Sammle alle Tags
  const allTags = new Set<string>();
  existingTerms?.forEach(term => {
    term.tags?.forEach((tag: string) => allTags.add(tag));
  });

  const systemContext = `Du bist ein Experte für Psychologie und Elternberatung.
Analysiere Lücken in einem Glossar und schlage fehlende Begriffe vor.

Existierende Tags/Kategorien: ${Array.from(allTags).join(', ')}
${category ? `Fokus auf Kategorie: ${category}` : ''}

Bereits existierende Begriffe (diese NICHT vorschlagen):
${existingTerms?.map(t => t.term).slice(0, 50).join(', ')}`;

  const prompt = `Analysiere die existierenden Begriffe und Tags und finde ${count} fehlende, wichtige Begriffe.

Kriterien:
- Relevant für deutsche Eltern
- Psychologisch/pädagogisch fundiert
- Noch nicht im Glossar vorhanden
- Hohe Suchrelevanz

Erstelle als JSON-Array:
[
  {
    "topic": "Begriff",
    "category": "kategorie-slug",
    "relevance_score": 0.85,
    "reason": "Kurze Begründung warum wichtig"
  }
]

Nur das JSON-Array ausgeben.`;

  const response = await fetch(
    `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemContext }] },
          { role: 'model', parts: [{ text: 'Verstanden. Ich analysiere die Lücken und schlage relevante Begriffe vor.' }] },
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 2048,
          topP: 0.9,
          topK: 40,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ]
      }),
    }
  );

  const data = await response.json();
  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return { suggestions: [] };
  }

  const suggestions = JSON.parse(jsonMatch[0]);

  // Filtere bereits existierende
  const newSuggestions = suggestions.filter(
    (s: any) => !existingSet.has(s.topic.toLowerCase())
  );

  // Speichere in DB
  if (newSuggestions.length > 0) {
    const toInsert = newSuggestions.map((s: any) => ({
      topic: s.topic,
      category: s.category,
      relevance_score: s.relevance_score,
      source: 'gap_analysis'
    }));

    await supabase.from('topic_suggestions').insert(toInsert);
  }

  return { suggestions: newSuggestions };
}

/**
 * Erweitert Keywords basierend auf einem Basisbegriff
 */
async function expandKeywords(baseTerm: string, count: number): Promise<{ suggestions: any[] }> {
  const prompt = `Basierend auf dem Begriff "${baseTerm}" im Kontext von Psychologie und Elternberatung:

Finde ${count} verwandte Begriffe, die als eigene Glossar-Einträge sinnvoll wären.

Kategorien:
- Unterbegriffe (spezifischere Konzepte)
- Oberbegriffe (allgemeinere Konzepte)
- Verwandte Konzepte (ähnliche aber unterschiedliche Begriffe)
- Angrenzende Themen (thematisch verbunden)

Erstelle als JSON-Array:
[
  {
    "topic": "Begriff",
    "relationship": "Unterbegriff|Oberbegriff|Verwandt|Angrenzend",
    "relevance_score": 0.85,
    "reason": "Kurze Begründung"
  }
]

Nur das JSON-Array ausgeben.`;

  const response = await fetch(
    `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
          topP: 0.85,
          topK: 30,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ]
      }),
    }
  );

  const data = await response.json();
  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return { suggestions: [] };
  }

  const suggestions = JSON.parse(jsonMatch[0]);

  // Speichere in DB
  if (suggestions.length > 0) {
    const toInsert = suggestions.map((s: any) => ({
      topic: s.topic,
      relevance_score: s.relevance_score,
      source: 'ai_suggested'
    }));

    await supabase.from('topic_suggestions').insert(toInsert);
  }

  return { suggestions };
}

/**
 * Schlägt verwandte Begriffe vor basierend auf einem Term
 */
async function suggestRelated(baseTerm: string, count: number): Promise<{ suggestions: any[] }> {
  // Lade den Basis-Begriff
  const { data: term } = await supabase
    .from('glossary_terms')
    .select('term, definition, tags')
    .eq('term', baseTerm)
    .single();

  const context = term
    ? `Begriff: ${term.term}\nDefinition: ${term.definition}\nTags: ${term.tags?.join(', ')}`
    : `Begriff: ${baseTerm}`;

  const prompt = `${context}

Finde ${count} Begriffe die thematisch eng mit diesem Begriff zusammenhängen und für Eltern relevant sind.

Kriterien:
- Begriffe die oft zusammen gesucht werden
- Begriffe die im selben Kontext relevant sind
- Begriffe die helfen, das Thema besser zu verstehen

Erstelle als JSON-Array:
[
  {
    "topic": "Begriff",
    "relevance_score": 0.85,
    "connection": "Wie hängt es mit dem Basisbegriff zusammen"
  }
]

Nur das JSON-Array ausgeben.`;

  const response = await fetch(
    `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
          topP: 0.85,
          topK: 30,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ]
      }),
    }
  );

  const data = await response.json();
  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return { suggestions: [] };
  }

  return { suggestions: JSON.parse(jsonMatch[0]) };
}

/**
 * Bulk-Vorschläge für eine Kategorie
 */
async function bulkSuggest(category: string | undefined, count: number): Promise<{ suggestions: any[]; added: number }> {
  // Lade Wiki-Kategorien
  const { data: categories } = await supabase
    .from('wiki_categories')
    .select('name, slug, description');

  const categoryList = categories?.map(c => `${c.name} (${c.slug}): ${c.description}`).join('\n') || '';

  const prompt = `Für eine Elternberatungs-Plattform mit diesen Kategorien:

${categoryList}

${category ? `Fokus auf: ${category}` : 'Für alle Kategorien'}

Schlage ${count} wichtige Glossar-Begriffe vor, die noch fehlen könnten.

Kriterien:
- Hohe Relevanz für deutsche Eltern
- Wissenschaftlich fundierte Begriffe
- Praktischer Nutzen für Betroffene
- SEO-Potenzial (häufig gesucht)

Erstelle als JSON-Array:
[
  {
    "topic": "Begriff",
    "category": "kategorie-slug",
    "relevance_score": 0.85,
    "priority": 1-10
  }
]

Nur das JSON-Array ausgeben.`;

  const response = await fetch(
    `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2048,
          topP: 0.9,
          topK: 40,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ]
      }),
    }
  );

  const data = await response.json();
  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return { suggestions: [], added: 0 };
  }

  const suggestions = JSON.parse(jsonMatch[0]);

  // Filtere bereits existierende
  const { data: existing } = await supabase
    .from('topic_suggestions')
    .select('topic');

  const existingSet = new Set(existing?.map(e => e.topic.toLowerCase()) || []);

  const newSuggestions = suggestions.filter(
    (s: any) => !existingSet.has(s.topic.toLowerCase())
  );

  // Speichere neue
  if (newSuggestions.length > 0) {
    const toInsert = newSuggestions.map((s: any) => ({
      topic: s.topic,
      category: s.category,
      relevance_score: s.relevance_score,
      source: 'ai_suggested'
    }));

    await supabase.from('topic_suggestions').insert(toInsert);
  }

  return { suggestions: newSuggestions, added: newSuggestions.length };
}

/**
 * Füllt die Queue auf wenn sie unter minSize fällt
 */
async function fillQueueIfNeeded(minSize: number, count: number): Promise<{ added: number; queueSize: number }> {
  // Zähle pending Items in Queue
  const { count: pendingCount } = await supabase
    .from('content_queue')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  if ((pendingCount || 0) >= minSize) {
    return { added: 0, queueSize: pendingCount || 0 };
  }

  // Hole ungenutzte Vorschläge mit höchster Relevanz
  const { data: suggestions } = await supabase
    .from('topic_suggestions')
    .select('*')
    .eq('used', false)
    .order('relevance_score', { ascending: false })
    .limit(count);

  if (!suggestions || suggestions.length === 0) {
    // Keine Vorschläge - generiere neue
    await bulkSuggest(undefined, count);

    // Hole die neuen
    const { data: newSuggestions } = await supabase
      .from('topic_suggestions')
      .select('*')
      .eq('used', false)
      .order('relevance_score', { ascending: false })
      .limit(count);

    if (!newSuggestions || newSuggestions.length === 0) {
      return { added: 0, queueSize: pendingCount || 0 };
    }

    return await addToQueue(newSuggestions, pendingCount || 0);
  }

  return await addToQueue(suggestions, pendingCount || 0);
}

/**
 * Fügt Vorschläge zur Queue hinzu
 */
async function addToQueue(suggestions: any[], currentQueueSize: number): Promise<{ added: number; queueSize: number }> {
  const queueItems = suggestions.map((s, i) => ({
    content_type: 'glossary' as const,
    topic: s.topic,
    category: s.category,
    priority: Math.round((s.relevance_score || 0.5) * 10),
    auto_publish: true
  }));

  const { error } = await supabase.from('content_queue').insert(queueItems);

  if (error) {
    console.error('Error adding to queue:', error);
    return { added: 0, queueSize: currentQueueSize };
  }

  // Markiere als verwendet
  await supabase
    .from('topic_suggestions')
    .update({ used: true })
    .in('id', suggestions.map(s => s.id));

  return {
    added: suggestions.length,
    queueSize: currentQueueSize + suggestions.length
  };
}
