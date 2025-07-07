import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

export interface ClientPostponementNotification {
  id: string;
  postponement_id: string;
  trainer_name: string;
  session_name: string;
  original_start: string;
  original_end: string;
  new_start: string;
  new_end: string;
  reason?: string;
  deadline_for_responses: string;
  my_response: 'pending' | 'accepted' | 'declined';
  response_reason?: string;
  requires_refund: boolean;
  refund_amount?: number;
  created_at: string;
}

export function useClientPostponements() {
  const [postponements, setPostponements] = useState<ClientPostponementNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clientId = getCurrentDemoUserId();

  useEffect(() => {
    fetchPostponements();
  }, [clientId]);

  const fetchPostponements = async () => {
    try {
      setLoading(true);
      
      // Validate client ID format before querying
      if (!clientId || !clientId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        console.warn('Invalid client ID format, skipping postponements fetch:', clientId);
        setPostponements([]);
        return;
      }

      const { data, error } = await supabase
        .from('session_postponement_responses')
        .select(`
          id,
          postponement_id,
          participant_name,
          response,
          response_reason,
          requires_refund,
          refund_amount,
          created_at
        `)
        .eq('participant_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get postponement details separately
      const postponementIds = data?.map(item => item.postponement_id) || [];
      
      let postponementDetails: any[] = [];
      if (postponementIds.length > 0) {
        const { data: postponementData, error: postponementError } = await supabase
          .from('session_postponements')
          .select('*')
          .in('id', postponementIds);
          
        if (postponementError) throw postponementError;
        postponementDetails = postponementData || [];
      }

      // Transform the data for easier use
      const transformedData: ClientPostponementNotification[] = data?.map(item => {
        const postponementDetail = postponementDetails.find(p => p.id === item.postponement_id);
        
        return {
          id: item.id,
          postponement_id: item.postponement_id,
          trainer_name: "Your Trainer", // In a real app, would join with trainer info
          session_name: "Training Session", // In a real app, would get session name
          original_start: postponementDetail?.original_start_datetime || '',
          original_end: postponementDetail?.original_end_datetime || '',
          new_start: postponementDetail?.new_start_datetime || '',
          new_end: postponementDetail?.new_end_datetime || '',
          reason: postponementDetail?.reason,
          deadline_for_responses: postponementDetail?.deadline_for_responses || '',
          my_response: item.response as 'pending' | 'accepted' | 'declined',
          response_reason: item.response_reason,
          requires_refund: item.requires_refund,
          refund_amount: item.refund_amount,
          created_at: item.created_at
        };
      }) || [];

      setPostponements(transformedData);
    } catch (err) {
      console.error('Error fetching client postponements:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const respondToPostponement = async (
    responseId: string, 
    response: 'accepted' | 'declined',
    reason?: string
  ) => {
    try {
      const { error } = await supabase
        .from('session_postponement_responses')
        .update({
          response,
          response_reason: reason,
          responded_at: new Date().toISOString()
        })
        .eq('id', responseId)
        .eq('participant_id', clientId);

      if (error) throw error;

      // Call edge function to notify trainer
      const { error: notificationError } = await supabase.functions.invoke('respond-to-postponement', {
        body: {
          response_id: responseId,
          response,
          reason
        }
      });

      if (notificationError) {
        console.error('Error sending response notification:', notificationError);
        // Don't throw here - response was saved successfully
      }

      await fetchPostponements();
      return { success: true };
    } catch (err) {
      console.error('Error responding to postponement:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to respond to postponement' 
      };
    }
  };

  const getPendingPostponements = () => {
    return postponements.filter(p => p.my_response === 'pending');
  };

  const getPostponementsByStatus = (status: 'pending' | 'accepted' | 'declined') => {
    return postponements.filter(p => p.my_response === status);
  };

  return {
    postponements,
    loading,
    error,
    respondToPostponement,
    getPendingPostponements,
    getPostponementsByStatus,
    refreshPostponements: fetchPostponements
  };
}