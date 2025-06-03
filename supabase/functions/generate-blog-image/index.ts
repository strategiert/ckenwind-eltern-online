
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
    const { title, topic, category, content } = await req.json();

    if (!title) {
      return new Response(
        JSON.stringify({ error: 'Title is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Generating content-specific image for blog title: ${title}`);

    // Detailed content analysis to extract specific visual elements
    let contentAnalysis = '';
    let emotionalTone = '';
    let specificScenarios = '';

    if (content) {
      console.log('Performing deep content analysis for image generation...');
      
      const analysisPrompt = `Analysiere diesen deutschen Eltern-Blog-Artikel und extrahiere spezifische visuelle Elemente für ein Titelbild. Fokussiere auf konkrete Situationen, Emotionen und Aktivitäten.

Artikel: "${title}"
Kategorie: ${category}

Volltext:
${content}

Erstelle eine Analyse in folgender Struktur:

EMOTIONALE STIMMUNG: [Beschreibe die Hauptemotion des Artikels - hoffnungsvoll, beruhigend, unterstützend, etc.]

SPEZIFISCHE SZENARIEN: [2-3 konkrete Familiensituationen oder Aktivitäten aus dem Artikel]

VISUELLE METAPHERN: [Symbolische Elemente, die das Thema repräsentieren]

ZIELGRUPPE DETAILS: [Spezifische Details über die angesprochenen Eltern/Familien]

Antworte in maximal 150 Wörtern, fokussiert auf visuelle Umsetzung.`;

      const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: analysisPrompt }
          ],
          temperature: 0.3,
          max_tokens: 300,
        }),
      });

      if (analysisResponse.ok) {
        const analysisData = await analysisResponse.json();
        contentAnalysis = analysisData.choices[0].message.content;
        console.log('Deep content analysis completed:', contentAnalysis);

        // Extract emotional tone and scenarios for more targeted prompting
        const lines = contentAnalysis.split('\n');
        emotionalTone = lines.find(line => line.includes('EMOTIONALE STIMMUNG'))?.split(':')[1]?.trim() || '';
        specificScenarios = lines.find(line => line.includes('SPEZIFISCHE SZENARIEN'))?.split(':')[1]?.trim() || '';
      }
    }

    // Create highly specific image prompt based on detailed analysis
    const categoryStyles = {
      'eltern-tipps': 'praktische Familiensituation, Alltagshilfen',
      'burnout-praevention': 'ruhige, entspannende Atmosphäre, Selbstfürsorge',
      'adhs-hilfe': 'strukturierte, organisierte Umgebung, Fokus und Klarheit',
      'esstoerungen': 'gesunde Familienmahlzeiten, positive Körperwahrnehmung',
      'familienalltag': 'lebendiges Familienleben, Zusammenhalt',
      'selbstfuersorge': 'Ruhe, persönliche Zeit, Wohlbefinden'
    };

    const categoryStyle = categoryStyles[category] || 'unterstützende Familienatmosphäre';

    const specificImagePrompt = `Erstelle eine professionelle, warmherzige Illustration für einen deutschen Elternratgeber-Blog:

**Artikel-Titel:** "${title}"
**Emotional Tone:** ${emotionalTone || 'unterstützend und hoffnungsvoll'}
**Kategorie-Stil:** ${categoryStyle}

${contentAnalysis ? `**Spezifische Inhalts-Elemente:**
${contentAnalysis}

**Umzusetzende Szenarien:**
${specificScenarios}` : `**Thema-Kontext:** ${topic || title}`}

**Technische Anforderungen:**
- Moderne, warme Illustration (nicht fotorealistisch)
- Familien-freundlich und professionell
- Soft, beruhigende Farbpalette (warme Töne, sanfte Pastelle, dezente Akzentfarben)
- Hochformat-Layout (9:16 oder ähnlich) für Blog-Header optimiert
- Keine Text-Overlays oder Schrift
- Deutsche/europäische Familiendarstellung
- Stil: minimalistisch-modern, illustrativ

**Emotionale Anforderungen:**
- Vermittle Hoffnung und Unterstützung
- Zeige Verbindung und Verständnis
- Professionell aber zugänglich
- Beruhigend, nicht überfordernd

**Spezifische Umsetzung:**
- Integriere die identifizierten Szenarien subtil
- Fokus auf die emotionale Botschaft des Artikels
- Berücksichtige die spezifische Zielgruppe
- Schaffe visuelle Metaphern für die Artikelinhalte

Die Illustration soll perfekt zum Artikelinhalt passen und die Leser emotional ansprechen.`;

    console.log('Using enhanced content-specific image prompt');

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: specificImagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural'
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('Successfully generated highly content-specific blog image');

    return new Response(
      JSON.stringify({ imageUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-blog-image function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
