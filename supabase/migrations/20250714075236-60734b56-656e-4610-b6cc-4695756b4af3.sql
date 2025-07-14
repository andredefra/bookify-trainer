-- Make trainer_id optional in gym_package_assignments
ALTER TABLE public.gym_package_assignments 
ALTER COLUMN trainer_id DROP NOT NULL;

-- Update RLS policies to handle null trainer_id
DROP POLICY IF EXISTS "Trainers can view their assignments" ON public.gym_package_assignments;

CREATE POLICY "Trainers can view their assignments" 
ON public.gym_package_assignments 
FOR SELECT 
USING (trainer_id = auth.uid() OR trainer_id IS NULL);

-- Add comment to clarify the new behavior
COMMENT ON COLUMN public.gym_package_assignments.trainer_id IS 'Optional trainer assignment - null for gym-only packages (access only, group classes, etc.)';