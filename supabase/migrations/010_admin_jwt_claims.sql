-- Migration: Add is_admin to JWT claims
-- This allows checking admin status without database queries

-- Function to add is_admin claim to JWT
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  claims jsonb;
  user_is_admin boolean;
BEGIN
  -- Get the user's admin status from profiles
  SELECT is_admin INTO user_is_admin
  FROM public.profiles
  WHERE id = (event->>'user_id')::uuid;

  -- Default to false if not found
  user_is_admin := COALESCE(user_is_admin, false);

  -- Get existing claims
  claims := event->'claims';

  -- Add is_admin to app_metadata in claims
  IF claims->'app_metadata' IS NULL THEN
    claims := jsonb_set(claims, '{app_metadata}', '{}');
  END IF;

  claims := jsonb_set(claims, '{app_metadata, is_admin}', to_jsonb(user_is_admin));

  -- Return the modified event
  RETURN jsonb_set(event, '{claims}', claims);
END;
$$;

-- Grant execute permission to supabase_auth_admin
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;

-- Revoke from public for security
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM PUBLIC;

-- Note: After running this migration, you need to enable the hook in Supabase Dashboard:
-- 1. Go to Authentication > Hooks
-- 2. Enable "Custom Access Token" hook
-- 3. Select the function "custom_access_token_hook"
