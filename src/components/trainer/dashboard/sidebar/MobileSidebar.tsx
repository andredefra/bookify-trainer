
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Home, Users, Dumbbell, Calendar, MessageSquare, Settings, CreditCard, LineChart, FolderKanban } from "lucide-react";
import { StatusSelector } from "../header/StatusSelector";
import { TrainerSessionItem } from "@/types/sessions";

interface MobileSidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  activeTab: string;
  handleTabClick: (tab: string) => void;
  userName?: string;
  userEmail?: string;
  upcomingSessions?: TrainerSessionItem[];
}

export function MobileSidebar({ 
  showSidebar, 
  setShowSidebar, 
  activeTab, 
  handleTabClick,
  userName = "Trainer",
  userEmail = "trainer@personal.ai",
  upcomingSessions = []
}: MobileSidebarProps) {
  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

  const navigationItems = [
    { title: "Overview", icon: Home, href: "overview" },
    { title: "Sales", icon: FolderKanban, href: "sales" },
    { title: "Clients", icon: Users, href: "clients" },
    { title: "Programs", icon: Dumbbell, href: "programs" },
    { title: "Sessions", icon: Calendar, href: "sessions" },
    { title: "Messages", icon: MessageSquare, href: "messages", badge: 3 },
    { title: "Transactions", icon: CreditCard, href: "transactions" },
    { title: "Business Data", icon: LineChart, href: "analytics" },
    { title: "Settings", icon: Settings, href: "settings" }
  ];

  // Get the first two upcoming sessions
  const nextSessions = upcomingSessions.slice(0, 2);

  return (
    <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
      <SheetContent side="left" className="p-0 w-[280px] bg-white">
        <div className="flex flex-col h-full">
          {/* Mobile sidebar header with profile info */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={defaultImage} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-black">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5 mt-1">
                    Pro
                  </Badge>
                </div>
              </div>
              {/* Just use the built-in close button of SheetContent */}
            </div>
            
            {/* Add status selector in mobile sidebar */}
            <div className="mt-4">
              <StatusSelector />
            </div>
          </div>
          
          {/* Navigation menu */}
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="p-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant={activeTab === item.href ? "default" : "ghost"}
                  className="w-full justify-start mb-1 text-lg font-medium"
                  onClick={() => {
                    handleTabClick(item.href);
                    setShowSidebar(false);
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge className="ml-auto">{item.badge}</Badge>
                  )}
                </Button>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            {/* Upcoming sessions section */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">
                Upcoming Sessions
              </h4>
              <div className="space-y-3">
                {nextSessions.length > 0 ? (
                  nextSessions.map((session) => {
                    // Format date if it's a Date object
                    const formattedDate = session.date instanceof Date 
                      ? session.date.toLocaleDateString() 
                      : session.date;
                    
                    return (
                      <div key={session.id} className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-gray-900">{session.name}</p>
                        <p className="text-xs text-gray-500">{formattedDate}, {session.time.split(' - ')[0]}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-900">No upcoming sessions</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
