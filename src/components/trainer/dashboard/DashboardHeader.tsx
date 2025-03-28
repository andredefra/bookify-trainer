
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell } from "lucide-react";
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
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showMobileMenuButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMobileMenuClick}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <span className="font-display text-xl font-bold text-primary">Personal.ai</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Status Selector */}
            <div className="hidden md:block">
              <StatusSelector />
            </div>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:flex items-center space-x-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Trainer
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 border border-primary/10">
                <AvatarImage src={defaultImage} alt={name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs text-muted-foreground">Pro Account</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
