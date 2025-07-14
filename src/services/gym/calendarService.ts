import { GymCalendarEvent } from "@/hooks/gym/useGymCalendar";

// Demo calendar events for when no real events exist
export const getDemoCalendarEvents = (): GymCalendarEvent[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  return [
    {
      id: 'demo-event-1',
      title: 'Morning HIIT Class',
      start_datetime: new Date(today.setHours(9, 0, 0, 0)).toISOString(),
      end_datetime: new Date(today.setHours(10, 0, 0, 0)).toISOString(),
      event_category: 'session',
      trainer_id: 'demo-trainer-1',
      client_id: '00000000-0000-0000-0000-000000000001',
      description: 'High-intensity interval training session',
      location: 'Studio A',
      color: '#10B981',
      trainer_name: 'Trainer Mike',
      client_name: 'Sarah Johnson'
    },
    {
      id: 'demo-event-2',
      title: 'Personal Training - Alex',
      start_datetime: new Date(today.setHours(14, 30, 0, 0)).toISOString(),
      end_datetime: new Date(today.setHours(15, 30, 0, 0)).toISOString(),
      event_category: 'session',
      trainer_id: 'demo-trainer-2',
      client_id: '00000000-0000-0000-0000-000000000004',
      description: 'One-on-one personal training session',
      location: 'Training Room 1',
      color: '#3B82F6',
      trainer_name: 'Trainer Sarah',
      client_name: 'Alex Rodriguez'
    },
    {
      id: 'demo-event-3',
      title: 'Yoga Flow Class',
      start_datetime: new Date(tomorrow.setHours(18, 0, 0, 0)).toISOString(),
      end_datetime: new Date(tomorrow.setHours(19, 0, 0, 0)).toISOString(),
      event_category: 'session',
      trainer_id: 'demo-trainer-3',
      description: 'Relaxing yoga flow for all levels',
      location: 'Studio B',
      color: '#8B5CF6',
      trainer_name: 'Trainer Emma'
    },
    {
      id: 'demo-event-4',
      title: 'Strength Training - Lisa',
      start_datetime: new Date(dayAfter.setHours(10, 0, 0, 0)).toISOString(),
      end_datetime: new Date(dayAfter.setHours(11, 0, 0, 0)).toISOString(),
      event_category: 'session',
      trainer_id: 'demo-trainer-1',
      client_id: '00000000-0000-0000-0000-000000000005',
      description: 'Focused strength training session',
      location: 'Weight Room',
      color: '#F59E0B',
      trainer_name: 'Trainer Mike',
      client_name: 'Lisa Thompson'
    },
    {
      id: 'demo-event-5',
      title: 'Follow-up Call - David',
      start_datetime: new Date(dayAfter.setHours(16, 0, 0, 0)).toISOString(),
      end_datetime: new Date(dayAfter.setHours(16, 30, 0, 0)).toISOString(),
      event_category: 'sales_activity',
      trainer_id: 'demo-trainer-2',
      client_id: '00000000-0000-0000-0000-000000000006',
      description: 'Follow-up call regarding membership renewal',
      location: 'Office',
      color: '#EF4444',
      trainer_name: 'Trainer Sarah',
      client_name: 'David Wilson'
    }
  ];
};