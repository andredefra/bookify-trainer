import { TrainerSessionItem } from "@/types/sessions";
import { SessionParticipant, WaitingListEntry } from "@/types/sessionParticipants";

// Sample participants data
export const sampleParticipants: SessionParticipant[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    isClient: true,
    paymentStatus: 'paid',
    bookedAt: '2024-03-10T09:30:00Z',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Mike Peterson',
    email: 'mike@example.com',
    isClient: true,
    paymentStatus: 'paid',
    bookedAt: '2024-03-10T10:15:00Z'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    isClient: false,
    paymentStatus: 'pending',
    bookedAt: '2024-03-11T14:20:00Z',
    phone: '+1987654321'
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@example.com',
    isClient: false,
    paymentStatus: 'unpaid',
    bookedAt: '2024-03-11T16:45:00Z'
  }
];

export const sampleWaitingList: WaitingListEntry[] = [
  {
    id: '5',
    name: 'Lisa Garcia',
    email: 'lisa@example.com',
    isClient: true,
    addedAt: '2024-03-12T08:30:00Z',
    priority: 1
  },
  {
    id: '6',
    name: 'David Chen',
    email: 'david@example.com',
    isClient: false,
    addedAt: '2024-03-12T11:20:00Z',
    priority: 2
  }
];

// Helper function to create reliable future dates
const createFutureDate = (daysFromNow: number, hour: number, minute: number = 0): string => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysFromNow);
  futureDate.setHours(hour, minute, 0, 0);
  return futureDate.toISOString().split('T')[0];
};

// Sample data with guaranteed postponable sessions (more than 12 hours away)
export const sampleSessions: TrainerSessionItem[] = [
  {
    id: 1,
    name: "Morning HIIT",
    time: "09:00 - 10:00",
    date: createFutureDate(2, 9), // 2 days from now at 9 AM
    participants: 5,
    maxParticipants: 10,
    paymentStatus: { paid: 4, pending: 1, total: 5 },
    participantDetails: sampleParticipants.slice(0, 5),
    waitingListDetails: []
  },
  {
    id: 2,
    name: "Personal Training - POSTPONABLE ⏰",
    time: "18:00 - 19:00",
    date: createFutureDate(1, 18), // Tomorrow at 6 PM (guaranteed >12h away)
    participants: 1,
    maxParticipants: 1,
    paymentStatus: { paid: 1, pending: 0, total: 1 },
    participantDetails: sampleParticipants.slice(0, 1),
    waitingListDetails: []
  },
  {
    id: 3,
    name: "Yoga Basics - POSTPONABLE ⏰",
    time: "17:30 - 18:30",
    date: createFutureDate(3, 17, 30), // 3 days from now at 5:30 PM
    participants: 8,
    maxParticipants: 12,
    paymentStatus: { paid: 6, pending: 2, total: 8 },
    waitingList: 2,
    participantDetails: sampleParticipants.slice(0, 4),
    waitingListDetails: sampleWaitingList
  },
  {
    id: 4,
    name: "Core Strength Video Class - POSTPONABLE ⏰",
    time: "19:00 - 20:00",
    date: createFutureDate(2, 19), // 2 days from now at 7 PM
    participants: 15,
    maxParticipants: 30,
    paymentStatus: { paid: 12, pending: 3, total: 15 },
    mode: "video", 
    status: "scheduled",
    participantDetails: sampleParticipants,
    waitingListDetails: []
  },
  {
    id: 5,
    name: "Weekend Session - POSTPONABLE ⏰", 
    time: "10:30 - 11:30",
    date: createFutureDate(4, 10, 30), // 4 days from now at 10:30 AM
    participants: 6,
    maxParticipants: 20,
    paymentStatus: { paid: 5, pending: 1, total: 6 },
    mode: "video",
    status: "scheduled",
    participantDetails: sampleParticipants.slice(0, 3),
    waitingListDetails: []
  },
  {
    id: 6,
    name: "Demo Postponable Session ⏰",
    time: "20:00 - 21:00", 
    date: createFutureDate(1, 20), // Tomorrow at 8 PM (guaranteed postponable)
    participants: 3,
    maxParticipants: 8,
    paymentStatus: { paid: 2, pending: 1, total: 3 },
    participantDetails: sampleParticipants.slice(0, 3),
    waitingListDetails: []
  }
];