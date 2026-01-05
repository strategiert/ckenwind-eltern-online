/**
 * Zentrale Gemini API Konfiguration
 *
 * Modell-Übersicht (Stand: Januar 2026):
 *
 * GEMINI 3 (Neueste Generation):
 * - gemini-3-pro-preview: Bestes Modell für komplexe Aufgaben, multimodales Verständnis
 * - gemini-3-flash-preview: Ausgewogen - schnell, skalierbar, intelligent
 * - gemini-3-pro-image-preview: Bildgenerierung und -verarbeitung
 *
 * GEMINI 2.5 (Stabil):
 * - gemini-2.5-pro: State-of-the-Art Reasoning
 * - gemini-2.5-flash: Bestes Preis-Leistungs-Verhältnis
 * - gemini-2.5-flash-lite: Schnellstes, kosteneffizientestes Modell
 * - gemini-2.5-flash-image: Bildgenerierung
 */

// Gemini Modell-IDs
export const GEMINI_MODELS = {
  // Gemini 3 (Preview - Neueste)
  PRO_3: 'gemini-3-pro-preview',
  FLASH_3: 'gemini-3-flash-preview',
  IMAGE_3: 'gemini-3-pro-image-preview',

  // Gemini 2.5 (Stabil)
  PRO_25: 'gemini-2.5-pro',
  FLASH_25: 'gemini-2.5-flash',
  FLASH_LITE_25: 'gemini-2.5-flash-lite',
  IMAGE_25: 'gemini-2.5-flash-image',

  // Gemini 2.0 (Legacy)
  FLASH_20: 'gemini-2.0-flash',
} as const;

// Use-Case zu Modell Mapping
export const GEMINI_USE_CASES = {
  // Chatbot / Konversation - schnell, empathisch
  CHATBOT: GEMINI_MODELS.FLASH_3,

  // Glossar - Definitionen, Erklärungen
  GLOSSARY: GEMINI_MODELS.FLASH_3,

  // Blog-Content - kreativ, qualitativ
  BLOG_CONTENT: GEMINI_MODELS.FLASH_3,

  // E-Mails - schnell, professionell
  EMAIL: GEMINI_MODELS.FLASH_3,

  // Landingpage Content - überzeugend, hochwertig
  LANDING_PAGE: GEMINI_MODELS.PRO_3,

  // Coding / Technische Aufgaben - präzise
  CODING: GEMINI_MODELS.PRO_3,

  // Bildgenerierung
  IMAGE_GENERATION: GEMINI_MODELS.IMAGE_3,

  // Schnelle, einfache Aufgaben - kosteneffizient
  SIMPLE_TASKS: GEMINI_MODELS.FLASH_LITE_25,

  // Komplexe Analyse / Reasoning
  COMPLEX_ANALYSIS: GEMINI_MODELS.PRO_3,

  // SEO-Optimierung
  SEO: GEMINI_MODELS.FLASH_3,

  // Übersetzungen
  TRANSLATION: GEMINI_MODELS.FLASH_3,

  // Zusammenfassungen
  SUMMARIZATION: GEMINI_MODELS.FLASH_3,
} as const;

// API Base URL
export const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

// Standard Safety Settings für deutsche Eltern-Plattform
export const DEFAULT_SAFETY_SETTINGS = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_ONLY_HIGH', // Weniger strikt für Mental Health Themen
  },
];

// Lockerere Safety Settings für Mental Health Chat
export const MENTAL_HEALTH_SAFETY_SETTINGS = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_ONLY_HIGH',
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_ONLY_HIGH', // Wichtig: Nicht zu strikt für Krisenthemen
  },
];

// Generation Configs für verschiedene Use Cases
export const GENERATION_CONFIGS = {
  // Chatbot: Kreativ aber kontrolliert
  CHATBOT: {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 1024,
  },

  // Glossar: Präzise und faktisch
  GLOSSARY: {
    temperature: 0.3,
    topP: 0.85,
    topK: 30,
    maxOutputTokens: 2048,
  },

  // Blog: Kreativ und ausführlich
  BLOG: {
    temperature: 0.8,
    topP: 0.95,
    topK: 50,
    maxOutputTokens: 4096,
  },

  // E-Mail: Professionell und prägnant
  EMAIL: {
    temperature: 0.5,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 1024,
  },

  // Landingpage: Überzeugend und hochwertig
  LANDING_PAGE: {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
  },

  // Coding: Präzise und deterministisch
  CODING: {
    temperature: 0.2,
    topP: 0.8,
    topK: 20,
    maxOutputTokens: 4096,
  },

  // SEO: Ausgewogen
  SEO: {
    temperature: 0.5,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 1024,
  },
};

/**
 * Erstellt die vollständige API URL für ein Modell
 */
export function getGeminiUrl(model: string, apiKey: string): string {
  return `${GEMINI_API_BASE}/models/${model}:generateContent?key=${apiKey}`;
}

/**
 * Erstellt einen Standard-Request-Body für Gemini
 */
export function createGeminiRequest(
  contents: Array<{ role: string; parts: Array<{ text: string }> }>,
  config: typeof GENERATION_CONFIGS.CHATBOT = GENERATION_CONFIGS.CHATBOT,
  safetySettings = DEFAULT_SAFETY_SETTINGS
) {
  return {
    contents,
    generationConfig: config,
    safetySettings,
  };
}

/**
 * Extrahiert den Text aus einer Gemini Response
 */
export function extractGeminiResponse(data: any): string {
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Es konnte keine Antwort generiert werden.'
  );
}

/**
 * Konvertiert Chat-History in Gemini-Format
 */
export function convertToGeminiHistory(
  history: Array<{ role: string; content: string }>
): Array<{ role: string; parts: Array<{ text: string }> }> {
  return history.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));
}
