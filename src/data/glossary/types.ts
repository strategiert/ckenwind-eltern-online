
export interface GlossaryItem {
  term: string;
  slug: string;
  definition: string;
  tags: string[];
  alias?: string;
  content?: {
    teaser?: string;
    sections?: { title: string; content: string; }[];
    literaryDevices?: { title: string; content: string; }[];
    references?: string[];
    relatedTerms?: string[];
  };
}
