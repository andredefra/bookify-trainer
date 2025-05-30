
export interface SessionParticipant {
  id: string;
  name: string;
  email: string;
  isClient: boolean; // true if existing client, false if new user
  paymentStatus: 'paid' | 'pending' | 'unpaid';
  bookedAt: string;
  phone?: string;
  avatar?: string;
}

export interface WaitingListEntry {
  id: string;
  name: string;
  email: string;
  isClient: boolean;
  addedAt: string;
  priority: number;
  phone?: string;
}

export interface SessionInviteLink {
  id: string;
  sessionId: number;
  link: string;
  createdAt: string;
  expiresAt: string;
  usageCount: number;
  maxUsage?: number;
}
