
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell, LogOut } from "lucide-react";
import { StatusSelector } from "./header/StatusSelector";

interface DashboardHeaderProps {
  name: string;
  onLogout: () => void;
  onMobileMenuClick: () => void;
  showMobileMenuButton: boolean;
}

export function DashboardHeader({ 
  name, 
  onLogout, 
  onMobileMenuClick,
  showMobileMenuButton
}: DashboardHeaderProps) {
  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            {showMobileMenuButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={onMobileMenuClick}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <span className="font-display text-lg font-bold text-primary truncate">Personal.ai</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Status Selector - hidden on small screens */}
            <div className="hidden md:block">
              <StatusSelector />
            </div>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8 md:h-9 md:w-9">
              <Bell className="h-4 w-4" />
            </Button>
            
            <div className="hidden md:flex items-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                Trainer
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Avatar className="h-7 w-7 md:h-8 md:w-8 border border-primary/10">
                <AvatarImage src={defaultImage} alt={name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs text-muted-foreground">Pro Account</p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
