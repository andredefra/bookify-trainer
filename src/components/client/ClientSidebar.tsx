import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { X, User, Calendar, CalendarDays, Package, Dumbbell, BookOpen, Users, BarChart3, MessageSquare, Settings, Bell, Clock, Trophy, Zap, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClientNotifications } from "@/hooks/useClientNotifications";

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
    profileImage?: string;
  };
  onLogout?: () => void;
  variant?: 'full' | 'basic';
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: User },
  { id: "sessions", label: "Sessions", icon: Calendar },
  { id: "mygym", label: "My Gym or Studio", icon: Building2 },
  { id: "packages", label: "My Packages", icon: Package },
  { id: "training-program", label: "Training Program", icon: Dumbbell },
  { id: "training-log", label: "Workout Log", icon: BookOpen },
  { id: "trainers", label: "Trainers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "my-calendar", label: "My Calendar", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: true },
  { id: "settings", label: "Settings", icon: Settings },
];

export function ClientSidebar({ 
  activeTab, 
  setActiveTab, 
  showSidebar, 
  setShowSidebar,
  unreadMessageCount = 0,
  user,
  onLogout,
  variant = 'full'
}: ClientSidebarProps) {
  const { unreadCount } = useClientNotifications();
  const hiddenInBasic = new Set(['sessions', 'packages', 'training-program']);
  const items = variant === 'basic'
    ? sidebarItems.filter(i => !hiddenInBasic.has(i.id))
    : sidebarItems;

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowSidebar(false);
  };

  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
    }
    return email?.slice(0, 2).toUpperCase() || 'U';
  };

  // Use placeholder image if no profile image is provided
  const profileImageUrl = user?.profileImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&auto=format&fit=crop&crop=face";

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
        <div className="flex flex-col h-full">
          {/* Mobile close button - only visible on mobile */}
          <div className="flex items-center justify-end p-2 md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSidebar(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* User Profile Section - Enhanced */}
          <div className="p-4 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-primary/20 shadow-md">
                  <AvatarImage src={profileImageUrl} alt={user?.name || "User Profile"} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {getUserInitials(user?.name, user?.email)}
                  </AvatarFallback>
                </Avatar>
                {/* Status indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base text-foreground truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Member since Mar 2024
                </p>
              </div>
            </div>
            
            {/* Plan Badge */}
            {user?.plan && (
              <div className="mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-medium">
                  <Zap className="w-3 h-3 mr-1" />
                  {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                </Badge>
              </div>
            )}

            {/* Quick Stats */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Next Session</span>
                </div>
                <span className="text-foreground font-medium">Today 9:00</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Trophy className="h-3 w-3" />
                  <span>This Month</span>
                </div>
                <span className="text-foreground font-medium">8 Sessions</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Streak</span>
                </div>
                <span className="text-foreground font-medium">12 days</span>
              </div>
            </div>

            {/* Progress bar for monthly goal */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Monthly Goal</span>
                <span>8/12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const showBadge = item.badge && unreadMessageCount > 0;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 px-3 py-2.5 h-11 text-left font-normal transition-all duration-200",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/15 font-medium shadow-sm border-r-2 border-primary"
                  )}
                  onClick={() => handleTabClick(item.id)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {showBadge && (
                    <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs font-medium">
                      {unreadMessageCount > 9 ? '9+' : unreadMessageCount}
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
