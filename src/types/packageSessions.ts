export type SessionBookingStatus = 'available' | 'proposed' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type SessionType = 'in-person' | 'video';
export type ProposedBy = 'trainer' | 'client';

export interface PackageSessionBooking {
  id: string;
  packageAssignmentId: string;
  trainerId: string;
  clientId: string;
  sessionNumber: number;
  status: SessionBookingStatus;
  proposedBy?: ProposedBy;
  proposedDatetime?: string;
  confirmedDatetime?: string;
  completedDatetime?: string;
  calendarEventId?: string;
  sessionType: SessionType;
  location?: string;
  notes?: string;
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookSessionData {
  sessionNumber: number;
  datetime: Date;
  sessionType: SessionType;
  location?: string;
  notes?: string;
  durationMinutes: number;
  sendNotification: boolean;
  addToCalendar: boolean;
}
