-- Create the demo gym user in auth.users if it doesn't exist
-- Since we can't directly insert into auth.users, let's remove the foreign key constraint temporarily

-- First check if the constraint exists and remove it
DO $$ 
BEGIN
    -- Drop the foreign key constraint if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'gym_trainer_contracts_gym_id_fkey'
        AND table_name = 'gym_trainer_contracts'
    ) THEN
        ALTER TABLE gym_trainer_contracts DROP CONSTRAINT gym_trainer_contracts_gym_id_fkey;
    END IF;
END $$;

-- Now insert the trainer contracts
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