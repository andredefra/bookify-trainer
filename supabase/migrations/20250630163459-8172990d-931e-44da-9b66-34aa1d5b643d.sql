
-- Add some demo package assignments for the current demo user
-- First, let's check if we have the demo client ID in the assignments
DO $$
BEGIN
  -- Insert sample package assignments if they don't exist
  IF NOT EXISTS (SELECT 1 FROM client_package_assignments WHERE client_id = '00000000-0000-0000-0000-000000000002') THEN
    -- Insert the demo assignments with the correct package references
    INSERT INTO client_package_assignments (
      client_id, 
      trainer_id, 
      package_id, 
      sessions_used, 
      sessions_total, 
      total_paid, 
      expiry_date,
      status
    ) VALUES
    (
      '00000000-0000-0000-0000-000000000002', 
      '00000000-0000-0000-0000-000000000001', 
      (SELECT id FROM client_packages WHERE title = 'Personal Training Package' LIMIT 1), 
      6, 10, 500.00, '2025-08-15', 'active'
    ),
    (
      '00000000-0000-0000-0000-000000000002', 
      '00000000-0000-0000-0000-000000000001', 
      (SELECT id FROM client_packages WHERE title = 'Complete Transformation' LIMIT 1), 
      3, 8, 750.00, '2025-09-20', 'active'
    );
  END IF;
END $$;

-- Update RLS policies to allow demo access temporarily
DROP POLICY IF EXISTS "Clients can view their own package assignments" ON client_package_assignments;
CREATE POLICY "Clients can view their own package assignments" ON client_package_assignments
  FOR SELECT USING (
    client_id = auth.uid() OR 
    client_id = '00000000-0000-0000-0000-000000000002'::uuid
  );

-- Update RLS policy for packages to allow demo access
DROP POLICY IF EXISTS "Clients can view active packages" ON client_packages;
CREATE POLICY "Clients can view active packages" ON client_packages
  FOR SELECT USING (is_active = true);
