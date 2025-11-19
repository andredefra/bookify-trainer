-- Add RLS policy for demo client to view public packages from their trainers
CREATE POLICY "Demo client can view public packages from their trainers"
ON client_packages FOR SELECT
TO public
USING (
  is_active = true 
  AND is_public = true 
  AND trainer_id IN (
    SELECT trainer_id 
    FROM trainer_client_relationships 
    WHERE client_id = '00000000-0000-0000-0000-000000000002' 
    AND status = 'active'
  )
);

-- Add RLS policy for demo client to view their package assignments
CREATE POLICY "Demo client can view their package assignments"
ON client_package_assignments FOR SELECT
TO public
USING (client_id = '00000000-0000-0000-0000-000000000002');

-- Add RLS policy for demo client to view their trainer relationships
CREATE POLICY "Demo client can view their trainer relationships"
ON trainer_client_relationships FOR SELECT
TO public
USING (client_id = '00000000-0000-0000-0000-000000000002');