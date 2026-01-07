-- Quick Admin Fix: Arbeitet mit existierender profiles Tabelle
-- Führe dieses Script im Supabase SQL Editor aus

-- 1. Prüfe und erstelle fehlende Spalten in profiles
DO $$
BEGIN
  -- Füge full_name hinzu falls nicht vorhanden
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
    RAISE NOTICE 'Added full_name column to profiles';
  END IF;

  -- Füge is_admin hinzu falls nicht vorhanden
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;
    RAISE NOTICE 'Added is_admin column to profiles';
  END IF;

  -- Füge updated_at hinzu falls nicht vorhanden
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    RAISE NOTICE 'Added updated_at column to profiles';
  END IF;
END $$;

-- 2. Zeige die aktuelle Tabellenstruktur
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 3. WICHTIG: Setze Admin-Status für deinen Benutzer
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
    -- Erstelle/aktualisiere das Profil (ohne full_name falls es Probleme gibt)
    INSERT INTO public.profiles (id, is_admin)
    VALUES (admin_user_id, true)
    ON CONFLICT (id)
    DO UPDATE SET
      is_admin = true,
      updated_at = COALESCE(now(), EXCLUDED.updated_at);

    RAISE NOTICE 'Admin user set: % (ID: %)', 'klausarentde@gmail.com', admin_user_id;
  ELSE
    RAISE WARNING 'User not found with email: klausarentde@gmail.com';
    RAISE NOTICE 'Please check if you are logged in with the correct email';
  END IF;
END $$;

-- 4. Überprüfung: Zeige den Admin-Benutzer
SELECT
  p.id,
  u.email,
  p.is_admin,
  p.created_at,
  p.updated_at
FROM public.profiles p
LEFT JOIN auth.users u ON u.id = p.id
WHERE p.is_admin = true;

-- 5. Falls KEIN Ergebnis: Zeige alle Profile
SELECT
  p.id,
  u.email,
  p.is_admin,
  p.created_at
FROM public.profiles p
LEFT JOIN auth.users u ON u.id = p.id
LIMIT 5;

-- FERTIG!
-- Nach Ausführung solltest du einen Admin-Benutzer sehen.
-- Falls nicht, führe folgendes aus um manuell Admin zu werden:
--
-- UPDATE public.profiles
-- SET is_admin = true
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'klausarentde@gmail.com');
