-- Setup demo data for gym connections and communications
DO $$
DECLARE
  demo_gym_id UUID := '11111111-1111-1111-1111-111111111111';
  demo_client1_id UUID := '44444444-4444-4444-4444-444444444444';
  demo_client2_id UUID := '55555555-5555-5555-5555-555555555555';
  demo_client3_id UUID := '66666666-6666-6666-6666-666666666666';
BEGIN
  -- Clean up existing demo connection data
  DELETE FROM gym_connection_requests WHERE gym_id = demo_gym_id;
  DELETE FROM gym_client_communications WHERE gym_id = demo_gym_id;

  -- Insert demo gym connection requests (approved)
  INSERT INTO gym_connection_requests (
    id, client_id, gym_id, status, requested_at, responded_at, 
    client_message, gym_response, created_at, updated_at
  ) VALUES
  ('aaaa1111-1111-1111-1111-111111111111', demo_client1_id, demo_gym_id, 'approved', 
   '2025-01-01 10:00:00+00', '2025-01-01 14:00:00+00',
   'Hi, I would like to join FitLife Gym. I heard great things about your personal training programs.',
   'Welcome to FitLife Gym! We are excited to have you. Your membership has been approved.',
   '2025-01-01 10:00:00+00', '2025-01-01 14:00:00+00'),
  ('aaaa2222-2222-2222-2222-222222222222', demo_client2_id, demo_gym_id, 'approved',
   '2024-12-28 09:30:00+00', '2024-12-28 16:45:00+00',
   'Looking forward to starting my fitness journey with you!',
   'Great to have you aboard! Your package is ready.',
   '2024-12-28 09:30:00+00', '2024-12-28 16:45:00+00'),
  ('aaaa3333-3333-3333-3333-333333333333', demo_client3_id, demo_gym_id, 'approved',
   '2025-01-10 08:15:00+00', '2025-01-10 11:30:00+00',
   'I want to get back in shape after the holidays.',
   'Perfect timing! We have everything you need.',
   '2025-01-10 08:15:00+00', '2025-01-10 11:30:00+00');

  -- Insert demo gym communications
  INSERT INTO gym_client_communications (
    id, gym_id, client_id, sender_type, message_type, subject, message,
    is_read, sent_at, read_at, created_at, updated_at
  ) VALUES
  ('bbbb1111-1111-1111-1111-111111111111', demo_gym_id, demo_client1_id, 'gym', 'welcome',
   'Welcome to FitLife Gym!',
   'Welcome to our gym family! Your Premium Monthly package is now active. You can start booking sessions right away. Our trainers are here to help you achieve your fitness goals.',
   true, '2025-01-01 15:00:00+00', '2025-01-01 16:30:00+00', 
   '2025-01-01 15:00:00+00', '2025-01-01 16:30:00+00'),
  ('bbbb2222-2222-2222-2222-222222222222', demo_gym_id, demo_client1_id, 'gym', 'session_update',
   'Your next training session',
   'Reminder: Your personal training session is scheduled for tomorrow at 3 PM with trainer Mike. Please bring water and a towel.',
   false, '2025-01-14 18:00:00+00', NULL,
   '2025-01-14 18:00:00+00', '2025-01-14 18:00:00+00'),
  ('bbbb3333-3333-3333-3333-333333333333', demo_gym_id, demo_client2_id, 'gym', 'package_reminder',
   'Package Update',
   'Great progress! You have used 3 out of 10 personal training sessions. Keep up the excellent work!',
   true, '2025-01-12 10:00:00+00', '2025-01-12 12:15:00+00',
   '2025-01-12 10:00:00+00', '2025-01-12 12:15:00+00'),
  ('bbbb4444-4444-4444-4444-444444444444', demo_gym_id, demo_client3_id, 'gym', 'general',
   'New Group Classes Available',
   'We have added new yoga and pilates classes to our schedule. Check them out in the app!',
   false, '2025-01-13 09:00:00+00', NULL,
   '2025-01-13 09:00:00+00', '2025-01-13 09:00:00+00'),
  ('bbbb5555-5555-5555-5555-555555555555', demo_gym_id, demo_client1_id, 'client', 'general',
   'Question about equipment',
   'Hi, I wanted to ask about the new rowing machines. Are they available for use?',
   true, '2025-01-11 14:30:00+00', '2025-01-11 15:45:00+00',
   '2025-01-11 14:30:00+00', '2025-01-11 15:45:00+00');

END $$;