
-- Create enum for package types
CREATE TYPE public.package_type AS ENUM ('sessions_only', 'program_only', 'hybrid', 'service');

-- Create enum for payment methods
CREATE TYPE public.payment_method AS ENUM ('cash', 'stripe', 'installments');

-- Create enum for payment status
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled');

-- Create enum for event categories
CREATE TYPE public.event_category AS ENUM ('session', 'program_milestone', 'sales_activity', 'personal_task', 'deadline', 'availability');

-- Create packages table
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  package_type package_type NOT NULL DEFAULT 'sessions_only',
  sessions_count INTEGER DEFAULT 0,
  program_ids TEXT[], -- Array of program IDs
  price DECIMAL(10,2) NOT NULL,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  validity_days INTEGER DEFAULT 90,
  is_template BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create package assignments table
CREATE TABLE public.package_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  client_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  status TEXT DEFAULT 'proposed', -- proposed, accepted, active, completed, expired
  purchase_date DATE,
  expiry_date DATE,
  sessions_used INTEGER DEFAULT 0,
  total_paid DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create package payments table
CREATE TABLE public.package_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  package_assignment_id UUID REFERENCES public.package_assignments(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method payment_method NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  due_date DATE,
  paid_date DATE,
  stripe_payment_intent_id TEXT,
  installment_number INTEGER DEFAULT 1,
  total_installments INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create calendar events table
CREATE TABLE public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_category event_category NOT NULL,
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  client_id UUID,
  session_id UUID,
  package_assignment_id UUID,
  lead_id UUID,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern TEXT, -- JSON string for recurrence rules
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sales activities table
CREATE TABLE public.sales_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  lead_id UUID,
  activity_type TEXT NOT NULL, -- meeting, call, email, follow_up
  title TEXT NOT NULL,
  description TEXT,
  outcome TEXT, -- interested, not_interested, follow_up_needed, converted
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  calendar_event_id UUID REFERENCES public.calendar_events(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table (for sales pipeline)
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, interested, proposal_sent, converted, lost
  source TEXT, -- referral, social_media, website, calendar_auto_created
  notes TEXT,
  first_contact_date DATE DEFAULT CURRENT_DATE,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  conversion_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for packages
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trainers can view their own packages" ON public.packages FOR SELECT USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can create their own packages" ON public.packages FOR INSERT WITH CHECK (trainer_id = auth.uid());
CREATE POLICY "Trainers can update their own packages" ON public.packages FOR UPDATE USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can delete their own packages" ON public.packages FOR DELETE USING (trainer_id = auth.uid());

-- Add RLS policies for package assignments
ALTER TABLE public.package_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trainers can view their own package assignments" ON public.package_assignments FOR SELECT USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can create their own package assignments" ON public.package_assignments FOR INSERT WITH CHECK (trainer_id = auth.uid());
CREATE POLICY "Trainers can update their own package assignments" ON public.package_assignments FOR UPDATE USING (trainer_id = auth.uid());

-- Add RLS policies for package payments
ALTER TABLE public.package_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trainers can view payments for their packages" ON public.package_payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.package_assignments pa WHERE pa.id = package_assignment_id AND pa.trainer_id = auth.uid())
);
CREATE POLICY "Trainers can create payments for their packages" ON public.package_payments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.package_assignments pa WHERE pa.id = package_assignment_id AND pa.trainer_id = auth.uid())
);
CREATE POLICY "Trainers can update payments for their packages" ON public.package_payments FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.package_assignments pa WHERE pa.id = package_assignment_id AND pa.trainer_id = auth.uid())
);

-- Add RLS policies for calendar events
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trainers can view their own calendar events" ON public.calendar_events FOR SELECT USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can create their own calendar events" ON public.calendar_events FOR INSERT WITH CHECK (trainer_id = auth.uid());
CREATE POLICY "Trainers can update their own calendar events" ON public.calendar_events FOR UPDATE USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can delete their own calendar events" ON public.calendar_events FOR DELETE USING (trainer_id = auth.uid());

-- Add RLS policies for sales activities
ALTER TABLE public.sales_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trainers can view their own sales activities" ON public.sales_activities FOR SELECT USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can create their own sales activities" ON public.sales_activities FOR INSERT WITH CHECK (trainer_id = auth.uid());
CREATE POLICY "Trainers can update their own sales activities" ON public.sales_activities FOR UPDATE USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can delete their own sales activities" ON public.sales_activities FOR DELETE USING (trainer_id = auth.uid());

-- Add RLS policies for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trainers can view their own leads" ON public.leads FOR SELECT USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can create their own leads" ON public.leads FOR INSERT WITH CHECK (trainer_id = auth.uid());
CREATE POLICY "Trainers can update their own leads" ON public.leads FOR UPDATE USING (trainer_id = auth.uid());
CREATE POLICY "Trainers can delete their own leads" ON public.leads FOR DELETE USING (trainer_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_packages_trainer_id ON public.packages(trainer_id);
CREATE INDEX idx_package_assignments_trainer_id ON public.package_assignments(trainer_id);
CREATE INDEX idx_package_assignments_client_id ON public.package_assignments(client_id);
CREATE INDEX idx_calendar_events_trainer_id ON public.calendar_events(trainer_id);
CREATE INDEX idx_calendar_events_date ON public.calendar_events(start_datetime);
CREATE INDEX idx_sales_activities_trainer_id ON public.sales_activities(trainer_id);
CREATE INDEX idx_leads_trainer_id ON public.leads(trainer_id);
