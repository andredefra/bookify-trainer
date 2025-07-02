
-- Fix RLS policies for calendar_events to handle both UUID and demo user strings properly
-- First, drop existing policies
DROP POLICY IF EXISTS "Trainers can view their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Trainers can create their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Trainers can update their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Trainers can delete their own calendar events" ON calendar_events;

-- Create a helper function to safely convert demo user IDs to UUID or handle them as strings
CREATE OR REPLACE FUNCTION public.is_demo_user_or_matches_auth(trainer_id_value text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if it's a demo user (starts with 'demo-user-')
  IF trainer_id_value LIKE 'demo-user-%' THEN
    -- For demo users, allow access when no auth.uid() (unauthenticated)
    RETURN auth.uid() IS NULL;
  ELSE
    -- For regular users, check if trainer_id matches auth.uid()
    BEGIN
      RETURN trainer_id_value::uuid = auth.uid();
    EXCEPTION WHEN invalid_text_representation THEN
      -- If conversion fails, it's not a valid UUID, so return false
      RETURN false;
    END;
  END IF;
END;
$$;

-- Create new policies using the helper function
CREATE POLICY "Trainers can view their own calendar events" 
ON calendar_events FOR SELECT 
USING (public.is_demo_user_or_matches_auth(trainer_id));

CREATE POLICY "Trainers can create their own calendar events" 
ON calendar_events FOR INSERT 
WITH CHECK (public.is_demo_user_or_matches_auth(trainer_id));

CREATE POLICY "Trainers can update their own calendar events" 
ON calendar_events FOR UPDATE 
USING (public.is_demo_user_or_matches_auth(trainer_id));

CREATE POLICY "Trainers can delete their own calendar events" 
ON calendar_events FOR DELETE 
USING (public.is_demo_user_or_matches_auth(trainer_id));
