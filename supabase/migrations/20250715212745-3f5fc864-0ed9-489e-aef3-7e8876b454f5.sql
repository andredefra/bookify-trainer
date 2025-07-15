-- Create gym connection requests table
CREATE TABLE public.gym_connection_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL,
  gym_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  client_message TEXT,
  gym_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id, gym_id)
);

-- Create gym client communications table
CREATE TABLE public.gym_client_communications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL,
  client_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('gym', 'client')),
  message_type TEXT NOT NULL DEFAULT 'general' CHECK (message_type IN ('general', 'package_reminder', 'session_update', 'welcome')),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gym_connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_client_communications ENABLE ROW LEVEL SECURITY;

-- RLS policies for gym_connection_requests
CREATE POLICY "Clients can view their own connection requests" 
ON public.gym_connection_requests 
FOR SELECT 
USING (client_id = auth.uid());

CREATE POLICY "Clients can create their own connection requests" 
ON public.gym_connection_requests 
FOR INSERT 
WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their own connection requests" 
ON public.gym_connection_requests 
FOR UPDATE 
USING (client_id = auth.uid());

CREATE POLICY "Gyms can view requests to their gym" 
ON public.gym_connection_requests 
FOR SELECT 
USING (gym_id = auth.uid());

CREATE POLICY "Gyms can update requests to their gym" 
ON public.gym_connection_requests 
FOR UPDATE 
USING (gym_id = auth.uid());

-- RLS policies for gym_client_communications
CREATE POLICY "Clients can view their communications" 
ON public.gym_client_communications 
FOR SELECT 
USING (client_id = auth.uid());

CREATE POLICY "Clients can create messages to gyms" 
ON public.gym_client_communications 
FOR INSERT 
WITH CHECK (client_id = auth.uid() AND sender_type = 'client');

CREATE POLICY "Clients can update read status" 
ON public.gym_client_communications 
FOR UPDATE 
USING (client_id = auth.uid());

CREATE POLICY "Gyms can view communications with their clients" 
ON public.gym_client_communications 
FOR SELECT 
USING (gym_id = auth.uid());

CREATE POLICY "Gyms can create messages to clients" 
ON public.gym_client_communications 
FOR INSERT 
WITH CHECK (gym_id = auth.uid() AND sender_type = 'gym');

CREATE POLICY "Gyms can update their communications" 
ON public.gym_client_communications 
FOR UPDATE 
USING (gym_id = auth.uid());

-- Create triggers for updated_at
CREATE TRIGGER update_gym_connection_requests_updated_at
BEFORE UPDATE ON public.gym_connection_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gym_client_communications_updated_at
BEFORE UPDATE ON public.gym_client_communications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();