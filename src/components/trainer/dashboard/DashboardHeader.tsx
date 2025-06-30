import { Button } from "@/components/ui/button";
import { HeaderActions } from "./HeaderActions";
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
    <header className="bg-background border-b border-border px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showMobileMenuButton && (
            <Button variant="ghost" size="icon" onClick={onMobileMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Benvenuto, {name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <NotificationBell />
          <HeaderActions onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
