-- Remove foreign key constraints that reference auth.users for demo data

DO $$ 
BEGIN
    -- Drop foreign key constraints that reference auth.users
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'gym_trainer_assignments_gym_id_fkey'
        AND table_name = 'gym_trainer_assignments'
    ) THEN
        ALTER TABLE gym_trainer_assignments DROP CONSTRAINT gym_trainer_assignments_gym_id_fkey;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'gym_notifications_gym_id_fkey'
        AND table_name = 'gym_notifications'
    ) THEN
        ALTER TABLE gym_notifications DROP CONSTRAINT gym_notifications_gym_id_fkey;
    END IF;
END $$;

-- Insert demo trainer assignments linking trainers to clients
INSERT INTO public.gym_trainer_assignments (
  gym_id,
  trainer_id,
  client_id,
  assignment_type,
  status,
  notes,
  assigned_at
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  '55555555-5555-5555-5555-555555555551',
  'primary',
  'active',
  'Personal training for weight loss',
  now() - interval '30 days'
),
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  '55555555-5555-5555-5555-555555555552',
  'primary',
  'active',
  'Strength training program',
  now() - interval '15 days'
),
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '55555555-5555-5555-5555-555555555553',
  'primary',
  'active',
  'Yoga and flexibility training',
  now() - interval '20 days'
)
ON CONFLICT (id) DO NOTHING;

-- Insert demo gym notifications
INSERT INTO public.gym_notifications (
  gym_id,
  recipient_id,
  recipient_type,
  type,
  title,
  message,
  read
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  'trainer',
  'new_assignment',
  'New Client Assignment',
  'You have been assigned a new client for personal training.',
  false
),
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'trainer',
  'package_purchase',
  'Package Purchase Completed',
  'A client has completed payment for a training package.',
  false
),
(
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'gym',
  'monthly_report',
  'Monthly Performance Report',
  'Your gym monthly performance report is ready for review.',
  true
)
ON CONFLICT (id) DO NOTHING;