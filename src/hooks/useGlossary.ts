
import { useQuery } from '@tanstack/react-query';
import { 
  fetchGlossaryTerms, 
  fetchGlossaryTermBySlug, 
  searchGlossaryTerms,
  fetchGlossaryTermsByCategory,
  fetchGlossaryTermsByTag
} from '@/services/glossaryService';

export const GLOSSARY_QUERY_KEYS = {
  all: ['glossary'] as const,
  terms: () => [...GLOSSARY_QUERY_KEYS.all, 'terms'] as const,
  term: (slug: string) => [...GLOSSARY_QUERY_KEYS.all, 'term', slug] as const,
  search: (query: string) => [...GLOSSARY_QUERY_KEYS.all, 'search', query] as const,
  category: (category: string) => [...GLOSSARY_QUERY_KEYS.all, 'category', category] as const,
  tag: (tag: string) => [...GLOSSARY_QUERY_KEYS.all, 'tag', tag] as const,
};

/**
 * Hook to fetch all glossary terms
 */
export function useGlossaryTerms() {
  return useQuery({
    queryKey: GLOSSARY_QUERY_KEYS.terms(),
    queryFn: fetchGlossaryTerms,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch a single glossary term by slug
 */
export function useGlossaryTerm(slug: string) {
  return useQuery({
    queryKey: GLOSSARY_QUERY_KEYS.term(slug),
    queryFn: () => fetchGlossaryTermBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to search glossary terms
 */
export function useGlossarySearch(query: string) {
  return useQuery({
    queryKey: GLOSSARY_QUERY_KEYS.search(query),
    queryFn: () => searchGlossaryTerms(query),
    enabled: query.length >= 2, // Only search if query is at least 2 characters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch glossary terms by category
 */
export function useGlossaryTermsByCategory(category: string) {
  return useQuery({
    queryKey: GLOSSARY_QUERY_KEYS.category(category),
    queryFn: () => fetchGlossaryTermsByCategory(category),
    enabled: !!category && category !== 'all',
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch glossary terms by tag
 */
export function useGlossaryTermsByTag(tag: string) {
  return useQuery({
    queryKey: GLOSSARY_QUERY_KEYS.tag(tag),
    queryFn: () => fetchGlossaryTermsByTag(tag),
    enabled: !!tag && tag !== 'all',
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
