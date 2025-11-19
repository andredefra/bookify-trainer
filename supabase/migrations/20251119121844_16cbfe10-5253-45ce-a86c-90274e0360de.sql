-- Allow demo client to insert their own package assignments (unauthenticated)
CREATE POLICY "Demo client can create their own package assignments"
ON client_package_assignments FOR INSERT
TO public
WITH CHECK (client_id = '00000000-0000-0000-0000-000000000002');

-- Allow demo client to update their own package assignments
CREATE POLICY "Demo client can update their own package assignments"
ON client_package_assignments FOR UPDATE
TO public
USING (client_id = '00000000-0000-0000-0000-000000000002')
WITH CHECK (client_id = '00000000-0000-0000-0000-000000000002');