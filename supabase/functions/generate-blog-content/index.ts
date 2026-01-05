import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Gemini 3 Flash für Blog-Content - kreativ und schnell
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

interface BlogRequest {
  action: 'generate' | 'improve' | 'seo' | 'excerpt' | 'outline';
  topic?: string;
  content?: string;
  category?: string;
  keywords?: string[];
  tone?: 'informativ' | 'empathisch' | 'motivierend' | 'sachlich';
  targetLength?: 'kurz' | 'mittel' | 'lang';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: BlogRequest = await req.json();
    const { action, topic, content, category, keywords, tone = 'empathisch', targetLength = 'mittel' } = request;

    let prompt = '';
    let systemContext = `Du bist ein erfahrener Content-Writer für "Rückenwind Eltern", eine deutsche Plattform für Eltern in belastenden Situationen.

Deine Aufgaben:
- Schreibe empathisch, professionell und hilfreich
- Verwende deutsche Sprache mit korrekter Grammatik
- Zielgruppe sind Eltern, die nach Unterstützung suchen
- Integriere psychologische Erkenntnisse verständlich
- Vermeide Stigmatisierung
- SEO-optimiert aber natürlich lesbar

Kategorien: Eltern-Burnout, ADHS bei Kindern, Essstörungen, Stressmanagement, Achtsamkeit, Work-Life-Balance`;

    const lengthGuide = {
      kurz: '300-500 Wörter',
      mittel: '800-1200 Wörter',
      lang: '1500-2500 Wörter'
    };

    switch (action) {
      case 'generate':
        prompt = `Schreibe einen vollständigen Blog-Artikel zum Thema: "${topic}"

Kategorie: ${category || 'Allgemein'}
Ton: ${tone}
Länge: ${lengthGuide[targetLength]}
${keywords?.length ? `Keywords einbauen: ${keywords.join(', ')}` : ''}

Struktur:
1. Einleitender Hook (emotional ansprechend)
2. Problemdarstellung (empathisch)
3. Hauptteil mit praktischen Tipps/Informationen
4. Wissenschaftliche Fundierung (wo passend)
5. Fazit mit Handlungsaufforderung

Formatiere mit Markdown (# für Überschriften, ** für Fett, etc.)`;
        break;

      case 'improve':
        prompt = `Verbessere folgenden Blog-Text für "Rückenwind Eltern":

${content}

Optimiere:
1. Lesefluss und Struktur
2. Emotionale Ansprache
3. Klarheit und Verständlichkeit
4. SEO (natürlich integriert)
5. Call-to-Action am Ende

Behalte den Kern der Aussage bei, aber mache den Text professioneller und ansprechender.`;
        break;

      case 'seo':
        prompt = `Erstelle SEO-Metadaten für folgenden Blog-Artikel:

${content?.substring(0, 2000)}...

Erstelle:
1. meta_title (max. 60 Zeichen, mit Hauptkeyword)
2. meta_description (max. 155 Zeichen, überzeugend)
3. 5-7 relevante Tags
4. URL-Slug Vorschlag
5. 3 alternative Überschriften

Formatiere als JSON:
{
  "meta_title": "...",
  "meta_description": "...",
  "tags": ["...", "..."],
  "slug": "...",
  "alternative_headlines": ["...", "...", "..."]
}`;
        break;

      case 'excerpt':
        prompt = `Erstelle einen überzeugenden Teaser/Excerpt für folgenden Artikel:

${content?.substring(0, 1500)}...

Der Teaser soll:
- 2-3 Sätze lang sein (max. 200 Zeichen)
- Neugier wecken
- Das Hauptthema andeuten
- Zum Weiterlesen animieren

Nur den Teaser-Text ausgeben, keine Erklärung.`;
        break;

      case 'outline':
        prompt = `Erstelle eine detaillierte Gliederung für einen Blog-Artikel zum Thema: "${topic}"

Kategorie: ${category || 'Allgemein'}
Zielgruppe: Deutsche Eltern in belastenden Situationen
Länge: ${lengthGuide[targetLength]}

Erstelle:
1. Arbeitstitel
2. Einleitung (Kernaussage)
3. 4-6 Hauptabschnitte mit Unterpunkten
4. Fazit/Call-to-Action
5. Mögliche interne Verlinkungen

Formatiere übersichtlich mit Markdown.`;
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
            { role: 'model', parts: [{ text: 'Verstanden. Ich bin bereit, hochwertigen Content für Rückenwind Eltern zu erstellen.' }] },
            { role: 'user', parts: [{ text: prompt }] }
          ],
          generationConfig: {
            temperature: action === 'seo' ? 0.3 : 0.8,
            maxOutputTokens: action === 'generate' ? 4096 : 2048,
            topP: 0.95,
            topK: 50,
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
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Content konnte nicht generiert werden.';

    // Bei SEO-Aktion versuchen wir JSON zu parsen
    let result: any = { content: generatedContent };
    if (action === 'seo') {
      try {
        const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = { ...result, seoData: JSON.parse(jsonMatch[0]) };
        }
      } catch (e) {
        console.log('Could not parse SEO JSON');
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
    console.error('Error in generate-blog-content:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
