
import { supabase } from '@/integrations/supabase/client';
import type { GlossaryItem } from '@/data/glossary/types';

export interface DatabaseGlossaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  tags: string[];
  alias?: string;
  teaser?: string;
  category: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseGlossarySection {
  id: string;
  term_id: string;
  title: string;
  content: string;
  order_index: number;
}

export interface DatabaseGlossaryLiteraryDevice {
  id: string;
  term_id: string;
  title: string;
  content: string;
  order_index: number;
}

export interface DatabaseGlossaryReference {
  id: string;
  term_id: string;
  reference_text: string;
  order_index: number;
}

export interface DatabaseGlossaryRelatedTerm {
  id: string;
  term_id: string;
  related_term_id: string;
}

/**
 * Transform database term to GlossaryItem format
 */
function transformDatabaseTermToGlossaryItem(
  term: DatabaseGlossaryTerm,
  sections?: DatabaseGlossarySection[],
  literaryDevices?: DatabaseGlossaryLiteraryDevice[],
  references?: DatabaseGlossaryReference[],
  relatedTermSlugs?: string[]
): GlossaryItem {
  return {
    term: term.term,
    slug: term.slug,
    definition: term.definition,
    tags: term.tags,
    alias: term.alias,
    content: {
      teaser: term.teaser,
      sections: sections?.sort((a, b) => a.order_index - b.order_index).map(s => ({
        title: s.title,
        content: s.content
      })),
      literaryDevices: literaryDevices?.sort((a, b) => a.order_index - b.order_index).map(ld => ({
        title: ld.title,
        content: ld.content
      })),
      references: references?.sort((a, b) => a.order_index - b.order_index).map(r => r.reference_text),
      relatedTerms: relatedTermSlugs
    }
  };
}

/**
 * Fetch all published glossary terms
 */
export async function fetchGlossaryTerms(): Promise<GlossaryItem[]> {
  const { data: terms, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('is_published', true)
    .order('term');

  if (error) {
    console.error('Error fetching glossary terms:', error);
    throw error;
  }

  // Transform to GlossaryItem format
  return terms.map(term => transformDatabaseTermToGlossaryItem(term));
}

/**
 * Fetch a single glossary term by slug with all related content
 */
export async function fetchGlossaryTermBySlug(slug: string): Promise<GlossaryItem | null> {
  // Fetch the main term
  const { data: term, error: termError } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (termError || !term) {
    if (termError.code !== 'PGRST116') { // Not found error
      console.error('Error fetching glossary term:', termError);
    }
    return null;
  }

  // Fetch sections
  const { data: sections } = await supabase
    .from('glossary_sections')
    .select('*')
    .eq('term_id', term.id)
    .order('order_index');

  // Fetch literary devices
  const { data: literaryDevices } = await supabase
    .from('glossary_literary_devices')
    .select('*')
    .eq('term_id', term.id)
    .order('order_index');

  // Fetch references
  const { data: references } = await supabase
    .from('glossary_references')
    .select('*')
    .eq('term_id', term.id)
    .order('order_index');

  // Fetch related terms
  const { data: relatedTerms } = await supabase
    .from('glossary_related_terms')
    .select(`
      related_term:glossary_terms!glossary_related_terms_related_term_id_fkey(slug)
    `)
    .eq('term_id', term.id);

  const relatedTermSlugs = relatedTerms?.map(rt => rt.related_term?.slug).filter(Boolean) || [];

  return transformDatabaseTermToGlossaryItem(
    term,
    sections || [],
    literaryDevices || [],
    references || [],
    relatedTermSlugs as string[]
  );
}

/**
 * Search glossary terms
 */
export async function searchGlossaryTerms(query: string): Promise<GlossaryItem[]> {
  const { data: terms, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('is_published', true)
    .or(`term.ilike.%${query}%,definition.ilike.%${query}%,alias.ilike.%${query}%`)
    .order('term');

  if (error) {
    console.error('Error searching glossary terms:', error);
    throw error;
  }

  return terms.map(term => transformDatabaseTermToGlossaryItem(term));
}

/**
 * Filter glossary terms by category
 */
export async function fetchGlossaryTermsByCategory(category: string): Promise<GlossaryItem[]> {
  const { data: terms, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .order('term');

  if (error) {
    console.error('Error fetching glossary terms by category:', error);
    throw error;
  }

  return terms.map(term => transformDatabaseTermToGlossaryItem(term));
}

/**
 * Filter glossary terms by tag
 */
export async function fetchGlossaryTermsByTag(tag: string): Promise<GlossaryItem[]> {
  const { data: terms, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('is_published', true)
    .contains('tags', [tag])
    .order('term');

  if (error) {
    console.error('Error fetching glossary terms by tag:', error);
    throw error;
  }

  return terms.map(term => transformDatabaseTermToGlossaryItem(term));
}
