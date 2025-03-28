
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";

interface DashboardSidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName?: string;
  userEmail?: string;
}

export function DashboardSidebar({ 
  showSidebar, 
  setShowSidebar, 
  activeTab, 
  setActiveTab,
  userName,
  userEmail
}: DashboardSidebarProps) {
  return (
    <>
      <DesktopSidebar 
        activeTab={activeTab} 
        handleTabClick={setActiveTab} 
      />
      
      <MobileSidebar 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar} 
        activeTab={activeTab} 
        handleTabClick={setActiveTab}
        userName={userName}
        userEmail={userEmail}
      />
    </>
  );
}
