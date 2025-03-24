
import { Calendar, User, MessageSquare, Settings, LineChart, BarChart2, Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface ClientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessageCount: number;
}

export function ClientSidebar({ activeTab, setActiveTab, unreadMessageCount }: ClientSidebarProps) {
  const isMobile = useIsMobile();
  
  const sidebarContent = (
    <nav className="flex flex-col divide-y divide-border">
      <button 
        onClick={() => setActiveTab("overview")}
        className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "overview" ? "bg-primary/5 text-primary" : ""}`}
      >
        <LineChart className="w-5 h-5 mr-3" />
        <span>Overview</span>
      </button>
      <button 
        onClick={() => setActiveTab("analytics")}
        className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "analytics" ? "bg-primary/5 text-primary" : ""}`}
      >
        <BarChart2 className="w-5 h-5 mr-3" />
        <span>Analytics</span>
      </button>
      <button 
        onClick={() => setActiveTab("sessions")}
        className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "sessions" ? "bg-primary/5 text-primary" : ""}`}
      >
        <Calendar className="w-5 h-5 mr-3" />
        <span>Sessions</span>
      </button>
      <button 
        onClick={() => setActiveTab("trainers")}
        className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "trainers" ? "bg-primary/5 text-primary" : ""}`}
      >
        <User className="w-5 h-5 mr-3" />
        <span>My Trainers</span>
      </button>
      <button 
        onClick={() => setActiveTab("messages")}
        className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
      >
        <MessageSquare className="w-5 h-5 mr-3" />
        <span>Messages</span>
        {unreadMessageCount > 0 && (
          <Badge className="ml-auto">{unreadMessageCount}</Badge>
        )}
      </button>
      <button 
        onClick={() => setActiveTab("settings")}
        className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "settings" ? "bg-primary/5 text-primary" : ""}`}
      >
        <Settings className="w-5 h-5 mr-3" />
        <span>Settings</span>
      </button>
    </nav>
  );
  
  // For mobile: use a bottom drawer on very small screens, side sheet on slightly larger mobile screens
  if (isMobile) {
    return (
      <>
        <div className="md:hidden block fixed bottom-4 right-4 z-40">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="rounded-full shadow-lg">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Card className="h-full border-0 rounded-none">
                <CardContent className="p-0 h-full">
                  {sidebarContent}
                </CardContent>
              </Card>
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  }
  
  // For desktop: show the regular sidebar
  return (
    <Card>
      <CardContent className="p-0">
        {sidebarContent}
      </CardContent>
    </Card>
  );
}
