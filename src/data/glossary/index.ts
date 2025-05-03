
import { GlossaryItem } from './types';
import { aTerms } from './a-terms';
import { bTerms } from './b-terms';
import { cTerms } from './c-terms';
import { dTerms } from './d-terms';
import { eTerms } from './e-terms';

// Combine all glossary terms
export const glossaryData: GlossaryItem[] = [
  ...aTerms,
  ...bTerms,
  ...cTerms,
  ...dTerms,
  ...eTerms,
  // Add more letter imports as they are created
];

/**
 * Find a specific term by its slug
 */
export const getTermBySlug = (slug: string): GlossaryItem | undefined => {
  return glossaryData.find(term => term.slug === slug);
};

/**
 * Get related terms from an array of slugs
 */
export const getRelatedTerms = (slugs: string[]): GlossaryItem[] => {
  return slugs
    .map(slug => glossaryData.find(term => term.slug === slug))
    .filter((term): term is GlossaryItem => term !== undefined);
};

// Export the type for use throughout the application
export type { GlossaryItem } from './types';
