import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface SchedulerConfig {
  itemsPerRun?: number;
  minQueueSize?: number;
  suggestionsPerFill?: number;
  dryRun?: boolean;
}

/**
 * Content Scheduler - Wird periodisch via Cron aufgerufen
 *
 * Workflow:
 * 1. Prüft ob Queue genug Items hat
 * 2. Füllt Queue mit neuen Topics wenn nötig
 * 3. Verarbeitet pending Items
 * 4. Loggt Statistiken
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    let config: SchedulerConfig = {
      itemsPerRun: 3,
      minQueueSize: 10,
      suggestionsPerFill: 10,
      dryRun: false
    };

    // Config aus Request überschreiben wenn vorhanden
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        config = { ...config, ...body };
      } catch {
        // Kein JSON Body - defaults verwenden
      }
    }

    const { itemsPerRun, minQueueSize, suggestionsPerFill, dryRun } = config;

    const result = {
      timestamp: new Date().toISOString(),
      dryRun,
      steps: [] as any[],
      stats: null as any,
      duration_ms: 0
    };

    // Step 1: Queue-Status prüfen
    const { count: pendingCount } = await supabase
      .from('content_queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    result.steps.push({
      step: 'check_queue',
      pendingItems: pendingCount || 0,
      minRequired: minQueueSize
    });

    // Step 2: Queue auffüllen wenn nötig
    if ((pendingCount || 0) < minQueueSize! && !dryRun) {
      const fillResult = await fillQueue(suggestionsPerFill!);
      result.steps.push({
        step: 'fill_queue',
        ...fillResult
      });
    } else if ((pendingCount || 0) < minQueueSize!) {
      result.steps.push({
        step: 'fill_queue',
        skipped: true,
        reason: 'dry_run'
      });
    }

    // Step 3: Items verarbeiten
    if (!dryRun) {
      const processResult = await processItems(itemsPerRun!);
      result.steps.push({
        step: 'process_items',
        ...processResult
      });
    } else {
      result.steps.push({
        step: 'process_items',
        skipped: true,
        reason: 'dry_run',
        wouldProcess: Math.min(pendingCount || 0, itemsPerRun!)
      });
    }

    // Step 4: Statistiken sammeln
    const stats = await getStats();
    result.stats = stats;

    // Step 5: Log schreiben
    if (!dryRun) {
      await supabase.from('content_generation_log').insert({
        action: 'scheduler_run',
        success: true,
        duration_ms: Date.now() - startTime
      });
    }

    result.duration_ms = Date.now() - startTime;

    return new Response(JSON.stringify({
      success: true,
      result
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in content-scheduler:', error);

    // Error loggen
    await supabase.from('content_generation_log').insert({
      action: 'scheduler_run',
      success: false,
      error_details: error.message,
      duration_ms: Date.now() - startTime
    });

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
 * Füllt die Queue mit neuen Topics
 */
async function fillQueue(count: number): Promise<{
  suggestionsUsed: number;
  newSuggestionsGenerated: number;
  itemsAdded: number;
}> {
  // Hole ungenutzte Vorschläge
  let { data: suggestions } = await supabase
    .from('topic_suggestions')
    .select('*')
    .eq('used', false)
    .order('relevance_score', { ascending: false })
    .limit(count);

  let newSuggestionsGenerated = 0;

  // Wenn nicht genug Vorschläge, generiere neue via Gemini
  if (!suggestions || suggestions.length < count) {
    // Rufe topic-generator auf
    const response = await fetch(`${supabaseUrl}/functions/v1/topic-generator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({
        action: 'bulk-suggest',
        count: count * 2 // Mehr generieren für Buffer
      })
    });

    if (response.ok) {
      const result = await response.json();
      newSuggestionsGenerated = result.result?.added || 0;
    }

    // Erneut laden
    const refreshed = await supabase
      .from('topic_suggestions')
      .select('*')
      .eq('used', false)
      .order('relevance_score', { ascending: false })
      .limit(count);

    suggestions = refreshed.data;
  }

  if (!suggestions || suggestions.length === 0) {
    return { suggestionsUsed: 0, newSuggestionsGenerated, itemsAdded: 0 };
  }

  // Zur Queue hinzufügen
  const queueItems = suggestions.map(s => ({
    content_type: 'glossary' as const,
    topic: s.topic,
    category: s.category,
    priority: Math.round((s.relevance_score || 0.5) * 10),
    auto_publish: true
  }));

  await supabase.from('content_queue').insert(queueItems);

  // Als verwendet markieren
  await supabase
    .from('topic_suggestions')
    .update({ used: true })
    .in('id', suggestions.map(s => s.id));

  return {
    suggestionsUsed: suggestions.length,
    newSuggestionsGenerated,
    itemsAdded: queueItems.length
  };
}

/**
 * Verarbeitet Items aus der Queue
 */
async function processItems(limit: number): Promise<{
  processed: number;
  successful: number;
  failed: number;
  items: any[];
}> {
  const items: any[] = [];
  let successful = 0;
  let failed = 0;

  for (let i = 0; i < limit; i++) {
    // Hole nächstes Item
    const { data: item, error } = await supabase.rpc('get_next_queue_item');

    if (error || !item || !item.id) {
      break; // Keine weiteren Items
    }

    try {
      // Rufe content-orchestrator auf
      const response = await fetch(`${supabaseUrl}/functions/v1/content-orchestrator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({
          action: 'generate-single',
          topic: item.topic,
          category: item.category,
          contentType: item.content_type,
          autoPublish: item.auto_publish
        })
      });

      const result = await response.json();

      if (result.success) {
        // Markiere als completed
        await supabase
          .from('content_queue')
          .update({
            status: 'completed',
            generated_content: result.result?.content,
            processed_at: new Date().toISOString(),
            published_at: item.auto_publish ? new Date().toISOString() : null
          })
          .eq('id', item.id);

        successful++;
        items.push({ id: item.id, topic: item.topic, success: true });
      } else {
        throw new Error(result.error || 'Unbekannter Fehler');
      }

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

      failed++;
      items.push({ id: item.id, topic: item.topic, success: false, error: err.message });
    }
  }

  return {
    processed: items.length,
    successful,
    failed,
    items
  };
}

/**
 * Sammelt Statistiken
 */
async function getStats(): Promise<any> {
  // Queue-Status
  const { data: queueStats } = await supabase
    .from('content_queue')
    .select('status')
    .then(res => ({
      data: res.data?.reduce((acc: any, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {})
    }));

  // Suggestions-Status
  const { count: unusedSuggestions } = await supabase
    .from('topic_suggestions')
    .select('*', { count: 'exact', head: true })
    .eq('used', false);

  // Glossar-Count
  const { count: glossaryCount } = await supabase
    .from('glossary_terms')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  // Blog-Count
  const { count: blogCount } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true);

  // Letzte 7 Tage Generierungen
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: recentLogs } = await supabase
    .from('content_generation_log')
    .select('success, created_at')
    .gte('created_at', sevenDaysAgo.toISOString())
    .neq('action', 'scheduler_run');

  const last7Days = {
    total: recentLogs?.length || 0,
    successful: recentLogs?.filter(l => l.success).length || 0,
    failed: recentLogs?.filter(l => !l.success).length || 0
  };

  return {
    queue: queueStats || {},
    unusedSuggestions: unusedSuggestions || 0,
    publishedContent: {
      glossary: glossaryCount || 0,
      blog: blogCount || 0
    },
    last7Days
  };
}
