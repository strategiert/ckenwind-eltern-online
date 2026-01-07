-- Quick Fix: Admin Setup für neue Datenbank
-- Führe dieses Script im Supabase SQL Editor aus

-- 1. Profiles Tabelle erstellen (falls nicht vorhanden)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. RLS aktivieren
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies für profiles
-- Jeder kann sein eigenes Profil lesen
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Jeder kann sein eigenes Profil aktualisieren (aber nicht is_admin)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service Role kann alles (für automatische Profile-Erstellung)
DROP POLICY IF EXISTS "Service role can manage profiles" ON public.profiles;
CREATE POLICY "Service role can manage profiles" ON public.profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Trigger: Profil automatisch erstellen bei User-Registrierung
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. WICHTIG: Deinen Benutzer als Admin markieren
-- Ersetze 'klausarentde@gmail.com' mit deiner E-Mail, falls anders
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Finde die User-ID basierend auf der E-Mail
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'klausarentde@gmail.com'
  LIMIT 1;

  IF admin_user_id IS NOT NULL THEN
    -- Erstelle/aktualisiere das Profil
    INSERT INTO public.profiles (id, email, is_admin, full_name)
    VALUES (
      admin_user_id,
      'klausarentde@gmail.com',
      true,
      'Klaus Arent'
    )
    ON CONFLICT (id)
    DO UPDATE SET
      is_admin = true,
      updated_at = now();

    RAISE NOTICE 'Admin user created/updated: %', admin_user_id;
  ELSE
    RAISE NOTICE 'User not found with email: klausarentde@gmail.com';
  END IF;
END $$;

-- 6. Überprüfung: Zeige alle Admin-Benutzer an
SELECT
  p.id,
  p.email,
  p.full_name,
  p.is_admin,
  p.created_at
FROM public.profiles p
WHERE p.is_admin = true;

-- FERTIG! Nach Ausführung dieses Scripts:
-- 1. Neu laden der Webseite (Strg+Shift+R / Cmd+Shift+R)
-- 2. Versuche /admin erneut aufzurufen
