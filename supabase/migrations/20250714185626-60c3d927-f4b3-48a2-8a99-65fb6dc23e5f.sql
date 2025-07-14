-- Add cancellation policy fields to gym_session_schedules
ALTER TABLE public.gym_session_schedules 
ADD COLUMN free_cancellation_hours INTEGER DEFAULT 48,
ADD COLUMN reduced_fee_hours INTEGER DEFAULT 24,
ADD COLUMN reduced_fee_percentage INTEGER DEFAULT 50,
ADD COLUMN full_fee_percentage INTEGER DEFAULT 100;

-- Drop the gym_settings table as it's no longer needed
DROP TABLE IF EXISTS public.gym_settings;