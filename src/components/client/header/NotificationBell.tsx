
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { useClientNotifications } from "@/hooks/useClientNotifications";
import { NotificationCenter } from "./NotificationCenter";
import { useNavigate } from "react-router-dom";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useClientNotifications();

  const handleNotificationClick = (notification: any) => {
    // Mark as read when clicked
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Close popover
    setOpen(false);
    
    // Navigate to the related page if there's an action URL
    if (notification.action_url) {
      const url = new URL(notification.action_url, window.location.origin);
      const params = new URLSearchParams(url.search);
      const tab = params.get('tab');
      
      if (tab) {
        navigate('/client-dashboard', { state: { activeTab: tab } });
      } else {
        navigate(notification.action_url);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
        <NotificationCenter
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onDelete={deleteNotification}
          onNotificationClick={handleNotificationClick}
        />
      </PopoverContent>
    </Popover>
  );
}
