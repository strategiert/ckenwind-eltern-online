import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Gemini 3 Pro für Landingpages - höchste Qualität, überzeugend
const GEMINI_MODEL = 'gemini-3-pro-preview';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

interface LandingPageRequest {
  action: 'hero' | 'features' | 'testimonial' | 'cta' | 'faq' | 'full-section' | 'optimize';
  topic?: string;
  targetAudience?: string;
  currentContent?: string;
  tone?: 'überzeugend' | 'empathisch' | 'professionell' | 'inspirierend';
  context?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: LandingPageRequest = await req.json();
    const { action, topic, targetAudience, currentContent, tone = 'empathisch', context } = request;

    const systemContext = `Du bist ein Conversion-Spezialist für "Rückenwind Eltern", eine deutsche Plattform für Eltern in belastenden Situationen.

Markenidentität:
- Unterstützend, professionell, einfühlsam
- Spezialisiert auf: Eltern-Burnout, ADHS bei Kindern, Essstörungen, psychische Belastungen
- Zielgruppe: Deutsche Eltern, die nach Hilfe und Verständnis suchen

Copywriting-Prinzipien:
- Schmerz → Lösung → Transformation
- Emotionale Verbindung aufbauen
- Klare, überzeugende Headlines
- Scannable Content (kurze Absätze, Bullet Points)
- Vertrauen durch Expertise und Empathie
- Starke Call-to-Actions ohne Druck

Sprachstil:
- Deutsche Sprache, natürlich und warm
- Nicht zu verkäuferisch
- Validierend und hoffnungsvoll
- Fachlich kompetent aber verständlich`;

    let prompt = '';

    switch (action) {
      case 'hero':
        prompt = `Erstelle einen überzeugenden Hero-Section Content für:

Thema: ${topic || 'Hauptseite Rückenwind Eltern'}
Zielgruppe: ${targetAudience || 'Erschöpfte Eltern'}
Ton: ${tone}
${context ? `Kontext: ${context}` : ''}

Erstelle im JSON-Format:
{
  "headline": "Hauptüberschrift (max. 10 Wörter, emotional ansprechend)",
  "subheadline": "Unterstützende Aussage (1-2 Sätze)",
  "description": "Kurzer Absatz, der das Kernversprechen erklärt (2-3 Sätze)",
  "primaryCta": "Text für Haupt-Button (3-5 Wörter)",
  "secondaryCta": "Text für sekundären Link (optional)",
  "trustBadges": ["Vertrauenselement 1", "Vertrauenselement 2", "Vertrauenselement 3"]
}`;
        break;

      case 'features':
        prompt = `Erstelle überzeugende Feature-Beschreibungen für:

Thema: ${topic || 'Unsere Angebote'}
Zielgruppe: ${targetAudience || 'Eltern'}
${context ? `Features: ${context}` : ''}

Erstelle 4-6 Features im JSON-Format:
{
  "sectionTitle": "Überschrift für die Features-Sektion",
  "sectionSubtitle": "Kurze Einleitung",
  "features": [
    {
      "title": "Feature-Name",
      "description": "Beschreibung des Nutzens (2-3 Sätze, Fokus auf Transformation)",
      "icon": "Vorgeschlagenes Icon (z.B. 'heart', 'shield', 'users')"
    }
  ]
}`;
        break;

      case 'testimonial':
        prompt = `Erstelle authentisch klingende Testimonial-Vorlagen für:

Thema: ${topic || 'Allgemeine Erfahrungen'}
Zielgruppe: ${targetAudience || 'Eltern'}
${context ? `Kontext: ${context}` : ''}

WICHTIG: Diese sind Vorlagen/Beispiele, keine echten Testimonials.

Erstelle 3 Testimonial-Vorlagen im JSON-Format:
{
  "sectionTitle": "Was Eltern sagen",
  "testimonials": [
    {
      "quote": "Authentisches Zitat (2-4 Sätze, spezifische Transformation beschreiben)",
      "author": "Vorname (nur Vorname für Datenschutz)",
      "role": "z.B. 'Mutter von zwei Kindern'",
      "highlight": "Kurzer Highlight-Satz für visuelle Hervorhebung"
    }
  ]
}`;
        break;

      case 'cta':
        prompt = `Erstelle überzeugende Call-to-Action Elemente für:

Thema: ${topic || 'Allgemeiner CTA'}
Gewünschte Aktion: ${context || 'Kontakt aufnehmen'}
Zielgruppe: ${targetAudience || 'Eltern'}
Ton: ${tone}

Erstelle im JSON-Format:
{
  "headline": "Überschrift, die zum Handeln motiviert",
  "subtext": "Unterstützender Text (1-2 Sätze)",
  "primaryButton": "Haupt-CTA Text",
  "secondaryButton": "Alternativer CTA (optional)",
  "urgencyText": "Sanfter Anreiz ohne Druck (optional)",
  "trustText": "Vertrauensbildender Hinweis (z.B. 'Kostenlos und unverbindlich')"
}`;
        break;

      case 'faq':
        prompt = `Erstelle FAQ-Einträge für:

Thema: ${topic || 'Allgemeine Fragen'}
Zielgruppe: ${targetAudience || 'Interessierte Eltern'}
${context ? `Besondere Aspekte: ${context}` : ''}

Erstelle 5-7 FAQ-Einträge im JSON-Format:
{
  "sectionTitle": "Häufig gestellte Fragen",
  "faqs": [
    {
      "question": "Natürlich formulierte Frage",
      "answer": "Hilfreiche, einfühlsame Antwort (2-4 Sätze)"
    }
  ]
}`;
        break;

      case 'full-section':
        prompt = `Erstelle eine vollständige Landingpage-Sektion für:

Thema: ${topic}
Typ: ${context || 'Informative Sektion'}
Zielgruppe: ${targetAudience || 'Eltern'}
Ton: ${tone}

Erstelle im JSON-Format:
{
  "sectionType": "Typ der Sektion",
  "headline": "Hauptüberschrift",
  "subheadline": "Unterstützende Überschrift",
  "content": [
    {
      "type": "paragraph|list|quote|stats",
      "content": "Inhalt je nach Typ"
    }
  ],
  "cta": {
    "text": "CTA Text",
    "style": "primary|secondary"
  },
  "visualSuggestion": "Vorschlag für begleitendes Bild/Grafik"
}`;
        break;

      case 'optimize':
        prompt = `Optimiere folgenden Landingpage-Content für bessere Conversion:

Aktueller Content:
${currentContent}

Zielgruppe: ${targetAudience || 'Eltern'}
Ton: ${tone}

Analysiere und optimiere:
1. Headline-Stärke
2. Emotional ansprechend
3. Klarheit der Botschaft
4. Call-to-Action Effektivität
5. Scanbarkeit

Gib zurück:
{
  "analysis": {
    "strengths": ["Stärke 1", "Stärke 2"],
    "improvements": ["Verbesserung 1", "Verbesserung 2"]
  },
  "optimizedContent": "Verbesserter Content",
  "alternativeHeadlines": ["Alternative 1", "Alternative 2"],
  "conversionTips": ["Tipp 1", "Tipp 2"]
}`;
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
            { role: 'model', parts: [{ text: 'Verstanden. Ich erstelle hochkonvertierende Landingpage-Inhalte für Rückenwind Eltern mit Fokus auf Empathie und Professionalität.' }] },
            { role: 'user', parts: [{ text: prompt }] }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2500,
            topP: 0.9,
            topK: 40,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ]
        }),
      }
    );

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Content konnte nicht generiert werden.';

    // Versuche JSON zu parsen
    let result: any = { rawContent: generatedContent };
    try {
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = { ...result, data: JSON.parse(jsonMatch[0]) };
      }
    } catch (e) {
      console.log('Could not parse JSON response');
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
    console.error('Error in generate-landing-content:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
