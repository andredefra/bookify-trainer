-- Create gym_packages table for gym-specific packages
CREATE TABLE public.gym_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  package_type TEXT NOT NULL DEFAULT 'monthly', -- monthly, weekly, daily, unlimited
  price NUMERIC NOT NULL,
  duration_days INTEGER, -- null for unlimited packages
  session_limit INTEGER, -- null for unlimited sessions
  trainer_commission_percentage NUMERIC DEFAULT 20.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create gym_package_assignments table to track client subscriptions
CREATE TABLE public.gym_package_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL,
  package_id UUID NOT NULL REFERENCES public.gym_packages(id) ON DELETE CASCADE,
  client_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  sessions_used INTEGER DEFAULT 0,
  sessions_total INTEGER,
  total_paid NUMERIC NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- pending, paid, partially_paid, overdue
  status TEXT DEFAULT 'active', -- active, paused, expired, cancelled
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gym_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_package_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gym_packages
CREATE POLICY "Gyms can manage their packages" ON public.gym_packages
  FOR ALL USING (gym_id = auth.uid())
  WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Trainers can view gym packages" ON public.gym_packages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.gym_trainer_contracts gtc
      WHERE gtc.gym_id = gym_packages.gym_id 
      AND gtc.trainer_id = auth.uid()
      AND gtc.status = 'active'
    )
  );

CREATE POLICY "Clients can view active packages" ON public.gym_packages
  FOR SELECT USING (is_active = true);

-- RLS Policies for gym_package_assignments
CREATE POLICY "Gyms can manage their package assignments" ON public.gym_package_assignments
  FOR ALL USING (gym_id = auth.uid())
  WITH CHECK (gym_id = auth.uid());

CREATE POLICY "Trainers can view their assignments" ON public.gym_package_assignments
  FOR SELECT USING (trainer_id = auth.uid());

CREATE POLICY "Clients can view their assignments" ON public.gym_package_assignments
  FOR SELECT USING (client_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_gym_packages_gym_id ON public.gym_packages(gym_id);
CREATE INDEX idx_gym_packages_active ON public.gym_packages(gym_id, is_active);
CREATE INDEX idx_gym_package_assignments_gym_id ON public.gym_package_assignments(gym_id);
CREATE INDEX idx_gym_package_assignments_client ON public.gym_package_assignments(client_id);
CREATE INDEX idx_gym_package_assignments_trainer ON public.gym_package_assignments(trainer_id);
CREATE INDEX idx_gym_package_assignments_status ON public.gym_package_assignments(status);

-- Create trigger for updating timestamps
CREATE TRIGGER update_gym_packages_updated_at
  BEFORE UPDATE ON public.gym_packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gym_package_assignments_updated_at
  BEFORE UPDATE ON public.gym_package_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();