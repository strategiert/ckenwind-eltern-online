
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

    const systemPrompt = `Du bist ein Experte für Psychologie und mentale Gesundheit, spezialisiert auf Eltern-Burnout, ADHS, Essstörungen und verwandte Themen. 

Erstelle einen umfassenden Glossar-Eintrag für den gegebenen Begriff. Gib das Ergebnis als JSON zurück mit folgender Struktur:

{
  "term": "Der exakte Begriff",
  "slug": "url-freundlicher-slug",
  "definition": "Präzise Definition in 2-3 Sätzen",
  "category": "passende Kategorie (eltern-burnout, adhs, esstoerungen, psychologie, therapie, allgemein)",
  "tags": ["relevante", "tags", "max-6-stueck"],
  "teaser": "Einleitender Text für Übersicht (1-2 Sätze)",
  "sections": [
    {
      "title": "Überschrift des Abschnitts",
      "content": "Detaillierter Inhalt des Abschnitts"
    }
  ],
  "literaryDevices": [
    {
      "title": "Literarisches Element oder Stilmittel",
      "content": "Erklärung"
    }
  ],
  "references": ["Quelle 1", "Quelle 2"],
  "relatedTerms": ["verwandter-begriff-1", "verwandter-begriff-2"]
}

Achte darauf:
- Definition muss präzise und verständlich sein
- Slug sollte URL-freundlich sein (kleinbuchstaben, bindestriche)
- Tags sollten relevant und suchfreundlich sein
- Sections sollten strukturiert und informativ sein
- References sollten wissenschaftlich fundiert sein
- RelatedTerms als Slugs angeben

Fokussiere auf deutsche Begriffe und den deutschsprachigen Kontext.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Erstelle einen Glossar-Eintrag für: ${keyword}` }
        ],
        temperature: 0.7,
        max_tokens: 2000,
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

    // Ensure arrays exist
    parsedContent.tags = parsedContent.tags || [];
    parsedContent.sections = parsedContent.sections || [];
    parsedContent.literaryDevices = parsedContent.literaryDevices || [];
    parsedContent.references = parsedContent.references || [];
    parsedContent.relatedTerms = parsedContent.relatedTerms || [];

    console.log('Successfully generated and parsed content');

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
