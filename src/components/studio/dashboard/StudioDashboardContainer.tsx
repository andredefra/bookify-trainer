import { useState, useEffect } from "react";
import { StudioHeader } from "./StudioHeader";
import { StudioSidebar } from "./StudioSidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { TrainersManagementTab } from "./tabs/TrainersManagementTab";
import { ClientsTab } from "./tabs/ClientsTab";
import { ProgramsTab } from "./tabs/ProgramsTab";
import { PackagesTab } from "./tabs/PackagesTab";
import { ServicesTab } from "./tabs/ServicesTab";
import { CalendarTab } from "./tabs/CalendarTab";
import { SessionsTab } from "./tabs/SessionsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { toast } from "sonner";

export function StudioDashboardContainer() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [user, setUser] = useState<{
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
    studioName?: string;
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('demo-user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (!parsedUser.studioName) {
        parsedUser.studioName = "Elite Fitness Studio";
      }
      setUser(parsedUser);
    }
    
    setUnreadMessagesCount(2);
  }, []);

  useEffect(() => {
    if (activeTab === "messages") {
      setUnreadMessagesCount(0);
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    toast.success("Logged out successfully!");
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <StudioHeader 
        user={user} 
        onLogout={handleLogout}
        onMobileMenuClick={() => setShowSidebar(true)} 
      />
      
      <div className="flex-1 flex overflow-hidden">
        <StudioSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          unreadMessagesCount={unreadMessagesCount}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-6 bg-gray-50">
          {activeTab === "overview" && <OverviewTab user={user} />}
          {activeTab === "trainers-management" && <TrainersManagementTab />}
          {activeTab === "clients" && <ClientsTab />}
          {activeTab === "programs" && <ProgramsTab />}
          {activeTab === "packages" && <PackagesTab />}
          {activeTab === "services" && <ServicesTab />}
          {activeTab === "sessions" && <SessionsTab />}
          {activeTab === "calendar" && <CalendarTab />}
          {activeTab === "messages" && <MessagesTab onMessagesRead={() => setUnreadMessagesCount(0)} />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "settings" && <SettingsTab user={user} />}
        </main>
      </div>
    </div>
  );
}
