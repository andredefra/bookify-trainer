-- Add RLS policies for trainers on client_package_assignments
CREATE POLICY "Trainers can view their package assignments"
ON client_package_assignments FOR SELECT
USING (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Trainers can update their package assignments"
ON client_package_assignments FOR UPDATE
USING (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001')
WITH CHECK (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Trainers can create package assignments"
ON client_package_assignments FOR INSERT
WITH CHECK (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001');

-- Add RLS policies for trainers on client_packages
CREATE POLICY "Trainers can view their own packages"
ON client_packages FOR SELECT
USING (trainer_id = auth.uid() OR trainer_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Trainers can manage their own packages"
ON client_packages FOR ALL
USING (trainer_id = auth.uid())
WITH CHECK (trainer_id = auth.uid());