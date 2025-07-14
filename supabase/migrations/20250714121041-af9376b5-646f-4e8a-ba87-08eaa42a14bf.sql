-- Temporarily disable RLS for demo purposes and allow public access to gym data
-- This is for demonstration only - in production, proper authentication should be used

-- Create a temporary policy for demo access to gym_package_assignments
CREATE POLICY "Demo gym access to package assignments" 
ON public.gym_package_assignments 
FOR SELECT 
TO public 
USING (gym_id = '11111111-1111-1111-1111-111111111111');

-- Create a temporary policy for demo access to gym_packages
CREATE POLICY "Demo gym access to packages" 
ON public.gym_packages 
FOR SELECT 
TO public 
USING (gym_id = '11111111-1111-1111-1111-111111111111');

-- Create a temporary policy for demo access to profiles
CREATE POLICY "Demo access to client profiles" 
ON public.profiles 
FOR SELECT 
TO public 
USING (user_type = 'client');