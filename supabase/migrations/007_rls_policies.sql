-- Migration 007: Row Level Security Policies
-- Sicherheitsrichtlinien für alle Tabellen

-- =====================================================
-- RLS AKTIVIEREN
-- =====================================================

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

-- =====================================================
-- PROFILES
-- =====================================================

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- =====================================================
-- BLOG POSTS
-- =====================================================

CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  USING (public.is_admin(auth.uid()));

-- =====================================================
-- NEWSLETTER & EBOOK (Service Role / Edge Functions)
-- =====================================================

-- Diese Tabellen werden nur von Edge Functions mit Service Role Key bearbeitet
CREATE POLICY "Service can manage newsletter"
  ON public.newsletter_subscribers FOR ALL
  USING (true);

CREATE POLICY "Service can manage ebook"
  ON public.ebook_downloads FOR ALL
  USING (true);

-- =====================================================
-- CHAT SYSTEM (Public Access für anonyme Sessions)
-- =====================================================

CREATE POLICY "Anyone can create sessions"
  ON public.chat_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view sessions"
  ON public.chat_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update own sessions"
  ON public.chat_sessions FOR UPDATE
  USING (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "Anyone can add messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view messages"
  ON public.chat_messages FOR SELECT
  USING (true);

-- =====================================================
-- ICD-10 CONDITIONS
-- =====================================================

CREATE POLICY "Anyone can view ICD-10"
  ON public.icd10_conditions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage ICD-10"
  ON public.icd10_conditions FOR ALL
  USING (public.is_admin(auth.uid()));

-- =====================================================
-- SYMPTOM ASSESSMENTS
-- =====================================================

CREATE POLICY "Anyone can view assessments"
  ON public.symptom_assessments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create assessments"
  ON public.symptom_assessments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view assessment conditions"
  ON public.assessment_conditions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create assessment conditions"
  ON public.assessment_conditions FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- GLOSSAR
-- =====================================================

CREATE POLICY "Anyone can view published glossary terms"
  ON public.glossary_terms FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all glossary terms"
  ON public.glossary_terms FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert glossary terms"
  ON public.glossary_terms FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update glossary terms"
  ON public.glossary_terms FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete glossary terms"
  ON public.glossary_terms FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Sections - Public read für published terms
CREATE POLICY "Anyone can view sections of published terms"
  ON public.glossary_sections FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.glossary_terms
    WHERE id = term_id AND is_published = true
  ));

CREATE POLICY "Admins can manage sections"
  ON public.glossary_sections FOR ALL
  USING (public.is_admin(auth.uid()));

-- References
CREATE POLICY "Anyone can view references of published terms"
  ON public.glossary_references FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.glossary_terms
    WHERE id = term_id AND is_published = true
  ));

CREATE POLICY "Admins can manage references"
  ON public.glossary_references FOR ALL
  USING (public.is_admin(auth.uid()));

-- Related Terms
CREATE POLICY "Anyone can view related terms"
  ON public.glossary_related_terms FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.glossary_terms
    WHERE id = term_id AND is_published = true
  ));

CREATE POLICY "Admins can manage related terms"
  ON public.glossary_related_terms FOR ALL
  USING (public.is_admin(auth.uid()));

-- =====================================================
-- KURSE
-- =====================================================

-- Courses
CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all courses"
  ON public.courses FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert courses"
  ON public.courses FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update courses"
  ON public.courses FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete courses"
  ON public.courses FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Lessons - Preview oder enrolled
CREATE POLICY "Anyone can view preview lessons"
  ON public.course_lessons FOR SELECT
  USING (is_preview = true AND is_published = true);

CREATE POLICY "Enrolled users can view course lessons"
  ON public.course_lessons FOR SELECT
  USING (
    is_published = true AND
    EXISTS (
      SELECT 1 FROM public.course_enrollments
      WHERE course_id = course_lessons.course_id
      AND user_id = auth.uid()
      AND payment_status IN ('completed', 'free')
    )
  );

CREATE POLICY "Admins can manage lessons"
  ON public.course_lessons FOR ALL
  USING (public.is_admin(auth.uid()));

-- Enrollments
CREATE POLICY "Users can view own enrollments"
  ON public.course_enrollments FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can enroll themselves"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own enrollments"
  ON public.course_enrollments FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all enrollments"
  ON public.course_enrollments FOR ALL
  USING (public.is_admin(auth.uid()));

-- Lesson Progress
CREATE POLICY "Users can view own progress"
  ON public.lesson_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own progress"
  ON public.lesson_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON public.lesson_progress FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all progress"
  ON public.lesson_progress FOR SELECT
  USING (public.is_admin(auth.uid()));
