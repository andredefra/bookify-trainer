-- Update the dates for demo client active packages
UPDATE gym_package_assignments
SET 
  start_date = '2025-11-01',
  end_date = CASE 
    WHEN package_id = '77777777-7777-7777-7777-777777777777' THEN '2026-11-01'  -- Premium Monthly (12 months)
    WHEN package_id = '88888888-8888-8888-8888-888888888888' THEN '2026-02-01'  -- Personal Training (3 months)
    ELSE end_date
  END,
  updated_at = NOW()
WHERE client_id = '00000000-0000-0000-0000-000000000002'
  AND status = 'active';