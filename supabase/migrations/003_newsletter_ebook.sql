-- Migration 003: Newsletter & E-Book Downloads
-- DSGVO-konforme Newsletter-Verwaltung und E-Book Download Tracking

-- Newsletter Subscribers
CREATE TABLE public.newsletter_subscribers (
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

-- E-Book Downloads
CREATE TABLE public.ebook_downloads (
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

-- Indexes
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_confirmation_token ON public.newsletter_subscribers(confirmation_token);
CREATE INDEX idx_newsletter_unsubscribe_token ON public.newsletter_subscribers(unsubscribe_token);
CREATE INDEX idx_newsletter_active ON public.newsletter_subscribers(is_active) WHERE is_active = true;
CREATE INDEX idx_ebook_email ON public.ebook_downloads(email);
