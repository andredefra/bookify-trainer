
import { useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  MessageSquare,
  Settings,
  CreditCard,
  LineChart,
  ChevronUp,
  Circle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface DashboardSidebarProps {
  showSidebar: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({
  showSidebar,
  activeTab,
  setActiveTab,
}: DashboardSidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false); // Close the sheet after selecting a tab
  };

  // Mobile sidebar using bottom drawer with swipe gesture
  if (!isDesktop) {
    // Only show the most important tabs in the mobile bottom navigation
    const primaryNavItems = navigationItems.slice(0, 5);
    
    return (
      <>
        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex justify-around py-2">
          {primaryNavItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleTabClick(item.href)}
              className={`flex flex-col items-center justify-center px-2 py-1 relative ${
                activeTab === item.href ? "text-primary" : "text-gray-500"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.title}</span>
              {item.badge && (
                <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center px-2 py-1 text-gray-500">
                <ChevronUp className="w-5 h-5" />
                <span className="text-xs mt-1">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-xl border-t-0">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2.5 mb-4" />
              
              {/* Header with trainer profile and status in mobile sheet */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={defaultImage} />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Trainer</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1.5">
                          <Circle 
                            className={cn("h-2.5 w-2.5 fill-current", {
                              "text-emerald-500": status === "online",
                              "text-amber-500": status === "in-session",
                              "text-slate-500": status === "offline",
                            })} 
                          />
                          <span className="text-xs text-gray-500">
                            {status === "online" ? "Available" : 
                             status === "in-session" ? "In Session" : "Offline"}
                          </span>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5">
                          Pro
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 px-2 text-xs"
                      onClick={() => handleStatusChange(
                        status === "online" ? "in-session" : 
                        status === "in-session" ? "offline" : "online"
                      )}
                    >
                      Change Status
                    </Button>
                  </div>
                </div>
              </div>

              <ScrollArea className="h-[calc(85vh-8rem)] py-2">
                <div className="flex flex-col space-y-1 px-2 py-2">
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
                
                <div className="px-4 py-2">
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
            </SheetContent>
          </Sheet>
        </div>
      </>
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
