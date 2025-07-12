-- Complete missing demo data for gym dashboard
-- First, let's insert trainer contracts without foreign key issues

INSERT INTO public.gym_trainer_contracts (
  gym_id,
  trainer_id,
  contract_type,
  commission_rate,
  base_salary,
  start_date,
  status
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  'partnership',
  25.0,
  1500.00,
  '2024-01-01',
  'active'
),
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'employee',
  NULL,
  2500.00,
  '2024-02-01',
  'active'
)
ON CONFLICT (id) DO NOTHING;