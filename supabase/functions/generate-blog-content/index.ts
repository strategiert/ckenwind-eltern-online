
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
    const { topic, targetAudience, contentType } = await req.json();

    if (!topic) {
      return new Response(
        JSON.stringify({ error: 'Topic is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Generating blog content for topic: ${topic}, type: ${contentType}`);

    const systemPrompt = `Du bist Janike Arent, eine erfahrene Expertin für Eltern-Burnout, ADHS, Essstörungen und mentale Gesundheit von Familien. Du erstellst wissenschaftlich fundierte, empathische und praxisnahe Blog-Artikel für betroffene Eltern und Familien.

Erstelle einen vollständigen, hochwertigen Blog-Artikel zum gegebenen Thema. Der Artikel soll sowohl für betroffene Eltern als auch für Interessierte verständlich und hilfreich sein.

WICHTIGE ANFORDERUNGEN:
- Wissenschaftlich fundiert mit aktuellen Erkenntnissen
- Empathische, warme Tonalität ohne Bevormundung
- Praxisbezug mit konkreten Umsetzungstipps
- SEO-optimiert mit relevanten Keywords
- Strukturiert mit Zwischenüberschriften
- Mindestens 1200-1500 Wörter
- Persönliche Ansprache ("Du" statt "Sie")
- Mut machend und hoffnungsvoll

Gib das Ergebnis als JSON zurück mit folgender Struktur:

{
  "title": "Aussagekräftiger, SEO-optimierter Titel (max. 60 Zeichen)",
  "slug": "seo-optimierter-url-slug",
  "excerpt": "Kurze, ansprechende Zusammenfassung des Artikels (150-160 Zeichen)",
  "content": "Vollständiger Artikel-Inhalt in Markdown-Format mit Zwischenüberschriften, Listen und strukturierten Absätzen",
  "image_url": "Beschreibung für ein passendes Titelbild",
  "category": "passende Kategorie (eltern-tipps, burnout-praevention, adhs-hilfe, esstoerungen, familienalltag, selbstfuersorge)",
  "category_label": "Deutsche Bezeichnung der Kategorie",
  "tags": ["relevante", "suchbegriffe", "und", "themen", "max-8-stueck"],
  "reading_time": geschätzte_lesezeit_in_minuten,
  "meta_title": "SEO-Titel für Meta-Tags (max. 60 Zeichen)",
  "meta_description": "SEO-Beschreibung für Meta-Tags (max. 160 Zeichen)",
  "featured": false
}

CONTENT-STRUKTUR für den Artikel:
1. Einleitung: Persönliche Ansprache, Problem erkennen und validieren
2. Was ist [Thema]? - Grundlagen verstehen
3. Anzeichen und Symptome erkennen
4. Ursachen und Entstehung
5. Praktische Strategien und Lösungsansätze
6. Professionelle Hilfe - Wann und wo?
7. Erfahrungen anderer Eltern (falls passend)
8. Erste Schritte - Was du heute tun kannst
9. Fazit mit ermutigender Botschaft

TONALITÄT UND STIL:
- Verwende "Du" statt "Sie"
- Schreibe empathisch und verständnisvoll
- Keine Schuldzuweisungen oder Vorwürfe
- Validiere die Gefühle der Leser
- Biete konkrete, umsetzbare Hilfen
- Wissenschaftliche Informationen einfach erklären
- Ermutigend und hoffnungsvoll enden

QUALITÄTSKRITERIEN:
- Mindestens 1200 Wörter hochwertiger Inhalt
- SEO-optimiert ohne Keyword-Stuffing
- Strukturiert mit klaren Zwischenüberschriften
- Praxisnahe Tipps und Beispiele
- Wissenschaftlich fundiert
- Emotional ansprechend
- Call-to-Action am Ende

Achte darauf:
- Slug sollte SEO-optimiert sein (kleinbuchstaben, bindestriche)
- Tags sollten spezifisch und suchrelevant sein
- Meta-Description muss unter 160 Zeichen bleiben
- Content in Markdown mit ## für Überschriften
- Berücksichtige verschiedene Familiensituationen`;

    const userPrompt = `Erstelle einen umfassenden Blog-Artikel für das Eltern-Portal "Rückenwind Eltern" zu folgendem Thema:

**Thema:** ${topic}
**Zielgruppe:** ${targetAudience || 'Eltern in herausfordernden Situationen'}
**Artikel-Typ:** ${contentType}

Fokussiere besonders auf:
- Praktische Hilfe für den Familienalltag
- Wissenschaftlich fundierte Informationen
- Empathische, ermutigende Sprache
- Konkrete Handlungsschritte
- SEO-Optimierung für bessere Auffindbarkeit

Der Artikel soll Eltern Mut machen und ihnen zeigen, dass sie nicht allein sind mit ihren Herausforderungen.`;

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
          { role: 'user', content: userPrompt }
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

    console.log('Generated blog content:', generatedText);

    // Parse the JSON response from OpenAI
    let parsedContent;
    try {
      parsedContent = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse generated content');
    }

    // Validate required fields
    if (!parsedContent.title || !parsedContent.content) {
      throw new Error('Generated content missing required fields');
    }

    // Ensure arrays exist and have minimum content
    parsedContent.tags = parsedContent.tags || [];
    
    // Validate content length
    if (parsedContent.content.length < 800) {
      console.warn('Generated content seems too short');
    }

    // Ensure meta_description is within limits
    if (parsedContent.meta_description && parsedContent.meta_description.length > 160) {
      parsedContent.meta_description = parsedContent.meta_description.substring(0, 157) + '...';
    }

    // Ensure title is within limits
    if (parsedContent.title && parsedContent.title.length > 60) {
      parsedContent.title = parsedContent.title.substring(0, 57) + '...';
    }

    console.log('Successfully generated and parsed blog content');

    return new Response(
      JSON.stringify({ content: parsedContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-blog-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
