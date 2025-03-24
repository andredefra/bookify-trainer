
/**
 * Shared types for session-related components
 */

export interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
}

export type SessionStatus = 'available' | 'registered' | 'confirmed' | 'pending' | 'completed';
