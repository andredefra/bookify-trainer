-- Update Mike Chen's package price to allow 4 installments
UPDATE client_packages 
SET price = 1200.00
WHERE id = (SELECT package_id FROM client_package_assignments WHERE id = '368fe636-2194-4379-a5ad-efa02204e4f5');

-- Update total_paid to reflect first installment only
UPDATE client_package_assignments 
SET total_paid = 300.00
WHERE id = '368fe636-2194-4379-a5ad-efa02204e4f5';

-- Insert payment records for Mike (4 installments of €300 each)
INSERT INTO client_package_payments (package_assignment_id, amount, payment_method, payment_status, payment_date, notes)
VALUES ('368fe636-2194-4379-a5ad-efa02204e4f5', 300.00, 'stripe', 'paid', CURRENT_DATE, 'First installment - 1/4');

INSERT INTO client_package_payments (package_assignment_id, amount, payment_method, payment_status, due_date, notes)
VALUES 
('368fe636-2194-4379-a5ad-efa02204e4f5', 300.00, 'stripe', 'pending', '2025-12-28', 'Second installment - 2/4'),
('368fe636-2194-4379-a5ad-efa02204e4f5', 300.00, 'stripe', 'pending', '2026-01-28', 'Third installment - 3/4'),
('368fe636-2194-4379-a5ad-efa02204e4f5', 300.00, 'stripe', 'pending', '2026-02-28', 'Final installment - 4/4');