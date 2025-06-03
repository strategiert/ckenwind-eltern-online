import { GlossaryItem } from './types';
import { fetchGlossaryTerms } from '@/services/glossaryService';

// Keep the existing hardcoded imports as fallback
import { aTerms } from './a-terms';
import { bTerms } from './b-terms';
import { cTerms } from './c-terms';
import { dTerms } from './d-terms';
import { eTerms } from './e-terms';

// Fallback data (existing hardcoded data)
export const fallbackGlossaryData: GlossaryItem[] = [
  ...aTerms,
  ...bTerms,
  ...cTerms,
  ...dTerms,
  ...eTerms,
];

// This will be populated by the database
let cachedGlossaryData: GlossaryItem[] | null = null;

/**
 * Get glossary data from database with fallback to hardcoded data
 */
export async function getGlossaryData(): Promise<GlossaryItem[]> {
  if (cachedGlossaryData) {
    return cachedGlossaryData;
  }

  try {
    const dbData = await fetchGlossaryTerms();
    cachedGlossaryData = dbData;
    return dbData;
  } catch (error) {
    console.warn('Failed to fetch glossary from database, using fallback data:', error);
    return fallbackGlossaryData;
  }
}

/**
 * For backward compatibility - synchronous access to cached data
 * This will use fallback data until database data is loaded
 */
export const glossaryData: GlossaryItem[] = fallbackGlossaryData;

/**
 * Find a specific term by its slug
 */
export const getTermBySlug = (slug: string): GlossaryItem | undefined => {
  return (cachedGlossaryData || fallbackGlossaryData).find(term => term.slug === slug);
};

/**
 * Get related terms from an array of slugs
 */
export const getRelatedTerms = (slugs: string[]): GlossaryItem[] => {
  const data = cachedGlossaryData || fallbackGlossaryData;
  return slugs
    .map(slug => data.find(term => term.slug === slug))
    .filter((term): term is GlossaryItem => term !== undefined);
};

// Export the type for use throughout the application
export type { GlossaryItem } from './types';
