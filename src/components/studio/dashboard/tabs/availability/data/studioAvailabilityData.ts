export interface TrainerAvailability {
  trainerId: string;
  trainerName: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

export interface StudioShift {
  id: string;
  trainerId: string;
  trainerName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'pending' | 'cancelled' | 'completed';
  location?: string;
  notes?: string;
  createdBy: 'studio' | 'trainer';
}

export interface ShiftRequest {
  id: string;
  trainerId: string;
  trainerName: string;
  type: 'swap' | 'time_off' | 'extra_shift' | 'change';
  originalShiftId?: string;
  requestedDate?: string;
  requestedTime?: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const mockTrainerAvailability: TrainerAvailability[] = [
  // Marco Rossi - Morning person
  { trainerId: "t1", trainerName: "Marco Rossi", dayOfWeek: 1, startTime: "07:00", endTime: "14:00", isRecurring: true },
  { trainerId: "t1", trainerName: "Marco Rossi", dayOfWeek: 2, startTime: "07:00", endTime: "14:00", isRecurring: true },
  { trainerId: "t1", trainerName: "Marco Rossi", dayOfWeek: 3, startTime: "07:00", endTime: "14:00", isRecurring: true },
  { trainerId: "t1", trainerName: "Marco Rossi", dayOfWeek: 4, startTime: "07:00", endTime: "14:00", isRecurring: true },
  { trainerId: "t1", trainerName: "Marco Rossi", dayOfWeek: 5, startTime: "07:00", endTime: "12:00", isRecurring: true },
  
  // Giulia Bianchi - Afternoon/Evening
  { trainerId: "t2", trainerName: "Giulia Bianchi", dayOfWeek: 1, startTime: "14:00", endTime: "21:00", isRecurring: true },
  { trainerId: "t2", trainerName: "Giulia Bianchi", dayOfWeek: 2, startTime: "14:00", endTime: "21:00", isRecurring: true },
  { trainerId: "t2", trainerName: "Giulia Bianchi", dayOfWeek: 3, startTime: "14:00", endTime: "21:00", isRecurring: true },
  { trainerId: "t2", trainerName: "Giulia Bianchi", dayOfWeek: 5, startTime: "14:00", endTime: "21:00", isRecurring: true },
  { trainerId: "t2", trainerName: "Giulia Bianchi", dayOfWeek: 6, startTime: "09:00", endTime: "14:00", isRecurring: true },
  
  // Paolo Verdi - Flexible
  { trainerId: "t3", trainerName: "Paolo Verdi", dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isRecurring: true },
  { trainerId: "t3", trainerName: "Paolo Verdi", dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isRecurring: true },
  { trainerId: "t3", trainerName: "Paolo Verdi", dayOfWeek: 5, startTime: "09:00", endTime: "17:00", isRecurring: true },
  { trainerId: "t3", trainerName: "Paolo Verdi", dayOfWeek: 6, startTime: "08:00", endTime: "13:00", isRecurring: true },
];

export const mockStudioShifts: StudioShift[] = [
  {
    id: "s1",
    trainerId: "t1",
    trainerName: "Marco Rossi",
    date: "2024-01-22",
    startTime: "07:00",
    endTime: "12:00",
    status: "confirmed",
    location: "Main Floor",
    createdBy: "studio"
  },
  {
    id: "s2",
    trainerId: "t2",
    trainerName: "Giulia Bianchi",
    date: "2024-01-22",
    startTime: "14:00",
    endTime: "19:00",
    status: "confirmed",
    location: "Yoga Studio",
    createdBy: "studio"
  },
  {
    id: "s3",
    trainerId: "t3",
    trainerName: "Paolo Verdi",
    date: "2024-01-22",
    startTime: "10:00",
    endTime: "15:00",
    status: "pending",
    location: "CrossFit Area",
    createdBy: "trainer"
  },
  {
    id: "s4",
    trainerId: "t1",
    trainerName: "Marco Rossi",
    date: "2024-01-23",
    startTime: "07:00",
    endTime: "12:00",
    status: "scheduled",
    location: "Main Floor",
    createdBy: "studio"
  },
  {
    id: "s5",
    trainerId: "t2",
    trainerName: "Giulia Bianchi",
    date: "2024-01-23",
    startTime: "15:00",
    endTime: "20:00",
    status: "scheduled",
    location: "Yoga Studio",
    createdBy: "studio"
  }
];

export const mockShiftRequests: ShiftRequest[] = [
  {
    id: "req1",
    trainerId: "t1",
    trainerName: "Marco Rossi",
    type: "swap",
    originalShiftId: "s4",
    requestedDate: "2024-01-25",
    reason: "Personal appointment on Tuesday, can work Thursday instead",
    status: "pending",
    createdAt: "2024-01-20"
  },
  {
    id: "req2",
    trainerId: "t2",
    trainerName: "Giulia Bianchi",
    type: "time_off",
    requestedDate: "2024-01-26",
    reason: "Family event - need full day off",
    status: "pending",
    createdAt: "2024-01-19"
  },
  {
    id: "req3",
    trainerId: "t3",
    trainerName: "Paolo Verdi",
    type: "extra_shift",
    requestedDate: "2024-01-27",
    requestedTime: "08:00-13:00",
    reason: "Available for extra hours this Saturday",
    status: "pending",
    createdAt: "2024-01-18"
  }
];

export const trainerColors: Record<string, string> = {
  t1: "bg-blue-500",
  t2: "bg-purple-500",
  t3: "bg-emerald-500",
  t4: "bg-amber-500"
};
