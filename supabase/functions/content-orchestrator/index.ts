import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  createInternalLinks,
  findRelatedTermsByTags,
  generateSlug,
  validateGlossaryEntry,
  generateMetaDescription,
} from "../_shared/linking-utils.ts";

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

interface OrchestratorRequest {
  action: 'process-queue' | 'generate-single' | 'retry-failed' | 'link-terms';
  queueId?: string;
  topic?: string;
  category?: string;
  contentType?: 'glossary' | 'blog';
  autoPublish?: boolean;
  limit?: number;
}

interface QueueItem {
  id: string;
  content_type: 'glossary' | 'blog';
  topic: string;
  category: string | null;
  keywords: string[] | null;
  priority: number;
  auto_publish: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const request: OrchestratorRequest = await req.json();
    const { action, queueId, topic, category, contentType = 'glossary', autoPublish = true, limit = 5 } = request;

    let result: any;

    switch (action) {
      case 'process-queue':
        result = await processQueue(limit);
        break;

      case 'generate-single':
        if (!topic) throw new Error('Topic erforderlich');
        result = await generateAndSave(topic, contentType, category, autoPublish);
        break;

      case 'retry-failed':
        result = await retryFailed(limit);
        break;

      case 'link-terms':
        result = await linkAllTerms();
        break;

      default:
        throw new Error(`Unbekannte Aktion: ${action}`);
    }

    const duration = Date.now() - startTime;

    return new Response(JSON.stringify({
      success: true,
      action,
      result,
      duration_ms: duration
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in content-orchestrator:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Verarbeitet Items aus der Queue
 */
async function processQueue(limit: number): Promise<{ processed: number; results: any[] }> {
  const results: any[] = [];

  for (let i = 0; i < limit; i++) {
    // Hole nächstes Item aus Queue
    const { data: item, error } = await supabase.rpc('get_next_queue_item');

    if (error || !item || !item.id) {
      break; // Keine weiteren Items
    }

    try {
      const result = await processQueueItem(item as QueueItem);
      results.push({ id: item.id, success: true, ...result });
    } catch (err: any) {
      // Markiere als failed
      await supabase
        .from('content_queue')
        .update({
          status: 'failed',
          error_message: err.message,
          processed_at: new Date().toISOString()
        })
        .eq('id', item.id);

      results.push({ id: item.id, success: false, error: err.message });
    }
  }

  return { processed: results.length, results };
}

/**
 * Verarbeitet ein einzelnes Queue-Item
 */
async function processQueueItem(item: QueueItem): Promise<any> {
  const startTime = Date.now();

  if (item.content_type === 'glossary') {
    const result = await generateAndSaveGlossary(item.topic, item.category, item.auto_publish);

    // Update Queue
    await supabase
      .from('content_queue')
      .update({
        status: 'completed',
        generated_content: result.content,
        processed_at: new Date().toISOString(),
        published_at: item.auto_publish ? new Date().toISOString() : null
      })
      .eq('id', item.id);

    // Log
    await logGeneration(item.id, 'glossary_generate', GEMINI_MODEL, result.tokens, Date.now() - startTime, true);

    return result;
  } else {
    const result = await generateAndSaveBlog(item.topic, item.category, item.keywords || [], item.auto_publish);

    await supabase
      .from('content_queue')
      .update({
        status: 'completed',
        generated_content: result.content,
        processed_at: new Date().toISOString(),
        published_at: item.auto_publish ? new Date().toISOString() : null
      })
      .eq('id', item.id);

    await logGeneration(item.id, 'blog_generate', GEMINI_MODEL, result.tokens, Date.now() - startTime, true);

    return result;
  }
}

/**
 * Generiert und speichert einen Glossar-Eintrag
 */
async function generateAndSaveGlossary(
  topic: string,
  category: string | null,
  autoPublish: boolean
): Promise<{ termId: string; content: any; tokens: number }> {
  // Generiere Content via Gemini
  const systemContext = `Du bist ein Fachexperte für Psychologie und Elternberatung bei "Rückenwind Eltern".

Deine Aufgaben:
- Erstelle präzise, wissenschaftlich fundierte Definitionen
- Erkläre Fachbegriffe verständlich für Laien
- Fokus auf psychische Gesundheit, Elternschaft, Kindererziehung
- Deutsche Sprache, professioneller aber zugänglicher Stil
- Vermeide Stigmatisierung
- Referenziere relevante Forschung wenn passend

Themengebiete: Burnout, ADHS, Essstörungen, Angststörungen, Depression, Stressmanagement, Achtsamkeit, Entwicklungspsychologie, Bindungstheorie`;

  const prompt = `Erstelle einen vollständigen Glossar-Eintrag für den Begriff: "${topic}"

${category ? `Kategorie: ${category}` : ''}

Erstelle im JSON-Format:
{
  "term": "${topic}",
  "definition": "Kurze Definition (1-2 Sätze, max. 200 Zeichen)",
  "teaser": "Erweiterter Teaser (2-3 Sätze)",
  "alias": "Alternative Bezeichnung falls vorhanden oder null",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "sections": [
    {
      "title": "Was ist ${topic}?",
      "content": "Ausführliche Erklärung (2-3 Absätze)"
    },
    {
      "title": "${topic} im Kontext von Elternschaft",
      "content": "Relevanz für Eltern (1-2 Absätze)"
    },
    {
      "title": "Hilfreiche Strategien",
      "content": "Praktische Tipps (Aufzählung oder Absätze)"
    }
  ],
  "literaryDevice": {
    "title": "Metapher/Erklärungsbild",
    "content": "Anschauliche Metapher zur Erklärung"
  },
  "references": [
    "Autor (Jahr). Titel. Verlag.",
    "Weitere Referenz"
  ],
  "relatedTermSuggestions": ["verwandter-begriff-1", "verwandter-begriff-2"]
}

Nur das JSON ausgeben, keine weitere Erklärung.`;

  const response = await fetch(
    `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemContext }] },
          { role: 'model', parts: [{ text: 'Verstanden. Ich erstelle präzise und verständliche Glossar-Einträge für Rückenwind Eltern.' }] },
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          topP: 0.85,
          topK: 30,
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
  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const tokenCount = data.usageMetadata?.totalTokenCount || 0;

  // Parse JSON
  const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Kein gültiges JSON in Antwort');
  }

  const content = JSON.parse(jsonMatch[0]);

  // Validiere
  const validation = validateGlossaryEntry(content);
  if (!validation.valid) {
    throw new Error(`Ungültiger Eintrag: ${validation.errors.join(', ')}`);
  }

  // Lade alle existierenden Begriffe für Verlinkung
  const { data: allTerms } = await supabase
    .from('glossary_terms')
    .select('term, slug, alias')
    .eq('is_published', true);

  // Slug generieren
  const slug = generateSlug(content.term);

  // Prüfe ob Begriff bereits existiert
  const { data: existing } = await supabase
    .from('glossary_terms')
    .select('id')
    .eq('slug', slug)
    .single();

  if (existing) {
    throw new Error(`Begriff "${content.term}" existiert bereits`);
  }

  // Kategorie-ID finden
  let categoryId = null;
  if (category) {
    const { data: cat } = await supabase
      .from('wiki_categories')
      .select('id')
      .eq('slug', category)
      .single();
    categoryId = cat?.id;
  }

  // In DB speichern - Haupteintrag
  const { data: termData, error: termError } = await supabase
    .from('glossary_terms')
    .insert({
      term: content.term,
      slug: slug,
      definition: content.definition,
      teaser: content.teaser,
      alias: content.alias,
      tags: content.tags,
      category_id: categoryId,
      meta_title: `${content.term} - Rückenwind Eltern Glossar`,
      meta_description: generateMetaDescription(content.definition),
      is_published: autoPublish,
    })
    .select()
    .single();

  if (termError) throw termError;

  // Sektionen speichern
  const sections = [
    ...content.sections.map((s: any, i: number) => ({
      term_id: termData.id,
      title: s.title,
      content: createInternalLinks(s.content, allTerms || []),
      section_type: 'content',
      sort_order: i
    })),
  ];

  // Literary Device als eigene Sektion
  if (content.literaryDevice) {
    sections.push({
      term_id: termData.id,
      title: content.literaryDevice.title,
      content: content.literaryDevice.content,
      section_type: 'literary_device',
      sort_order: sections.length
    });
  }

  await supabase.from('glossary_sections').insert(sections);

  // Referenzen speichern
  if (content.references && content.references.length > 0) {
    const refs = content.references.map((ref: string, i: number) => ({
      term_id: termData.id,
      reference_text: ref,
      sort_order: i
    }));
    await supabase.from('glossary_references').insert(refs);
  }

  // Verwandte Begriffe als Topic-Vorschläge speichern
  if (content.relatedTermSuggestions && content.relatedTermSuggestions.length > 0) {
    const suggestions = content.relatedTermSuggestions.map((topic: string) => ({
      topic: topic,
      category: category,
      relevance_score: 0.75,
      source: 'ai_suggested'
    }));

    await supabase.from('topic_suggestions').insert(suggestions);
  }

  return {
    termId: termData.id,
    content,
    tokens: tokenCount
  };
}

/**
 * Generiert und speichert einen Blog-Artikel
 */
async function generateAndSaveBlog(
  topic: string,
  category: string | null,
  keywords: string[],
  autoPublish: boolean
): Promise<{ postId: string; content: any; tokens: number }> {
  const systemContext = `Du bist ein erfahrener Content-Writer für "Rückenwind Eltern", eine deutsche Plattform für Eltern in belastenden Situationen.

Deine Aufgaben:
- Schreibe empathisch, professionell und hilfreich
- Verwende deutsche Sprache mit korrekter Grammatik
- Zielgruppe sind Eltern, die nach Unterstützung suchen
- Integriere psychologische Erkenntnisse verständlich
- Vermeide Stigmatisierung
- SEO-optimiert aber natürlich lesbar

Kategorien: Eltern-Burnout, ADHS bei Kindern, Essstörungen, Stressmanagement, Achtsamkeit, Work-Life-Balance`;

  const prompt = `Schreibe einen vollständigen Blog-Artikel zum Thema: "${topic}"

Kategorie: ${category || 'Allgemein'}
${keywords.length > 0 ? `Keywords einbauen: ${keywords.join(', ')}` : ''}

Struktur:
1. Einleitender Hook (emotional ansprechend)
2. Problemdarstellung (empathisch)
3. Hauptteil mit praktischen Tipps/Informationen
4. Wissenschaftliche Fundierung (wo passend)
5. Fazit mit Handlungsaufforderung

Erstelle das Ergebnis im JSON-Format:
{
  "title": "Aussagekräftiger Titel",
  "slug": "url-freundlicher-slug",
  "excerpt": "Kurze Zusammenfassung (2-3 Sätze)",
  "content": "Vollständiger Artikel in Markdown",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "meta_title": "SEO-Titel (max 60 Zeichen)",
  "meta_description": "SEO-Beschreibung (max 155 Zeichen)"
}

Nur das JSON ausgeben.`;

  const response = await fetch(
    `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemContext }] },
          { role: 'model', parts: [{ text: 'Verstanden. Ich erstelle hochwertige Blog-Artikel für Rückenwind Eltern.' }] },
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 4096,
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
  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const tokenCount = data.usageMetadata?.totalTokenCount || 0;

  const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Kein gültiges JSON in Antwort');
  }

  const content = JSON.parse(jsonMatch[0]);

  // Berechne Lesezeit
  const wordCount = content.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Lade Glossar-Begriffe für Verlinkung
  const { data: allTerms } = await supabase
    .from('glossary_terms')
    .select('term, slug, alias')
    .eq('is_published', true);

  // In DB speichern
  const { data: postData, error: postError } = await supabase
    .from('blog_posts')
    .insert({
      title: content.title,
      slug: content.slug || generateSlug(content.title),
      content: createInternalLinks(content.content, allTerms || []),
      excerpt: content.excerpt,
      category: category || 'allgemein',
      category_label: category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Allgemein',
      tags: content.tags,
      author: 'Rückenwind Eltern',
      reading_time: readingTime,
      meta_title: content.meta_title,
      meta_description: content.meta_description,
      published: autoPublish,
      published_at: autoPublish ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (postError) throw postError;

  return {
    postId: postData.id,
    content,
    tokens: tokenCount
  };
}

/**
 * Wrapper für generate-single
 */
async function generateAndSave(
  topic: string,
  contentType: 'glossary' | 'blog',
  category: string | null | undefined,
  autoPublish: boolean
): Promise<any> {
  if (contentType === 'glossary') {
    return generateAndSaveGlossary(topic, category || null, autoPublish);
  } else {
    return generateAndSaveBlog(topic, category || null, [], autoPublish);
  }
}

/**
 * Versucht fehlgeschlagene Items erneut
 */
async function retryFailed(limit: number): Promise<{ retried: number }> {
  const { data: failedItems } = await supabase
    .from('content_queue')
    .select('id')
    .eq('status', 'failed')
    .limit(limit);

  if (!failedItems || failedItems.length === 0) {
    return { retried: 0 };
  }

  // Setze Status zurück auf pending
  await supabase
    .from('content_queue')
    .update({ status: 'pending', error_message: null })
    .in('id', failedItems.map(i => i.id));

  return { retried: failedItems.length };
}

/**
 * Verlinkt alle Begriffe untereinander
 */
async function linkAllTerms(): Promise<{ linked: number }> {
  // Lade alle Begriffe
  const { data: terms } = await supabase
    .from('glossary_terms')
    .select('id, slug, tags')
    .eq('is_published', true);

  if (!terms || terms.length === 0) {
    return { linked: 0 };
  }

  let linkedCount = 0;

  for (const term of terms) {
    const relatedIds = findRelatedTermsByTags(
      term.tags || [],
      terms,
      term.id,
      5
    );

    for (const relatedId of relatedIds) {
      // Prüfe ob Beziehung bereits existiert
      const { data: existing } = await supabase
        .from('glossary_related_terms')
        .select('term_id')
        .eq('term_id', term.id)
        .eq('related_term_id', relatedId)
        .single();

      if (!existing) {
        await supabase
          .from('glossary_related_terms')
          .insert({ term_id: term.id, related_term_id: relatedId });
        linkedCount++;
      }
    }
  }

  return { linked: linkedCount };
}

/**
 * Loggt eine Generierungs-Aktivität
 */
async function logGeneration(
  queueId: string | null,
  action: string,
  model: string,
  tokens: number,
  duration: number,
  success: boolean,
  error?: string
): Promise<void> {
  await supabase.from('content_generation_log').insert({
    queue_id: queueId,
    action,
    model_used: model,
    tokens_used: tokens,
    duration_ms: duration,
    success,
    error_details: error
  });
}
