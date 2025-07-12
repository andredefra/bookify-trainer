-- Add sample calendar events with proper UUID trainer IDs for testing
INSERT INTO public.calendar_events (
  trainer_id,
  event_category,
  title,
  description,
  start_datetime,
  end_datetime,
  color,
  location
) VALUES 
-- Events for trainer 1 (Marco -> Alex Johnson)
('550e8400-e29b-41d4-a716-446655440001', 'session', 'Personal Training - Sarah Wilson', 'One-on-one strength training session', '2025-01-13 09:00:00+00', '2025-01-13 10:00:00+00', '#3B82F6', 'Main Gym'),
('550e8400-e29b-41d4-a716-446655440001', 'session', 'HIIT Group Session', 'High-intensity interval training for 6 participants', '2025-01-13 14:30:00+00', '2025-01-13 15:30:00+00', '#3B82F6', 'Studio A'),
('550e8400-e29b-41d4-a716-446655440001', 'sales_activity', 'New Client Consultation - Mike Brown', 'Initial consultation and program planning', '2025-01-13 16:00:00+00', '2025-01-13 17:00:00+00', '#10B981', 'Consultation Room'),
('550e8400-e29b-41d4-a716-446655440001', 'availability', 'Available for Bookings', 'Open slot for new appointments', '2025-01-13 11:00:00+00', '2025-01-13 12:00:00+00', '#059669', NULL),
('550e8400-e29b-41d4-a716-446655440001', 'session', 'Yoga Class', 'Beginner-friendly yoga session', '2025-01-14 18:00:00+00', '2025-01-14 19:00:00+00', '#3B82F6', 'Studio B'),
('550e8400-e29b-41d4-a716-446655440001', 'deadline', 'Package Renewal - Jessica Miller', 'Premium package expires today', '2025-01-14 17:00:00+00', '2025-01-14 17:00:00+00', '#EF4444', NULL),

-- Events for trainer 2 (Laura -> Emma Davis)
('550e8400-e29b-41d4-a716-446655440002', 'session', 'Personal Training - David Kim', 'Weight loss focused training session', '2025-01-13 10:00:00+00', '2025-01-13 11:00:00+00', '#3B82F6', 'Main Gym'),
('550e8400-e29b-41d4-a716-446655440002', 'session', 'CrossFit Class', 'Advanced CrossFit workout', '2025-01-13 17:00:00+00', '2025-01-13 18:00:00+00', '#3B82F6', 'CrossFit Area'),
('550e8400-e29b-41d4-a716-446655440002', 'availability', 'Available for Bookings', 'Open morning slot', '2025-01-13 08:00:00+00', '2025-01-13 09:00:00+00', '#059669', NULL),
('550e8400-e29b-41d4-a716-446655440002', 'personal_task', 'Equipment Maintenance', 'Monthly equipment check and maintenance', '2025-01-14 08:00:00+00', '2025-01-14 09:00:00+00', '#6B7280', 'Equipment Room'),
('550e8400-e29b-41d4-a716-446655440002', 'sales_activity', 'Follow-up Call - Lisa Garcia', 'Follow-up with potential new client', '2025-01-14 15:30:00+00', '2025-01-14 16:00:00+00', '#10B981', NULL),

-- Events for trainer 3 (Giovanni -> Marcus Thompson)  
('550e8400-e29b-41d4-a716-446655440003', 'session', 'Personal Training - Amanda Foster', 'Rehabilitation and recovery session', '2025-01-13 13:00:00+00', '2025-01-13 14:00:00+00', '#3B82F6', 'Rehab Area'),
('550e8400-e29b-41d4-a716-446655440003', 'availability', 'Available for Bookings', 'Available afternoon slot', '2025-01-13 15:00:00+00', '2025-01-13 16:00:00+00', '#059669', NULL),
('550e8400-e29b-41d4-a716-446655440003', 'program_milestone', 'Progress Review - Tom Wilson', '6-week program milestone assessment', '2025-01-14 11:00:00+00', '2025-01-14 12:00:00+00', '#8B5CF6', 'Assessment Room'),
('550e8400-e29b-41d4-a716-446655440003', 'deadline', 'Certification Renewal', 'CPR certification renewal deadline', '2025-01-15 09:00:00+00', '2025-01-15 09:00:00+00', '#EF4444', NULL);