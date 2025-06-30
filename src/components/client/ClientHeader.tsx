
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, LogOut, Bell } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface ClientHeaderProps {
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
  name?: string;
  onLogout: () => void;
  onMobileMenuClick?: () => void;
  showMobileMenuButton?: boolean;
}

export function ClientHeader({
  user,
  name,
  onLogout,
  onMobileMenuClick,
  showMobileMenuButton = false
}: ClientHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear any user data from localStorage
    localStorage.removeItem('demo-user');

    // Show success toast
    toast.success("Logged out successfully!");

    // Execute the passed onLogout function
    onLogout();

    // Navigate to the landing page
    navigate('/');
  };
  
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {(isMobile || showMobileMenuButton) && (
              <Button variant="ghost" size="icon" onClick={onMobileMenuClick} className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
            <span className="font-display text-xl font-bold text-primary pl-4 lg:pl-4">MyPersonal.fit</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Demo Mode</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Client
              </Badge>
              {user?.plan && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {user.plan === 'pro' ? 'Pro Plan' : 'Freemium'}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {/* Notification badge */}
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium"
                >
                  3
                </Badge>
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {isMobile ? <LogOut className="h-4 w-4" /> : "Log out"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
