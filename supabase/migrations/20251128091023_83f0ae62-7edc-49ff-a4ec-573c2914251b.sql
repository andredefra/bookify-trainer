-- Seed demo data for package session bookings
-- This creates sample sessions for the existing demo client package assignments

-- First, let's get the demo trainer and client IDs
DO $$
DECLARE
  demo_trainer_id UUID := '00000000-0000-0000-0000-000000000001';
  demo_client_id UUID := '00000000-0000-0000-0000-000000000002';
  assignment_id UUID;
BEGIN
  -- Find the first active package assignment for demo client
  SELECT id INTO assignment_id
  FROM client_package_assignments
  WHERE client_id = demo_client_id
    AND trainer_id = demo_trainer_id
    AND status = 'active'
  LIMIT 1;

  -- Only insert if we have an assignment and no existing sessions
  IF assignment_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM package_session_bookings WHERE package_assignment_id = assignment_id
  ) THEN
    -- Insert 10 sessions with varied statuses
    -- Sessions 1-2: Completed
    INSERT INTO package_session_bookings (
      package_assignment_id, trainer_id, client_id, session_number,
      status, session_type, location, duration_minutes,
      proposed_datetime, confirmed_datetime, completed_datetime,
      proposed_by, notes
    ) VALUES
    (assignment_id, demo_trainer_id, demo_client_id, 1,
     'completed', 'in-person', 'Main Gym Floor', 60,
     NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days',
     'trainer', 'First session - fitness assessment and goal setting'),
    (assignment_id, demo_trainer_id, demo_client_id, 2,
     'completed', 'in-person', 'Main Gym Floor', 60,
     NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days',
     'trainer', 'Upper body strength focus');

    -- Session 3: Confirmed (upcoming)
    INSERT INTO package_session_bookings (
      package_assignment_id, trainer_id, client_id, session_number,
      status, session_type, location, duration_minutes,
      proposed_datetime, confirmed_datetime,
      proposed_by, notes
    ) VALUES
    (assignment_id, demo_trainer_id, demo_client_id, 3,
     'confirmed', 'in-person', 'Main Gym Floor', 60,
     NOW() + INTERVAL '2 days', NOW() - INTERVAL '1 day',
     'trainer', 'Lower body strength and cardio');

    -- Session 4: Proposed (awaiting confirmation)
    INSERT INTO package_session_bookings (
      package_assignment_id, trainer_id, client_id, session_number,
      status, session_type, location, duration_minutes,
      proposed_datetime, proposed_by, notes
    ) VALUES
    (assignment_id, demo_trainer_id, demo_client_id, 4,
     'proposed', 'video', 'Online Session', 45,
     NOW() + INTERVAL '5 days',
     'trainer', 'Flexibility and mobility work - online session');

    -- Sessions 5-10: Available
    INSERT INTO package_session_bookings (
      package_assignment_id, trainer_id, client_id, session_number,
      status, session_type, duration_minutes
    )
    SELECT 
      assignment_id, demo_trainer_id, demo_client_id, session_num,
      'available', 'in-person', 60
    FROM generate_series(5, 10) AS session_num;

    RAISE NOTICE 'Demo package session bookings created successfully for assignment %', assignment_id;
  ELSE
    RAISE NOTICE 'Package assignment not found or sessions already exist';
  END IF;
END $$;
