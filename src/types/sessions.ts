
/**
 * Shared types for session-related components
 */

export type SessionStatus = 'available' | 'registered' | 'confirmed' | 'pending' | 'completed' | 'scheduled';
export type SessionMode = 'in-person' | 'video';

// Base session interface with common properties for all contexts
export interface SessionBase {
  id: number;
  name: string;
  time: string;
  date: string | Date;
  description?: string;
  mode?: SessionMode;
  status?: SessionStatus;
}

// Client-facing session properties
export interface SessionItem extends SessionBase {
  trainer: string;
  status: SessionStatus;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
}

// Trainer-facing session properties
export interface TrainerSessionItem extends SessionBase {
  participants: number;
  maxParticipants: number;
  waitingList?: number;
  status?: SessionStatus;
  paymentStatus?: {
    paid: number;
    pending: number;
    total: number;
  };
}

// For backwards compatibility
export type { TrainerSessionItem as SessionWithPayment };
