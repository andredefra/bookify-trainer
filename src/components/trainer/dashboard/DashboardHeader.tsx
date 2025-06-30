
import { Button } from "@/components/ui/button";
import { HeaderActions } from "./header/HeaderActions";
import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  name: string;
  onLogout: () => void;
  onMobileMenuClick: () => void;
  showMobileMenuButton?: boolean;
}

import { NotificationBell } from './header/NotificationBell';

export function DashboardHeader({ name, onLogout, onMobileMenuClick, showMobileMenuButton }: DashboardHeaderProps) {
  return (
    <header className="bg-background border-b border-border px-3 sm:px-4 md:px-6 py-2.5 sm:py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {showMobileMenuButton && (
            <Button variant="ghost" size="icon" onClick={onMobileMenuClick} className="h-8 w-8 sm:h-10 sm:w-10">
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Welcome, {name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <NotificationBell />
          <HeaderActions 
            displayName={name}
            status="online"
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
}
