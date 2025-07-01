
import { CalendarEvent } from './types';

export const createMockEvents = (trainerId: string): CalendarEvent[] => [
  // Today's events
  {
    id: '1',
    title: 'Personal Training - Sarah Johnson',
    type: 'session',
    start: new Date(2024, 11, 30, 9, 0),
    end: new Date(2024, 11, 30, 10, 0),
    client: 'Sarah Johnson',
    location: 'Main Gym',
    color: 'bg-blue-500',
    status: 'scheduled',
    trainer_id: trainerId
  },
  {
    id: '2',
    title: 'Prepare weekly workout plans',
    type: 'personal_task',
    start: new Date(2024, 11, 30, 14, 0),
    end: new Date(2024, 11, 30, 14, 30),
    color: 'bg-purple-500',
    status: 'pending',
    description: 'Review and prepare workout plans for all clients',
    trainer_id: trainerId
  },
  {
    id: '3',
    title: 'Package Payment Due - Mike Peterson',
    type: 'deadline',
    start: new Date(2024, 11, 30, 16, 0),
    end: new Date(2024, 11, 30, 16, 0),
    client: 'Mike Peterson',
    color: 'bg-orange-500',
    status: 'alert',
    description: '3-month package payment due',
    trainer_id: trainerId
  },
  // Tomorrow's events
  {
    id: '4',
    title: 'Lead Consultation - Emma Thompson',
    type: 'sales_activity',
    start: new Date(2024, 11, 31, 14, 0),
    end: new Date(2024, 11, 31, 15, 0),
    client: 'Emma Thompson',
    location: 'Coffee Shop Downtown',
    color: 'bg-green-500',
    status: 'scheduled',
    description: 'Initial consultation meeting',
    trainer_id: trainerId
  },
  {
    id: '5',
    title: 'Morning HIIT Session - Group',
    type: 'session',
    start: new Date(2024, 11, 31, 9, 0),
    end: new Date(2024, 11, 31, 10, 0),
    client: 'Group Session (6 people)',
    location: 'Studio B',
    color: 'bg-blue-500',
    status: 'scheduled',
    trainer_id: trainerId
  },
  {
    id: '6',
    title: 'Equipment delivery reminder',
    type: 'personal_task',
    start: new Date(2024, 11, 31, 11, 0),
    end: new Date(2024, 11, 31, 11, 30),
    color: 'bg-gray-500',
    status: 'pending',
    description: 'New resistance bands and yoga mats arriving',
    trainer_id: trainerId
  },
  // Past events
  {
    id: '7',
    title: '6-week Program Milestone - Lisa Garcia',
    type: 'program_milestone',
    start: new Date(2024, 11, 25, 11, 0),
    end: new Date(2024, 11, 25, 11, 30),
    client: 'Lisa Garcia',
    location: 'Online',
    color: 'bg-purple-500',
    status: 'completed',
    description: 'Mid-program assessment and adjustments',
    trainer_id: trainerId
  },
  {
    id: '8',
    title: 'New Client Consultation - David Kim',
    type: 'sales_activity',
    start: new Date(2024, 11, 23, 16, 0),
    end: new Date(2024, 11, 23, 17, 0),
    client: 'David Kim',
    location: 'Main Gym',
    color: 'bg-green-500',
    status: 'completed',
    description: 'Successfully converted to 3-month package',
    trainer_id: trainerId
  },
  {
    id: '9',
    title: 'Certification renewal reminder',
    type: 'personal_task',
    start: new Date(2024, 11, 20, 9, 0),
    end: new Date(2024, 11, 20, 9, 15),
    color: 'bg-yellow-500',
    status: 'completed',
    description: 'CPR certification renewal completed',
    trainer_id: trainerId
  },
  // Future events
  {
    id: '10',
    title: 'Yoga Basics - Group Session',
    type: 'session',
    start: new Date(2025, 0, 5, 17, 30),
    end: new Date(2025, 0, 5, 18, 30),
    client: 'Group Session (8 people)',
    location: 'Studio A',
    color: 'bg-blue-500',
    status: 'scheduled',
    trainer_id: trainerId
  },
  {
    id: '11',
    title: 'Package Renewal Alert - James Wilson',
    type: 'deadline',
    start: new Date(2025, 0, 7, 9, 0),
    end: new Date(2025, 0, 7, 9, 0),
    client: 'James Wilson',
    color: 'bg-red-500',
    status: 'alert',
    description: '6-month package expires in 3 days',
    trainer_id: trainerId
  },
  {
    id: '12',
    title: 'Follow-up call - Potential client',
    type: 'sales_activity',
    start: new Date(2025, 0, 8, 15, 0),
    end: new Date(2025, 0, 8, 15, 30),
    client: 'Jessica Martinez',
    color: 'bg-green-500',
    status: 'scheduled',
    description: 'Follow-up after initial inquiry',
    trainer_id: trainerId
  },
  {
    id: '13',
    title: 'Gym equipment maintenance',
    type: 'personal_task',
    start: new Date(2025, 0, 10, 8, 0),
    end: new Date(2025, 0, 10, 10, 0),
    location: 'Main Gym',
    color: 'bg-gray-500',
    status: 'scheduled',
    description: 'Monthly maintenance check for all equipment',
    trainer_id: trainerId
  },
  {
    id: '14',
    title: 'Monthly progress review - All clients',
    type: 'personal_task',
    start: new Date(2025, 0, 15, 18, 0),
    end: new Date(2025, 0, 15, 19, 0),
    color: 'bg-purple-500',
    status: 'scheduled',
    description: 'Review progress reports and update programs',
    trainer_id: trainerId
  },
  {
    id: '15',
    title: 'Available Time Slot - Morning',
    type: 'availability',
    start: new Date(2025, 0, 3, 10, 0),
    end: new Date(2025, 0, 3, 12, 0),
    color: 'bg-emerald-500',
    status: 'scheduled',
    description: 'Open slot for new client bookings',
    trainer_id: trainerId
  },
  {
    id: '16',
    title: 'Follow-up - New Lead Contact',
    type: 'sales_activity',
    start: new Date(2025, 0, 4, 16, 30),
    end: new Date(2025, 0, 4, 17, 0),
    client: 'Michael Brown',
    color: 'bg-green-500',
    status: 'scheduled',
    description: 'First contact with gym referral',
    trainer_id: trainerId
  },
  {
    id: '17',
    title: 'Contract renewal deadline - Premium client',
    type: 'deadline',
    start: new Date(2025, 0, 12, 17, 0),
    end: new Date(2025, 0, 12, 17, 0),
    client: 'Amanda Foster',
    color: 'bg-red-500',
    status: 'alert',
    description: 'VIP package renewal needed',
    trainer_id: trainerId
  },
  {
    id: '18',
    title: 'Program completion celebration - Tom Wilson',
    type: 'program_milestone',
    start: new Date(2025, 0, 20, 19, 0),
    end: new Date(2025, 0, 20, 20, 0),
    client: 'Tom Wilson',
    location: 'Main Gym',
    color: 'bg-purple-500',
    status: 'scheduled',
    description: '12-week transformation program completed successfully',
    trainer_id: trainerId
  }
];
