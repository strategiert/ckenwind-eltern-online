
import { useQuery } from '@tanstack/react-query';
import { glossaryService } from '@/services/glossaryService';

export const useGlossaryTerms = () => {
  return useQuery({
    queryKey: ['glossary-terms'],
    queryFn: () => glossaryService.getAllTerms(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGlossaryTerm = (slug: string) => {
  return useQuery({
    queryKey: ['glossary-term', slug],
    queryFn: () => glossaryService.getTermBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGlossaryTermsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['glossary-terms', 'category', category],
    queryFn: () => glossaryService.getTermsByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
