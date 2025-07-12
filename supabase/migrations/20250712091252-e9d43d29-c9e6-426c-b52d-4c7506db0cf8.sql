-- Create enum for invitation status
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'declined', 'expired');

-- Create client_invitations table to track trainer→client invitations
CREATE TABLE public.client_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  client_email TEXT NOT NULL,
  client_name TEXT NOT NULL,
  lead_id UUID,
  message TEXT,
  status invitation_status NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  response_message TEXT
);

-- Create trainer_client_relationships table for approved relationships
CREATE TABLE public.trainer_client_relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  invitation_id UUID REFERENCES public.client_invitations(id),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(trainer_id, client_id)
);

-- Add columns to leads table for client transition tracking
ALTER TABLE public.leads ADD COLUMN invitation_id UUID REFERENCES public.client_invitations(id);
ALTER TABLE public.leads ADD COLUMN transitioned_to_client BOOLEAN DEFAULT false;
ALTER TABLE public.leads ADD COLUMN client_user_id UUID;

-- Enable RLS on new tables
ALTER TABLE public.client_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainer_client_relationships ENABLE ROW LEVEL SECURITY;

-- RLS policies for client_invitations
CREATE POLICY "Trainers can create their own invitations" 
ON public.client_invitations 
FOR INSERT 
WITH CHECK (trainer_id = auth.uid());

CREATE POLICY "Trainers can view their own invitations" 
ON public.client_invitations 
FOR SELECT 
USING (trainer_id = auth.uid());

CREATE POLICY "Trainers can update their own invitations" 
ON public.client_invitations 
FOR UPDATE 
USING (trainer_id = auth.uid());

CREATE POLICY "Invited clients can view their invitations" 
ON public.client_invitations 
FOR SELECT 
USING (client_email = (auth.jwt() ->> 'email'));

CREATE POLICY "Invited clients can respond to their invitations" 
ON public.client_invitations 
FOR UPDATE 
USING (client_email = (auth.jwt() ->> 'email'));

-- RLS policies for trainer_client_relationships
CREATE POLICY "Trainers can view their client relationships" 
ON public.trainer_client_relationships 
FOR SELECT 
USING (trainer_id = auth.uid());

CREATE POLICY "Clients can view their trainer relationships" 
ON public.trainer_client_relationships 
FOR SELECT 
USING (client_id = auth.uid());

CREATE POLICY "System can create relationships" 
ON public.trainer_client_relationships 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Trainers can update their client relationships" 
ON public.trainer_client_relationships 
FOR UPDATE 
USING (trainer_id = auth.uid());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_invitation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  IF NEW.status != OLD.status AND NEW.status IN ('accepted', 'declined') THEN
    NEW.responded_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for invitation updates
CREATE TRIGGER update_client_invitations_timestamp
BEFORE UPDATE ON public.client_invitations
FOR EACH ROW
EXECUTE FUNCTION update_invitation_timestamp();

-- Create function to automatically expire old invitations
CREATE OR REPLACE FUNCTION expire_old_invitations()
RETURNS void AS $$
BEGIN
  UPDATE public.client_invitations 
  SET status = 'expired', updated_at = now()
  WHERE status = 'pending' AND expires_at < now();
END;
$$ LANGUAGE plpgsql;