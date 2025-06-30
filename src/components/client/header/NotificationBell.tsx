
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface NotificationBellProps {
  count?: number;
}

export function NotificationBell({ count = 3 }: NotificationBellProps) {
  return (
    <Button variant="outline" size="icon" className="relative">
      <Bell className="h-4 w-4" />
      {count > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium"
        >
          {count > 9 ? '9+' : count}
        </Badge>
      )}
    </Button>
  );
}
