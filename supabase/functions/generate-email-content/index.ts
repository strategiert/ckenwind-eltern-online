import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Gemini 3 Flash für E-Mails - schnell und professionell
const GEMINI_MODEL = 'gemini-3-flash-preview';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

interface EmailRequest {
  action: 'newsletter' | 'welcome' | 'confirmation' | 'reminder' | 'personalized';
  subject?: string;
  recipientName?: string;
  context?: string;
  bulletPoints?: string[];
  tone?: 'warm' | 'professionell' | 'motivierend' | 'informativ';
  callToAction?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: EmailRequest = await req.json();
    const { action, subject, recipientName, context, bulletPoints, tone = 'warm', callToAction } = request;

    const systemContext = `Du bist der E-Mail-Kommunikationsexperte für "Rückenwind Eltern".

Markenidentität:
- Plattform für Eltern in belastenden Situationen
- Unterstützend, empathisch, professionell
- Deutsche Sprache, Du-Form für Newsletter, Sie-Form für formelle E-Mails

E-Mail-Richtlinien:
- Kurz und prägnant
- Persönlich und einladend
- Klarer Call-to-Action
- Mobile-optimiert (kurze Absätze)
- Kein aufdringlicher Verkaufston

Signatur:
Herzliche Grüße,
Dein Rückenwind Eltern Team

Absender: team@rueckenwind-eltern.de`;

    let prompt = '';

    switch (action) {
      case 'newsletter':
        prompt = `Erstelle einen Newsletter für "Rückenwind Eltern":

Thema/Betreff: ${subject || 'Monatlicher Newsletter'}
${context ? `Kontext: ${context}` : ''}
${bulletPoints?.length ? `Themen:\n${bulletPoints.map(p => `- ${p}`).join('\n')}` : ''}
Ton: ${tone}
${callToAction ? `Call-to-Action: ${callToAction}` : ''}

Struktur:
1. Persönliche Anrede
2. Einleitender Absatz (emotional, ansprechend)
3. Hauptinhalt (2-3 kurze Abschnitte)
4. Klarer Call-to-Action Button-Text
5. Verabschiedung

Formatiere mit einfachem HTML für E-Mail:
- <h1> für Hauptüberschrift
- <h2> für Abschnittsüberschriften
- <p> für Absätze
- <a href="#CTA"> für Links
- <strong> für Betonungen`;
        break;

      case 'welcome':
        prompt = `Erstelle eine Willkommens-E-Mail für einen neuen Abonnenten:

${recipientName ? `Name: ${recipientName}` : 'Generische Anrede'}
${context ? `Kontext: ${context}` : 'Neuer Newsletter-Abonnent'}

Die E-Mail soll:
1. Herzlich willkommen heißen
2. Kurz erklären, was Rückenwind Eltern bietet
3. Erste nützliche Ressourcen verlinken
4. Zur Community einladen
5. Nächste Schritte aufzeigen

Ton: Warm, einladend, nicht überwältigend
Format: Einfaches HTML für E-Mail`;
        break;

      case 'confirmation':
        prompt = `Erstelle eine Bestätigungs-E-Mail:

Anlass: ${context || 'Newsletter-Anmeldung'}
${recipientName ? `Name: ${recipientName}` : ''}

Die E-Mail soll:
1. Den Vorgang bestätigen
2. Kurz und klar sein
3. Nächste Schritte erklären
4. Vertrauen aufbauen
5. Kontaktmöglichkeit bieten

Format: Einfaches HTML, sehr kurz gehalten`;
        break;

      case 'reminder':
        prompt = `Erstelle eine freundliche Erinnerungs-E-Mail:

Anlass: ${context || 'Allgemeine Erinnerung'}
${recipientName ? `Name: ${recipientName}` : ''}
${callToAction ? `Gewünschte Aktion: ${callToAction}` : ''}

Die E-Mail soll:
1. Freundlich erinnern, nicht drängend
2. Den Mehrwert betonen
3. Einfache Handlungsmöglichkeit bieten
4. Verständnis zeigen für Zeitmangel

Ton: Verständnisvoll, nicht aufdringlich
Format: Kurzes HTML`;
        break;

      case 'personalized':
        prompt = `Erstelle eine personalisierte E-Mail:

${recipientName ? `Empfänger: ${recipientName}` : ''}
Betreff: ${subject}
Kontext: ${context}
${bulletPoints?.length ? `Punkte ansprechen:\n${bulletPoints.map(p => `- ${p}`).join('\n')}` : ''}
Ton: ${tone}
${callToAction ? `Call-to-Action: ${callToAction}` : ''}

Erstelle eine authentische, personalisierte E-Mail im Namen von Rückenwind Eltern.
Format: Einfaches HTML`;
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
            { role: 'model', parts: [{ text: 'Verstanden. Ich erstelle professionelle, warme E-Mails für Rückenwind Eltern.' }] },
            { role: 'user', parts: [{ text: prompt }] }
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 1500,
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
      || 'E-Mail konnte nicht generiert werden.';

    // Extrahiere Betreffzeile falls vorhanden
    let extractedSubject = subject;
    const subjectMatch = generatedContent.match(/Betreff:\s*(.+?)(?:\n|<)/i);
    if (subjectMatch) {
      extractedSubject = subjectMatch[1].trim();
    }

    return new Response(JSON.stringify({
      success: true,
      action,
      result: {
        subject: extractedSubject,
        htmlContent: generatedContent,
        plainText: generatedContent.replace(/<[^>]*>/g, '').trim()
      },
      model: GEMINI_MODEL
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in generate-email-content:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
