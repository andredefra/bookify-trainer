
import { useState, useEffect } from 'react';

export interface ClientNotification {
  id: string;
  type: 'message' | 'session_confirmed' | 'session_reminder' | 'program_update' | 'achievement' | 'payment' | 'trainer_invitation';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  related_id?: string;
  action_url?: string;
  invitation_id?: string;
}

// Mock data for client notifications
const mockNotifications: ClientNotification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from John Doe',
    message: 'Great progress on your training! Keep it up.',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    action_url: '/client-dashboard?tab=messages'
  },
  {
    id: '2',
    type: 'session_confirmed',
    title: 'Session confirmed',
    message: 'Your Morning HIIT session for today at 9:00 AM has been confirmed.',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    action_url: '/client-dashboard?tab=sessions'
  },
  {
    id: '3',
    type: 'session_reminder',
    title: 'Session reminder',
    message: 'Your Personal Training session starts in 1 hour.',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    action_url: '/client-dashboard?tab=sessions'
  },
  {
    id: '4',
    type: 'program_update',
    title: 'Training program updated',
    message: 'Your trainer has updated your weekly training program.',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    action_url: '/client-dashboard?tab=training-program'
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Goal achieved!',
    message: 'Congratulations! You\'ve completed 8 sessions this month.',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    action_url: '/client-dashboard?tab=analytics'
  }
];

export function useClientNotifications() {
  const [notifications, setNotifications] = useState<ClientNotification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type: ClientNotification['type']) => {
    switch (type) {
      case 'message': return 'MessageSquare';
      case 'session_confirmed': return 'CheckCircle';
      case 'session_reminder': return 'Clock';
      case 'program_update': return 'Dumbbell';
      case 'achievement': return 'Trophy';
      case 'payment': return 'CreditCard';
      case 'trainer_invitation': return 'User';
      default: return 'Bell';
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationIcon
  };
}
