
import { supabase } from '@/integrations/supabase/client';
import type { GlossaryItem } from '@/data/glossary/types';

export interface DatabaseGlossaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  alias?: string;
  category: string;
  tags: string[];
  teaser?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  glossary_sections?: {
    id: string;
    title: string;
    content: string;
    order_index: number;
  }[];
  glossary_literary_devices?: {
    id: string;
    title: string;
    content: string;
    order_index: number;
  }[];
  glossary_references?: {
    id: string;
    reference_text: string;
    order_index: number;
  }[];
  glossary_related_terms?: {
    related_term_id: string;
    related_term: {
      slug: string;
    };
  }[];
}

export const glossaryService = {
  async getAllTerms(): Promise<GlossaryItem[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select(`
        *,
        glossary_sections(*),
        glossary_literary_devices(*),
        glossary_references(*),
        glossary_related_terms(
          related_term_id,
          related_term:glossary_terms!related_term_id(slug)
        )
      `)
      .eq('is_published', true)
      .order('term');

    if (error) {
      console.error('Error fetching glossary terms:', error);
      throw error;
    }

    return this.transformDatabaseTerms(data || []);
  },

  async getTermBySlug(slug: string): Promise<GlossaryItem | null> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select(`
        *,
        glossary_sections(*),
        glossary_literary_devices(*),
        glossary_references(*),
        glossary_related_terms(
          related_term_id,
          related_term:glossary_terms!related_term_id(slug)
        )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Term not found
      }
      console.error('Error fetching glossary term:', error);
      throw error;
    }

    return this.transformDatabaseTerm(data);
  },

  async getTermsByCategory(category: string): Promise<GlossaryItem[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select(`
        *,
        glossary_sections(*),
        glossary_literary_devices(*),
        glossary_references(*),
        glossary_related_terms(
          related_term_id,
          related_term:glossary_terms!related_term_id(slug)
        )
      `)
      .eq('category', category)
      .eq('is_published', true)
      .order('term');

    if (error) {
      console.error('Error fetching glossary terms by category:', error);
      throw error;
    }

    return this.transformDatabaseTerms(data || []);
  },

  transformDatabaseTerm(dbTerm: DatabaseGlossaryTerm): GlossaryItem {
    return {
      term: dbTerm.term,
      slug: dbTerm.slug,
      definition: dbTerm.definition,
      tags: dbTerm.tags || [],
      alias: dbTerm.alias,
      content: {
        teaser: dbTerm.teaser,
        sections: dbTerm.glossary_sections
          ?.sort((a, b) => a.order_index - b.order_index)
          .map(section => ({
            title: section.title,
            content: section.content
          })),
        literaryDevices: dbTerm.glossary_literary_devices
          ?.sort((a, b) => a.order_index - b.order_index)
          .map(device => ({
            title: device.title,
            content: device.content
          })),
        references: dbTerm.glossary_references
          ?.sort((a, b) => a.order_index - b.order_index)
          .map(ref => ref.reference_text),
        relatedTerms: dbTerm.glossary_related_terms
          ?.map(rel => rel.related_term.slug)
      }
    };
  },

  transformDatabaseTerms(dbTerms: DatabaseGlossaryTerm[]): GlossaryItem[] {
    return dbTerms.map(term => this.transformDatabaseTerm(term));
  }
};
