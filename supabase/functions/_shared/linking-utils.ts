/**
 * Linking Utilities für automatische Verlinkung von Glossar-Begriffen
 */

export interface TermInfo {
  term: string;
  slug: string;
  alias?: string | null;
}

/**
 * Erstellt automatisch interne Links im Content
 * Ersetzt Begriffe durch Markdown-Links zu Glossar-Einträgen
 */
export function createInternalLinks(
  content: string,
  allTerms: TermInfo[],
  options: {
    maxLinksPerTerm?: number;
    linkFormat?: 'markdown' | 'html';
    baseUrl?: string;
  } = {}
): string {
  const {
    maxLinksPerTerm = 1,
    linkFormat = 'markdown',
    baseUrl = '/glossar'
  } = options;

  // Track welche Begriffe bereits verlinkt wurden
  const linkedTerms = new Map<string, number>();

  // Sortiere Begriffe nach Länge (längste zuerst) um Teilübereinstimmungen zu vermeiden
  const sortedTerms = [...allTerms].sort((a, b) => {
    const aLen = Math.max(a.term.length, a.alias?.length || 0);
    const bLen = Math.max(b.term.length, b.alias?.length || 0);
    return bLen - aLen;
  });

  let result = content;

  for (const termInfo of sortedTerms) {
    // Erstelle Regex für Begriff und Alias
    const patterns: string[] = [escapeRegExp(termInfo.term)];
    if (termInfo.alias) {
      patterns.push(escapeRegExp(termInfo.alias));
    }

    for (const pattern of patterns) {
      // Case-insensitive, Wortgrenzen beachten
      // Nicht in existierenden Links oder Überschriften ersetzen
      const regex = new RegExp(
        `(?<![\\[/])\\b(${pattern})\\b(?![\\]\\(])`,
        'gi'
      );

      result = result.replace(regex, (match) => {
        const termKey = termInfo.slug;
        const currentCount = linkedTerms.get(termKey) || 0;

        if (currentCount >= maxLinksPerTerm) {
          return match; // Max Links erreicht
        }

        linkedTerms.set(termKey, currentCount + 1);

        if (linkFormat === 'html') {
          return `<a href="${baseUrl}/${termInfo.slug}">${match}</a>`;
        }
        return `[${match}](${baseUrl}/${termInfo.slug})`;
      });
    }
  }

  return result;
}

/**
 * Findet verwandte Begriffe basierend auf Tags
 */
export function findRelatedTermsByTags(
  termTags: string[],
  allTerms: Array<{ id: string; slug: string; tags: string[] }>,
  currentTermId: string,
  limit: number = 5
): string[] {
  if (!termTags || termTags.length === 0) {
    return [];
  }

  // Berechne Übereinstimmungs-Score für jeden Begriff
  const scored = allTerms
    .filter(t => t.id !== currentTermId)
    .map(term => {
      const matchingTags = term.tags?.filter(tag =>
        termTags.includes(tag)
      ).length || 0;
      return { id: term.id, score: matchingTags };
    })
    .filter(t => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(t => t.id);
}

/**
 * Generiert einen URL-freundlichen Slug aus einem Begriff
 */
export function generateSlug(term: string): string {
  return term
    .toLowerCase()
    .trim()
    // Deutsche Umlaute ersetzen
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    // Sonderzeichen entfernen
    .replace(/[^a-z0-9\s-]/g, '')
    // Leerzeichen durch Bindestriche ersetzen
    .replace(/\s+/g, '-')
    // Mehrfache Bindestriche entfernen
    .replace(/-+/g, '-')
    // Führende/nachfolgende Bindestriche entfernen
    .replace(/^-+|-+$/g, '');
}

/**
 * Extrahiert potenzielle Glossar-Begriffe aus einem Text
 * Nützlich für Gap-Analyse
 */
export function extractPotentialTerms(
  content: string,
  existingTerms: string[]
): string[] {
  // Finde kapitalisierte Wörter und Fachbegriffe
  const termPatterns = [
    // Kapitalisierte Begriffe (außer am Satzanfang)
    /(?<=[.!?]\s+|\n)[A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)*/g,
    // Begriffe in Anführungszeichen
    /"([^"]+)"/g,
    // Bindestrich-Komposita
    /\b[A-ZÄÖÜ][a-zäöüß]+-[A-ZÄÖÜ][a-zäöüß]+\b/g,
  ];

  const potentialTerms = new Set<string>();
  const existingLower = existingTerms.map(t => t.toLowerCase());

  for (const pattern of termPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const term = match[1] || match[0];
      const termLower = term.toLowerCase();

      // Nur hinzufügen wenn:
      // 1. Nicht bereits existiert
      // 2. Mindestens 3 Zeichen
      // 3. Keine reinen Zahlen
      if (
        !existingLower.includes(termLower) &&
        term.length >= 3 &&
        !/^\d+$/.test(term)
      ) {
        potentialTerms.add(term);
      }
    }
  }

  return Array.from(potentialTerms);
}

/**
 * Validiert ob ein generierter Glossar-Eintrag vollständig ist
 */
export function validateGlossaryEntry(entry: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!entry.term || typeof entry.term !== 'string') {
    errors.push('Term fehlt oder ungültig');
  }

  if (!entry.definition || typeof entry.definition !== 'string') {
    errors.push('Definition fehlt oder ungültig');
  } else if (entry.definition.length < 20) {
    errors.push('Definition zu kurz (min. 20 Zeichen)');
  }

  if (!entry.sections || !Array.isArray(entry.sections)) {
    errors.push('Sections fehlen oder ungültig');
  } else if (entry.sections.length < 2) {
    errors.push('Mindestens 2 Sections erforderlich');
  }

  if (!entry.tags || !Array.isArray(entry.tags)) {
    errors.push('Tags fehlen oder ungültig');
  } else if (entry.tags.length < 1) {
    errors.push('Mindestens 1 Tag erforderlich');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Escaped spezielle Regex-Zeichen
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Berechnet die Lesezeit für einen Text
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generiert SEO-freundliche Meta-Beschreibung
 */
export function generateMetaDescription(
  definition: string,
  maxLength: number = 155
): string {
  if (definition.length <= maxLength) {
    return definition;
  }

  // Schneide am letzten vollständigen Wort ab
  const truncated = definition.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  return truncated.substring(0, lastSpace) + '...';
}
