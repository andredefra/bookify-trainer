export type InvitationStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export interface ClientInvitation {
  id: string;
  trainer_id: string;
  client_email: string;
  client_name: string;
  lead_id?: string;
  message?: string;
  status: InvitationStatus;
  expires_at: string;
  created_at: string;
  updated_at: string;
  responded_at?: string;
  response_message?: string;
}

export interface TrainerClientRelationship {
  id: string;
  trainer_id: string;
  client_id: string;
  invitation_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInvitationData {
  client_email: string;
  client_name: string;
  lead_id?: string;
  message?: string;
}

export interface RespondToInvitationData {
  invitation_id: string;
  status: 'accepted' | 'declined';
  response_message?: string;
}