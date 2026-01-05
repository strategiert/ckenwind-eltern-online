-- Migration 005: Glossar/Wiki System
-- Skalierbar für 10.000+ Seiten

-- Glossar-Begriffe (Haupttabelle)
CREATE TABLE public.glossary_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  teaser TEXT,
  alias TEXT,
  tags TEXT[] DEFAULT '{}',
  -- SEO Felder
  meta_title TEXT,
  meta_description TEXT,
  -- Status
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Glossar-Sektionen (Detail-Inhalte)
CREATE TABLE public.glossary_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_type TEXT DEFAULT 'content' CHECK (section_type IN ('content', 'literary_device', 'example', 'warning')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Glossar-Referenzen/Quellen
CREATE TABLE public.glossary_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  reference_text TEXT NOT NULL,
  url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Verwandte Begriffe (Self-Referencing Many-to-Many)
CREATE TABLE public.glossary_related_terms (
  term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  related_term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  PRIMARY KEY (term_id, related_term_id),
  CHECK (term_id != related_term_id)
);

-- Indexes für Performance (kritisch für 10.000+ Seiten)
CREATE INDEX idx_glossary_slug ON public.glossary_terms(slug);
CREATE INDEX idx_glossary_term ON public.glossary_terms(term);
CREATE INDEX idx_glossary_letter ON public.glossary_terms(UPPER(LEFT(term, 1)));
CREATE INDEX idx_glossary_tags ON public.glossary_terms USING GIN(tags);
CREATE INDEX idx_glossary_published ON public.glossary_terms(is_published) WHERE is_published = true;

-- Volltext-Suche Index (German)
CREATE INDEX idx_glossary_search ON public.glossary_terms
  USING GIN(to_tsvector('german', term || ' ' || COALESCE(definition, '') || ' ' || COALESCE(alias, '')));

-- Sections Index
CREATE INDEX idx_glossary_sections_term ON public.glossary_sections(term_id, sort_order);

-- View Count Increment Function
CREATE OR REPLACE FUNCTION public.increment_glossary_view(term_slug TEXT)
RETURNS VOID AS $$
  UPDATE public.glossary_terms SET view_count = view_count + 1 WHERE slug = term_slug;
$$ LANGUAGE sql SECURITY DEFINER;
