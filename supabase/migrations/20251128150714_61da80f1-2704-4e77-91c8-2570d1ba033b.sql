-- Drop and recreate RLS policies to include both demo trainers

-- Update client_package_assignments policies
DROP POLICY IF EXISTS "Trainers can view their package assignments" ON client_package_assignments;
CREATE POLICY "Trainers can view their package assignments"
ON client_package_assignments FOR SELECT
USING (
  trainer_id = auth.uid() 
  OR trainer_id = '00000000-0000-0000-0000-000000000001'
  OR trainer_id = '22222222-2222-2222-2222-222222222222'
);

DROP POLICY IF EXISTS "Trainers can update their package assignments" ON client_package_assignments;
CREATE POLICY "Trainers can update their package assignments"
ON client_package_assignments FOR UPDATE
USING (
  trainer_id = auth.uid() 
  OR trainer_id = '00000000-0000-0000-0000-000000000001'
  OR trainer_id = '22222222-2222-2222-2222-222222222222'
)
WITH CHECK (
  trainer_id = auth.uid() 
  OR trainer_id = '00000000-0000-0000-0000-000000000001'
  OR trainer_id = '22222222-2222-2222-2222-222222222222'
);

DROP POLICY IF EXISTS "Trainers can create package assignments" ON client_package_assignments;
CREATE POLICY "Trainers can create package assignments"
ON client_package_assignments FOR INSERT
WITH CHECK (
  trainer_id = auth.uid() 
  OR trainer_id = '00000000-0000-0000-0000-000000000001'
  OR trainer_id = '22222222-2222-2222-2222-222222222222'
);

-- Update package_session_bookings policies
DROP POLICY IF EXISTS "Trainers can view their session bookings" ON package_session_bookings;
CREATE POLICY "Trainers can view their session bookings"
ON package_session_bookings FOR SELECT
USING (
  trainer_id = auth.uid() 
  OR trainer_id = '00000000-0000-0000-0000-000000000001'
  OR trainer_id = '22222222-2222-2222-2222-222222222222'
);

DROP POLICY IF EXISTS "Trainers can update session bookings" ON package_session_bookings;
CREATE POLICY "Trainers can update session bookings"
ON package_session_bookings FOR UPDATE
USING (
  trainer_id = auth.uid() 
  OR trainer_id = '00000000-0000-0000-0000-000000000001'
  OR trainer_id = '22222222-2222-2222-2222-222222222222'
);

DROP POLICY IF EXISTS "Trainers can create session bookings" ON package_session_bookings;
CREATE POLICY "Trainers can create session bookings"
ON package_session_bookings FOR INSERT
WITH CHECK (
  trainer_id = auth.uid() 
  OR trainer_id = '00000000-0000-0000-0000-000000000001'
  OR trainer_id = '22222222-2222-2222-2222-222222222222'
);

-- Add demo sessions for packages that don't have any sessions yet (using 'proposed' status)
INSERT INTO package_session_bookings (
  package_assignment_id,
  trainer_id,
  client_id,
  session_number,
  status,
  proposed_datetime,
  proposed_by,
  duration_minutes
)
SELECT 
  cpa.id,
  cpa.trainer_id,
  cpa.client_id,
  generate_series AS session_number,
  'proposed' AS status,
  NOW() + (generate_series || ' days')::interval AS proposed_datetime,
  'trainer' AS proposed_by,
  60 AS duration_minutes
FROM client_package_assignments cpa
CROSS JOIN generate_series(1, LEAST(cpa.sessions_total, 10))
WHERE cpa.status = 'active'
  AND NOT EXISTS (
    SELECT 1 FROM package_session_bookings psb 
    WHERE psb.package_assignment_id = cpa.id
  )
ON CONFLICT DO NOTHING;