-- Clean duplicate sessions, keeping the one with the most advanced status
WITH ranked_sessions AS (
  SELECT id, 
    ROW_NUMBER() OVER (
      PARTITION BY package_assignment_id, session_number 
      ORDER BY 
        CASE status 
          WHEN 'completed' THEN 1 
          WHEN 'confirmed' THEN 2 
          WHEN 'proposed' THEN 3 
          WHEN 'available' THEN 4 
          ELSE 5 
        END,
        created_at ASC
    ) AS rn
  FROM package_session_bookings
)
DELETE FROM package_session_bookings 
WHERE id IN (SELECT id FROM ranked_sessions WHERE rn > 1);

-- Add unique constraint to prevent future duplicates
ALTER TABLE package_session_bookings 
ADD CONSTRAINT unique_package_session 
UNIQUE (package_assignment_id, session_number);