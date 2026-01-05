import { supabase } from "@/integrations/supabase/client";

// Types für Glossar
export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  teaser: string | null;
  alias: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface GlossarySection {
  id: string;
  term_id: string;
  title: string;
  content: string;
  section_type: 'content' | 'literary_device' | 'example' | 'warning';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GlossaryReference {
  id: string;
  term_id: string;
  reference_text: string;
  url: string | null;
  sort_order: number;
  created_at: string;
}

export interface GlossaryTermWithDetails extends GlossaryTerm {
  sections: GlossarySection[];
  references: GlossaryReference[];
  relatedTerms: Pick<GlossaryTerm, 'id' | 'term' | 'slug' | 'definition'>[];
}

export interface GlossaryTermBasic {
  id: string;
  term: string;
  slug: string;
  definition: string;
  tags: string[];
  alias?: string | null;
}

// Glossar Service
export const glossaryService = {
  /**
   * Alle veröffentlichten Begriffe laden (für Übersicht)
   */
  async getAllTerms(): Promise<GlossaryTermBasic[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('id, term, slug, definition, tags, alias')
      .eq('is_published', true)
      .order('term', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Begriffe nach Anfangsbuchstabe laden
   */
  async getTermsByLetter(letter: string): Promise<GlossaryTermBasic[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('id, term, slug, definition, tags, alias')
      .eq('is_published', true)
      .ilike('term', `${letter}%`)
      .order('term', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Einzelnen Begriff mit allen Details laden
   */
  async getTermBySlug(slug: string): Promise<GlossaryTermWithDetails | null> {
    // Haupt-Term laden
    const { data: term, error: termError } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (termError) {
      if (termError.code === 'PGRST116') return null; // Not found
      throw termError;
    }

    // Sektionen laden
    const { data: sections, error: sectionsError } = await supabase
      .from('glossary_sections')
      .select('*')
      .eq('term_id', term.id)
      .order('sort_order', { ascending: true });

    if (sectionsError) throw sectionsError;

    // Referenzen laden
    const { data: references, error: referencesError } = await supabase
      .from('glossary_references')
      .select('*')
      .eq('term_id', term.id)
      .order('sort_order', { ascending: true });

    if (referencesError) throw referencesError;

    // Verwandte Begriffe laden
    const { data: relatedIds, error: relatedError } = await supabase
      .from('glossary_related_terms')
      .select('related_term_id')
      .eq('term_id', term.id);

    if (relatedError) throw relatedError;

    let relatedTerms: Pick<GlossaryTerm, 'id' | 'term' | 'slug' | 'definition'>[] = [];
    if (relatedIds && relatedIds.length > 0) {
      const { data: related, error: relatedTermsError } = await supabase
        .from('glossary_terms')
        .select('id, term, slug, definition')
        .in('id', relatedIds.map(r => r.related_term_id))
        .eq('is_published', true);

      if (relatedTermsError) throw relatedTermsError;
      relatedTerms = related || [];
    }

    // View Count erhöhen (fire and forget)
    try {
      supabase.rpc('increment_glossary_view', { term_slug: slug });
    } catch (e) {
      console.error('Failed to increment view count:', e);
    }

    return {
      ...term,
      sections: sections || [],
      references: references || [],
      relatedTerms,
    };
  },

  /**
   * Begriff nach ID laden
   */
  async getTermById(id: string): Promise<GlossaryTerm | null> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },

  /**
   * Volltextsuche in Begriffen
   */
  async searchTerms(query: string, limit = 50): Promise<GlossaryTermBasic[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('id, term, slug, definition, tags, alias')
      .eq('is_published', true)
      .or(`term.ilike.%${query}%,definition.ilike.%${query}%,alias.ilike.%${query}%`)
      .order('term', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  /**
   * Begriffe nach Tag filtern
   */
  async getTermsByTag(tag: string): Promise<GlossaryTermBasic[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('id, term, slug, definition, tags, alias')
      .eq('is_published', true)
      .contains('tags', [tag])
      .order('term', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Alle verfügbaren Tags laden
   */
  async getAllTags(): Promise<string[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('tags')
      .eq('is_published', true);

    if (error) throw error;

    // Alle Tags sammeln und deduplizieren
    const allTags = new Set<string>();
    data?.forEach(item => {
      item.tags?.forEach((tag: string) => allTags.add(tag));
    });

    return Array.from(allTags).sort();
  },

  /**
   * Alphabet-Index mit Anzahl der Begriffe pro Buchstabe
   */
  async getAlphabetIndex(): Promise<{ letter: string; count: number }[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('term')
      .eq('is_published', true);

    if (error) throw error;

    // Buchstaben zählen
    const letterCounts: Record<string, number> = {};
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Initialisiere alle Buchstaben mit 0
    alphabet.forEach(letter => {
      letterCounts[letter] = 0;
    });

    // Zähle Begriffe pro Anfangsbuchstabe
    data?.forEach(item => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (alphabet.includes(firstLetter)) {
        letterCounts[firstLetter]++;
      }
    });

    return alphabet.map(letter => ({
      letter,
      count: letterCounts[letter],
    }));
  },

  /**
   * Statistiken zum Glossar
   */
  async getStats(): Promise<{ totalTerms: number; totalViews: number }> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('view_count')
      .eq('is_published', true);

    if (error) throw error;

    const totalTerms = data?.length || 0;
    const totalViews = data?.reduce((sum, item) => sum + (item.view_count || 0), 0) || 0;

    return { totalTerms, totalViews };
  },

  /**
   * Beliebte Begriffe (nach View Count)
   */
  async getPopularTerms(limit = 10): Promise<GlossaryTermBasic[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('id, term, slug, definition, tags, alias')
      .eq('is_published', true)
      .order('view_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  /**
   * Zufällige Begriffe (für "Entdecken" Feature)
   */
  async getRandomTerms(limit = 5): Promise<GlossaryTermBasic[]> {
    // Supabase hat keine native random() Funktion, daher laden wir alle und wählen zufällig
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('id, term, slug, definition, tags, alias')
      .eq('is_published', true);

    if (error) throw error;
    if (!data || data.length === 0) return [];

    // Zufällig mischen und limitieren
    const shuffled = data.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  },
};

export default glossaryService;
