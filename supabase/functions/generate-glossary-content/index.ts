
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return new Response(
        JSON.stringify({ error: 'Keyword is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Generating glossary content for keyword: ${keyword}`);

    const systemPrompt = `Du bist ein Experte für Psychologie und mentale Gesundheit, spezialisiert auf Eltern-Burnout, ADHS, Essstörungen und verwandte Themen. Du erstellst wissenschaftlich fundierte, praxisnahe Glossar-Einträge für Eltern und Fachkräfte.

Erstelle einen umfassenden, wissenschaftlich fundierten Glossar-Eintrag für den gegebenen Begriff. Der Eintrag soll sowohl für betroffene Eltern als auch für Fachkräfte verständlich und hilfreich sein.

WICHTIGE ANFORDERUNGEN:
- Wissenschaftlich fundiert mit aktuellen Erkenntnissen
- Praxisbezug für Eltern und therapeutische Kontexte
- Verständliche Sprache ohne Fachchinesisch
- Konkrete Bezüge zu Kindern und Familienleben
- Bildhafte Erklärungen und Metaphern
- Echte, zitierbare Quellen

Gib das Ergebnis als JSON zurück mit folgender Struktur:

{
  "term": "Deutscher Begriff (English Translation wenn relevant)",
  "slug": "url-freundlicher-slug",
  "definition": "Wissenschaftlich präzise Definition in 2-3 Sätzen, die auch für Laien verständlich ist",
  "category": "passende Kategorie (eltern-burnout, adhs, esstoerungen, psychologie, therapie, allgemein)",
  "tags": ["spezifische", "fachbegriffe", "themenbereiche", "anwendungsgebiete", "max-8-stueck"],
  "teaser": "Einführender Absatz der neugierig macht und den Nutzen für Eltern erklärt (2-3 Sätze)",
  "sections": [
    {
      "title": "Was ist [Begriff]? - Grundlagen verstehen",
      "content": "Ausführliche wissenschaftliche Erklärung mit Bezug zum Familienleben. Mindestens 3-4 Absätze mit konkreten Beispielen aus dem Elternalltag."
    },
    {
      "title": "Wie zeigt sich [Begriff] bei Kindern und Eltern?",
      "content": "Konkrete Anzeichen, Symptome oder Manifestationen im Familienkontext. Unterscheidung zwischen verschiedenen Altersgruppen wenn relevant."
    },
    {
      "title": "Ursachen und Entstehung",
      "content": "Wissenschaftliche Erkenntnisse zu Entstehungsfaktoren, besonders im familiären Kontext. Biologische, psychologische und soziale Faktoren."
    },
    {
      "title": "Therapeutische Ansätze und Behandlung",
      "content": "Evidenzbasierte Behandlungsmethoden, Therapieformen und professionelle Hilfe. Was können Eltern erwarten?"
    },
    {
      "title": "Praktische Hilfen für den Familienalltag",
      "content": "Konkrete, umsetzbare Strategien und Tipps für Eltern. Selbsthilfe-Möglichkeiten und präventive Maßnahmen."
    },
    {
      "title": "Wann professionelle Hilfe suchen?",
      "content": "Klare Indikationen wann Eltern sich an Fachkräfte wenden sollten. Erste Anlaufstellen und was sie erwarten können."
    }
  ],
  "literaryDevices": [
    {
      "title": "Metapher/Vergleich 1",
      "content": "Anschaulicher Vergleich der komplexe Sachverhalte vereinfacht erklärt"
    },
    {
      "title": "Praktisches Beispiel",
      "content": "Konkretes Beispiel aus dem Familienleben das den Begriff veranschaulicht"
    }
  ],
  "references": [
    "Vollständige wissenschaftliche Referenz 1 (Autor, Jahr, Titel, Verlag/Journal)",
    "Vollständige wissenschaftliche Referenz 2",
    "Deutsche oder internationale Leitlinie/Guideline wenn vorhanden",
    "Mindestens 3-5 aktuelle, zitierbare Quellen"
  ],
  "relatedTerms": ["verwandter-begriff-1", "verwandter-begriff-2", "verwandter-begriff-3"]
}

QUALITÄTSKRITERIEN:
1. Jeder Abschnitt soll mindestens 150-200 Wörter umfassen
2. Verwende eine warme, empathische Tonalität
3. Integriere konkrete Alltagsbeispiele
4. Erkläre Fachbegriffe verständlich
5. Gib praktische, umsetzbare Hilfen
6. Verwende echte, überprüfbare Quellen
7. Berücksichtige verschiedene Familiensituationen
8. Fokussiere auf Lösungen und Hoffnung, nicht nur Probleme

Achte darauf:
- Definition muss präzise UND alltagstauglich sein
- Slug sollte SEO-optimiert sein (kleinbuchstaben, bindestriche)
- Tags sollten spezifisch und suchrelevant sein
- Sections sollten logisch aufeinander aufbauen
- References müssen real und zitierfähig sein
- RelatedTerms als SEO-optimierte Slugs angeben
- Berücksichtige kulturelle Sensibilität und Diversity`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Erstelle einen umfassenden, wissenschaftlich fundierten Glossar-Eintrag für: ${keyword}

Fokussiere besonders auf:
- Praktische Relevanz für Eltern
- Wissenschaftliche Fundierung
- Verständliche Erklärungen
- Konkrete Hilfestellungen
- Echte, zitierbare Quellen` }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('Generated content:', generatedText);

    // Parse the JSON response from OpenAI
    let parsedContent;
    try {
      parsedContent = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse generated content');
    }

    // Validate required fields
    if (!parsedContent.term || !parsedContent.definition) {
      throw new Error('Generated content missing required fields');
    }

    // Ensure arrays exist and have minimum content
    parsedContent.tags = parsedContent.tags || [];
    parsedContent.sections = parsedContent.sections || [];
    parsedContent.literaryDevices = parsedContent.literaryDevices || [];
    parsedContent.references = parsedContent.references || [];
    parsedContent.relatedTerms = parsedContent.relatedTerms || [];

    // Validate minimum content requirements
    if (parsedContent.sections.length < 4) {
      console.warn('Generated content has fewer than 4 sections');
    }
    if (parsedContent.references.length < 3) {
      console.warn('Generated content has fewer than 3 references');
    }

    console.log('Successfully generated and parsed comprehensive content');

    return new Response(
      JSON.stringify({ content: parsedContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-glossary-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
