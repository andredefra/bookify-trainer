-- Complete missing demo data for gym dashboard

-- Insert demo trainer contracts
INSERT INTO public.gym_trainer_contracts (
  id,
  gym_id,
  trainer_id,
  contract_type,
  commission_rate,
  base_salary,
  start_date,
  status,
  created_at,
  updated_at
) VALUES 
(
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  'partnership',
  25.0,
  1500.00,
  '2024-01-01',
  'active',
  now(),
  now()
),
(
  '33333333-3333-3333-3333-333333333332',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'employee',
  NULL,
  2500.00,
  '2024-02-01',
  'active',
  now(),
  now()
);

-- Insert demo trainer assignments linking trainers to clients
INSERT INTO public.gym_trainer_assignments (
  id,
  gym_id,
  trainer_id,
  client_id,
  assignment_type,
  status,
  notes,
  assigned_at,
  created_at,
  updated_at
) VALUES 
(
  '44444444-4444-4444-4444-444444444441',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  '55555555-5555-5555-5555-555555555551',
  'primary',
  'active',
  'Personal training for weight loss',
  now() - interval '30 days',
  now(),
  now()
),
(
  '44444444-4444-4444-4444-444444444442',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  '55555555-5555-5555-5555-555555555552',
  'primary',
  'active',
  'Strength training program',
  now() - interval '15 days',
  now(),
  now()
),
(
  '44444444-4444-4444-4444-444444444443',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '55555555-5555-5555-5555-555555555553',
  'primary',
  'active',
  'Yoga and flexibility training',
  now() - interval '20 days',
  now(),
  now()
);

-- Insert demo gym notifications
INSERT INTO public.gym_notifications (
  id,
  gym_id,
  recipient_id,
  recipient_type,
  type,
  title,
  message,
  related_assignment_id,
  read,
  created_at,
  updated_at
) VALUES 
(
  '66666666-6666-6666-6666-666666666661',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  'trainer',
  'new_assignment',
  'New Client Assignment',
  'You have been assigned a new client for personal training.',
  '44444444-4444-4444-4444-444444444441',
  false,
  now() - interval '2 days',
  now()
),
(
  '66666666-6666-6666-6666-666666666662',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'trainer',
  'package_purchase',
  'Package Purchase Completed',
  'A client has completed payment for a training package.',
  '44444444-4444-4444-4444-444444444443',
  false,
  now() - interval '1 day',
  now()
),
(
  '66666666-6666-6666-6666-666666666663',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'gym',
  'monthly_report',
  'Monthly Performance Report',
  'Your gym monthly performance report is ready for review.',
  NULL,
  true,
  now() - interval '5 days',
  now()
);