-- Create trainer_shifts table for managing trainer work schedules
CREATE TABLE public.trainer_shifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  shift_type TEXT NOT NULL DEFAULT 'regular',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trainer_shifts ENABLE ROW LEVEL SECURITY;

-- Create policies for trainer_shifts
CREATE POLICY "Gyms can manage their trainer shifts" 
ON public.trainer_shifts 
FOR ALL 
USING (gym_id = auth.uid())
WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Trainers can view their shifts" 
ON public.trainer_shifts 
FOR SELECT 
USING (trainer_id = auth.uid());

-- Create trainer_availability table for tracking real-time availability
CREATE TABLE public.trainer_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  gym_id UUID NOT NULL,
  day_of_week INTEGER NOT NULL, -- 0 = Sunday, 1 = Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trainer_availability ENABLE ROW LEVEL SECURITY;

-- Create policies for trainer_availability
CREATE POLICY "Gyms can manage trainer availability" 
ON public.trainer_availability 
FOR ALL 
USING (gym_id = auth.uid())
WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Trainers can view and update their availability" 
ON public.trainer_availability 
FOR ALL 
USING (trainer_id = auth.uid())
WITH CHECK (trainer_id = auth.uid());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_trainer_shifts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_trainer_availability_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_trainer_shifts_updated_at
BEFORE UPDATE ON public.trainer_shifts
FOR EACH ROW
EXECUTE FUNCTION public.update_trainer_shifts_updated_at();

CREATE TRIGGER update_trainer_availability_updated_at
BEFORE UPDATE ON public.trainer_availability
FOR EACH ROW
EXECUTE FUNCTION public.update_trainer_availability_updated_at();