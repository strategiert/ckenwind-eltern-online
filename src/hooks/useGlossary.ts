import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  glossaryService,
  glossaryAdminService,
  GlossaryTerm,
  GlossaryTermBasic,
  GlossaryTermWithDetails,
  GlossaryTermInput,
  GlossarySectionInput,
  GlossaryReferenceInput,
} from "@/services/glossaryService";

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

// ============================================================
// ADMIN HOOKS
// ============================================================

/**
 * Hook für alle Begriffe (Admin - inkl. unveröffentlichte)
 */
export function useAllGlossaryTermsAdmin() {
  return useQuery<GlossaryTerm[], Error>({
    queryKey: ['glossary', 'admin', 'terms'],
    queryFn: () => glossaryAdminService.getAllTermsAdmin(),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook für einzelnen Begriff mit Details (Admin)
 */
export function useGlossaryTermAdmin(id: string) {
  return useQuery<GlossaryTermWithDetails | null, Error>({
    queryKey: ['glossary', 'admin', 'term', id],
    queryFn: () => glossaryAdminService.getTermByIdAdmin(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook für Begriff erstellen
 */
export function useCreateGlossaryTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: GlossaryTermInput) => glossaryAdminService.createTerm(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
    },
  });
}

/**
 * Hook für Begriff aktualisieren
 */
export function useUpdateGlossaryTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<GlossaryTermInput> }) =>
      glossaryAdminService.updateTerm(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
      queryClient.invalidateQueries({ queryKey: ['glossary', 'admin', 'term', variables.id] });
    },
  });
}

/**
 * Hook für Begriff löschen
 */
export function useDeleteGlossaryTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => glossaryAdminService.deleteTerm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
    },
  });
}

/**
 * Hook für Sektion erstellen
 */
export function useCreateGlossarySection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: GlossarySectionInput) => glossaryAdminService.createSection(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['glossary', 'admin', 'term', variables.term_id] });
    },
  });
}

/**
 * Hook für Sektion aktualisieren
 */
export function useUpdateGlossarySection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<GlossarySectionInput> }) =>
      glossaryAdminService.updateSection(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
    },
  });
}

/**
 * Hook für Sektion löschen
 */
export function useDeleteGlossarySection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => glossaryAdminService.deleteSection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
    },
  });
}

/**
 * Hook für Referenz erstellen
 */
export function useCreateGlossaryReference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: GlossaryReferenceInput) => glossaryAdminService.createReference(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['glossary', 'admin', 'term', variables.term_id] });
    },
  });
}

/**
 * Hook für Referenz löschen
 */
export function useDeleteGlossaryReference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => glossaryAdminService.deleteReference(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
    },
  });
}

/**
 * Hook für verwandten Begriff hinzufügen
 */
export function useAddRelatedTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ termId, relatedTermId }: { termId: string; relatedTermId: string }) =>
      glossaryAdminService.addRelatedTerm(termId, relatedTermId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['glossary', 'admin', 'term', variables.termId] });
    },
  });
}

/**
 * Hook für verwandten Begriff entfernen
 */
export function useRemoveRelatedTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ termId, relatedTermId }: { termId: string; relatedTermId: string }) =>
      glossaryAdminService.removeRelatedTerm(termId, relatedTermId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['glossary', 'admin', 'term', variables.termId] });
    },
  });
}
