import { supabase } from "@/integrations/supabase/client";

// Types
export interface QueueItem {
  id: string;
  content_type: 'glossary' | 'blog';
  topic: string;
  category: string | null;
  keywords: string[] | null;
  priority: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'review';
  generated_content: any;
  error_message: string | null;
  scheduled_for: string | null;
  processed_at: string | null;
  published_at: string | null;
  auto_publish: boolean;
  created_at: string;
}

export interface TopicSuggestion {
  id: string;
  topic: string;
  category: string | null;
  relevance_score: number | null;
  source: 'ai_suggested' | 'manual' | 'trending' | 'gap_analysis';
  used: boolean;
  created_at: string;
}

export interface WikiCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
  icon: string | null;
  created_at: string;
}

export interface GenerationLog {
  id: string;
  queue_id: string | null;
  action: string;
  model_used: string | null;
  tokens_used: number | null;
  duration_ms: number | null;
  success: boolean;
  error_details: string | null;
  created_at: string;
}

export interface ContentStats {
  total_generated: number;
  successful: number;
  failed: number;
  total_tokens: number;
  avg_duration_ms: number;
  glossary_count: number;
  blog_count: number;
}

// Service
export const contentAutomationService = {
  // ============================================================
  // QUEUE MANAGEMENT
  // ============================================================

  /**
   * Alle Queue-Items laden
   */
  async getQueueItems(status?: string): Promise<QueueItem[]> {
    let query = supabase
      .from('content_queue')
      .select('*')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as QueueItem[]) || [];
  },

  /**
   * Neues Item zur Queue hinzufügen
   */
  async addToQueue(item: {
    topic: string;
    content_type: 'glossary' | 'blog';
    category?: string;
    keywords?: string[];
    priority?: number;
    auto_publish?: boolean;
    scheduled_for?: string;
  }): Promise<QueueItem> {
    const { data, error } = await supabase
      .from('content_queue')
      .insert({
        topic: item.topic,
        content_type: item.content_type,
        category: item.category || null,
        keywords: item.keywords || null,
        priority: item.priority || 5,
        auto_publish: item.auto_publish ?? true,
        scheduled_for: item.scheduled_for || null,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data as QueueItem;
  },

  /**
   * Queue-Item aktualisieren
   */
  async updateQueueItem(id: string, updates: Partial<QueueItem>): Promise<void> {
    const { error } = await supabase
      .from('content_queue')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Queue-Item löschen
   */
  async deleteQueueItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('content_queue')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Fehlgeschlagene Items erneut versuchen
   */
  async retryFailed(ids?: string[]): Promise<number> {
    let query = supabase
      .from('content_queue')
      .update({ status: 'pending', error_message: null })
      .eq('status', 'failed');

    if (ids && ids.length > 0) {
      query = query.in('id', ids);
    }

    const { data, error } = await query.select();
    if (error) throw error;
    return data?.length || 0;
  },

  // ============================================================
  // TOPIC SUGGESTIONS
  // ============================================================

  /**
   * Topic-Vorschläge laden
   */
  async getTopicSuggestions(options?: {
    unused?: boolean;
    limit?: number;
  }): Promise<TopicSuggestion[]> {
    let query = supabase
      .from('topic_suggestions')
      .select('*')
      .order('relevance_score', { ascending: false });

    if (options?.unused !== undefined) {
      query = query.eq('used', !options.unused);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as TopicSuggestion[]) || [];
  },

  /**
   * Manuelles Topic hinzufügen
   */
  async addTopicSuggestion(topic: string, category?: string): Promise<TopicSuggestion> {
    const { data, error } = await supabase
      .from('topic_suggestions')
      .insert({
        topic,
        category: category || null,
        relevance_score: 0.8,
        source: 'manual'
      })
      .select()
      .single();

    if (error) throw error;
    return data as TopicSuggestion;
  },

  /**
   * Topic zur Queue hinzufügen
   */
  async addSuggestionToQueue(suggestionId: string): Promise<void> {
    // Lade Suggestion
    const { data: suggestion, error: fetchError } = await supabase
      .from('topic_suggestions')
      .select('*')
      .eq('id', suggestionId)
      .single();

    if (fetchError) throw fetchError;

    // Zur Queue hinzufügen
    await this.addToQueue({
      topic: suggestion.topic,
      content_type: 'glossary',
      category: suggestion.category,
      priority: Math.round((suggestion.relevance_score || 0.5) * 10)
    });

    // Als verwendet markieren
    await supabase
      .from('topic_suggestions')
      .update({ used: true })
      .eq('id', suggestionId);
  },

  /**
   * Topic-Vorschlag löschen
   */
  async deleteTopicSuggestion(id: string): Promise<void> {
    const { error } = await supabase
      .from('topic_suggestions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ============================================================
  // CATEGORIES
  // ============================================================

  /**
   * Wiki-Kategorien laden
   */
  async getCategories(): Promise<WikiCategory[]> {
    const { data, error } = await supabase
      .from('wiki_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data as WikiCategory[]) || [];
  },

  // ============================================================
  // LOGS & STATS
  // ============================================================

  /**
   * Generierungs-Logs laden
   */
  async getGenerationLogs(limit: number = 50): Promise<GenerationLog[]> {
    const { data, error } = await supabase
      .from('content_generation_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data as GenerationLog[]) || [];
  },

  /**
   * Statistiken laden
   */
  async getStats(daysBack: number = 7): Promise<ContentStats> {
    const { data, error } = await supabase
      .rpc('get_content_generation_stats', { days_back: daysBack });

    if (error) throw error;

    return {
      total_generated: Number(data?.[0]?.total_generated || 0),
      successful: Number(data?.[0]?.successful || 0),
      failed: Number(data?.[0]?.failed || 0),
      total_tokens: Number(data?.[0]?.total_tokens || 0),
      avg_duration_ms: Number(data?.[0]?.avg_duration_ms || 0),
      glossary_count: Number(data?.[0]?.glossary_count || 0),
      blog_count: Number(data?.[0]?.blog_count || 0)
    };
  },

  // ============================================================
  // EDGE FUNCTION CALLS
  // ============================================================

  /**
   * Scheduler manuell triggern
   */
  async triggerScheduler(options?: {
    itemsPerRun?: number;
    dryRun?: boolean;
  }): Promise<any> {
    const { data, error } = await supabase.functions.invoke('content-scheduler', {
      body: options
    });

    if (error) throw error;
    return data;
  },

  /**
   * Einzelnes Topic generieren
   */
  async generateSingle(topic: string, contentType: 'glossary' | 'blog', category?: string): Promise<any> {
    const { data, error } = await supabase.functions.invoke('content-orchestrator', {
      body: {
        action: 'generate-single',
        topic,
        contentType,
        category,
        autoPublish: true
      }
    });

    if (error) throw error;
    return data;
  },

  /**
   * Neue Topics generieren lassen
   */
  async generateTopicSuggestions(options?: {
    category?: string;
    count?: number;
  }): Promise<any> {
    const { data, error } = await supabase.functions.invoke('topic-generator', {
      body: {
        action: 'bulk-suggest',
        category: options?.category,
        count: options?.count || 10
      }
    });

    if (error) throw error;
    return data;
  },

  /**
   * Gap-Analyse durchführen
   */
  async performGapAnalysis(category?: string): Promise<any> {
    const { data, error } = await supabase.functions.invoke('topic-generator', {
      body: {
        action: 'gap-analysis',
        category,
        count: 10
      }
    });

    if (error) throw error;
    return data;
  },

  /**
   * Alle Begriffe verlinken
   */
  async linkAllTerms(): Promise<any> {
    const { data, error } = await supabase.functions.invoke('content-orchestrator', {
      body: {
        action: 'link-terms'
      }
    });

    if (error) throw error;
    return data;
  }
};

export default contentAutomationService;
