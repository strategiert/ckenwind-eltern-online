import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Gemini 3 Flash für Glossar - präzise Definitionen
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

interface GlossaryRequest {
  action: 'generate' | 'expand' | 'simplify' | 'related' | 'bulk-generate';
  term?: string;
  terms?: string[];
  definition?: string;
  context?: string;
  category?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: GlossaryRequest = await req.json();
    const { action, term, terms, definition, context, category } = request;

    const systemContext = `Du bist ein Fachexperte für Psychologie und Elternberatung bei "Rückenwind Eltern".

Deine Aufgaben:
- Erstelle präzise, wissenschaftlich fundierte Definitionen
- Erkläre Fachbegriffe verständlich für Laien
- Fokus auf psychische Gesundheit, Elternschaft, Kindererziehung
- Deutsche Sprache, professioneller aber zugänglicher Stil
- Vermeide Stigmatisierung
- Referenziere relevante Forschung wenn passend

Themengebiete: Burnout, ADHS, Essstörungen, Angststörungen, Depression, Stressmanagement, Achtsamkeit, Entwicklungspsychologie, Bindungstheorie`;

    let prompt = '';
    let generationConfig = {
      temperature: 0.3,
      maxOutputTokens: 2048,
      topP: 0.85,
      topK: 30,
    };

    switch (action) {
      case 'generate':
        prompt = `Erstelle einen vollständigen Glossar-Eintrag für den Begriff: "${term}"

${category ? `Kategorie: ${category}` : ''}
${context ? `Kontext: ${context}` : ''}

Erstelle im JSON-Format:
{
  "term": "${term}",
  "definition": "Kurze Definition (1-2 Sätze, max. 200 Zeichen)",
  "teaser": "Erweiterter Teaser (2-3 Sätze)",
  "alias": "Alternative Bezeichnung falls vorhanden oder null",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "sections": [
    {
      "title": "Was ist ${term}?",
      "content": "Ausführliche Erklärung (2-3 Absätze)"
    },
    {
      "title": "${term} im Kontext von Elternschaft",
      "content": "Relevanz für Eltern (1-2 Absätze)"
    },
    {
      "title": "Hilfreiche Strategien",
      "content": "Praktische Tipps (Aufzählung oder Absätze)"
    }
  ],
  "literaryDevice": {
    "title": "Metapher/Erklärungsbild",
    "content": "Anschauliche Metapher zur Erklärung"
  },
  "references": [
    "Autor (Jahr). Titel. Verlag.",
    "Weitere Referenz"
  ],
  "relatedTermSuggestions": ["verwandter-begriff-1", "verwandter-begriff-2"]
}

Nur das JSON ausgeben, keine weitere Erklärung.`;
        break;

      case 'expand':
        prompt = `Erweitere folgende Glossar-Definition für "Rückenwind Eltern":

Begriff: ${term}
Aktuelle Definition: ${definition}

Erstelle:
1. Ausführlichere Erklärung (3-4 Absätze)
2. Praktische Beispiele aus dem Elternalltag
3. Wissenschaftliche Einordnung
4. Verbindung zu verwandten Konzepten

Formatiere mit Markdown.`;
        generationConfig.maxOutputTokens = 3000;
        break;

      case 'simplify':
        prompt = `Vereinfache folgende Definition für Laien:

Begriff: ${term}
Aktuelle Definition: ${definition}

Erstelle eine vereinfachte Version:
1. Kurze, einfache Definition (1-2 Sätze, kein Fachjargon)
2. Alltagsbeispiel zur Veranschaulichung
3. "Kurz gesagt" Zusammenfassung

Zielgruppe: Eltern ohne psychologisches Vorwissen.`;
        generationConfig.temperature = 0.4;
        break;

      case 'related':
        prompt = `Finde verwandte Begriffe zu: "${term}"

Definition: ${definition || 'Nicht angegeben'}
${category ? `Kategorie: ${category}` : ''}

Erstelle eine Liste von 5-10 verwandten Begriffen im JSON-Format:
{
  "relatedTerms": [
    {
      "term": "Begriff",
      "slug": "begriff-slug",
      "relationship": "Beschreibung der Beziehung",
      "relevance": "hoch|mittel|niedrig"
    }
  ]
}

Nur das JSON ausgeben.`;
        generationConfig.temperature = 0.2;
        break;

      case 'bulk-generate':
        if (!terms || terms.length === 0) {
          throw new Error('Keine Begriffe angegeben');
        }
        prompt = `Erstelle kurze Glossar-Definitionen für folgende Begriffe:

${terms.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Für jeden Begriff erstelle im JSON-Array-Format:
[
  {
    "term": "Begriff",
    "slug": "begriff-slug",
    "definition": "Kurze Definition (max. 200 Zeichen)",
    "tags": ["Tag1", "Tag2"]
  }
]

Nur das JSON-Array ausgeben.`;
        generationConfig.maxOutputTokens = 4000;
        break;

      default:
        throw new Error(`Unbekannte Aktion: ${action}`);
    }

    const response = await fetch(
      `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: systemContext }] },
            { role: 'model', parts: [{ text: 'Verstanden. Ich erstelle präzise und verständliche Glossar-Einträge für Rückenwind Eltern.' }] },
            { role: 'user', parts: [{ text: prompt }] }
          ],
          generationConfig,
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
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Content konnte nicht generiert werden.';

    // Versuche JSON zu parsen
    let result: any = { content: generatedContent };
    if (['generate', 'related', 'bulk-generate'].includes(action)) {
      try {
        const jsonMatch = generatedContent.match(/[\[\{][\s\S]*[\]\}]/);
        if (jsonMatch) {
          result = { ...result, data: JSON.parse(jsonMatch[0]) };
        }
      } catch (e) {
        console.log('Could not parse JSON response');
      }
    }

    return new Response(JSON.stringify({
      success: true,
      action,
      result,
      model: GEMINI_MODEL
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in generate-glossary-content:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
