
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { X, User, Calendar, Package, Dumbbell, BookOpen, Users, BarChart3, MessageSquare, Settings, LogOut, UserCircle, CreditCard } from "lucide-react";
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
    profileImage?: string;
  };
  onLogout?: () => void;
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
  user,
  onLogout
}: ClientSidebarProps) {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowSidebar(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setShowSidebar(false);
  };

  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
    }
    return email?.slice(0, 2).toUpperCase() || 'U';
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
          
          {/* User Profile Section */}
          <div className="px-4 py-6 border-b">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-muted/50">
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImage} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials(user?.name, user?.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm text-foreground">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                      {user?.plan && (
                        <Badge variant="secondary" className="text-xs h-4 mt-1 bg-primary/10 text-primary">
                          {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => handleTabClick('settings')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTabClick('settings')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Account & Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
