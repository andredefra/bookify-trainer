-- Add cancellation support for gym session schedules
ALTER TABLE public.gym_session_schedules 
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
ADD COLUMN IF NOT EXISTS cancelled_by UUID REFERENCES auth.users(id);

-- Add cancellation notification tracking
CREATE TABLE IF NOT EXISTS public.gym_session_cancellation_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_schedule_id UUID NOT NULL REFERENCES public.gym_session_schedules(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL,
  notification_sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  notification_type TEXT NOT NULL DEFAULT 'cancellation',
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on the new table
ALTER TABLE public.gym_session_cancellation_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for the new table
CREATE POLICY "Gyms can manage cancellation notifications" 
ON public.gym_session_cancellation_notifications 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM gym_session_schedules gss
  JOIN gym_group_sessions ggs ON gss.gym_group_session_id = ggs.id
  WHERE gss.id = gym_session_cancellation_notifications.session_schedule_id 
  AND ggs.gym_id = auth.uid()
));

CREATE POLICY "Participants can view their cancellation notifications" 
ON public.gym_session_cancellation_notifications 
FOR SELECT 
USING (participant_id = auth.uid());