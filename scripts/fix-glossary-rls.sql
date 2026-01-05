-- ============================================================
-- FIX GLOSSARY RLS POLICIES
-- Run this in Supabase SQL Editor
-- ============================================================

-- Prüfen ob RLS aktiviert ist und Policies existieren
-- Falls nicht, aktivieren und Policies erstellen

-- 1. RLS für glossary_sections aktivieren (falls nicht schon aktiv)
ALTER TABLE public.glossary_sections ENABLE ROW LEVEL SECURITY;

-- Alte Policies löschen falls vorhanden
DROP POLICY IF EXISTS "Anyone can view sections" ON public.glossary_sections;
DROP POLICY IF EXISTS "Admins can manage sections" ON public.glossary_sections;

-- Neue Policy: Jeder kann Sektionen lesen (ohne Authentifizierung)
CREATE POLICY "Anyone can view sections"
ON public.glossary_sections
FOR SELECT
TO public
USING (true);

-- Admin Policy für Verwaltung
CREATE POLICY "Admins can manage sections"
ON public.glossary_sections
FOR ALL
USING (public.is_admin(auth.uid()));


-- 2. RLS für glossary_references aktivieren
ALTER TABLE public.glossary_references ENABLE ROW LEVEL SECURITY;

-- Alte Policies löschen falls vorhanden
DROP POLICY IF EXISTS "Anyone can view references" ON public.glossary_references;
DROP POLICY IF EXISTS "Admins can manage references" ON public.glossary_references;

-- Neue Policy: Jeder kann Referenzen lesen
CREATE POLICY "Anyone can view references"
ON public.glossary_references
FOR SELECT
TO public
USING (true);

-- Admin Policy für Verwaltung
CREATE POLICY "Admins can manage references"
ON public.glossary_references
FOR ALL
USING (public.is_admin(auth.uid()));


-- 3. RLS für glossary_related_terms aktivieren
ALTER TABLE public.glossary_related_terms ENABLE ROW LEVEL SECURITY;

-- Alte Policies löschen falls vorhanden
DROP POLICY IF EXISTS "Anyone can view related" ON public.glossary_related_terms;
DROP POLICY IF EXISTS "Admins can manage related" ON public.glossary_related_terms;

-- Neue Policy: Jeder kann verwandte Begriffe lesen
CREATE POLICY "Anyone can view related"
ON public.glossary_related_terms
FOR SELECT
TO public
USING (true);

-- Admin Policy für Verwaltung
CREATE POLICY "Admins can manage related"
ON public.glossary_related_terms
FOR ALL
USING (public.is_admin(auth.uid()));


-- 4. Auch glossary_terms prüfen
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published glossary" ON public.glossary_terms;
DROP POLICY IF EXISTS "Admins can manage glossary" ON public.glossary_terms;

CREATE POLICY "Anyone can view published glossary"
ON public.glossary_terms
FOR SELECT
TO public
USING (is_published = true);

CREATE POLICY "Admins can manage glossary"
ON public.glossary_terms
FOR ALL
USING (public.is_admin(auth.uid()));


-- ============================================================
-- VERIFICATION: Teste ob Daten gelesen werden können
-- ============================================================

-- Zähle Begriffe
SELECT 'glossary_terms' as table_name, COUNT(*) as count FROM public.glossary_terms WHERE is_published = true;

-- Zähle Sektionen
SELECT 'glossary_sections' as table_name, COUNT(*) as count FROM public.glossary_sections;

-- Zähle Referenzen
SELECT 'glossary_references' as table_name, COUNT(*) as count FROM public.glossary_references;

-- Teste einen Begriff mit Sektionen
SELECT
  t.term,
  t.slug,
  COUNT(s.id) as section_count
FROM public.glossary_terms t
LEFT JOIN public.glossary_sections s ON s.term_id = t.id
WHERE t.is_published = true
GROUP BY t.id, t.term, t.slug
HAVING COUNT(s.id) > 0
LIMIT 5;

-- ============================================================
-- DONE
-- ============================================================
