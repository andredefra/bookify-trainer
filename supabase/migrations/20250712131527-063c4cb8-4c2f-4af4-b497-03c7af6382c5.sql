-- Create gym group sessions tables
CREATE TABLE public.gym_group_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  max_participants INTEGER NOT NULL DEFAULT 20,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price_per_participant NUMERIC NOT NULL DEFAULT 0,
  session_type TEXT NOT NULL DEFAULT 'group_class',
  difficulty_level TEXT NOT NULL DEFAULT 'intermediate',
  requirements TEXT,
  equipment_needed TEXT,
  location TEXT,
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  recurrence_pattern TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for scheduled session instances
CREATE TABLE public.gym_session_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_group_session_id UUID NOT NULL REFERENCES public.gym_group_sessions(id) ON DELETE CASCADE,
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  assigned_trainer_id UUID,
  actual_participants INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for session participants
CREATE TABLE public.gym_session_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_schedule_id UUID NOT NULL REFERENCES public.gym_session_schedules(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  attendance_status TEXT NOT NULL DEFAULT 'registered',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  amount_paid NUMERIC,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_schedule_id, participant_id)
);

-- Create table for session trainer assignments
CREATE TABLE public.gym_session_trainers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_schedule_id UUID NOT NULL REFERENCES public.gym_session_schedules(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'primary',
  compensation_amount NUMERIC,
  compensation_type TEXT NOT NULL DEFAULT 'fixed',
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_schedule_id, trainer_id)
);

-- Enable Row Level Security
ALTER TABLE public.gym_group_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_session_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_session_trainers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for gym_group_sessions
CREATE POLICY "Gyms can manage their group sessions" 
ON public.gym_group_sessions 
FOR ALL 
USING (gym_id = auth.uid())
WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Clients can view active group sessions" 
ON public.gym_group_sessions 
FOR SELECT 
USING (status = 'active');

-- Create RLS policies for gym_session_schedules
CREATE POLICY "Gyms can manage their session schedules" 
ON public.gym_session_schedules 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.gym_group_sessions 
  WHERE id = gym_session_schedules.gym_group_session_id 
  AND gym_id = auth.uid()
));

CREATE POLICY "Clients can view scheduled sessions" 
ON public.gym_session_schedules 
FOR SELECT 
USING (status IN ('scheduled', 'ongoing'));

CREATE POLICY "Trainers can view their assigned sessions" 
ON public.gym_session_schedules 
FOR SELECT 
USING (assigned_trainer_id = auth.uid());

-- Create RLS policies for gym_session_participants
CREATE POLICY "Gyms can manage session participants" 
ON public.gym_session_participants 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.gym_session_schedules gss
  JOIN public.gym_group_sessions ggs ON gss.gym_group_session_id = ggs.id
  WHERE gss.id = gym_session_participants.session_schedule_id 
  AND ggs.gym_id = auth.uid()
));

CREATE POLICY "Participants can view their registrations" 
ON public.gym_session_participants 
FOR SELECT 
USING (participant_id = auth.uid());

CREATE POLICY "Participants can register for sessions" 
ON public.gym_session_participants 
FOR INSERT 
WITH CHECK (participant_id = auth.uid());

-- Create RLS policies for gym_session_trainers
CREATE POLICY "Gyms can manage session trainer assignments" 
ON public.gym_session_trainers 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.gym_session_schedules gss
  JOIN public.gym_group_sessions ggs ON gss.gym_group_session_id = ggs.id
  WHERE gss.id = gym_session_trainers.session_schedule_id 
  AND ggs.gym_id = auth.uid()
));

CREATE POLICY "Trainers can view their session assignments" 
ON public.gym_session_trainers 
FOR SELECT 
USING (trainer_id = auth.uid());

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gym_group_sessions_updated_at
  BEFORE UPDATE ON public.gym_group_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gym_session_schedules_updated_at
  BEFORE UPDATE ON public.gym_session_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gym_session_participants_updated_at
  BEFORE UPDATE ON public.gym_session_participants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gym_session_trainers_updated_at
  BEFORE UPDATE ON public.gym_session_trainers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert demo data
INSERT INTO public.gym_group_sessions (
  gym_id,
  title,
  description,
  max_participants,
  duration_minutes,
  price_per_participant,
  session_type,
  difficulty_level,
  requirements,
  equipment_needed,
  location,
  status
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'Morning HIIT Blast',
  'High-intensity interval training to start your day with energy',
  15,
  45,
  25.00,
  'hiit',
  'intermediate',
  'Basic fitness level required',
  'Kettlebells, resistance bands',
  'Studio A',
  'active'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Yoga Flow',
  'Relaxing yoga session focusing on flexibility and mindfulness',
  20,
  60,
  20.00,
  'yoga',
  'beginner',
  'No experience required',
  'Yoga mats, blocks',
  'Studio B',
  'active'
),
(
  '11111111-1111-1111-1111-111111111111',
  'Strength Circuit',
  'Full-body strength training with compound movements',
  12,
  50,
  30.00,
  'strength',
  'advanced',
  'Previous weight training experience',
  'Barbells, dumbbells, benches',
  'Weight Room',
  'active'
)
ON CONFLICT (id) DO NOTHING;

-- Insert demo session schedules
INSERT INTO public.gym_session_schedules (
  gym_group_session_id,
  start_datetime,
  end_datetime,
  assigned_trainer_id,
  actual_participants,
  status
) VALUES 
(
  (SELECT id FROM public.gym_group_sessions WHERE title = 'Morning HIIT Blast' LIMIT 1),
  '2025-01-15 07:00:00+00',
  '2025-01-15 07:45:00+00',
  '22222222-2222-2222-2222-222222222221',
  8,
  'scheduled'
),
(
  (SELECT id FROM public.gym_group_sessions WHERE title = 'Yoga Flow' LIMIT 1),
  '2025-01-15 18:00:00+00',
  '2025-01-15 19:00:00+00',
  '22222222-2222-2222-2222-222222222222',
  12,
  'scheduled'
),
(
  (SELECT id FROM public.gym_group_sessions WHERE title = 'Strength Circuit' LIMIT 1),
  '2025-01-16 19:00:00+00',
  '2025-01-16 19:50:00+00',
  '22222222-2222-2222-2222-222222222221',
  6,
  'scheduled'
)
ON CONFLICT (id) DO NOTHING;