
export type SessionStatus = "upcoming" | "completed" | "cancelled" | "pending" | "confirmed" | "registered" | "available";

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
  mode?: "in-person" | "video";
  description?: string;
  // Location fields for in-person sessions
  address?: string;
  locationNotes?: string;
  latitude?: number;
  longitude?: number;
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
  mode?: "in-person" | "video";
  status?: "scheduled" | "completed" | "cancelled";
  description?: string;
  participantDetails?: Array<{
    id: string;
    name: string;
    email: string;
    isClient: boolean;
    paymentStatus: string;
    bookedAt: string;
    phone?: string;
  }>;
  waitingListDetails?: Array<{
    id: string;
    name: string;
    email: string;
    isClient: boolean;
    addedAt: string;
    priority: number;
  }>;
  // Location fields for in-person sessions
  address?: string;
  locationNotes?: string;
  latitude?: number;
  longitude?: number;
}
