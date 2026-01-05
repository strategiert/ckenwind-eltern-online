-- Migration 004: Chat System
-- Mental Health Chat mit ICD-10 Integration

-- Chat Sessions
CREATE TABLE public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Chat Messages
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ICD-10 Conditions (Referenztabelle für medizinische Diagnosen)
CREATE TABLE public.icd10_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  symptoms TEXT[],
  severity public.severity_level,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Symptom Assessments
CREATE TABLE public.symptom_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  identified_symptoms TEXT[],
  assessment_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Assessment Conditions (Junction Table)
CREATE TABLE public.assessment_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.symptom_assessments(id) ON DELETE CASCADE,
  condition_id UUID NOT NULL REFERENCES public.icd10_conditions(id) ON DELETE CASCADE,
  confidence_score DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_chat_sessions_user ON public.chat_sessions(user_id);
CREATE INDEX idx_chat_messages_session ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created ON public.chat_messages(created_at);
CREATE INDEX idx_icd10_code ON public.icd10_conditions(code);
CREATE INDEX idx_icd10_category ON public.icd10_conditions(category);
CREATE INDEX idx_symptom_session ON public.symptom_assessments(session_id);
CREATE INDEX idx_assessment_conditions_assessment ON public.assessment_conditions(assessment_id);
CREATE INDEX idx_assessment_conditions_condition ON public.assessment_conditions(condition_id);
