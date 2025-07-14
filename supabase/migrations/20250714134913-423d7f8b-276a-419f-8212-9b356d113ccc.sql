-- Add update policy for demo gym package assignments
CREATE POLICY "Demo gym can update package assignments" 
ON public.gym_package_assignments 
FOR UPDATE 
USING (gym_id = '11111111-1111-1111-1111-111111111111'::uuid)
WITH CHECK (gym_id = '11111111-1111-1111-1111-111111111111'::uuid);