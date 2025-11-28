-- Add due_date column to client_package_payments
ALTER TABLE client_package_payments
ADD COLUMN IF NOT EXISTS due_date DATE;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Trainers can view payments for their packages" ON client_package_payments;
  DROP POLICY IF EXISTS "Trainers can record payments" ON client_package_payments;
  DROP POLICY IF EXISTS "Trainers can update payments" ON client_package_payments;
  DROP POLICY IF EXISTS "Clients can make payments" ON client_package_payments;
END $$;

-- Create RLS policies for client_package_payments
CREATE POLICY "Trainers can view payments for their packages"
ON client_package_payments FOR SELECT
USING (
  package_assignment_id IN (
    SELECT id FROM client_package_assignments 
    WHERE trainer_id = auth.uid()
    OR trainer_id = '00000000-0000-0000-0000-000000000001'
    OR trainer_id = '22222222-2222-2222-2222-222222222222'
  )
);

CREATE POLICY "Trainers can record payments"
ON client_package_payments FOR INSERT
WITH CHECK (
  package_assignment_id IN (
    SELECT id FROM client_package_assignments 
    WHERE trainer_id = auth.uid() 
    OR trainer_id = '00000000-0000-0000-0000-000000000001'
    OR trainer_id = '22222222-2222-2222-2222-222222222222'
  )
);

CREATE POLICY "Trainers can update payments"
ON client_package_payments FOR UPDATE
USING (
  package_assignment_id IN (
    SELECT id FROM client_package_assignments 
    WHERE trainer_id = auth.uid()
    OR trainer_id = '00000000-0000-0000-0000-000000000001'
    OR trainer_id = '22222222-2222-2222-2222-222222222222'
  )
);

CREATE POLICY "Clients can make payments"
ON client_package_payments FOR INSERT
WITH CHECK (
  package_assignment_id IN (
    SELECT id FROM client_package_assignments 
    WHERE client_id = auth.uid()
    OR client_id = '00000000-0000-0000-0000-000000000002'
  )
);

-- Update Sarah Johnson's package to have installment payment tracking
UPDATE client_package_assignments 
SET total_paid = 149.99
WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- Insert payment records for Sarah's installment plan
INSERT INTO client_package_payments (
  package_assignment_id, amount, payment_method, payment_status, payment_date, notes
) VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  149.99, 'stripe', 'paid', '2025-11-12', 'First installment - 1/5'
);

-- Future installments (pending)
INSERT INTO client_package_payments (
  package_assignment_id, amount, payment_method, payment_status, due_date, notes
) VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 150.00, 'stripe', 'pending', '2025-12-12', 'Second installment - 2/5'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 150.00, 'stripe', 'pending', '2026-01-12', 'Third installment - 3/5'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 150.00, 'stripe', 'pending', '2026-02-12', 'Fourth installment - 4/5'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 150.01, 'stripe', 'pending', '2026-03-12', 'Final installment - 5/5');