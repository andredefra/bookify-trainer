-- Create trainer_gym_affiliations table for managing multiple gym affiliations per trainer
CREATE TABLE public.trainer_gym_affiliations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  gym_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected, active, inactive
  request_message TEXT,
  response_message TEXT,
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  commission_rate NUMERIC DEFAULT 20.0,
  contract_details JSONB DEFAULT '{}',
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(trainer_id, gym_id)
);

-- Add primary_gym_id to trainer_profiles for main gym display
ALTER TABLE public.trainer_profiles 
ADD COLUMN primary_gym_id UUID REFERENCES public.trainer_gym_affiliations(gym_id);

-- Enable RLS on trainer_gym_affiliations
ALTER TABLE public.trainer_gym_affiliations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trainer_gym_affiliations
CREATE POLICY "Trainers can view their own affiliations" 
ON public.trainer_gym_affiliations 
FOR SELECT 
USING (trainer_id = auth.uid());

CREATE POLICY "Trainers can create affiliation requests" 
ON public.trainer_gym_affiliations 
FOR INSERT 
WITH CHECK (trainer_id = auth.uid());

CREATE POLICY "Trainers can update their own affiliation requests" 
ON public.trainer_gym_affiliations 
FOR UPDATE 
USING (trainer_id = auth.uid());

CREATE POLICY "Gyms can view affiliations for their gym" 
ON public.trainer_gym_affiliations 
FOR SELECT 
USING (gym_id = auth.uid());

CREATE POLICY "Gyms can respond to affiliation requests" 
ON public.trainer_gym_affiliations 
FOR UPDATE 
USING (gym_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_trainer_gym_affiliations_trainer_id ON public.trainer_gym_affiliations(trainer_id);
CREATE INDEX idx_trainer_gym_affiliations_gym_id ON public.trainer_gym_affiliations(gym_id);
CREATE INDEX idx_trainer_gym_affiliations_status ON public.trainer_gym_affiliations(status);

-- Update function for timestamps
CREATE OR REPLACE FUNCTION public.update_trainer_gym_affiliations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  IF NEW.status != OLD.status AND NEW.status IN ('approved', 'rejected') THEN
    NEW.responded_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_trainer_gym_affiliations_updated_at
BEFORE UPDATE ON public.trainer_gym_affiliations
FOR EACH ROW
EXECUTE FUNCTION public.update_trainer_gym_affiliations_updated_at();