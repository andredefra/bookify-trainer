-- Update second package to have a different client for better demo
UPDATE client_package_assignments 
SET client_id = '11111111-1111-1111-1111-111111111111'
WHERE trainer_id = '22222222-2222-2222-2222-222222222222'
  AND status = 'active';