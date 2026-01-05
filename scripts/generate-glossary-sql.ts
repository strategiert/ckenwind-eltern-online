/**
 * Generate SQL from static glossary data
 *
 * Run with: npx tsx scripts/generate-glossary-sql.ts > scripts/full-glossary-seed.sql
 */

import { aTerms } from '../src/data/glossary/a-terms';
import { bTerms } from '../src/data/glossary/b-terms';
import { cTerms } from '../src/data/glossary/c-terms';
import { dTerms } from '../src/data/glossary/d-terms';
import { eTerms } from '../src/data/glossary/e-terms';

const allTerms = [...aTerms, ...bTerms, ...cTerms, ...dTerms, ...eTerms];

function escapeSQL(str: string | null | undefined): string {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function arrayToSQL(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'";
  const escaped = arr.map(s => s.replace(/'/g, "''")).join("', '");
  return `ARRAY['${escaped}']`;
}

console.log('-- ============================================================');
console.log('-- FULL GLOSSARY DATA MIGRATION');
console.log(`-- Generated: ${new Date().toISOString()}`);
console.log(`-- Total terms: ${allTerms.length}`);
console.log('-- ============================================================');
console.log('');

// Generate INSERT statements for glossary_terms
console.log('-- GLOSSARY TERMS');
console.log('-- ============================================================');

for (const item of allTerms) {
  const teaser = item.content?.teaser || null;

  console.log(`
INSERT INTO public.glossary_terms (term, slug, definition, teaser, alias, tags, is_published)
VALUES (
  ${escapeSQL(item.term)},
  ${escapeSQL(item.slug)},
  ${escapeSQL(item.definition)},
  ${escapeSQL(teaser)},
  ${escapeSQL(item.alias)},
  ${arrayToSQL(item.tags)},
  true
)
ON CONFLICT (slug) DO UPDATE SET
  term = EXCLUDED.term,
  definition = EXCLUDED.definition,
  teaser = EXCLUDED.teaser,
  alias = EXCLUDED.alias,
  tags = EXCLUDED.tags,
  is_published = EXCLUDED.is_published,
  updated_at = now();
`);
}

// Generate INSERT statements for sections
console.log('');
console.log('-- ============================================================');
console.log('-- GLOSSARY SECTIONS');
console.log('-- ============================================================');
console.log('');
console.log('-- Delete existing sections first');
console.log('DELETE FROM public.glossary_sections WHERE term_id IN (SELECT id FROM public.glossary_terms);');
console.log('');

for (const item of allTerms) {
  if (!item.content) continue;

  const sections = item.content.sections || [];
  const literaryDevices = item.content.literaryDevices || [];

  let sortOrder = 0;

  // Regular sections
  for (const section of sections) {
    console.log(`INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, ${escapeSQL(section.title)}, ${escapeSQL(section.content)}, 'content', ${sortOrder}
FROM public.glossary_terms WHERE slug = ${escapeSQL(item.slug)};
`);
    sortOrder++;
  }

  // Literary devices as special section type
  for (const device of literaryDevices) {
    console.log(`INSERT INTO public.glossary_sections (term_id, title, content, section_type, sort_order)
SELECT id, ${escapeSQL(device.title)}, ${escapeSQL(device.content)}, 'literary_device', ${sortOrder}
FROM public.glossary_terms WHERE slug = ${escapeSQL(item.slug)};
`);
    sortOrder++;
  }
}

// Generate INSERT statements for references
console.log('');
console.log('-- ============================================================');
console.log('-- GLOSSARY REFERENCES');
console.log('-- ============================================================');
console.log('');
console.log('-- Delete existing references first');
console.log('DELETE FROM public.glossary_references WHERE term_id IN (SELECT id FROM public.glossary_terms);');
console.log('');

for (const item of allTerms) {
  if (!item.content?.references) continue;

  const refs = item.content.references;
  for (let i = 0; i < refs.length; i++) {
    console.log(`INSERT INTO public.glossary_references (term_id, reference_text, sort_order)
SELECT id, ${escapeSQL(refs[i])}, ${i}
FROM public.glossary_terms WHERE slug = ${escapeSQL(item.slug)};
`);
  }
}

console.log('');
console.log('-- ============================================================');
console.log('-- MIGRATION COMPLETE');
console.log('-- ============================================================');
