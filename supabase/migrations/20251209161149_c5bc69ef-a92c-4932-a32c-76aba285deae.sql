
-- First ensure demo check-in settings exist
INSERT INTO check_in_settings (
  client_id, trainer_id, frequency, enabled, reminder_time,
  include_weight, include_measurements, include_photos, include_mood, include_notes,
  custom_questions
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'weekly',
  true,
  '09:00:00',
  true, true, true, true, true,
  '[{"id": "q1", "question": "Did you follow the meal plan?"}]'
) ON CONFLICT DO NOTHING;

-- Insert demo check-in submissions
INSERT INTO check_in_submissions (
  settings_id, client_id, trainer_id, due_date, completed_at, status,
  weight, measurements, photos, mood_rating, energy_level, sleep_quality,
  notes, custom_answers, trainer_feedback, trainer_reviewed_at
) 
SELECT 
  cs.id,
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '14 days',
  (CURRENT_DATE - INTERVAL '14 days')::timestamp + TIME '10:30:00',
  'completed',
  78.5,
  '{"waist": 85, "hips": 99, "thighs": 59, "arms": 32}'::jsonb,
  '["front.jpg", "side.jpg"]'::jsonb,
  7, 6, 7,
  'Had a good week overall. Stuck to the meal plan except for the weekend.',
  '{"Did you follow the meal plan?": "Mostly yes, had a cheat day on Saturday"}'::jsonb,
  'Great progress! Keep up the consistency.',
  (CURRENT_DATE - INTERVAL '13 days')::timestamp
FROM check_in_settings cs
WHERE cs.client_id = '00000000-0000-0000-0000-000000000002'
LIMIT 1;

-- Check-in from 1 week ago (pending review)
INSERT INTO check_in_submissions (
  settings_id, client_id, trainer_id, due_date, completed_at, status,
  weight, measurements, photos, mood_rating, energy_level, sleep_quality,
  notes, custom_answers
)
SELECT 
  cs.id,
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  CURRENT_DATE - INTERVAL '7 days',
  (CURRENT_DATE - INTERVAL '7 days')::timestamp + TIME '09:15:00',
  'completed',
  77.8,
  '{"waist": 84, "hips": 98, "thighs": 58, "arms": 32.5}'::jsonb,
  '["front.jpg", "side.jpg", "back.jpg"]'::jsonb,
  8, 7, 8,
  'Feeling great this week! Energy levels are up.',
  '{"Did you follow the meal plan?": "Yes, 100% this week!"}'::jsonb
FROM check_in_settings cs
WHERE cs.client_id = '00000000-0000-0000-0000-000000000002'
LIMIT 1;

-- Pending check-in due today
INSERT INTO check_in_submissions (
  settings_id, client_id, trainer_id, due_date, status
)
SELECT 
  cs.id,
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  CURRENT_DATE,
  'pending'
FROM check_in_settings cs
WHERE cs.client_id = '00000000-0000-0000-0000-000000000002'
LIMIT 1;
