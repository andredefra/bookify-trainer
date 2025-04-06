
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  BarChart2, 
  Settings, 
  MessageSquare
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GymSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

export function GymSidebar({ 
  activeTab, 
  setActiveTab, 
  showSidebar, 
  setShowSidebar
}: GymSidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b">
          <div className="font-semibold">Menu</div>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <div className="flex flex-col h-full">
          <nav className="flex flex-col divide-y divide-border">
            <button 
              onClick={() => { setActiveTab("overview"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "overview" ? "bg-primary/5 text-primary" : ""}`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>Overview</span>
            </button>
            <button 
              onClick={() => { setActiveTab("trainers"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "trainers" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Dumbbell className="w-5 h-5 mr-3" />
              <span>Trainers</span>
            </button>
            <button 
              onClick={() => { setActiveTab("members"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "members" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span>Members</span>
            </button>
            <button 
              onClick={() => { setActiveTab("messages"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>Messages</span>
            </button>
            <button 
              onClick={() => { setActiveTab("analytics"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "analytics" ? "bg-primary/5 text-primary" : ""}`}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>Analytics</span>
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
