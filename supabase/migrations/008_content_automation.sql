-- ============================================================
-- CONTENT AUTOMATION SYSTEM
-- Automatisches Wiki-Content-Generierungssystem
-- ============================================================

-- Content-Queue für geplante Generierung
CREATE TABLE IF NOT EXISTS public.content_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL CHECK (content_type IN ('glossary', 'blog')),
  topic TEXT NOT NULL,
  category TEXT,
  keywords TEXT[],
  priority INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'review')),
  generated_content JSONB,
  error_message TEXT,
  scheduled_for TIMESTAMPTZ,
  processed_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  auto_publish BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Themen-Vorschläge von Gemini
CREATE TABLE IF NOT EXISTS public.topic_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  category TEXT,
  relevance_score DECIMAL(3,2),
  source TEXT CHECK (source IN ('ai_suggested', 'manual', 'trending', 'gap_analysis')),
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Content-Generierungs-Log für Monitoring
CREATE TABLE IF NOT EXISTS public.content_generation_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_id UUID REFERENCES public.content_queue(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  model_used TEXT,
  tokens_used INTEGER,
  duration_ms INTEGER,
  success BOOLEAN,
  error_details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Wiki-Kategorien für hierarchische Struktur
CREATE TABLE IF NOT EXISTS public.wiki_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.wiki_categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Glossar-Kategorie-Zuordnung (falls Spalte noch nicht existiert)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'glossary_terms'
    AND column_name = 'category_id'
  ) THEN
    ALTER TABLE public.glossary_terms ADD COLUMN category_id UUID REFERENCES public.wiki_categories(id);
  END IF;
END $$;

-- Indexes für Performance
CREATE INDEX IF NOT EXISTS idx_content_queue_status ON public.content_queue(status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_content_queue_type ON public.content_queue(content_type);
CREATE INDEX IF NOT EXISTS idx_content_queue_priority ON public.content_queue(priority DESC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_topic_suggestions_unused ON public.topic_suggestions(used, relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_wiki_categories_parent ON public.wiki_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_wiki_categories_slug ON public.wiki_categories(slug);
CREATE INDEX IF NOT EXISTS idx_generation_log_queue ON public.content_generation_log(queue_id);
CREATE INDEX IF NOT EXISTS idx_generation_log_created ON public.content_generation_log(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.content_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_generation_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wiki_categories ENABLE ROW LEVEL SECURITY;

-- Content Queue: Admins only
CREATE POLICY "Admins can manage content queue" ON public.content_queue
  FOR ALL USING (public.is_admin(auth.uid()));

-- Topic Suggestions: Admins only
CREATE POLICY "Admins can manage topic suggestions" ON public.topic_suggestions
  FOR ALL USING (public.is_admin(auth.uid()));

-- Generation Log: Admins only
CREATE POLICY "Admins can view generation logs" ON public.content_generation_log
  FOR ALL USING (public.is_admin(auth.uid()));

-- Wiki Categories: Public read, Admin write
CREATE POLICY "Anyone can view wiki categories" ON public.wiki_categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage wiki categories" ON public.wiki_categories
  FOR ALL USING (public.is_admin(auth.uid()));

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Funktion zum Abrufen des nächsten Queue-Items
CREATE OR REPLACE FUNCTION public.get_next_queue_item()
RETURNS public.content_queue AS $$
DECLARE
  item public.content_queue;
BEGIN
  -- Hole das nächste pending Item mit höchster Priorität
  SELECT * INTO item
  FROM public.content_queue
  WHERE status = 'pending'
    AND (scheduled_for IS NULL OR scheduled_for <= now())
  ORDER BY priority DESC, created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;

  -- Markiere als processing
  IF item.id IS NOT NULL THEN
    UPDATE public.content_queue
    SET status = 'processing'
    WHERE id = item.id;
  END IF;

  RETURN item;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funktion zum Loggen von Generierungs-Aktivitäten
CREATE OR REPLACE FUNCTION public.log_content_generation(
  p_queue_id UUID,
  p_action TEXT,
  p_model TEXT,
  p_tokens INTEGER,
  p_duration INTEGER,
  p_success BOOLEAN,
  p_error TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.content_generation_log (
    queue_id, action, model_used, tokens_used, duration_ms, success, error_details
  ) VALUES (
    p_queue_id, p_action, p_model, p_tokens, p_duration, p_success, p_error
  ) RETURNING id INTO log_id;

  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funktion für Statistiken
CREATE OR REPLACE FUNCTION public.get_content_generation_stats(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
  total_generated BIGINT,
  successful BIGINT,
  failed BIGINT,
  total_tokens BIGINT,
  avg_duration_ms NUMERIC,
  glossary_count BIGINT,
  blog_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_generated,
    COUNT(*) FILTER (WHERE cq.status = 'completed')::BIGINT as successful,
    COUNT(*) FILTER (WHERE cq.status = 'failed')::BIGINT as failed,
    COALESCE(SUM(cl.tokens_used), 0)::BIGINT as total_tokens,
    COALESCE(AVG(cl.duration_ms), 0)::NUMERIC as avg_duration_ms,
    COUNT(*) FILTER (WHERE cq.content_type = 'glossary')::BIGINT as glossary_count,
    COUNT(*) FILTER (WHERE cq.content_type = 'blog')::BIGINT as blog_count
  FROM public.content_queue cq
  LEFT JOIN public.content_generation_log cl ON cl.queue_id = cq.id
  WHERE cq.created_at >= now() - (days_back || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- INITIAL WIKI CATEGORIES
-- ============================================================

INSERT INTO public.wiki_categories (name, slug, description, sort_order, icon) VALUES
  ('Psychische Gesundheit', 'psychische-gesundheit', 'Begriffe rund um psychische Gesundheit und Wohlbefinden', 1, 'brain'),
  ('Elternschaft', 'elternschaft', 'Themen zu Erziehung und Elternsein', 2, 'users'),
  ('Therapie & Behandlung', 'therapie-behandlung', 'Therapieformen und Behandlungsmethoden', 3, 'heart-handshake'),
  ('Entwicklung', 'entwicklung', 'Kindliche Entwicklung und Entwicklungspsychologie', 4, 'trending-up'),
  ('Stress & Burnout', 'stress-burnout', 'Stressmanagement und Burnout-Prävention', 5, 'battery-low'),
  ('ADHS', 'adhs', 'Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung', 6, 'zap'),
  ('Essstörungen', 'essstoerungen', 'Essstörungen und Körperbild', 7, 'utensils'),
  ('Angst & Depression', 'angst-depression', 'Angststörungen und depressive Erkrankungen', 8, 'cloud-rain'),
  ('Achtsamkeit', 'achtsamkeit', 'Achtsamkeit und Selbstfürsorge', 9, 'leaf'),
  ('Kommunikation', 'kommunikation', 'Kommunikation in der Familie', 10, 'message-circle')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- INITIAL TOPIC SUGGESTIONS (Starter-Themen)
-- ============================================================

INSERT INTO public.topic_suggestions (topic, category, relevance_score, source) VALUES
  -- Psychische Gesundheit
  ('Resilienz', 'psychische-gesundheit', 0.95, 'manual'),
  ('Selbstwertgefühl', 'psychische-gesundheit', 0.90, 'manual'),
  ('Emotionale Intelligenz', 'psychische-gesundheit', 0.88, 'manual'),
  ('Psychosomatik', 'psychische-gesundheit', 0.85, 'manual'),

  -- Elternschaft
  ('Attachment Parenting', 'elternschaft', 0.92, 'manual'),
  ('Positive Disziplin', 'elternschaft', 0.90, 'manual'),
  ('Eltern-Kind-Bindung', 'elternschaft', 0.95, 'manual'),
  ('Grenzen setzen', 'elternschaft', 0.88, 'manual'),
  ('Geschwisterrivalität', 'elternschaft', 0.82, 'manual'),

  -- Therapie
  ('Systemische Therapie', 'therapie-behandlung', 0.90, 'manual'),
  ('EMDR', 'therapie-behandlung', 0.85, 'manual'),
  ('Spieltherapie', 'therapie-behandlung', 0.88, 'manual'),
  ('Familientherapie', 'therapie-behandlung', 0.92, 'manual'),

  -- Entwicklung
  ('Trotzphase', 'entwicklung', 0.95, 'manual'),
  ('Autonomieentwicklung', 'entwicklung', 0.88, 'manual'),
  ('Sprachentwicklung', 'entwicklung', 0.85, 'manual'),
  ('Motorische Entwicklung', 'entwicklung', 0.82, 'manual'),

  -- Stress & Burnout
  ('Erschöpfungsdepression', 'stress-burnout', 0.90, 'manual'),
  ('Work-Life-Balance', 'stress-burnout', 0.92, 'manual'),
  ('Stressoren', 'stress-burnout', 0.85, 'manual'),
  ('Regeneration', 'stress-burnout', 0.88, 'manual'),

  -- ADHS
  ('Hyperaktivität', 'adhs', 0.90, 'manual'),
  ('Impulskontrolle', 'adhs', 0.88, 'manual'),
  ('Konzentrationsstörung', 'adhs', 0.92, 'manual'),
  ('Medikamentöse Behandlung ADHS', 'adhs', 0.85, 'manual'),

  -- Essstörungen
  ('Anorexie', 'essstoerungen', 0.95, 'manual'),
  ('Bulimie', 'essstoerungen', 0.95, 'manual'),
  ('Körperdysmorphe Störung', 'essstoerungen', 0.85, 'manual'),
  ('Orthorexie', 'essstoerungen', 0.80, 'manual'),

  -- Angst & Depression
  ('Panikattacke', 'angst-depression', 0.95, 'manual'),
  ('Soziale Phobie', 'angst-depression', 0.90, 'manual'),
  ('Postpartale Depression', 'angst-depression', 0.92, 'manual'),
  ('Generalisierte Angststörung', 'angst-depression', 0.88, 'manual'),

  -- Achtsamkeit
  ('Meditation', 'achtsamkeit', 0.90, 'manual'),
  ('Body Scan', 'achtsamkeit', 0.85, 'manual'),
  ('Selbstmitgefühl', 'achtsamkeit', 0.88, 'manual'),
  ('Progressive Muskelentspannung', 'achtsamkeit', 0.82, 'manual'),

  -- Kommunikation
  ('Gewaltfreie Kommunikation', 'kommunikation', 0.95, 'manual'),
  ('Aktives Zuhören', 'kommunikation', 0.90, 'manual'),
  ('Ich-Botschaften', 'kommunikation', 0.88, 'manual'),
  ('Konfliktkompetenz', 'kommunikation', 0.85, 'manual')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONE
-- ============================================================

COMMENT ON TABLE public.content_queue IS 'Queue für automatische Content-Generierung';
COMMENT ON TABLE public.topic_suggestions IS 'Vorgeschlagene Themen für Content-Generierung';
COMMENT ON TABLE public.content_generation_log IS 'Log aller Generierungs-Aktivitäten';
COMMENT ON TABLE public.wiki_categories IS 'Hierarchische Kategorien für Wiki/Glossar';
