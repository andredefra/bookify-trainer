
-- Create table for program assignments with tracking
CREATE TABLE public.program_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  program_id TEXT NOT NULL,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  estimated_end_date DATE NOT NULL,
  actual_end_date DATE,
  target_frequency INTEGER NOT NULL DEFAULT 3,
  total_sessions_planned INTEGER NOT NULL,
  sessions_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for trainer notifications
CREATE TABLE public.trainer_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('program_expiring', 'client_behind_schedule', 'program_completed')),
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  related_program_assignment_id UUID REFERENCES public.program_assignments(id),
  related_client_id UUID
);

-- Add RLS policies for program_assignments
ALTER TABLE public.program_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trainers can view their program assignments" 
  ON public.program_assignments 
  FOR SELECT 
  USING (trainer_id::text = auth.jwt() ->> 'sub');

CREATE POLICY "Trainers can create their program assignments" 
  ON public.program_assignments 
  FOR INSERT 
  WITH CHECK (trainer_id::text = auth.jwt() ->> 'sub');

CREATE POLICY "Trainers can update their program assignments" 
  ON public.program_assignments 
  FOR UPDATE 
  USING (trainer_id::text = auth.jwt() ->> 'sub');

CREATE POLICY "Trainers can delete their program assignments" 
  ON public.program_assignments 
  FOR DELETE 
  USING (trainer_id::text = auth.jwt() ->> 'sub');

-- Add RLS policies for trainer_notifications
ALTER TABLE public.trainer_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trainers can view their notifications" 
  ON public.trainer_notifications 
  FOR SELECT 
  USING (trainer_id::text = auth.jwt() ->> 'sub');

CREATE POLICY "Trainers can update their notifications" 
  ON public.trainer_notifications 
  FOR UPDATE 
  USING (trainer_id::text = auth.jwt() ->> 'sub');

-- Create function to update estimated_end_date based on current progress
CREATE OR REPLACE FUNCTION update_estimated_end_date()
RETURNS TRIGGER AS $$
DECLARE
  weeks_elapsed INTEGER;
  current_rate DECIMAL;
  remaining_sessions INTEGER;
  estimated_weeks_remaining DECIMAL;
BEGIN
  -- Calculate weeks elapsed since start
  weeks_elapsed := EXTRACT(EPOCH FROM (CURRENT_DATE - NEW.start_date)) / 604800;
  
  -- Avoid division by zero
  IF weeks_elapsed = 0 THEN
    weeks_elapsed := 1;
  END IF;
  
  -- Calculate current completion rate (sessions per week)
  current_rate := NEW.sessions_completed::DECIMAL / weeks_elapsed;
  
  -- If rate is too low, use target frequency as minimum
  IF current_rate < 0.5 THEN
    current_rate := NEW.target_frequency::DECIMAL;
  END IF;
  
  -- Calculate remaining sessions and estimated weeks
  remaining_sessions := NEW.total_sessions_planned - NEW.sessions_completed;
  
  IF remaining_sessions <= 0 THEN
    NEW.estimated_end_date := CURRENT_DATE;
  ELSE
    estimated_weeks_remaining := remaining_sessions / current_rate;
    NEW.estimated_end_date := CURRENT_DATE + (estimated_weeks_remaining * 7)::INTEGER;
  END IF;
  
  NEW.updated_at := now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update estimated end date
CREATE TRIGGER update_program_assignment_end_date
  BEFORE UPDATE OF sessions_completed ON public.program_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_estimated_end_date();

-- Create function to generate notifications for expiring programs
CREATE OR REPLACE FUNCTION generate_expiring_program_notifications()
RETURNS void AS $$
BEGIN
  -- Insert notifications for programs expiring in 7 days
  INSERT INTO public.trainer_notifications (trainer_id, type, message, related_program_assignment_id, related_client_id)
  SELECT DISTINCT
    pa.trainer_id,
    'program_expiring',
    'Program scadenza tra 7 giorni per cliente ID: ' || pa.client_id,
    pa.id,
    pa.client_id
  FROM public.program_assignments pa
  WHERE pa.estimated_end_date <= CURRENT_DATE + INTERVAL '7 days'
    AND pa.estimated_end_date >= CURRENT_DATE
    AND pa.actual_end_date IS NULL
    AND NOT EXISTS (
      SELECT 1 FROM public.trainer_notifications tn
      WHERE tn.trainer_id = pa.trainer_id
        AND tn.type = 'program_expiring'
        AND tn.related_program_assignment_id = pa.id
        AND tn.created_at >= CURRENT_DATE - INTERVAL '1 day'
    );
END;
$$ LANGUAGE plpgsql;
