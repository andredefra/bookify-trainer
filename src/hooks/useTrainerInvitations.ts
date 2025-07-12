import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ClientInvitation } from '@/types/clientInvitations';

export function useTrainerInvitations() {
  const [invitations, setInvitations] = useState<ClientInvitation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('client_invitations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setInvitations(data || []);
    } catch (error) {
      console.error('Error fetching trainer invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();

    // Subscribe to invitation updates
    const channel = supabase
      .channel('trainer-invitations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'client_invitations'
        },
        (payload) => {
          setInvitations(prev => [payload.new as ClientInvitation, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'client_invitations'
        },
        (payload) => {
          setInvitations(prev => 
            prev.map(inv => 
              inv.id === payload.new.id ? payload.new as ClientInvitation : inv
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');
  const acceptedInvitations = invitations.filter(inv => inv.status === 'accepted');
  const declinedInvitations = invitations.filter(inv => inv.status === 'declined');

  return {
    invitations,
    pendingInvitations,
    acceptedInvitations,
    declinedInvitations,
    loading,
    refetch: fetchInvitations
  };
}