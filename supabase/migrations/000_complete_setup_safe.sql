-- =====================================================
-- RÜCKENWIND ELTERN - SAFE DATABASE SETUP
-- =====================================================
-- Diese Version prüft ob Objekte bereits existieren
-- Kann sicher mehrfach ausgeführt werden
-- =====================================================

-- =====================================================
-- 1. ENUMS (mit IF NOT EXISTS Workaround)
-- =====================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'severity_level') THEN
        CREATE TYPE public.severity_level AS ENUM ('mild', 'moderate', 'severe');
    END IF;
END$$;

-- =====================================================
-- 2. PROFILES (User Management)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- is_admin Funktion
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id AND is_admin = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-Profil bei User-Registrierung
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email) VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger (drop und recreate)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 3. BLOG POSTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  reading_time INTEGER,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published, published_at DESC);

-- =====================================================
-- 4. NEWSLETTER & EBOOK
-- =====================================================

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  confirmation_token TEXT,
  confirmed_at TIMESTAMPTZ,
  unsubscribe_token TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
  consent_given BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT false,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ebook_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  consent_given BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_confirmation_token ON public.newsletter_subscribers(confirmation_token);
CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token ON public.newsletter_subscribers(unsubscribe_token);
CREATE INDEX IF NOT EXISTS idx_ebook_email ON public.ebook_downloads(email);

-- =====================================================
-- 5. CHAT SYSTEM
-- =====================================================

CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.icd10_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  symptoms TEXT[],
  severity public.severity_level,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.symptom_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  identified_symptoms TEXT[],
  assessment_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessment_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.symptom_assessments(id) ON DELETE CASCADE,
  condition_id UUID NOT NULL REFERENCES public.icd10_conditions(id) ON DELETE CASCADE,
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON public.chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_icd10_code ON public.icd10_conditions(code);
CREATE INDEX IF NOT EXISTS idx_icd10_category ON public.icd10_conditions(category);
CREATE INDEX IF NOT EXISTS idx_symptom_session ON public.symptom_assessments(session_id);

-- =====================================================
-- 6. GLOSSAR/WIKI SYSTEM (NEU)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.glossary_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  teaser TEXT,
  alias TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.glossary_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_type TEXT DEFAULT 'content' CHECK (section_type IN ('content', 'literary_device', 'example', 'warning')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.glossary_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  reference_text TEXT NOT NULL,
  url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.glossary_related_terms (
  term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  related_term_id UUID NOT NULL REFERENCES public.glossary_terms(id) ON DELETE CASCADE,
  PRIMARY KEY (term_id, related_term_id),
  CHECK (term_id != related_term_id)
);

CREATE INDEX IF NOT EXISTS idx_glossary_slug ON public.glossary_terms(slug);
CREATE INDEX IF NOT EXISTS idx_glossary_term ON public.glossary_terms(term);
CREATE INDEX IF NOT EXISTS idx_glossary_sections_term ON public.glossary_sections(term_id, sort_order);

-- Fulltext search index (skip if exists - can't use IF NOT EXISTS)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_glossary_search') THEN
        CREATE INDEX idx_glossary_search ON public.glossary_terms
          USING GIN(to_tsvector('german', term || ' ' || COALESCE(definition, '')));
    END IF;
END$$;

-- View Count Funktion
CREATE OR REPLACE FUNCTION public.increment_glossary_view(term_slug TEXT)
RETURNS VOID AS $$
  UPDATE public.glossary_terms SET view_count = view_count + 1 WHERE slug = term_slug;
$$ LANGUAGE sql SECURITY DEFINER;

-- =====================================================
-- 7. KURS-SYSTEM (NEU)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  image_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  is_free BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration_minutes INTEGER,
  max_participants INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_preview BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(course_id, slug)
);

CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'free')),
  payment_provider TEXT,
  payment_id TEXT,
  amount_paid DECIMAL(10,2),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.course_lessons(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES public.course_enrollments(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON public.course_lessons(course_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson ON public.lesson_progress(lesson_id);

-- Kurs-Fortschritt Funktion
CREATE OR REPLACE FUNCTION public.calculate_course_progress(p_user_id UUID, p_course_id UUID)
RETURNS INTEGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_lessons
  FROM public.course_lessons
  WHERE course_id = p_course_id AND is_published = true;

  IF total_lessons = 0 THEN RETURN 0; END IF;

  SELECT COUNT(*) INTO completed_lessons
  FROM public.lesson_progress lp
  JOIN public.course_lessons cl ON lp.lesson_id = cl.id
  WHERE lp.user_id = p_user_id AND cl.course_id = p_course_id AND lp.is_completed = true;

  RETURN (completed_lessons * 100 / total_lessons);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 8. ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables (safe to run multiple times)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebook_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icd10_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_related_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies first, then recreate
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on our tables
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
    END LOOP;
END$$;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin(auth.uid()));

-- Blog Policies
CREATE POLICY "Anyone can read published posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage posts" ON public.blog_posts FOR ALL USING (public.is_admin(auth.uid()));

-- Newsletter/Ebook Policies (open for Edge Functions with service role)
CREATE POLICY "Service can manage newsletter" ON public.newsletter_subscribers FOR ALL USING (true);
CREATE POLICY "Service can manage ebook" ON public.ebook_downloads FOR ALL USING (true);

-- Chat Policies (Public Access for anonymous sessions)
CREATE POLICY "Anyone can create sessions" ON public.chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view sessions" ON public.chat_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can update sessions" ON public.chat_sessions FOR UPDATE USING (true);
CREATE POLICY "Anyone can add messages" ON public.chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view messages" ON public.chat_messages FOR SELECT USING (true);

-- ICD-10 Policies
CREATE POLICY "Anyone can view ICD-10" ON public.icd10_conditions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert ICD-10" ON public.icd10_conditions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage ICD-10" ON public.icd10_conditions FOR ALL USING (public.is_admin(auth.uid()));

-- Assessment Policies
CREATE POLICY "Anyone can view assessments" ON public.symptom_assessments FOR SELECT USING (true);
CREATE POLICY "Anyone can create assessments" ON public.symptom_assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view assessment_conditions" ON public.assessment_conditions FOR SELECT USING (true);
CREATE POLICY "Anyone can create assessment_conditions" ON public.assessment_conditions FOR INSERT WITH CHECK (true);

-- Glossar Policies
CREATE POLICY "Anyone can view published glossary" ON public.glossary_terms FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage glossary" ON public.glossary_terms FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Anyone can view sections" ON public.glossary_sections FOR SELECT USING (true);
CREATE POLICY "Admins can manage sections" ON public.glossary_sections FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Anyone can view references" ON public.glossary_references FOR SELECT USING (true);
CREATE POLICY "Admins can manage references" ON public.glossary_references FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Anyone can view related" ON public.glossary_related_terms FOR SELECT USING (true);
CREATE POLICY "Admins can manage related" ON public.glossary_related_terms FOR ALL USING (public.is_admin(auth.uid()));

-- Course Policies
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Anyone can view preview lessons" ON public.course_lessons FOR SELECT USING (is_preview = true AND is_published = true);
CREATE POLICY "Enrolled users can view lessons" ON public.course_lessons FOR SELECT
  USING (is_published = true AND EXISTS (
    SELECT 1 FROM public.course_enrollments
    WHERE course_id = course_lessons.course_id AND user_id = auth.uid() AND payment_status IN ('completed', 'free')
  ));
CREATE POLICY "Admins can manage lessons" ON public.course_lessons FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can view own enrollments" ON public.course_enrollments FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can enroll" ON public.course_enrollments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage enrollments" ON public.course_enrollments FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can manage own progress" ON public.lesson_progress FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Admins can view progress" ON public.lesson_progress FOR SELECT USING (public.is_admin(auth.uid()));

-- =====================================================
-- 9. SEED DATA: ICD-10 CONDITIONS
-- =====================================================

INSERT INTO public.icd10_conditions (code, title, description, category, symptoms, severity)
VALUES
  ('F32.0', 'Leichte depressive Episode', 'Eine leichte depressive Episode mit wenigen Symptomen.', 'Depressive Störungen', ARRAY['Niedergeschlagenheit', 'Müdigkeit', 'Schlafstörungen', 'Appetitveränderungen'], 'mild'),
  ('F32.1', 'Mittelgradige depressive Episode', 'Eine mittelgradige depressive Episode mit mehreren Symptomen.', 'Depressive Störungen', ARRAY['Niedergeschlagenheit', 'Hoffnungslosigkeit', 'Konzentrationsstörungen', 'Antriebslosigkeit', 'Schlafstörungen'], 'moderate'),
  ('F32.2', 'Schwere depressive Episode', 'Eine schwere depressive Episode mit vielen ausgeprägten Symptomen.', 'Depressive Störungen', ARRAY['Schwere Niedergeschlagenheit', 'Suizidgedanken', 'Hoffnungslosigkeit', 'Antriebslosigkeit', 'Schlafstörungen', 'Appetitlosigkeit'], 'severe'),
  ('F41.0', 'Panikstörung', 'Wiederkehrende Panikattacken ohne spezifischen Auslöser.', 'Angststörungen', ARRAY['Panikattacken', 'Herzrasen', 'Atemnot', 'Angst', 'Schwindel'], 'moderate'),
  ('F41.1', 'Generalisierte Angststörung', 'Anhaltende und übermäßige Angst und Sorgen.', 'Angststörungen', ARRAY['Übermäßige Sorgen', 'Nervosität', 'Anspannung', 'Schlafstörungen', 'Konzentrationsprobleme'], 'moderate'),
  ('F43.0', 'Akute Belastungsreaktion', 'Eine vorübergehende Störung als Reaktion auf außergewöhnliche Belastung.', 'Belastungsstörungen', ARRAY['Überwältigung', 'Verwirrung', 'Angst', 'Trauer', 'Verzweiflung'], 'moderate'),
  ('F43.1', 'Posttraumatische Belastungsstörung', 'Verzögerte Reaktion auf ein traumatisches Ereignis.', 'Belastungsstörungen', ARRAY['Flashbacks', 'Albträume', 'Vermeidung', 'Übererregung', 'emotionale Taubheit'], 'severe'),
  ('F43.2', 'Anpassungsstörung', 'Emotionale und Verhaltensstörungen als Reaktion auf Lebensveränderungen.', 'Belastungsstörungen', ARRAY['Niedergeschlagenheit', 'Angst', 'Sorgen', 'Anpassungsschwierigkeiten'], 'mild'),
  ('Z73.0', 'Burnout-Syndrom', 'Zustand der totalen Erschöpfung durch chronische Arbeitsbelastung.', 'Erschöpfungszustände', ARRAY['Erschöpfung', 'Zynismus', 'Leistungsabfall', 'emotionale Erschöpfung', 'Distanzierung'], 'moderate')
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- SETUP COMPLETE
-- =====================================================

SELECT 'Rückenwind Eltern Datenbank-Setup erfolgreich abgeschlossen!' as status;
