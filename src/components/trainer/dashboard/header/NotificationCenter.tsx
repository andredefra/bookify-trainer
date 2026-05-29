
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, CheckCircle, AlertTriangle, Users, Mail } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface NotificationCenterProps {
  onClose: () => void;
}

interface PendingContact {
  id: string;
  fromName: string;
  subject?: string;
  createdAt: string;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [pendingContacts, setPendingContacts] = useState<PendingContact[]>([]);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('trainer-contact-requests');
        const all = raw ? JSON.parse(raw) : [];
        setPendingContacts(
          (Array.isArray(all) ? all : [])
            .filter((r: { status?: string }) => r.status === 'pending')
            .map((r: PendingContact) => ({
              id: r.id,
              fromName: r.fromName,
              subject: r.subject,
              createdAt: r.createdAt,
            })),
        );
      } catch {
        setPendingContacts([]);
      }
    };
    load();
    window.addEventListener('trainer-contact-requests-changed', load);
    return () =>
      window.removeEventListener('trainer-contact-requests-changed', load);
  }, []);


  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'program_expiring':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'client_behind_schedule':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'program_completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Users className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'program_expiring':
        return 'Program Expiring';
      case 'client_behind_schedule':
        return 'Client Behind Schedule';
      case 'program_completed':
        return 'Program Completed';
      default:
        return 'Notification';
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        {unreadCount > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount} {unreadCount === 1 ? 'unread notification' : 'unread notifications'}
          </p>
        )}
      </div>

      <ScrollArea className="h-96">
        {pendingContacts.length === 0 && notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="space-y-1">
            {pendingContacts.map((c) => (
              <div
                key={c.id}
                className="p-4 hover:bg-gray-50 border-l-4 border-l-primary bg-primary/5"
              >
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        New message request
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      From {c.fromName}
                      {c.subject ? ` — ${c.subject}` : ''}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(c.createdAt), {
                        addSuffix: true,
                        locale: enUS,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                  notification.read 
                    ? 'border-l-transparent bg-white' 
                    : 'border-l-blue-500 bg-blue-50/50'
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {getNotificationTitle(notification.type)}
                      </p>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                        locale: enUS
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <Separator />
      <div className="p-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-blue-600"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
