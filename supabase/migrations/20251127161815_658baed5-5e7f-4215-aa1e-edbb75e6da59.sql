-- Add new status values to client_package_assignments
ALTER TABLE client_package_assignments 
DROP CONSTRAINT IF EXISTS client_package_assignments_status_check;

ALTER TABLE client_package_assignments 
ADD CONSTRAINT client_package_assignments_status_check 
CHECK (status IN ('active', 'pending_confirmation', 'rejected', 'completed', 'expired', 'proposed'));