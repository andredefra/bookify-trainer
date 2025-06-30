
-- Update the existing demo package assignments with more realistic dates
-- Make one package truly active (future expiry) and one expired (past expiry)
UPDATE client_package_assignments 
SET 
  expiry_date = '2025-08-15',
  status = 'active'
WHERE client_id = '00000000-0000-0000-0000-000000000002' 
  AND package_id = (SELECT id FROM client_packages WHERE title = 'Personal Training Package' LIMIT 1);

UPDATE client_package_assignments 
SET 
  expiry_date = '2024-11-20',
  status = 'expired'
WHERE client_id = '00000000-0000-0000-0000-000000000002' 
  AND package_id = (SELECT id FROM client_packages WHERE title = 'Complete Transformation' LIMIT 1);

-- Add one more active package for demonstration
INSERT INTO client_package_assignments (
  client_id, 
  trainer_id, 
  package_id, 
  sessions_used, 
  sessions_total, 
  total_paid, 
  expiry_date,
  status
) VALUES (
  '00000000-0000-0000-0000-000000000002', 
  '00000000-0000-0000-0000-000000000001', 
  (SELECT id FROM client_packages WHERE title = 'Beginner Fitness Program' LIMIT 1), 
  2, 6, 200.00, '2025-09-30', 'active'
);

-- Update client_packages to have specific trainers
-- Add more packages from different trainers
INSERT INTO client_packages (trainer_id, title, description, package_type, sessions_count, price, validity_days) VALUES
('11111111-1111-1111-1111-111111111111', 'Sarah Johnson - Yoga & Flexibility', 'Complete yoga and flexibility program', 'hybrid', 12, 600.00, 120),
('22222222-2222-2222-2222-222222222222', 'Alex Thompson - HIIT Training', 'High-intensity interval training package', 'sessions_only', 8, 400.00, 60);
