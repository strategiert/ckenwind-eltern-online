import { useQuery } from "@tanstack/react-query";
import { glossaryService, GlossaryTermBasic, GlossaryTermWithDetails } from "@/services/glossaryService";

/**
 * Hook für alle Glossar-Begriffe
 */
export function useGlossaryTerms() {
  return useQuery<GlossaryTermBasic[], Error>({
    queryKey: ['glossary', 'terms'],
    queryFn: () => glossaryService.getAllTerms(),
    staleTime: 5 * 60 * 1000, // 5 Minuten
  });
}

/**
 * Hook für Begriffe nach Buchstabe
 */
export function useGlossaryTermsByLetter(letter: string) {
  return useQuery<GlossaryTermBasic[], Error>({
    queryKey: ['glossary', 'terms', 'letter', letter],
    queryFn: () => glossaryService.getTermsByLetter(letter),
    enabled: !!letter,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook für einzelnen Begriff mit Details
 */
export function useGlossaryTerm(slug: string) {
  return useQuery<GlossaryTermWithDetails | null, Error>({
    queryKey: ['glossary', 'term', slug],
    queryFn: () => glossaryService.getTermBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook für Glossar-Suche
 */
export function useGlossarySearch(query: string, limit = 50) {
  return useQuery<GlossaryTermBasic[], Error>({
    queryKey: ['glossary', 'search', query],
    queryFn: () => glossaryService.searchTerms(query, limit),
    enabled: query.length >= 2, // Mindestens 2 Zeichen
    staleTime: 2 * 60 * 1000, // 2 Minuten
  });
}

/**
 * Hook für Begriffe nach Tag
 */
export function useGlossaryTermsByTag(tag: string) {
  return useQuery<GlossaryTermBasic[], Error>({
    queryKey: ['glossary', 'terms', 'tag', tag],
    queryFn: () => glossaryService.getTermsByTag(tag),
    enabled: !!tag,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook für alle Tags
 */
export function useGlossaryTags() {
  return useQuery<string[], Error>({
    queryKey: ['glossary', 'tags'],
    queryFn: () => glossaryService.getAllTags(),
    staleTime: 10 * 60 * 1000, // 10 Minuten
  });
}

/**
 * Hook für Alphabet-Index
 */
export function useGlossaryAlphabet() {
  return useQuery<{ letter: string; count: number }[], Error>({
    queryKey: ['glossary', 'alphabet'],
    queryFn: () => glossaryService.getAlphabetIndex(),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook für Glossar-Statistiken
 */
export function useGlossaryStats() {
  return useQuery<{ totalTerms: number; totalViews: number }, Error>({
    queryKey: ['glossary', 'stats'],
    queryFn: () => glossaryService.getStats(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook für beliebte Begriffe
 */
export function useGlossaryPopular(limit = 10) {
  return useQuery<GlossaryTermBasic[], Error>({
    queryKey: ['glossary', 'popular', limit],
    queryFn: () => glossaryService.getPopularTerms(limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook für zufällige Begriffe
 */
export function useGlossaryRandom(limit = 5) {
  return useQuery<GlossaryTermBasic[], Error>({
    queryKey: ['glossary', 'random', limit],
    queryFn: () => glossaryService.getRandomTerms(limit),
    staleTime: 60 * 1000, // 1 Minute - öfter aktualisieren für Abwechslung
  });
}
