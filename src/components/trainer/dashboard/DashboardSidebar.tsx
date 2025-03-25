import { useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  MessageSquare,
  Settings,
  CreditCard,
  LineChart,
  X,
  Circle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardSidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({
  showSidebar,
  setShowSidebar,
  activeTab,
  setActiveTab,
}: DashboardSidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [status, setStatus] = useState<"online" | "in-session" | "offline">(() => {
    // Load status from localStorage if available
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus && ["online", "in-session", "offline"].includes(savedStatus)) {
      return savedStatus as "online" | "in-session" | "offline";
    }
    return "online";
  });

  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

  const handleStatusChange = (newStatus: "online" | "in-session" | "offline") => {
    setStatus(newStatus);
    // Save status to localStorage
    localStorage.setItem('trainer-status', newStatus);
    
    // Show toast notification
    const statusMessages = {
      "online": "You're now shown as available to clients",
      "in-session": "You're now shown as in a session",
      "offline": "You're now shown as offline to clients"
    };
    
    toast.success(statusMessages[newStatus]);
  };

  const navigationItems = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      href: "overview",
    },
    {
      title: "Clients",
      icon: Users,
      href: "clients",
    },
    {
      title: "Programs",
      icon: Dumbbell,
      href: "programs",
    },
    {
      title: "Sessions",
      icon: Calendar,
      href: "sessions",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "messages",
      badge: 3,
    },
    {
      title: "Transactions",
      icon: CreditCard,
      href: "transactions",
    },
    {
      title: "Analytics",
      icon: LineChart,
      href: "analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "settings",
    },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    // Only close the sidebar on mobile when a tab is clicked
    if (!isDesktop) {
      setShowSidebar(false);
    }
  };

  // Mobile sidebar using Sheet component
  if (!isDesktop) {
    return (
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetContent side="left" className="p-0 w-[270px] max-w-[80vw]">
          <div className="flex flex-col h-full">
            {/* Mobile sidebar header with profile info */}
            <div className="border-b p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={defaultImage} alt="Trainer" />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Trainer</p>
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5 mt-1">
                      Pro
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowSidebar(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Status selector */}
              <div className="mt-3">
                <Select value={status} onValueChange={(value) => handleStatusChange(value as "online" | "in-session" | "offline")}>
                  <SelectTrigger className="w-full h-9">
                    <div className="flex items-center space-x-2">
                      <Circle className={cn("h-3 w-3 fill-current", {
                        "text-emerald-500": status === "online",
                        "text-amber-500": status === "in-session",
                        "text-slate-500": status === "offline",
                      })} />
                      <span>
                        {status === "online" ? "Available" : 
                         status === "in-session" ? "In Session" : "Offline"}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">
                      <div className="flex items-center">
                        <Circle className="h-3 w-3 mr-2 text-emerald-500 fill-emerald-500" />
                        <span>Available</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="in-session">
                      <div className="flex items-center">
                        <Circle className="h-3 w-3 mr-2 text-amber-500 fill-amber-500" />
                        <span>In Session</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="offline">
                      <div className="flex items-center">
                        <Circle className="h-3 w-3 mr-2 text-slate-500 fill-slate-500" />
                        <span>Offline</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Navigation menu */}
            <ScrollArea className="flex-1">
              <div className="flex flex-col space-y-1 p-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={activeTab === item.href ? "default" : "ghost"}
                    className="justify-start relative"
                    onClick={() => handleTabClick(item.href)}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge className="ml-auto">{item.badge}</Badge>
                    )}
                  </Button>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Upcoming sessions section */}
              <div className="p-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Upcoming
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm font-medium">Sarah J. Session</p>
                    <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm font-medium">Mike P. Session</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "pb-12 w-20 md:w-60 flex-shrink-0 bg-white border-r hidden lg:block",
        isDesktop ? "relative" : "fixed inset-y-0 left-0 z-10"
      )}
    >
      <ScrollArea className="py-6 h-full">
        <div className="flex flex-col flex-1 space-y-1 px-2 md:px-6">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant={activeTab === item.href ? "default" : "ghost"}
              className={cn(
                "justify-start",
                !isDesktop && "justify-center md:justify-start"
              )}
              onClick={() => setActiveTab(item.href)}
            >
              <item.icon className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline-flex">{item.title}</span>
            </Button>
          ))}
        </div>
        <Separator className="my-4 md:mb-4 md:mt-6" />
        <div className="px-2 md:px-6">
          <div className="text-xs md:text-sm font-medium text-muted-foreground hidden md:block mb-2">
            Upcoming
          </div>
          <div className="md:flex flex-col space-y-1 hidden">
            <Button variant="ghost" className="justify-start cursor-default">
              <div className="flex flex-col items-start">
                <span className="text-xs">Sarah J. Session</span>
                <span className="text-xs text-muted-foreground">Today, 2:00 PM</span>
              </div>
            </Button>
            <Button variant="ghost" className="justify-start cursor-default">
              <div className="flex flex-col items-start">
                <span className="text-xs">Mike P. Session</span>
                <span className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</span>
              </div>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
