-- Create session postponements table
CREATE TABLE public.session_postponements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  calendar_event_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  original_start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  original_end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  new_start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  new_end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deadline_for_responses TIMESTAMP WITH TIME ZONE NOT NULL,
  total_participants INTEGER NOT NULL DEFAULT 0,
  accepted_count INTEGER NOT NULL DEFAULT 0,
  declined_count INTEGER NOT NULL DEFAULT 0
);

-- Create session postponement responses table
CREATE TABLE public.session_postponement_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  postponement_id UUID NOT NULL,
  participant_id UUID NOT NULL,
  participant_email TEXT NOT NULL,
  participant_name TEXT NOT NULL,
  response TEXT NOT NULL CHECK (response IN ('pending', 'accepted', 'declined')),
  response_reason TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  requires_refund BOOLEAN NOT NULL DEFAULT false,
  refund_amount NUMERIC,
  refund_processed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(postponement_id, participant_id)
);

-- Create refunds table for tracking refund requests
CREATE TABLE public.session_refunds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  postponement_response_id UUID NOT NULL,
  participant_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'stripe',
  stripe_refund_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.session_postponements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_postponement_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_refunds ENABLE ROW LEVEL SECURITY;

-- Create policies for session_postponements
CREATE POLICY "Trainers can view their own postponements" 
ON public.session_postponements 
FOR SELECT 
USING (trainer_id = auth.uid());

CREATE POLICY "Trainers can create their own postponements" 
ON public.session_postponements 
FOR INSERT 
WITH CHECK (trainer_id = auth.uid());

CREATE POLICY "Trainers can update their own postponements" 
ON public.session_postponements 
FOR UPDATE 
USING (trainer_id = auth.uid());

-- Create policies for session_postponement_responses
CREATE POLICY "Participants can view their own responses" 
ON public.session_postponement_responses 
FOR SELECT 
USING (participant_id = auth.uid());

CREATE POLICY "Participants can create their own responses" 
ON public.session_postponement_responses 
FOR INSERT 
WITH CHECK (participant_id = auth.uid());

CREATE POLICY "Participants can update their own responses" 
ON public.session_postponement_responses 
FOR UPDATE 
USING (participant_id = auth.uid());

CREATE POLICY "Trainers can view responses to their postponements" 
ON public.session_postponement_responses 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.session_postponements sp 
  WHERE sp.id = postponement_id AND sp.trainer_id = auth.uid()
));

-- Create policies for session_refunds
CREATE POLICY "Participants can view their own refunds" 
ON public.session_refunds 
FOR SELECT 
USING (participant_id = auth.uid());

CREATE POLICY "Trainers can view refunds for their sessions" 
ON public.session_refunds 
FOR SELECT 
USING (trainer_id = auth.uid());

CREATE POLICY "System can create refunds" 
ON public.session_refunds 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update refunds" 
ON public.session_refunds 
FOR UPDATE 
USING (true);

-- Add trigger to update postponement counts when responses change
CREATE OR REPLACE FUNCTION public.update_postponement_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update counts in session_postponements table
  UPDATE public.session_postponements 
  SET 
    accepted_count = (
      SELECT COUNT(*) 
      FROM public.session_postponement_responses 
      WHERE postponement_id = NEW.postponement_id AND response = 'accepted'
    ),
    declined_count = (
      SELECT COUNT(*) 
      FROM public.session_postponement_responses 
      WHERE postponement_id = NEW.postponement_id AND response = 'declined'
    ),
    updated_at = now()
  WHERE id = NEW.postponement_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_postponement_counts_trigger
  AFTER INSERT OR UPDATE ON public.session_postponement_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_postponement_counts();

-- Add enum for postponement status if needed
CREATE TYPE postponement_status AS ENUM (
  'pending',
  'collecting_responses', 
  'partially_accepted',
  'fully_accepted',
  'rejected',
  'cancelled',
  'confirmed'
);