import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  Settings, 
  MessageSquare,
  Calendar,
  UserCheck,
  Package,
  Dumbbell,
  Briefcase,
  Clock
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface StudioSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  unreadMessagesCount?: number;
}

export function StudioSidebar({ 
  activeTab, 
  setActiveTab, 
  showSidebar, 
  setShowSidebar,
  unreadMessagesCount = 0
}: StudioSidebarProps) {
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
              onClick={() => { setActiveTab("trainers-management"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "trainers-management" ? "bg-primary/5 text-primary" : ""}`}
            >
              <UserCheck className="w-5 h-5 mr-3" />
              <span>Trainers Management</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab("clients"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "clients" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span>Clients / CRM</span>
            </button>

            {/* PT-style modules for Studio */}
            <button 
              onClick={() => { setActiveTab("programs"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "programs" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Dumbbell className="w-5 h-5 mr-3" />
              <span>Training Programs</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab("packages"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "packages" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Package className="w-5 h-5 mr-3" />
              <span>Packages</span>
            </button>

            <button 
              onClick={() => { setActiveTab("services"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "services" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              <span>Services</span>
            </button>

            <button 
              onClick={() => { setActiveTab("sessions"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "sessions" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Clock className="w-5 h-5 mr-3" />
              <span>Sessions</span>
            </button>
            
            <button
              onClick={() => { setActiveTab("calendar"); if (isMobile) setShowSidebar(false); }}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "calendar" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Calendar</span>
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
  
  if (isMobile) {
    return (
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetContent side="left" className="p-0 w-[280px] sm:w-[350px]">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }
  
  return (
    <div className="hidden md:block w-64 border-r border-border bg-white h-full">
      {sidebarContent}
    </div>
  );
}
