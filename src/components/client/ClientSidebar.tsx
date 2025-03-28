
import { useState } from "react";
import { Calendar, User, MessageSquare, Settings, LineChart, BarChart2, Dumbbell, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientProfile } from "@/components/ClientProfile";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessageCount: number;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
}

export function ClientSidebar({ 
  activeTab, 
  setActiveTab, 
  unreadMessageCount, 
  showSidebar, 
  setShowSidebar,
  user
}: ClientSidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Default to empty string if user or user.email is undefined
  const userEmail = user?.email || "";
  // Get display name from user or fallback 
  const displayName = user?.name || userEmail.split('@')[0] || "Client";
  
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b">
          <div className="font-semibold">Menu</div>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <div className="flex flex-col h-full">
          {isMobile && (
            <div className="p-4 border-b">
              <ClientProfile 
                name={displayName}
                email={userEmail}
                since="March 2023"
                sessions={24}
                goals={["Weight loss", "Muscle tone", "Flexibility"]}
                image={user?.profileImage}
              />
            </div>
          )}
          
          <nav className="flex flex-col divide-y divide-border">
            <button 
              onClick={() => { setActiveTab("overview"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "overview" ? "bg-primary/5 text-primary" : ""}`}
            >
              <LineChart className="w-5 h-5 mr-3" />
              <span>Overview</span>
            </button>
            <button 
              onClick={() => { setActiveTab("analytics"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "analytics" ? "bg-primary/5 text-primary" : ""}`}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Analytics</span>
            </button>
            <button 
              onClick={() => { setActiveTab("sessions"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "sessions" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Sessions</span>
            </button>
            <button 
              onClick={() => { setActiveTab("training-program"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "training-program" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Dumbbell className="w-5 h-5 mr-3" />
              <span>Training Program</span>
            </button>
            <button 
              onClick={() => { setActiveTab("training-log"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "training-log" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Activity className="w-5 h-5 mr-3" />
              <span>Training Log</span>
            </button>
            <button 
              onClick={() => { setActiveTab("trainers"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "trainers" ? "bg-primary/5 text-primary" : ""}`}
            >
              <User className="w-5 h-5 mr-3" />
              <span>My Trainers</span>
            </button>
            <button 
              onClick={() => { setActiveTab("messages"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>Messages</span>
              {unreadMessageCount > 0 && (
                <Badge className="ml-auto">{unreadMessageCount}</Badge>
              )}
            </button>
            <button 
              onClick={() => { setActiveTab("settings"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "settings" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
  
  // For mobile: show a sheet sidebar when triggered
  if (isMobile) {
    return (
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetContent side="left" className="p-0 w-[280px] sm:w-[350px]">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop: show the regular sidebar
  return (
    <div className="hidden md:block w-64 border-r border-border bg-white h-full">
      {sidebarContent}
    </div>
  );
}
