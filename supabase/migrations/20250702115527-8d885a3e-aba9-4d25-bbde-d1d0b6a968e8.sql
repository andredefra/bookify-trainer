
-- Update RLS policies for calendar_events to support demo users
-- First, drop existing policies
DROP POLICY IF EXISTS "Trainers can view their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Trainers can create their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Trainers can update their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Trainers can delete their own calendar events" ON calendar_events;

-- Create new policies that support both authenticated users and demo users
CREATE POLICY "Trainers can view their own calendar events" 
ON calendar_events FOR SELECT 
USING (
  trainer_id = auth.uid()::text OR 
  (auth.uid() IS NULL AND trainer_id LIKE 'demo-user-%')
);

CREATE POLICY "Trainers can create their own calendar events" 
ON calendar_events FOR INSERT 
WITH CHECK (
  trainer_id = auth.uid()::text OR 
  (auth.uid() IS NULL AND trainer_id LIKE 'demo-user-%')
);

CREATE POLICY "Trainers can update their own calendar events" 
ON calendar_events FOR UPDATE 
USING (
  trainer_id = auth.uid()::text OR 
  (auth.uid() IS NULL AND trainer_id LIKE 'demo-user-%')
);

CREATE POLICY "Trainers can delete their own calendar events" 
ON calendar_events FOR DELETE 
USING (
  trainer_id = auth.uid()::text OR 
  (auth.uid() IS NULL AND trainer_id LIKE 'demo-user-%')
);
