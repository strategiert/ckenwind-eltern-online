
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced JSON extraction function to handle markdown-wrapped JSON
function extractAndParseJSON(text: string): any {
  console.log('Attempting to parse OpenAI response...');
  
  // First try direct JSON parsing
  try {
    return JSON.parse(text);
  } catch (directError) {
    console.log('Direct JSON parse failed, trying markdown extraction...');
  }

  // Look for JSON in markdown code blocks
  const jsonBlockRegex = /```(?:json)?\s*(\{[\s\S]*?\})\s*```/;
  const match = text.match(jsonBlockRegex);
  
  if (match && match[1]) {
    try {
      console.log('Found JSON in markdown block, parsing...');
      return JSON.parse(match[1]);
    } catch (blockError) {
      console.error('Failed to parse JSON from markdown block:', blockError);
    }
  }

  // Try to find JSON-like content between first { and last }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonCandidate = text.substring(firstBrace, lastBrace + 1);
    try {
      console.log('Attempting to parse extracted JSON candidate...');
      return JSON.parse(jsonCandidate);
    } catch (candidateError) {
      console.error('Failed to parse JSON candidate:', candidateError);
    }
  }

  throw new Error('Unable to extract valid JSON from response');
}

// Validation function for generated content
function validateGeneratedContent(content: any): boolean {
  const requiredFields = ['title', 'content', 'slug', 'category'];
  
  for (const field of requiredFields) {
    if (!content[field] || typeof content[field] !== 'string' || content[field].trim().length === 0) {
      console.error(`Missing or invalid field: ${field}`);
      return false;
    }
  }

  // Validate content length
  if (content.content.length < 800) {
    console.warn('Generated content seems too short for framework standards');
  }

  return true;
}

// Sanitization function
function sanitizeContent(content: any): any {
  const sanitized = { ...content };

  // Ensure required arrays exist
  sanitized.tags = Array.isArray(sanitized.tags) ? sanitized.tags : [];
  
  // Sanitize and limit title length
  if (sanitized.title && sanitized.title.length > 60) {
    sanitized.title = sanitized.title.substring(0, 57) + '...';
  }

  // Sanitize meta description
  if (sanitized.meta_description && sanitized.meta_description.length > 160) {
    sanitized.meta_description = sanitized.meta_description.substring(0, 157) + '...';
  }

  // Ensure reading time is reasonable
  if (!sanitized.reading_time || sanitized.reading_time < 3) {
    sanitized.reading_time = Math.max(3, Math.ceil(sanitized.content.length / 200));
  }

  // Set defaults for missing optional fields
  sanitized.featured = sanitized.featured || false;
  sanitized.author = sanitized.author || 'Janike Arent';
  sanitized.image_url = sanitized.image_url || '';

  return sanitized;
}

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

**WICHTIGE AUSGABE-ANFORDERUNGEN:**
- Antworte NUR mit einem gültigen JSON-Objekt
- Verwende KEINE Markdown-Formatierung oder Code-Blöcke
- Beginne direkt mit { und ende mit }
- Keine zusätzlichen Texte vor oder nach dem JSON

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

Antworte ausschließlich mit diesem JSON-Format:

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

ANTWORTE NUR MIT GÜLTIGEM JSON - KEINE MARKDOWN-FORMATIERUNG!`;

    console.log('Sending request to OpenAI with enhanced prompts...');

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
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('Generated blog content using framework, parsing response...');

    // Use enhanced JSON parsing
    let parsedContent;
    try {
      parsedContent = extractAndParseJSON(generatedText);
      console.log('Successfully parsed JSON response');
    } catch (parseError) {
      console.error('Enhanced parsing failed:', parseError);
      console.error('Raw OpenAI response:', generatedText);
      throw new Error('Failed to parse generated content - invalid JSON format');
    }

    // Validate the parsed content
    if (!validateGeneratedContent(parsedContent)) {
      throw new Error('Generated content failed validation - missing required fields');
    }

    // Sanitize and normalize the content
    parsedContent = sanitizeContent(parsedContent);

    console.log('Successfully generated, validated, and sanitized framework-based blog content');

    return new Response(
      JSON.stringify({ content: parsedContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-blog-content function:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Ein unerwarteter Fehler ist aufgetreten.';
    
    if (error.message.includes('parse')) {
      errorMessage = 'Fehler beim Verarbeiten der generierten Inhalte. Bitte versuchen Sie es erneut.';
    } else if (error.message.includes('validation')) {
      errorMessage = 'Die generierten Inhalte entsprechen nicht den Qualitätsstandards. Bitte versuchen Sie es erneut.';
    } else if (error.message.includes('OpenAI')) {
      errorMessage = 'Fehler beim Zugriff auf den KI-Service. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.';
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
