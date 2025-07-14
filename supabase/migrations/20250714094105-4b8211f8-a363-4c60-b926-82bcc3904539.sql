-- Insert sample gym package assignments for the demo gym
INSERT INTO public.gym_package_assignments (
  gym_id,
  package_id,
  client_id,
  trainer_id,
  purchase_date,
  start_date,
  end_date,
  sessions_used,
  sessions_total,
  total_paid,
  payment_status,
  status
) VALUES 
-- Recent paid transactions
(
  '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM gym_packages WHERE gym_id = '11111111-1111-1111-1111-111111111111' LIMIT 1),
  '00000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  CURRENT_DATE - INTERVAL '1 day',
  CURRENT_DATE - INTERVAL '1 day',
  CURRENT_DATE + INTERVAL '29 days',
  5,
  20,
  99.99,
  'paid',
  'active'
),
(
  '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM gym_packages WHERE gym_id = '11111111-1111-1111-1111-111111111111' AND package_type = 'annual' LIMIT 1),
  '00000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  CURRENT_DATE - INTERVAL '3 days',
  CURRENT_DATE - INTERVAL '3 days',
  CURRENT_DATE + INTERVAL '362 days',
  0,
  NULL,
  899.99,
  'paid',
  'active'
),
(
  '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM gym_packages WHERE gym_id = '11111111-1111-1111-1111-111111111111' AND package_type = 'weekly' LIMIT 1),
  '00000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  CURRENT_DATE - INTERVAL '7 days',
  CURRENT_DATE - INTERVAL '7 days',
  CURRENT_DATE,
  8,
  8,
  29.99,
  'paid',
  'completed'
),
-- Today's transactions
(
  '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM gym_packages WHERE gym_id = '11111111-1111-1111-1111-111111111111' AND package_type = 'sessions' LIMIT 1),
  '00000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  CURRENT_DATE,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days',
  0,
  10,
  149.99,
  'paid',
  'active'
),
-- Pending payments
(
  '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM gym_packages WHERE gym_id = '11111111-1111-1111-1111-111111111111' LIMIT 1),
  '00000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  CURRENT_DATE,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '30 days',
  0,
  20,
  79.99,
  'pending',
  'active'
),
(
  '11111111-1111-1111-1111-111111111111',
  (SELECT id FROM gym_packages WHERE gym_id = '11111111-1111-1111-1111-111111111111' AND package_type = 'monthly' LIMIT 1),
  '00000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  CURRENT_DATE - INTERVAL '2 days',
  CURRENT_DATE - INTERVAL '2 days',
  CURRENT_DATE + INTERVAL '28 days',
  3,
  NULL,
  69.99,
  'pending',
  'active'
);