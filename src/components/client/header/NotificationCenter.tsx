
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Dumbbell, 
  Trophy, 
  CreditCard, 
  Bell,
  X,
  Check,
  CheckCheck
} from "lucide-react";
import { ClientNotification } from "@/hooks/useClientNotifications";
import { formatDistance } from "date-fns";

interface NotificationCenterProps {
  notifications: ClientNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onNotificationClick: (notification: ClientNotification) => void;
}

const iconMap = {
  MessageSquare,
  CheckCircle,
  Clock,
  Dumbbell,
  Trophy,
  CreditCard,
  Bell
};

export function NotificationCenter({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDelete,
  onNotificationClick 
}: NotificationCenterProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: ClientNotification['type']) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'session_confirmed': return CheckCircle;
      case 'session_reminder': return Clock;
      case 'program_update': return Dumbbell;
      case 'achievement': return Trophy;
      case 'payment': return CreditCard;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: ClientNotification['type']) => {
    switch (type) {
      case 'message': return 'text-blue-500';
      case 'session_confirmed': return 'text-green-500';
      case 'session_reminder': return 'text-orange-500';
      case 'program_update': return 'text-purple-500';
      case 'achievement': return 'text-yellow-500';
      case 'payment': return 'text-indigo-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="w-80 max-h-96 bg-white border rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="max-h-80">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="p-2">
            {notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors mb-2 ${
                    !notification.read ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
                  }`}
                  onClick={() => onNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 ${iconColor}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDistance(new Date(notification.created_at), new Date(), { addSuffix: true })}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onMarkAsRead(notification.id);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(notification.id);
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
