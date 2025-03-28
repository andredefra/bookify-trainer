
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell, Circle, LogOut } from "lucide-react";
import { StatusSelector } from "./header/StatusSelector";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";

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
  
  // State to track current status
  const [status, setStatus] = useState<"online" | "in-session" | "offline">("online");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Load status from localStorage on component mount
  useEffect(() => {
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus && ["online", "in-session", "offline"].includes(savedStatus)) {
      setStatus(savedStatus as "online" | "in-session" | "offline");
    }
  }, []);

  // Get status color for the indicator
  const getStatusColor = () => {
    switch(status) {
      case "online":
        return "text-emerald-500 fill-emerald-500";
      case "in-session":
        return "text-amber-500 fill-amber-500";
      case "offline":
        return "text-slate-500 fill-slate-500";
    }
  };

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
              <StatusSelector initialStatus={status} />
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
              <div className="relative">
                <Avatar className="h-8 w-8 border border-primary/10">
                  <AvatarImage src={defaultImage} alt={name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {/* Status indicator circle */}
                <Circle className={`absolute -bottom-1 -right-1 h-3 w-3 ${getStatusColor()} border-2 border-white rounded-full`} />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs text-muted-foreground">Pro Account</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={onLogout}>
              {isMobile ? <LogOut className="h-4 w-4" /> : "Log out"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
