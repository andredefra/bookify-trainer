
-- First, let's create the client packages system tables

-- Table for storing package templates/offerings
CREATE TABLE IF NOT EXISTS public.client_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  package_type TEXT NOT NULL CHECK (package_type IN ('sessions_only', 'program_only', 'hybrid', 'service')),
  sessions_count INTEGER DEFAULT 0,
  price DECIMAL NOT NULL,
  validity_days INTEGER DEFAULT 90,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for tracking client package purchases/assignments
CREATE TABLE IF NOT EXISTS public.client_package_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  package_id UUID NOT NULL REFERENCES public.client_packages(id),
  purchase_date DATE DEFAULT CURRENT_DATE,
  expiry_date DATE,
  sessions_used INTEGER DEFAULT 0,
  sessions_total INTEGER NOT NULL,
  total_paid DECIMAL DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for tracking package payments
CREATE TABLE IF NOT EXISTS public.client_package_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_assignment_id UUID NOT NULL REFERENCES public.client_package_assignments(id),
  amount DECIMAL NOT NULL,
  payment_method TEXT DEFAULT 'stripe' CHECK (payment_method IN ('cash', 'stripe', 'bank_transfer')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_date DATE,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for client access
ALTER TABLE public.client_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_package_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_package_payments ENABLE ROW LEVEL SECURITY;

-- Policies for client_packages (clients can only view active packages)
CREATE POLICY "Clients can view active packages" ON public.client_packages
  FOR SELECT USING (is_active = true);

-- Policies for client_package_assignments (clients can only see their own assignments)
CREATE POLICY "Clients can view their own package assignments" ON public.client_package_assignments
  FOR SELECT USING (client_id = auth.uid());

-- Policies for client_package_payments (clients can only see their own payments)
CREATE POLICY "Clients can view their own package payments" ON public.client_package_payments
  FOR SELECT USING (
    package_assignment_id IN (
      SELECT id FROM public.client_package_assignments WHERE client_id = auth.uid()
    )
  );

-- Insert some sample data for demonstration
INSERT INTO public.client_packages (trainer_id, title, description, package_type, sessions_count, price, validity_days) VALUES
('00000000-0000-0000-0000-000000000001', 'Personal Training Package', '10 one-on-one personal training sessions', 'sessions_only', 10, 500.00, 90),
('00000000-0000-0000-0000-000000000001', 'Complete Transformation', '8 sessions + 12-week strength program', 'hybrid', 8, 750.00, 120),
('00000000-0000-0000-0000-000000000001', 'Beginner Fitness Program', '6-week foundation program only', 'program_only', 0, 200.00, 45);

-- Insert sample package assignments for demo client
INSERT INTO public.client_package_assignments (client_id, trainer_id, package_id, sessions_used, sessions_total, total_paid, expiry_date) VALUES
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 
 (SELECT id FROM public.client_packages WHERE title = 'Personal Training Package' LIMIT 1), 
 6, 10, 500.00, '2024-08-15'),
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 
 (SELECT id FROM public.client_packages WHERE title = 'Complete Transformation' LIMIT 1), 
 3, 8, 750.00, '2024-09-20');
