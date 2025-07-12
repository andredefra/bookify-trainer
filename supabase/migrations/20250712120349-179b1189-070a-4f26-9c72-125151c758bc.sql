-- Tabella per le assegnazioni trainer-cliente gestite dalla palestra
CREATE TABLE public.gym_trainer_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  assignment_type TEXT NOT NULL DEFAULT 'standard', -- standard, premium, trial
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(gym_id, trainer_id, client_id)
);

-- Tabella per le notifiche specifiche della palestra
CREATE TABLE public.gym_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL, -- trainer or client che riceve la notifica
  recipient_type TEXT NOT NULL DEFAULT 'trainer', -- trainer, client
  type TEXT NOT NULL, -- trainer_assigned, client_assigned, etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_assignment_id UUID REFERENCES public.gym_trainer_assignments(id),
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabella per contratti/accordi palestra-trainer
CREATE TABLE public.gym_trainer_contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL,
  contract_type TEXT NOT NULL DEFAULT 'partnership', -- partnership, employee, freelance
  commission_rate DECIMAL(5,2), -- percentuale commissione per la palestra
  base_salary DECIMAL(10,2), -- stipendio base se dipendente
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active',
  terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(gym_id, trainer_id)
);

-- Enable RLS
ALTER TABLE public.gym_trainer_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_trainer_contracts ENABLE ROW LEVEL SECURITY;

-- RLS Policies per gym_trainer_assignments
CREATE POLICY "Gyms can manage their trainer assignments" 
ON public.gym_trainer_assignments 
FOR ALL 
USING (gym_id = auth.uid())
WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Trainers can view their assignments from gyms" 
ON public.gym_trainer_assignments 
FOR SELECT 
USING (trainer_id = auth.uid());

CREATE POLICY "Clients can view their assignments from gyms" 
ON public.gym_trainer_assignments 
FOR SELECT 
USING (client_id = auth.uid());

-- RLS Policies per gym_notifications
CREATE POLICY "Gyms can manage their notifications" 
ON public.gym_notifications 
FOR ALL 
USING (gym_id = auth.uid())
WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Recipients can view their notifications" 
ON public.gym_notifications 
FOR SELECT 
USING (recipient_id = auth.uid());

CREATE POLICY "Recipients can update read status" 
ON public.gym_notifications 
FOR UPDATE 
USING (recipient_id = auth.uid())
WITH CHECK (recipient_id = auth.uid());

-- RLS Policies per gym_trainer_contracts
CREATE POLICY "Gyms can manage their trainer contracts" 
ON public.gym_trainer_contracts 
FOR ALL 
USING (gym_id = auth.uid())
WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Trainers can view their gym contracts" 
ON public.gym_trainer_contracts 
FOR SELECT 
USING (trainer_id = auth.uid());

-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gym_trainer_assignments_updated_at
BEFORE UPDATE ON public.gym_trainer_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gym_notifications_updated_at
BEFORE UPDATE ON public.gym_notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gym_trainer_contracts_updated_at
BEFORE UPDATE ON public.gym_trainer_contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();