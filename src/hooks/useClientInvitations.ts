import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ClientInvitation } from '@/types/clientInvitations';

export function useClientInvitations() {
  const [invitations, setInvitations] = useState<ClientInvitation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvitations = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user?.email) return;

      const { data, error } = await supabase
        .from('client_invitations')
        .select('*')
        .eq('client_email', user.data.user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error) {
      console.error('Error fetching client invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();

    // Subscribe to new invitations for this client
    const user = supabase.auth.getUser();
    
    user.then(({ data }) => {
      if (data.user?.email) {
        const channel = supabase
          .channel('client-invitations')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'client_invitations',
              filter: `client_email=eq.${data.user.email}`
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
              table: 'client_invitations',
              filter: `client_email=eq.${data.user.email}`
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
      }
    });
  }, []);

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');
  const respondedInvitations = invitations.filter(inv => inv.status !== 'pending');

  return {
    invitations,
    pendingInvitations,
    respondedInvitations,
    loading,
    refetch: fetchInvitations
  };
}