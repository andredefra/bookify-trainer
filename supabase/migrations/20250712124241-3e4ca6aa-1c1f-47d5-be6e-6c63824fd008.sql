-- Phase 1: Add consistent demo data with proper UUIDs

-- First, let's create some demo gym, trainer, and client UUIDs that are consistent
-- Demo Gym UUID (for the main demo gym)
DO $$
DECLARE
  demo_gym_id UUID := '11111111-1111-1111-1111-111111111111';
  demo_trainer1_id UUID := '22222222-2222-2222-2222-222222222222';
  demo_trainer2_id UUID := '33333333-3333-3333-3333-333333333333';
  demo_client1_id UUID := '44444444-4444-4444-4444-444444444444';
  demo_client2_id UUID := '55555555-5555-5555-5555-555555555555';
  demo_client3_id UUID := '66666666-6666-6666-6666-666666666666';
BEGIN
  -- Insert demo gym packages (replace any existing with consistent UUIDs)
  DELETE FROM gym_packages WHERE gym_id = demo_gym_id;
  
  INSERT INTO gym_packages (id, gym_id, title, description, package_type, price, duration_days, session_limit, trainer_commission_percentage, is_active) VALUES
  ('77777777-7777-7777-7777-777777777777', demo_gym_id, 'Premium Monthly', 'Full access to all facilities and unlimited group classes', 'monthly', 99.99, 30, NULL, 25.0, true),
  ('88888888-8888-8888-8888-888888888888', demo_gym_id, 'Personal Training 10 Sessions', '10 one-on-one personal training sessions', 'sessions', 750.00, 90, 10, 30.0, true),
  ('99999999-9999-9999-9999-999999999999', demo_gym_id, 'Basic Weekly Pass', 'Access to gym facilities for one week', 'weekly', 25.00, 7, NULL, 20.0, true),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', demo_gym_id, 'Group Fitness Package', '20 group fitness classes', 'sessions', 200.00, 60, 20, 15.0, true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', demo_gym_id, 'VIP Annual Membership', 'Premium annual membership with all perks', 'annual', 999.99, 365, NULL, 35.0, true);

  -- Insert demo gym package assignments
  DELETE FROM gym_package_assignments WHERE gym_id = demo_gym_id;
  
  INSERT INTO gym_package_assignments (
    id, gym_id, package_id, client_id, trainer_id, 
    purchase_date, start_date, end_date, sessions_used, sessions_total, 
    total_paid, payment_status, status
  ) VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', demo_gym_id, '77777777-7777-7777-7777-777777777777', demo_client1_id, demo_trainer1_id,
   '2025-01-01', '2025-01-01', '2025-01-31', 0, NULL, 99.99, 'paid', 'active'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', demo_gym_id, '88888888-8888-8888-8888-888888888888', demo_client2_id, demo_trainer1_id,
   '2025-01-05', '2025-01-05', '2025-04-05', 3, 10, 750.00, 'paid', 'active'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', demo_gym_id, '99999999-9999-9999-9999-999999999999', demo_client3_id, demo_trainer2_id,
   '2025-01-10', '2025-01-10', '2025-01-17', 0, NULL, 25.00, 'paid', 'active'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', demo_gym_id, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', demo_client1_id, demo_trainer2_id,
   '2024-12-20', '2024-12-20', '2025-02-19', 8, 20, 200.00, 'paid', 'active'),
  ('00000000-0000-0000-0000-000000000001', demo_gym_id, '77777777-7777-7777-7777-777777777777', demo_client2_id, demo_trainer2_id,
   '2024-12-15', '2024-12-15', '2025-01-15', 0, NULL, 99.99, 'paid', 'expired');

  -- Insert demo gym trainer contracts
  DELETE FROM gym_trainer_contracts WHERE gym_id = demo_gym_id;
  
  INSERT INTO gym_trainer_contracts (
    id, gym_id, trainer_id, commission_rate, base_salary, 
    start_date, end_date, status, terms, contract_type
  ) VALUES
  ('00000000-0000-0000-0000-000000000002', demo_gym_id, demo_trainer1_id, 25.0, 3000.00,
   '2024-01-01', NULL, 'active', 'Full-time personal trainer with benefits', 'employee'),
  ('00000000-0000-0000-0000-000000000003', demo_gym_id, demo_trainer2_id, 30.0, NULL,
   '2024-06-01', NULL, 'active', 'Part-time contractor for group classes', 'contractor');

  -- Insert demo gym trainer assignments
  DELETE FROM gym_trainer_assignments WHERE gym_id = demo_gym_id;
  
  INSERT INTO gym_trainer_assignments (
    id, gym_id, trainer_id, client_id, assigned_at, 
    status, assignment_type, notes
  ) VALUES
  ('00000000-0000-0000-0000-000000000004', demo_gym_id, demo_trainer1_id, demo_client1_id, '2025-01-01 10:00:00+00',
   'active', 'premium', 'Premium client with personal training focus'),
  ('00000000-0000-0000-0000-000000000005', demo_gym_id, demo_trainer1_id, demo_client2_id, '2025-01-05 14:00:00+00',
   'active', 'standard', 'Regular personal training sessions'),
  ('00000000-0000-0000-0000-000000000006', demo_gym_id, demo_trainer2_id, demo_client3_id, '2025-01-10 09:00:00+00',
   'active', 'trial', 'Trial period for new member');

  -- Insert demo notifications
  DELETE FROM gym_notifications WHERE gym_id = demo_gym_id;
  
  INSERT INTO gym_notifications (
    id, gym_id, recipient_id, recipient_type, title, message, 
    type, related_assignment_id, read
  ) VALUES
  ('00000000-0000-0000-0000-000000000007', demo_gym_id, demo_trainer1_id, 'trainer', 
   'New Client Assignment', 'You have been assigned a new premium client', 
   'assignment', '00000000-0000-0000-0000-000000000004', false),
  ('00000000-0000-0000-0000-000000000008', demo_gym_id, demo_trainer2_id, 'trainer',
   'Package Expiring Soon', 'Client package expires in 3 days', 
   'expiry_warning', '00000000-0000-0000-0000-000000000006', false),
  ('00000000-0000-0000-0000-000000000009', demo_gym_id, demo_client1_id, 'client',
   'Welcome to FitLife Gym', 'Welcome! Your membership is now active', 
   'welcome', NULL, false);

END $$;