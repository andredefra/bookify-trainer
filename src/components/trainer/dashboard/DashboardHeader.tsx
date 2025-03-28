
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderActions } from "./header/HeaderActions";

interface DashboardHeaderProps {
  name?: string;
  customName?: string;
  onMobileMenuClick: () => void;
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
  onLogout?: () => void;
}

export function DashboardHeader({ 
  name, 
  customName, 
  onMobileMenuClick, 
  user, 
  onLogout 
}: DashboardHeaderProps) {
  const [status, setStatus] = useState<"online" | "in-session" | "offline">("online");
  const displayName = user?.name || name || customName || "Trainer";

  useEffect(() => {
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus && ["online", "in-session", "offline"].includes(savedStatus)) {
      setStatus(savedStatus as "online" | "in-session" | "offline");
    }
  }, []);

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onMobileMenuClick}
              className="mr-2 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <span className="font-display text-xl font-bold text-primary pl-4 lg:pl-4">Personal.ai</span>
          </div>
          <HeaderActions 
            displayName={displayName} 
            status={status} 
            user={user} 
            onLogout={onLogout} 
          />
        </div>
      </div>
    </header>
  );
}
