
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { TrainerSessionItem } from "@/types/sessions";

interface DashboardSidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName?: string;
  userEmail?: string;
  upcomingSessions?: TrainerSessionItem[];
}

export function DashboardSidebar({ 
  showSidebar, 
  setShowSidebar, 
  activeTab, 
  setActiveTab,
  userName,
  userEmail,
  upcomingSessions
}: DashboardSidebarProps) {
  return (
    <>
      <DesktopSidebar 
        activeTab={activeTab} 
        handleTabClick={setActiveTab} 
        upcomingSessions={upcomingSessions}
      />
      
      <MobileSidebar 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar} 
        activeTab={activeTab} 
        handleTabClick={setActiveTab}
        userName={userName}
        userEmail={userEmail}
        upcomingSessions={upcomingSessions}
      />
    </>
  );
}
