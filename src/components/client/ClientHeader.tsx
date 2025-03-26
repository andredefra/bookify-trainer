
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-mobile";

interface ClientHeaderProps {
  user: {name?: string, email: string, type: string, plan?: string} | null;
  onLogout: () => void;
  onMobileMenuClick?: () => void;
}

export function ClientHeader({ user, onLogout, onMobileMenuClick }: ClientHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const displayName = user?.name || user?.email?.split('@')[0] || "Client";
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMobileMenuClick}
                className="mr-2"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
            <span className="font-display text-xl font-bold text-primary">Personal.ai</span>
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
            
            {isMobile && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={defaultImage} alt={displayName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            
            <Button variant="outline" size="sm" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
