import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

export interface SessionPostponement {
  id: string;
  calendar_event_id: string;
  trainer_id: string;
  original_start_datetime: string;
  original_end_datetime: string;
  new_start_datetime: string;
  new_end_datetime: string;
  reason?: string;
  status: string;
  deadline_for_responses: string;
  total_participants: number;
  accepted_count: number;
  declined_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostponementResponse {
  id: string;
  postponement_id: string;
  participant_id: string;
  participant_email: string;
  participant_name: string;
  response: 'pending' | 'accepted' | 'declined';
  response_reason?: string;
  responded_at?: string;
  requires_refund: boolean;
  refund_amount?: number;
  refund_processed: boolean;
}

export function useSessionPostponements() {
  const [postponements, setPostponements] = useState<SessionPostponement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const trainerId = getCurrentDemoUserId();

  useEffect(() => {
    fetchPostponements();
  }, [trainerId]);

  const fetchPostponements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('session_postponements')
        .select('*')
        .eq('trainer_id', trainerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPostponements(data || []);
    } catch (err) {
      console.error('Error fetching postponements:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const canPostponeSession = (sessionStartTime: Date): boolean => {
    const now = new Date();
    const timeDiff = sessionStartTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff >= 12; // Must be at least 12 hours before session
  };

  const createPostponement = async (
    eventId: string,
    originalStart: Date,
    originalEnd: Date,
    newStart: Date,
    newEnd: Date,
    participants: Array<{ id: string; email: string; name: string; paid_amount?: number }>,
    reason?: string
  ) => {
    try {
      if (!canPostponeSession(originalStart)) {
        throw new Error('Cannot postpone session less than 12 hours before start time');
      }

      // Calculate deadline for responses (24 hours from now)
      const responseDeadline = new Date();
      responseDeadline.setHours(responseDeadline.getHours() + 24);

      const { data: postponement, error: postponementError } = await supabase
        .from('session_postponements')
        .insert({
          calendar_event_id: eventId,
          trainer_id: trainerId,
          original_start_datetime: originalStart.toISOString(),
          original_end_datetime: originalEnd.toISOString(),
          new_start_datetime: newStart.toISOString(),
          new_end_datetime: newEnd.toISOString(),
          reason,
          status: 'collecting_responses',
          deadline_for_responses: responseDeadline.toISOString(),
          total_participants: participants.length
        })
        .select()
        .single();

      if (postponementError) throw postponementError;

      // Create response records for all participants
      const responses = participants.map(participant => ({
        postponement_id: postponement.id,
        participant_id: participant.id,
        participant_email: participant.email,
        participant_name: participant.name,
        response: 'pending' as const,
        requires_refund: Boolean(participant.paid_amount),
        refund_amount: participant.paid_amount || null
      }));

      const { error: responsesError } = await supabase
        .from('session_postponement_responses')
        .insert(responses);

      if (responsesError) throw responsesError;

      // Call edge function to send notifications
      const { error: notificationError } = await supabase.functions.invoke('handle-session-postponement', {
        body: {
          postponement_id: postponement.id,
          participants: participants.map(p => ({
            id: p.id,
            email: p.email,
            name: p.name
          })),
          session_details: {
            original_start: originalStart.toISOString(),
            original_end: originalEnd.toISOString(),
            new_start: newStart.toISOString(),
            new_end: newEnd.toISOString(),
            reason
          }
        }
      });

      if (notificationError) {
        console.error('Error sending notifications:', notificationError);
        // Don't throw here - postponement was created successfully
      }

      await fetchPostponements();
      return { success: true, postponement };
    } catch (err) {
      console.error('Error creating postponement:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to create postponement' 
      };
    }
  };

  const getPostponementResponses = async (postponementId: string): Promise<PostponementResponse[]> => {
    try {
      const { data, error } = await supabase
        .from('session_postponement_responses')
        .select('*')
        .eq('postponement_id', postponementId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(item => ({
        ...item,
        response: item.response as 'pending' | 'accepted' | 'declined'
      }));
    } catch (err) {
      console.error('Error fetching responses:', err);
      return [];
    }
  };

  return {
    postponements,
    loading,
    error,
    canPostponeSession,
    createPostponement,
    getPostponementResponses,
    refreshPostponements: fetchPostponements
  };
}