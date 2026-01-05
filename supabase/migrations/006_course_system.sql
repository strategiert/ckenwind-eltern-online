-- Migration 006: Kurs-System
-- Vollständiges Learning Management System

-- Kurse
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  image_url TEXT,
  -- Preisgestaltung
  price DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  is_free BOOLEAN DEFAULT false,
  -- Status
  is_published BOOLEAN DEFAULT false,
  -- Metadata
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration_minutes INTEGER,
  max_participants INTEGER,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- Kurs-Lektionen
CREATE TABLE public.course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  -- Reihenfolge
  sort_order INTEGER DEFAULT 0,
  -- Status
  is_preview BOOLEAN DEFAULT false, -- Kostenlose Vorschau möglich
  is_published BOOLEAN DEFAULT false,
  -- Metadata
  duration_minutes INTEGER,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  -- Unique per course
  UNIQUE(course_id, slug)
);

-- Kurs-Einschreibungen
CREATE TABLE public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  -- Payment
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'free')),
  payment_provider TEXT,
  payment_id TEXT,
  amount_paid DECIMAL(10,2),
  -- Progress Tracking
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ,
  -- Timestamps
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  -- Ein User kann sich nur einmal für einen Kurs anmelden
  UNIQUE(user_id, course_id)
);

-- Lektion-Fortschritt
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.course_lessons(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES public.course_enrollments(id) ON DELETE CASCADE,
  -- Progress
  is_completed BOOLEAN DEFAULT false,
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  -- Timestamps
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  -- Ein User hat nur einen Progress pro Lektion
  UNIQUE(user_id, lesson_id)
);

-- Indexes
CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_courses_published ON public.courses(is_published) WHERE is_published = true;
CREATE INDEX idx_lessons_course ON public.course_lessons(course_id, sort_order);
CREATE INDEX idx_lessons_slug ON public.course_lessons(course_id, slug);
CREATE INDEX idx_enrollments_user ON public.course_enrollments(user_id);
CREATE INDEX idx_enrollments_course ON public.course_enrollments(course_id);
CREATE INDEX idx_enrollments_status ON public.course_enrollments(payment_status);
CREATE INDEX idx_progress_user ON public.lesson_progress(user_id);
CREATE INDEX idx_progress_lesson ON public.lesson_progress(lesson_id);

-- Helper Function: Kurs-Fortschritt berechnen
CREATE OR REPLACE FUNCTION public.calculate_course_progress(p_user_id UUID, p_course_id UUID)
RETURNS INTEGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_lessons
  FROM public.course_lessons
  WHERE course_id = p_course_id AND is_published = true;

  IF total_lessons = 0 THEN
    RETURN 0;
  END IF;

  SELECT COUNT(*) INTO completed_lessons
  FROM public.lesson_progress lp
  JOIN public.course_lessons cl ON lp.lesson_id = cl.id
  WHERE lp.user_id = p_user_id
    AND cl.course_id = p_course_id
    AND lp.is_completed = true;

  RETURN (completed_lessons * 100 / total_lessons);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
