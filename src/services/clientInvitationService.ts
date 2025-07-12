import { supabase } from '@/integrations/supabase/client';
import { ClientInvitation, CreateInvitationData, RespondToInvitationData, TrainerClientRelationship } from '@/types/clientInvitations';

export class ClientInvitationService {
  // Create a new client invitation
  static async createInvitation(data: CreateInvitationData): Promise<ClientInvitation> {
    const { data: invitation, error } = await supabase
      .from('client_invitations')
      .insert({
        client_email: data.client_email,
        client_name: data.client_name,
        lead_id: data.lead_id,
        message: data.message,
        trainer_id: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return invitation;
  }

  // Get invitations for trainer
  static async getTrainerInvitations(): Promise<ClientInvitation[]> {
    const { data, error } = await supabase
      .from('client_invitations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get invitations for client by email
  static async getClientInvitations(): Promise<ClientInvitation[]> {
    const user = await supabase.auth.getUser();
    if (!user.data.user?.email) return [];

    const { data, error } = await supabase
      .from('client_invitations')
      .select('*')
      .eq('client_email', user.data.user.email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Respond to invitation
  static async respondToInvitation(response: RespondToInvitationData): Promise<void> {
    const { error } = await supabase
      .from('client_invitations')
      .update({
        status: response.status,
        response_message: response.response_message
      })
      .eq('id', response.invitation_id);

    if (error) throw error;

    // If accepted, create trainer-client relationship
    if (response.status === 'accepted') {
      await this.createTrainerClientRelationship(response.invitation_id);
    }
  }

  // Create trainer-client relationship
  static async createTrainerClientRelationship(invitationId: string): Promise<void> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    // Get invitation details
    const { data: invitation, error: invError } = await supabase
      .from('client_invitations')
      .select('trainer_id, lead_id')
      .eq('id', invitationId)
      .single();

    if (invError) throw invError;

    // Create relationship
    const { error } = await supabase
      .from('trainer_client_relationships')
      .insert({
        trainer_id: invitation.trainer_id,
        client_id: user.data.user.id,
        invitation_id: invitationId
      });

    if (error) throw error;

    // Update lead if exists
    if (invitation.lead_id) {
      await supabase
        .from('leads')
        .update({
          transitioned_to_client: true,
          client_user_id: user.data.user.id,
          status: 'client'
        })
        .eq('id', invitation.lead_id);
    }
  }

  // Get trainer-client relationships
  static async getTrainerClientRelationships(): Promise<TrainerClientRelationship[]> {
    const { data, error } = await supabase
      .from('trainer_client_relationships')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Check if client has relationship with trainer
  static async hasRelationshipWithTrainer(trainerId: string): Promise<boolean> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return false;

    const { data, error } = await supabase
      .from('trainer_client_relationships')
      .select('id')
      .eq('trainer_id', trainerId)
      .eq('client_id', user.data.user.id)
      .eq('status', 'active')
      .maybeSingle();

    if (error) return false;
    return !!data;
  }
}