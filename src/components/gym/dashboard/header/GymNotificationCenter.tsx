import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Users, 
  UserPlus, 
  Calendar, 
  AlertCircle,
  Check
} from 'lucide-react';
import { useGymNotifications } from '@/hooks/gym/useGymNotifications';
import { formatDistanceToNow } from 'date-fns';

interface GymNotificationCenterProps {
  onClose: () => void;
}

export function GymNotificationCenter({ onClose }: GymNotificationCenterProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useGymNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trainer_assigned':
        return UserPlus;
      case 'client_assigned':
        return Users;
      case 'schedule_update':
        return Calendar;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'trainer_assigned':
        return 'text-blue-600';
      case 'client_assigned':
        return 'text-green-600';
      case 'schedule_update':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs"
          >
            <Check className="h-4 w-4 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      <ScrollArea className="h-80">
        <div className="p-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                      !notification.read ? 'bg-blue-50/50 border-blue-200' : 'bg-background'
                    }`}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 ${iconColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator />
      
      <div className="p-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-xs"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
}