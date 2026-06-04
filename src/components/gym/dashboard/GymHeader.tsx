
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, LogOut, Building, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { GymNotificationBell } from "./header/GymNotificationBell";

interface GymHeaderProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
    gymName?: string;
  } | null;
  onLogout: () => void;
  onMobileMenuClick?: () => void;
}

export function GymHeader({
  user,
  onLogout,
  onMobileMenuClick
}: GymHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const displayName = user?.gymName || user?.name || user?.email?.split('@')[0] || "Gym";
  const defaultImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";
  
  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    toast.success("Logged out successfully!");
    onLogout();
    navigate('/');
  };
  
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3 md:w-64 md:pr-4">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={onMobileMenuClick}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
            <span className="font-display text-xl font-bold text-primary">MyPersonal.fit</span>
          </div>

          <div className="hidden lg:flex flex-1 items-center gap-2 px-4">
            <Building className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium truncate">Fitactive - Via Tolstoj 79, San Giuliano Milanese (MI) - 20098</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Demo Mode</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                Studio Admin
              </Badge>
              {user?.plan && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  {user.plan === 'pro' ? 'Studio Plan' : 'Basic Plan'}
                </Badge>
              )}
            </div>
            
          {/* Home button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              title="Torna alla Home"
            >
              <Home className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-3">
              <GymNotificationBell />
              <Avatar className="h-9 w-9 border border-primary/10">
                <AvatarImage src={user?.profileImage || defaultImage} alt={displayName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-none">{user?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleLogout} className="min-h-[44px]">
              {isMobile ? <LogOut className="h-4 w-4" /> : "Log out"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
