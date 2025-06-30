
export type SessionStatus = 'available' | 'registered' | 'confirmed' | 'cancelled' | 'completed';

export interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string | Date;
  status: SessionStatus;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
  mode?: 'video' | 'in-person';
  address?: string;
  location?: string;
  description?: string;
  packageSession?: boolean;
}

export interface TrainerSessionItem {
  id: number;
  name: string;
  time: string;
  date: string;
  participants: number;
  maxParticipants: number;
  paymentStatus: {
    paid: number;
    pending: number;
    total: number;
  };
  waitingList?: number;
}
