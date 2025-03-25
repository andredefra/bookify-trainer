
/**
 * Shared types for session-related components
 */

export type SessionStatus = 'available' | 'registered' | 'confirmed' | 'pending' | 'completed';

export interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: SessionStatus;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
  // Additional properties for trainer dashboard
  participants?: number;
  maxParticipants?: number;
  waitingList?: number;
  paymentStatus?: {
    paid: number;
    pending: number;
    total: number;
  };
}
