
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, User, Calendar, Package, Dumbbell, BookOpen, Users, BarChart3, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  unreadMessageCount?: number;
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
  };
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: User },
  { id: "sessions", label: "Sessions", icon: Calendar },
  { id: "packages", label: "My Packages", icon: Package },
  { id: "training-program", label: "Training Program", icon: Dumbbell },
  { id: "training-log", label: "Training Log", icon: BookOpen },
  { id: "trainers", label: "Trainers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: true },
  { id: "settings", label: "Settings", icon: Settings },
];

export function ClientSidebar({ 
  activeTab, 
  setActiveTab, 
  showSidebar, 
  setShowSidebar,
  unreadMessageCount = 0,
  user 
}: ClientSidebarProps) {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowSidebar(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        showSidebar ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-16 md:pt-0">
          {/* Mobile close button */}
          <div className="flex justify-end p-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const showBadge = item.badge && unreadMessageCount > 0;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/15"
                  )}
                  onClick={() => handleTabClick(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {showBadge && (
                    <Badge variant="destructive" className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {unreadMessageCount}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
