-- Insert demo client profile with height and gender for body composition calculations
-- user_id is set to NULL since this is a demo user without actual auth
INSERT INTO public.user_profiles (
  id,
  user_id,
  first_name,
  last_name,
  height,
  gender,
  created_at,
  updated_at
)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  NULL,
  'Marco',
  'Demo',
  175,
  'male',
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET
  height = EXCLUDED.height,
  gender = EXCLUDED.gender,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  updated_at = now();