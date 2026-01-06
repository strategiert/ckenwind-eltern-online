-- ============================================
-- Janike Chat System - Erweitertes Gedächtnis
-- ============================================

-- Nutzer-Profile für Chat (auch für anonyme Nutzer)
CREATE TABLE IF NOT EXISTS public.chat_user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Basis-Infos (werden im Gespräch gelernt)
  display_name TEXT,
  children JSONB DEFAULT '[]', -- [{name, age, gender, notes}]
  family_situation TEXT, -- single, couple, patchwork, etc.

  -- Gesprächskontext
  main_concerns TEXT[], -- Hauptthemen/Sorgen
  helpful_strategies TEXT[], -- Was hat geholfen
  unhelpful_strategies TEXT[], -- Was hat nicht geholfen
  goals TEXT[], -- Persönliche Ziele

  -- Präferenzen
  communication_style TEXT DEFAULT 'formal', -- formal, informal
  preferred_exercise_types TEXT[], -- breathing, mindfulness, etc.

  -- Tracking
  total_sessions INTEGER DEFAULT 1,
  last_interaction TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Erinnerungen
CREATE TABLE IF NOT EXISTS public.chat_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  user_profile_id UUID REFERENCES public.chat_user_profiles(id) ON DELETE CASCADE,

  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('exercise', 'checkin', 'tip', 'followup')),
  message TEXT NOT NULL,

  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,

  metadata JSONB, -- zusätzliche Daten (z.B. Übungsdetails)

  created_at TIMESTAMPTZ DEFAULT now()
);

-- Übungen die der Nutzer erhalten hat
CREATE TABLE IF NOT EXISTS public.chat_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,

  exercise_type TEXT NOT NULL, -- breathing, mindfulness, communication, etc.
  exercise_name TEXT NOT NULL,
  exercise_data JSONB NOT NULL, -- Vollständige Übungsdaten

  target TEXT NOT NULL CHECK (target IN ('parent', 'child', 'family')),

  -- Feedback
  completed_at TIMESTAMPTZ,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- Konversations-Zusammenfassungen (für Langzeit-Gedächtnis)
CREATE TABLE IF NOT EXISTS public.chat_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,

  summary_text TEXT NOT NULL,
  key_topics TEXT[],
  emotional_state TEXT, -- anxious, sad, overwhelmed, hopeful, etc.
  action_items TEXT[],

  message_count INTEGER, -- Anzahl der zusammengefassten Nachrichten
  from_message_id UUID,
  to_message_id UUID,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tool-Aufrufe protokollieren
CREATE TABLE IF NOT EXISTS public.chat_tool_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.chat_messages(id) ON DELETE SET NULL,

  tool_name TEXT NOT NULL,
  tool_input JSONB,
  tool_output JSONB,

  success BOOLEAN DEFAULT true,
  error_message TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ressourcen-Empfehlungen tracken
CREATE TABLE IF NOT EXISTS public.chat_resource_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,

  resource_type TEXT NOT NULL CHECK (resource_type IN ('blog', 'glossary', 'ebook', 'external')),
  resource_id UUID, -- ID des Blog-Posts oder Glossar-Eintrags
  resource_url TEXT,
  resource_title TEXT NOT NULL,

  clicked_at TIMESTAMPTZ,
  helpful BOOLEAN,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes für Performance
CREATE INDEX IF NOT EXISTS idx_chat_user_profiles_session ON public.chat_user_profiles(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_user_profiles_user ON public.chat_user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_reminders_scheduled ON public.chat_reminders(scheduled_for) WHERE sent_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_chat_reminders_session ON public.chat_reminders(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_exercises_session ON public.chat_exercises(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_summaries_session ON public.chat_summaries(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_tool_calls_session ON public.chat_tool_calls(session_id);

-- RLS Policies
ALTER TABLE public.chat_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_tool_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_resource_recommendations ENABLE ROW LEVEL SECURITY;

-- Öffentlicher Zugriff für anonyme Chat-Sessions
CREATE POLICY "Anyone can manage their chat profile" ON public.chat_user_profiles FOR ALL USING (true);
CREATE POLICY "Anyone can manage their reminders" ON public.chat_reminders FOR ALL USING (true);
CREATE POLICY "Anyone can manage their exercises" ON public.chat_exercises FOR ALL USING (true);
CREATE POLICY "Anyone can view summaries" ON public.chat_summaries FOR SELECT USING (true);
CREATE POLICY "Service can manage summaries" ON public.chat_summaries FOR ALL USING (true);
CREATE POLICY "Anyone can view tool calls" ON public.chat_tool_calls FOR SELECT USING (true);
CREATE POLICY "Service can manage tool calls" ON public.chat_tool_calls FOR ALL USING (true);
CREATE POLICY "Anyone can manage recommendations" ON public.chat_resource_recommendations FOR ALL USING (true);

-- Funktion um Nutzer-Kontext für eine Session zu holen
CREATE OR REPLACE FUNCTION public.get_chat_context(p_session_id UUID)
RETURNS JSONB AS $$
DECLARE
  context JSONB;
BEGIN
  SELECT jsonb_build_object(
    'profile', (
      SELECT row_to_json(p.*)
      FROM public.chat_user_profiles p
      WHERE p.session_id = p_session_id
      LIMIT 1
    ),
    'recent_messages', (
      SELECT jsonb_agg(row_to_json(m.*))
      FROM (
        SELECT role, content, created_at
        FROM public.chat_messages
        WHERE session_id = p_session_id
        ORDER BY created_at DESC
        LIMIT 20
      ) m
    ),
    'recent_exercises', (
      SELECT jsonb_agg(row_to_json(e.*))
      FROM (
        SELECT exercise_type, exercise_name, completed_at, rating
        FROM public.chat_exercises
        WHERE session_id = p_session_id
        ORDER BY created_at DESC
        LIMIT 5
      ) e
    ),
    'pending_reminders', (
      SELECT jsonb_agg(row_to_json(r.*))
      FROM (
        SELECT reminder_type, message, scheduled_for
        FROM public.chat_reminders
        WHERE session_id = p_session_id AND sent_at IS NULL
        ORDER BY scheduled_for ASC
        LIMIT 5
      ) r
    ),
    'last_summary', (
      SELECT row_to_json(s.*)
      FROM public.chat_summaries s
      WHERE s.session_id = p_session_id
      ORDER BY created_at DESC
      LIMIT 1
    )
  ) INTO context;

  RETURN context;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funktion um Nutzer-Profil zu aktualisieren (aus Gespräch gelernt)
CREATE OR REPLACE FUNCTION public.update_chat_profile_from_conversation(
  p_session_id UUID,
  p_updates JSONB
)
RETURNS public.chat_user_profiles AS $$
DECLARE
  profile public.chat_user_profiles;
BEGIN
  -- Erstelle Profil falls nicht vorhanden
  INSERT INTO public.chat_user_profiles (session_id)
  VALUES (p_session_id)
  ON CONFLICT DO NOTHING;

  -- Update mit den neuen Infos
  UPDATE public.chat_user_profiles
  SET
    display_name = COALESCE(p_updates->>'display_name', display_name),
    children = COALESCE(p_updates->'children', children),
    family_situation = COALESCE(p_updates->>'family_situation', family_situation),
    main_concerns = COALESCE(
      ARRAY(SELECT jsonb_array_elements_text(p_updates->'main_concerns')),
      main_concerns
    ),
    updated_at = now()
  WHERE session_id = p_session_id
  RETURNING * INTO profile;

  RETURN profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
