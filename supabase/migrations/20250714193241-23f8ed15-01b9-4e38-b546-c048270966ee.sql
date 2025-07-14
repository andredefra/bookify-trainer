-- Remove payment-related fields from gym_session_schedules table
-- Keep only free_cancellation_hours for managing booking cancellations
ALTER TABLE public.gym_session_schedules 
DROP COLUMN IF EXISTS reduced_fee_hours,
DROP COLUMN IF EXISTS reduced_fee_percentage,
DROP COLUMN IF EXISTS full_fee_percentage;