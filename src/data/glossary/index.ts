
import { GlossaryItem } from './types';
import { glossaryService } from '@/services/glossaryService';

// For backward compatibility, we'll export the service functions
// The actual data will be fetched from the database
export const getTermBySlug = async (slug: string): Promise<GlossaryItem | undefined> => {
  try {
    const term = await glossaryService.getTermBySlug(slug);
    return term || undefined;
  } catch (error) {
    console.error('Error fetching term by slug:', error);
    return undefined;
  }
};

export const getRelatedTerms = async (slugs: string[]): Promise<GlossaryItem[]> => {
  try {
    const allTerms = await glossaryService.getAllTerms();
    return slugs
      .map(slug => allTerms.find(term => term.slug === slug))
      .filter((term): term is GlossaryItem => term !== undefined);
  } catch (error) {
    console.error('Error fetching related terms:', error);
    return [];
  }
};

// Export the service for direct use
export { glossaryService };

// Export the type for use throughout the application
export type { GlossaryItem } from './types';

// Legacy export for backward compatibility
// This will be empty initially as data comes from the database
export const glossaryData: GlossaryItem[] = [];
