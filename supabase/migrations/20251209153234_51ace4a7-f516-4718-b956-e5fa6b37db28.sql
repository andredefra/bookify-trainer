-- Create check_in_settings table for trainer configuration per client
CREATE TABLE public.check_in_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  frequency TEXT NOT NULL DEFAULT 'weekly' CHECK (frequency IN ('daily', 'weekly', 'biweekly', 'monthly')),
  enabled BOOLEAN NOT NULL DEFAULT true,
  reminder_time TIME DEFAULT '09:00',
  reminder_days_before INTEGER DEFAULT 1,
  include_weight BOOLEAN NOT NULL DEFAULT true,
  include_measurements BOOLEAN NOT NULL DEFAULT true,
  include_photos BOOLEAN NOT NULL DEFAULT false,
  include_mood BOOLEAN NOT NULL DEFAULT true,
  include_notes BOOLEAN NOT NULL DEFAULT true,
  custom_questions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(trainer_id, client_id)
);

-- Create check_in_submissions table for client check-in data
CREATE TABLE public.check_in_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  settings_id UUID NOT NULL REFERENCES public.check_in_settings(id) ON DELETE CASCADE,
  client_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  due_date DATE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue', 'skipped')),
  weight DECIMAL,
  measurements JSONB DEFAULT '{}'::jsonb,
  photos JSONB DEFAULT '[]'::jsonb,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  notes TEXT,
  custom_answers JSONB DEFAULT '{}'::jsonb,
  trainer_feedback TEXT,
  trainer_reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.check_in_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_in_submissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for check_in_settings
CREATE POLICY "Trainers can manage their check-in settings"
ON public.check_in_settings
FOR ALL
USING (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001'::uuid)
WITH CHECK (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001'::uuid);

CREATE POLICY "Clients can view their check-in settings"
ON public.check_in_settings
FOR SELECT
USING (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002'::uuid);

-- RLS policies for check_in_submissions
CREATE POLICY "Trainers can manage client submissions"
ON public.check_in_submissions
FOR ALL
USING (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001'::uuid)
WITH CHECK (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001'::uuid);

CREATE POLICY "Clients can manage their own submissions"
ON public.check_in_submissions
FOR ALL
USING (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002'::uuid)
WITH CHECK (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002'::uuid);

-- Create updated_at triggers
CREATE TRIGGER update_check_in_settings_updated_at
BEFORE UPDATE ON public.check_in_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_check_in_submissions_updated_at
BEFORE UPDATE ON public.check_in_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_check_in_settings_trainer ON public.check_in_settings(trainer_id);
CREATE INDEX idx_check_in_settings_client ON public.check_in_settings(client_id);
CREATE INDEX idx_check_in_submissions_settings ON public.check_in_submissions(settings_id);
CREATE INDEX idx_check_in_submissions_client ON public.check_in_submissions(client_id);
CREATE INDEX idx_check_in_submissions_status ON public.check_in_submissions(status);
CREATE INDEX idx_check_in_submissions_due_date ON public.check_in_submissions(due_date);