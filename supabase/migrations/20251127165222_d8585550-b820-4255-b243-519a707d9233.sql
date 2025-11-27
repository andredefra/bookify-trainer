-- Create package session bookings table
CREATE TABLE IF NOT EXISTS public.package_session_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_assignment_id UUID NOT NULL REFERENCES public.client_package_assignments(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  session_number INTEGER NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'proposed', 'confirmed', 'completed', 'cancelled', 'no_show')),
  proposed_by TEXT CHECK (proposed_by IN ('trainer', 'client')),
  proposed_datetime TIMESTAMPTZ,
  confirmed_datetime TIMESTAMPTZ,
  completed_datetime TIMESTAMPTZ,
  calendar_event_id UUID REFERENCES public.calendar_events(id) ON DELETE SET NULL,
  session_type TEXT DEFAULT 'in-person' CHECK (session_type IN ('in-person', 'video')),
  location TEXT,
  notes TEXT,
  duration_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add indexes
CREATE INDEX idx_package_session_bookings_assignment ON public.package_session_bookings(package_assignment_id);
CREATE INDEX idx_package_session_bookings_trainer ON public.package_session_bookings(trainer_id);
CREATE INDEX idx_package_session_bookings_client ON public.package_session_bookings(client_id);
CREATE INDEX idx_package_session_bookings_status ON public.package_session_bookings(status);

-- Enable RLS
ALTER TABLE public.package_session_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Trainers can view their session bookings"
  ON public.package_session_bookings FOR SELECT
  TO authenticated
  USING (trainer_id = auth.uid());

CREATE POLICY "Trainers can create session bookings"
  ON public.package_session_bookings FOR INSERT
  TO authenticated
  WITH CHECK (trainer_id = auth.uid());

CREATE POLICY "Trainers can update their session bookings"
  ON public.package_session_bookings FOR UPDATE
  TO authenticated
  USING (trainer_id = auth.uid());

CREATE POLICY "Clients can view their session bookings"
  ON public.package_session_bookings FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can update session bookings for confirmation"
  ON public.package_session_bookings FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid() AND status = 'proposed');

-- Update trigger
CREATE TRIGGER update_package_session_bookings_updated_at
  BEFORE UPDATE ON public.package_session_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();