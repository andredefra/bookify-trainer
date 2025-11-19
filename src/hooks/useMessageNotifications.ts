import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useMessageNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    const cleanup = subscribeToNewMessages();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const fetchUnreadCount = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: conversations } = await supabase
      .from('conversations')
      .select('id')
      .eq('client_id', user.id);

    if (!conversations || conversations.length === 0) return;

    const { count } = await supabase
      .from('trainer_client_messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversations.map(c => c.id))
      .is('read_at', null)
      .neq('sender_type', 'client');

    setUnreadCount(count || 0);
  };

  const subscribeToNewMessages = () => {
    const channel = supabase
      .channel('new-messages-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'trainer_client_messages'
        },
        async (payload: any) => {
          if (payload.new.sender_type === 'trainer') {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: conversation } = await supabase
              .from('conversations')
              .select('*')
              .eq('id', payload.new.conversation_id)
              .eq('client_id', user.id)
              .single();

            if (conversation) {
              setUnreadCount(prev => prev + 1);
              toast.info('New message from your trainer');
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return { unreadCount };
}
