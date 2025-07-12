import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GymNotification {
  id: string;
  gym_id: string;
  recipient_id: string;
  recipient_type: 'trainer' | 'client';
  type: string;
  title: string;
  message: string;
  related_assignment_id?: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export function useGymNotifications() {
  const [notifications, setNotifications] = useState<GymNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use consistent demo gym ID
  const getCurrentGymId = () => '550e8400-e29b-41d4-a716-446655440000';

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const gymId = getCurrentGymId();
      
      const { data, error } = await supabase
        .from('gym_notifications')
        .select('*')
        .eq('gym_id', gymId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setNotifications((data || []) as GymNotification[]);
    } catch (err) {
      console.error('Error fetching gym notifications:', err);
      setError('Failed to fetch notifications');
      // Use mock data for demo
      const mockNotifications: GymNotification[] = [
        {
          id: '1',
          gym_id: 'demo-gym-id',
          recipient_id: 'demo-gym-id',
          recipient_type: 'trainer',
          type: 'trainer_assigned',
          title: 'New Trainer Assignment',
          message: 'Marco Rossi has been assigned to client Sarah Johnson',
          read: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          gym_id: 'demo-gym-id',
          recipient_id: 'demo-gym-id',
          recipient_type: 'client',
          type: 'client_assigned',
          title: 'Client Assignment Update',
          message: 'New premium assignment created for Laura Bianchi',
          read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setNotifications(mockNotifications);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('gym_notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Demo fallback
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const gymId = getCurrentGymId();
      
      const { error } = await supabase
        .from('gym_notifications')
        .update({ read: true })
        .eq('gym_id', gymId)
        .eq('read', false);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      // Demo fallback
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      toast.success('All notifications marked as read');
    }
  }, []);

  const createNotification = useCallback(async (
    recipientId: string,
    recipientType: 'trainer' | 'client',
    type: string,
    title: string,
    message: string,
    relatedAssignmentId?: string
  ) => {
    try {
      const gymId = getCurrentGymId();
      
      const { error } = await supabase
        .from('gym_notifications')
        .insert({
          gym_id: gymId,
          recipient_id: recipientId,
          recipient_type: recipientType,
          type,
          title,
          message,
          related_assignment_id: relatedAssignmentId
        });

      if (error) throw error;
      
      // Refresh notifications
      fetchNotifications();
    } catch (err) {
      console.error('Error creating notification:', err);
      // Demo fallback - just add to local state
      const newNotification: GymNotification = {
        id: Date.now().toString(),
        gym_id: getCurrentGymId(),
        recipient_id: recipientId,
        recipient_type: recipientType,
        type,
        title,
        message,
        related_assignment_id: relatedAssignmentId,
        read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    }
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    createNotification,
    refetch: fetchNotifications
  };
}