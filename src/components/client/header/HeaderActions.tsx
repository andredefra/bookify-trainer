
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { NotificationBell } from "./NotificationBell";

interface User {
  name?: string;
  email: string;
  type: string;
  plan?: string;
  profileImage?: string;
}

interface HeaderActionsProps {
  user?: User | null;
  onLogout: () => void;
}

export function HeaderActions({ user, onLogout }: HeaderActionsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Demo Mode</span>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Client
        </Badge>
        {user?.plan && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {user.plan === 'pro' ? 'AI Plan' : 'Freemium'}
          </Badge>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <NotificationBell />
        
        <Button variant="outline" size="sm" onClick={onLogout}>
          {isMobile ? <LogOut className="h-4 w-4" /> : "Log out"}
        </Button>
      </div>
    </div>
  );
}
