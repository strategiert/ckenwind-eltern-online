
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

// Enhanced validation function for generated content with headline validation
function validateGeneratedContent(content: any): boolean {
  const requiredFields = ['title', 'content', 'slug', 'category'];
  
  for (const field of requiredFields) {
    if (!content[field] || typeof content[field] !== 'string' || content[field].trim().length === 0) {
      console.error(`Missing or invalid field: ${field}`);
      return false;
    }
  }

  // Enhanced headline validation
  const headlines = extractHeadlines(content.content);
  if (!validateHeadlines(headlines, content.title)) {
    console.error('Generated headlines failed validation - too generic or framework-based');
    return false;
  }

  // Validate content length
  if (content.content.length < 800) {
    console.warn('Generated content seems too short for framework standards');
  }

  return true;
}

// Extract headlines from markdown content
function extractHeadlines(content: string): string[] {
  const headlineRegex = /^#{2}\s+(.+)$/gm;
  const headlines = [];
  let match;
  
  while ((match = headlineRegex.exec(content)) !== null) {
    headlines.push(match[1].trim());
  }
  
  return headlines;
}

// Validate that headlines are specific and not generic framework placeholders
function validateHeadlines(headlines: string[], title: string): boolean {
  const genericPhrases = [
    'was ist',
    'grundlagen verstehen',
    'anzeichen und symptome',
    'ursachen und entstehung',
    'praktische strategien',
    'professionelle hilfe',
    'erste schritte',
    'abschluss'
  ];

  const topicKeywords = extractTopicKeywords(title);
  let specificHeadlines = 0;

  for (const headline of headlines) {
    const lowerHeadline = headline.toLowerCase();
    
    // Check if headline is too generic
    const isGeneric = genericPhrases.some(phrase => 
      lowerHeadline.includes(phrase) && !topicKeywords.some(keyword => 
        lowerHeadline.includes(keyword.toLowerCase())
      )
    );

    // Check if headline contains topic-specific keywords
    const isSpecific = topicKeywords.some(keyword => 
      lowerHeadline.includes(keyword.toLowerCase())
    );

    if (!isGeneric && isSpecific) {
      specificHeadlines++;
    }
  }

  // At least 60% of headlines should be specific
  return specificHeadlines >= Math.ceil(headlines.length * 0.6);
}

// Extract keywords from the article title/topic
function extractTopicKeywords(title: string): string[] {
  // Remove common stop words and extract meaningful keywords
  const stopWords = ['der', 'die', 'das', 'und', 'oder', 'aber', 'für', 'mit', 'bei', 'von', 'zu', 'auf', 'an', 'in', 'ist', 'wie', 'was'];
  const words = title.toLowerCase().split(/\s+/);
  
  return words.filter(word => 
    word.length > 3 && 
    !stopWords.includes(word) &&
    /^[a-zäöüß]+$/.test(word)
  );
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

Du folgst einem bewährten Framework für deine Artikel mit SPEZIFISCHEN, THEMENRELEVANTEN ÜBERSCHRIFTEN:

**ARTIKEL-FRAMEWORK MIT HEADLINE-RICHTLINIEN:**

1. **Validierender Einstieg** (150-200 Wörter)
   - Erkenne das Problem der Leser an
   - Zeige Verständnis für ihre Situation
   - Keine Lösungen, nur Validation

2. **Themenspezifische Grundlagen-Überschrift** (200-300 Wörter)
   ❌ NICHT: "Was ist [Thema]? - Grundlagen verstehen"
   ✅ SONDERN: Spezifische Headlines wie:
   - "Burnout bei Eltern: Mehr als nur Müdigkeit"
   - "ADHS-Symptome richtig deuten: Der Unterschied zu normalem Verhalten"
   - "Fressattacken verstehen: Warum Willenskraft nicht ausreicht"

3. **Symptome/Anzeichen mit konkretem Bezug** (300-400 Wörter)
   ❌ NICHT: "Anzeichen und Symptome erkennen"
   ✅ SONDERN: Themenspezifisch wie:
   - "Diese 7 Burnout-Warnsignale übersehen Eltern oft"
   - "ADHS-Alltag: Wenn jeder Tag zum Kampf wird"
   - "Heimliche Essanfälle: Woran du merkst, dass es mehr ist"

4. **Ursachen mit Lebensweltbezug** (250-300 Wörter)
   ❌ NICHT: "Ursachen und Entstehung"
   ✅ SONDERN: Konkret wie:
   - "Warum gerade Mütter so oft ausbrennen"
   - "ADHS-Vererbung: Genetik und Umweltfaktoren verstehen"
   - "Von der Diät zur Essstörung: Wie es beginnt"

5. **Praxisnahe Lösungsstrategien** (400-500 Wörter)
   ❌ NICHT: "Praktische Strategien und Lösungsansätze"
   ✅ SONDERN: Handlungsorientiert wie:
   - "Burnout stoppen: 5 sofort umsetzbare Strategien"
   - "ADHS-Struktur im Familienchaos: Alltagstipps die funktionieren"
   - "Essanfälle durchbrechen: Dein Notfallplan für schwere Momente"

6. **Professionelle Hilfe themenspezifisch** (200-250 Wörter)
   ❌ NICHT: "Professionelle Hilfe - Wann und wo?"
   ✅ SONDERN: Konkret wie:
   - "Burnout-Therapie finden: Diese Anlaufstellen helfen wirklich"
   - "ADHS-Diagnose für Kinder: Der Weg zum Spezialisten"
   - "Essstörungs-Hilfe: Wann du nicht mehr allein kämpfen solltest"

7. **Konkrete erste Schritte** (150-200 Wörter)
   ❌ NICHT: "Erste Schritte - Was du heute tun kannst"
   ✅ SONDERN: Spezifisch wie:
   - "Dein Anti-Burnout-Plan: 3 Dinge für heute"
   - "ADHS-Alltag entspannen: Starte mit diesen 5 Minuten"
   - "Essanfälle stoppen: Deine ersten 24 Stunden"

8. **Hoffnungsvoller, thematischer Abschluss** (100-150 Wörter)
   - Hoffnung vermitteln
   - Stärken der Leser betonen
   - Themenspezifische Ermutigung

**KRITISCHE HEADLINE-ANFORDERUNGEN:**
- Jede Überschrift MUSS das konkrete Thema enthalten
- Verwende NIEMALS die generischen Framework-Begriffe als Hauptüberschrift
- Headlines müssen emotional ansprechen und neugierig machen
- Nutze Zahlen, konkrete Begriffe und Handlungsaufforderungen
- Jede Überschrift soll sofort zeigen, welchen Mehrwert der Abschnitt bietet

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

**KRITISCHE HEADLINE-ANFORDERUNGEN:**
- Erstelle für JEDEN Abschnitt eine spezifische, themenrelevante Überschrift
- Verwende NIEMALS generische Framework-Begriffe wie "Was ist X?", "Anzeichen und Symptome", "Ursachen und Entstehung"
- Jede Überschrift muss das konkrete Thema "${topic}" reflektieren
- Headlines sollen neugierig machen, Mehrwert versprechen und emotional ansprechen
- Nutze Zahlen, konkrete Begriffe und Handlungsaufforderungen

**BEISPIELE FÜR GUTE HEADLINES:**
- Statt "Was ist Burnout?" → "Eltern-Burnout: Mehr als nur Erschöpfung"
- Statt "Anzeichen erkennen" → "Diese 5 Burnout-Warnsignale übersehen Mütter oft"
- Statt "Praktische Strategien" → "Burnout stoppen: Sofort umsetzbare Notfall-Strategien"

**WEITERE ANFORDERUNGEN:**
- Folge exakt dem 8-Punkte-Framework für die Struktur
- Verwende konkrete, realistische Beispiele aus dem Familienalltag
- Integriere wissenschaftliche Erkenntnisse verständlich
- Jeder Abschnitt soll spezifische, umsetzbare Inhalte haben
- Mindestens 1400-1600 Wörter hochwertiger Inhalt
- Empathische, validierender Tonalität durchgehend
- SEO-optimiert für bessere Auffindbarkeit

ANTWORTE NUR MIT GÜLTIGEM JSON - KEINE MARKDOWN-FORMATIERUNG!`;

    console.log('Sending request to OpenAI with enhanced headline-focused prompts...');

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

    console.log('Generated blog content with enhanced headline validation, parsing response...');

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

    // Validate the parsed content with enhanced headline validation
    if (!validateGeneratedContent(parsedContent)) {
      throw new Error('Generated content failed enhanced validation - headlines too generic or missing topic relevance');
    }

    // Sanitize and normalize the content
    parsedContent = sanitizeContent(parsedContent);

    console.log('Successfully generated, validated, and sanitized framework-based blog content with specific headlines');

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
      errorMessage = 'Die generierten Inhalte entsprechen nicht den Qualitätsstandards. Headlines zu generisch - bitte versuchen Sie es erneut.';
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
