
export type SessionStatus = 'available' | 'registered' | 'confirmed' | 'cancelled' | 'completed' | 'pending' | 'scheduled';

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
  locationNotes?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  packageSession?: boolean;
}

export interface TrainerSessionItem {
  id: number;
  name: string;
  time: string;
  date: string | Date;
  participants: number;
  maxParticipants: number;
  paymentStatus: {
    paid: number;
    pending: number;
    total: number;
  };
  waitingList?: number;
  mode?: 'video' | 'in-person';
  status?: 'scheduled' | 'cancelled' | 'completed';
  description?: string;
  address?: string;
  locationNotes?: string;
  latitude?: number;
  longitude?: number;
  participantDetails?: any[];
  waitingListDetails?: any[];
}
