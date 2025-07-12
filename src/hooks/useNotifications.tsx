
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TrainerNotification {
  id: string;
  trainer_id: string;
  type: 'program_expiring' | 'client_behind_schedule' | 'program_completed' | 'client_invitation_response' | 'new_client_invitation';
  message: string;
  read: boolean;
  created_at: string;
  related_program_assignment_id?: string;
  related_client_id?: string;
  invitation_id?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<TrainerNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('trainer_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Type cast the data to ensure it matches our interface
      const typedData = (data || []).map(item => ({
        ...item,
        type: item.type as TrainerNotification['type']
      })) as TrainerNotification[];

      setNotifications(typedData);
      setUnreadCount(typedData.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('trainer_notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('trainer_notifications')
        .update({ read: true })
        .eq('read', false);

      if (error) throw error;

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Subscribe to new notifications
    const channel = supabase
      .channel('trainer-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'trainer_notifications'
        },
        (payload) => {
          const newNotification = {
            ...payload.new,
            type: payload.new.type as TrainerNotification['type']
          } as TrainerNotification;
          
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
}
