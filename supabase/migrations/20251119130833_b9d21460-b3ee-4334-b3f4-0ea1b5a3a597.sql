-- Add DELETE policy for demo client on client_package_assignments
CREATE POLICY "Demo client can delete their own package assignments"
ON client_package_assignments FOR DELETE
TO public
USING (client_id = '00000000-0000-0000-0000-000000000002');