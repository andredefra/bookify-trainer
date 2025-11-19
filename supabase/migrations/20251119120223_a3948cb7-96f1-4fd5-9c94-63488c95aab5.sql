-- 1. Create trainer-client relationships for demo
INSERT INTO trainer_client_relationships (trainer_id, client_id, status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', 'active'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000002', 'active')
ON CONFLICT (trainer_id, client_id) DO NOTHING;

-- 2. Add mock packages from Sarah Johnson
INSERT INTO client_packages (id, trainer_id, title, description, package_type, sessions_count, price, validity_days, is_public, is_active)
VALUES 
  ('aaaa0001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 
   'Beginner Strength Foundation', 
   'Perfect for those starting their fitness journey. Includes 8 personal training sessions focused on form and building a solid strength base.',
   'sessions_only', 8, 320.00, 60, true, true),
   
  ('aaaa0002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111',
   'Nutrition + Training Combo',
   'Complete package with 10 training sessions and personalized meal plans. Ideal for body transformation goals.',
   'hybrid', 10, 550.00, 90, true, true),
   
  ('aaaa0003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111',
   'Premium Wellness Package',
   'Our most comprehensive package: 16 sessions, custom nutrition plan, weekly progress tracking, and recovery guidance.',
   'hybrid', 16, 980.00, 120, false, true)
ON CONFLICT (id) DO NOTHING;

-- 3. Add mock packages from Alex Thompson
INSERT INTO client_packages (id, trainer_id, title, description, package_type, sessions_count, price, validity_days, is_public, is_active)
VALUES
  ('bbbb0001-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222',
   '6-Week HIIT Challenge',
   'Intense 6-week program with 12 high-intensity interval training sessions. Get ready to sweat and see results!',
   'sessions_only', 12, 480.00, 45, true, true),
   
  ('bbbb0002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222',
   'Cardio Kickstart',
   'Quick start package with 5 sessions to build your cardio endurance and learn proper HIIT techniques.',
   'sessions_only', 5, 200.00, 30, true, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Update status constraint to include 'proposed'
ALTER TABLE client_package_assignments 
DROP CONSTRAINT IF EXISTS client_package_assignments_status_check;

ALTER TABLE client_package_assignments
ADD CONSTRAINT client_package_assignments_status_check 
CHECK (status IN ('active', 'expired', 'completed', 'cancelled', 'proposed'));

-- 5. Add assigned package (proposed by trainer)
INSERT INTO client_package_assignments (
  id, client_id, trainer_id, package_id, 
  purchase_date, expiry_date, sessions_used, sessions_total, 
  total_paid, status
)
VALUES (
  'cccc0001-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '11111111-1111-1111-1111-111111111111',
  'aaaa0003-0000-0000-0000-000000000003',
  NULL,
  NULL,
  0,
  16,
  0,
  'proposed'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Add completed package for history
INSERT INTO client_package_assignments (
  id, client_id, trainer_id, package_id,
  purchase_date, expiry_date, sessions_used, sessions_total,
  total_paid, status
)
VALUES (
  'dddd0001-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  'bbbb0002-0000-0000-0000-000000000002',
  '2024-09-01',
  '2024-10-01',
  5,
  5,
  200.00,
  'completed'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Add RLS policy for clients to insert their own assignments
DROP POLICY IF EXISTS "Clients can create their own package assignments" ON client_package_assignments;

CREATE POLICY "Clients can create their own package assignments"
ON client_package_assignments FOR INSERT
TO authenticated
WITH CHECK (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002');

-- 8. Add RLS policy for clients to update proposed assignments to active
DROP POLICY IF EXISTS "Clients can activate proposed packages" ON client_package_assignments;

CREATE POLICY "Clients can activate proposed packages"
ON client_package_assignments FOR UPDATE
TO authenticated
USING (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002')
WITH CHECK (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002');