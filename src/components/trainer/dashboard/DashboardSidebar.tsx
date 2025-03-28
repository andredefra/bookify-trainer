
import { useMediaQuery } from "@/hooks/use-mobile";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";

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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    // Only close the sidebar on mobile when a tab is clicked
    if (!isDesktop) {
      setShowSidebar(false);
    }
  };

  // Render appropriate sidebar based on screen size
  if (!isDesktop) {
    return (
      <MobileSidebar 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar}
        activeTab={activeTab} 
        handleTabClick={handleTabClick} 
      />
    );
  }

  // Desktop sidebar
  return (
    <DesktopSidebar 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
    />
  );
}
