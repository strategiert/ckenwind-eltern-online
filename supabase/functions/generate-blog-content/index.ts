
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

Du folgst einem bewährten Framework für deine Artikel:

**ARTIKEL-FRAMEWORK:**

1. **Validierender Einstieg** (150-200 Wörter)
   - Erkenne das Problem der Leser an
   - Zeige Verständnis für ihre Situation
   - Keine Lösungen, nur Validation
   - Beispiel: "Es ist völlig normal, dass du dich als Mutter manchmal überfordert fühlst..."

2. **Was ist [Thema]? - Grundlagen verstehen** (200-300 Wörter)
   - Klare, wissenschaftlich fundierte Definition
   - Häufigkeit und Verbreitung
   - Unterschiede zu ähnlichen Zuständen
   - Warum es wichtig ist, darüber zu sprechen

3. **Anzeichen und Symptome erkennen** (300-400 Wörter)
   - Körperliche Symptome
   - Emotionale Anzeichen
   - Verhaltensänderungen
   - Auswirkungen auf den Familienalltag
   - Konkrete Beispiele aus dem Alltag

4. **Ursachen und Entstehung** (250-300 Wörter)
   - Wissenschaftliche Hintergründe
   - Gesellschaftliche Faktoren
   - Persönliche Risikofaktoren
   - Warum es jeden treffen kann

5. **Praktische Strategien und Lösungsansätze** (400-500 Wörter)
   - Sofort umsetzbare Tipps
   - Langfristige Strategien
   - Konkrete Handlungsschritte
   - Realistische Erwartungen setzen

6. **Professionelle Hilfe - Wann und wo?** (200-250 Wörter)
   - Warnzeichen, die professionelle Hilfe erfordern
   - Arten von Unterstützung
   - Wie man Hilfe findet
   - Mut machen, Hilfe zu suchen

7. **Erste Schritte - Was du heute tun kannst** (150-200 Wörter)
   - 3-5 konkrete, kleine Schritte
   - Leicht umsetzbare Maßnahmen
   - Realistische Ziele

8. **Ermutigender Abschluss** (100-150 Wörter)
   - Hoffnung vermitteln
   - Stärken der Leser betonen
   - Erinnerung: Du bist nicht allein
   - Positive Zukunftsperspektive

**TONALITÄT UND STIL:**
- Persönliche Ansprache mit "Du"
- Empathisch und verständnisvoll
- Keine Schuldzuweisungen
- Validierend und ermutigend
- Wissenschaftlich fundiert, aber verständlich
- Konkrete Beispiele aus dem Familienalltag
- Mut machend und hoffnungsvoll

**QUALITÄTSKRITERIEN:**
- Mindestens 1400-1600 Wörter
- SEO-optimiert mit natürlichen Keywords
- Strukturiert mit ## Überschriften
- Praxisnahe Tipps und Beispiele
- Wissenschaftlich fundiert
- Emotional ansprechend

Gib das Ergebnis als JSON zurück mit folgender Struktur:

{
  "title": "Aussagekräftiger, SEO-optimierter Titel (max. 60 Zeichen)",
  "slug": "seo-optimierter-url-slug",
  "excerpt": "Kurze, ansprechende Zusammenfassung (150-160 Zeichen)",
  "content": "Vollständiger Artikel-Inhalt in Markdown-Format nach dem Framework",
  "image_url": "Beschreibung für ein passendes Titelbild",
  "category": "passende Kategorie (eltern-tipps, burnout-praevention, adhs-hilfe, esstoerungen, familienalltag, selbstfuersorge)",
  "category_label": "Deutsche Bezeichnung der Kategorie",
  "tags": ["relevante", "suchbegriffe", "max-8-stueck"],
  "reading_time": geschätzte_lesezeit_in_minuten,
  "meta_title": "SEO-Titel für Meta-Tags (max. 60 Zeichen)",
  "meta_description": "SEO-Beschreibung für Meta-Tags (max. 160 Zeichen)",
  "featured": false
}`;

    const userPrompt = `Erstelle einen umfassenden Blog-Artikel für das Eltern-Portal "Rückenwind Eltern" zu folgendem Thema:

**Thema:** ${topic}
**Zielgruppe:** ${targetAudience || 'Eltern in herausfordernden Situationen'}
**Artikel-Typ:** ${contentType}

**WICHTIGE ANFORDERUNGEN:**
- Folge exakt dem 8-Punkte-Framework für die Struktur
- Verwende konkrete, realistische Beispiele aus dem Familienalltag
- Integriere wissenschaftliche Erkenntnisse verständlich
- Jeder Abschnitt soll spezifische, umsetzbare Inhalte haben
- Mindestens 1400-1600 Wörter hochwertiger Inhalt
- Empathische, validierender Tonalität durchgehend
- SEO-optimiert für bessere Auffindbarkeit

Der Artikel soll Eltern praktische Hilfe bieten und ihnen Mut machen, während er gleichzeitig wissenschaftlich fundiert und professionell ist.`;

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

    console.log('Generated blog content using framework');

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
    
    // Validate content length (should be longer with framework)
    if (parsedContent.content.length < 1200) {
      console.warn('Generated content seems shorter than expected for framework');
    }

    // Ensure meta_description is within limits
    if (parsedContent.meta_description && parsedContent.meta_description.length > 160) {
      parsedContent.meta_description = parsedContent.meta_description.substring(0, 157) + '...';
    }

    // Ensure title is within limits
    if (parsedContent.title && parsedContent.title.length > 60) {
      parsedContent.title = parsedContent.title.substring(0, 57) + '...';
    }

    // Increase reading time estimate for framework-based content
    if (parsedContent.reading_time < 6) {
      parsedContent.reading_time = Math.max(6, Math.ceil(parsedContent.content.length / 200));
    }

    console.log('Successfully generated framework-based blog content');

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
