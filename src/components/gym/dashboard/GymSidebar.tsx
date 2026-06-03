
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  BarChart2, 
  Settings, 
  MessageSquare,
  Calendar,
  UserCheck,
  Clock,
  Star,
  Package,
  CreditCard,
  ClipboardList
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface GymSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  unreadMessagesCount?: number;
  isInvited?: boolean;
}

export function GymSidebar({ 
  activeTab, 
  setActiveTab, 
  showSidebar, 
  setShowSidebar,
  unreadMessagesCount = 0,
  isInvited = false
}: GymSidebarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const renderFullNav = !isInvited;

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
            
            {/* Trainers Management Section */}
            <button 
              onClick={() => { setActiveTab("trainers-management"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "trainers-management" ? "bg-primary/5 text-primary" : ""}`}
            >
              <UserCheck className="w-5 h-5 mr-3" />
              <span>Trainers Management</span>
            </button>
            
            {/* Group Sessions */}
            <button 
              onClick={() => { setActiveTab("group-sessions"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "group-sessions" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Dumbbell className="w-5 h-5 mr-3" />
              <span>Group Sessions</span>
            </button>
            
            {/* Availability & Shifts */}
            <button 
              onClick={() => { setActiveTab("availability"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "availability" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Clock className="w-5 h-5 mr-3" />
              <span>Availability & Shifts</span>
            </button>
            
            {/* Performance & Reviews */}
            <button 
              onClick={() => { setActiveTab("performance"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "performance" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Star className="w-5 h-5 mr-3" />
              <span>Performance & Reviews</span>
            </button>
            
            {/* Calendar */}
            <button 
              onClick={() => { setActiveTab("calendar"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "calendar" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Calendar</span>
            </button>
            
            {/* Members */}
            <button 
              onClick={() => { setActiveTab("members"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "members" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span>Members</span>
            </button>
            
            {/* Packages */}
            <button 
              onClick={() => { setActiveTab("packages"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "packages" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Package className="w-5 h-5 mr-3" />
              <span>Packages</span>
            </button>

            {/* Service Requests - NEW */}
            <button 
              onClick={() => { setActiveTab("service-requests"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "service-requests" ? "bg-primary/5 text-primary" : ""}`}
            >
              <ClipboardList className="w-5 h-5 mr-3" />
              <span>Service Requests</span>
            </button>
            
            {/* Transactions */}
            <button 
              onClick={() => { setActiveTab("transactions"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "transactions" ? "bg-primary/5 text-primary" : ""}`}
            >
              <CreditCard className="w-5 h-5 mr-3" />
              <span>Transactions</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab("messages"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-3" />
                <span>Messages</span>
              </div>
              {unreadMessagesCount > 0 && (
                <Badge className="bg-primary ml-2">{unreadMessagesCount}</Badge>
              )}
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
