-- Update gym group sessions to remove price and add package integration
ALTER TABLE public.gym_group_sessions 
DROP COLUMN IF EXISTS price_per_participant;

-- Add package_assignment_id to gym_session_participants to track which package is used
ALTER TABLE public.gym_session_participants 
ADD COLUMN package_assignment_id uuid REFERENCES public.gym_package_assignments(id) ON DELETE SET NULL;

-- Remove amount_paid from gym_session_participants since sessions are included in packages
ALTER TABLE public.gym_session_participants 
DROP COLUMN IF EXISTS amount_paid;

-- Update payment_status to default to 'included' since sessions are part of packages
ALTER TABLE public.gym_session_participants 
ALTER COLUMN payment_status SET DEFAULT 'included';

-- Update existing records to set payment_status as 'included'
UPDATE public.gym_session_participants 
SET payment_status = 'included' 
WHERE payment_status = 'pending';