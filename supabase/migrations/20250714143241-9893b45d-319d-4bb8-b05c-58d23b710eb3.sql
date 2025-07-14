-- Create gym_session_bookings table for individual bookings and waitlist
CREATE TABLE public.gym_session_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_schedule_id UUID NOT NULL,
  participant_id UUID NOT NULL,
  booking_status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, waitlisted, cancelled
  booked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  waitlist_position INTEGER NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT NULL,
  CONSTRAINT fk_session_schedule FOREIGN KEY (session_schedule_id) REFERENCES gym_session_schedules(id),
  UNIQUE(session_schedule_id, participant_id)
);

-- Create trigger for updated_at
CREATE TRIGGER update_gym_session_bookings_updated_at
  BEFORE UPDATE ON public.gym_session_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.gym_session_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings
CREATE POLICY "Gyms can manage session bookings" 
ON public.gym_session_bookings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM gym_session_schedules gss
  JOIN gym_group_sessions ggs ON gss.gym_group_session_id = ggs.id
  WHERE gss.id = gym_session_bookings.session_schedule_id 
  AND ggs.gym_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM gym_session_schedules gss
  JOIN gym_group_sessions ggs ON gss.gym_group_session_id = ggs.id
  WHERE gss.id = gym_session_bookings.session_schedule_id 
  AND ggs.gym_id = auth.uid()
));

CREATE POLICY "Participants can view their bookings" 
ON public.gym_session_bookings 
FOR SELECT 
USING (participant_id = auth.uid());

CREATE POLICY "Participants can create their bookings" 
ON public.gym_session_bookings 
FOR INSERT 
WITH CHECK (participant_id = auth.uid());

CREATE POLICY "Participants can update their bookings" 
ON public.gym_session_bookings 
FOR UPDATE 
USING (participant_id = auth.uid());

-- Add indexes for performance
CREATE INDEX idx_gym_session_bookings_schedule_id ON public.gym_session_bookings(session_schedule_id);
CREATE INDEX idx_gym_session_bookings_participant_id ON public.gym_session_bookings(participant_id);
CREATE INDEX idx_gym_session_bookings_status ON public.gym_session_bookings(booking_status);
CREATE INDEX idx_gym_session_bookings_waitlist ON public.gym_session_bookings(waitlist_position) WHERE booking_status = 'waitlisted';