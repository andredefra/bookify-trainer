
import { useState, useEffect } from "react";
import { GymHeader } from "./GymHeader";
import { GymSidebar } from "./GymSidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { TrainersManagementTab } from "./tabs/TrainersManagementTab";
import { GroupSessionsTab } from "./tabs/GroupSessionsTab";
import { AvailabilityTab } from "./tabs/AvailabilityTab";
import { PerformanceTab } from "./tabs/PerformanceTab";
import { CalendarTab } from "./tabs/CalendarTab";
import { MembersTab } from "./tabs/MembersTab";
import { PackagesTab } from "./tabs/PackagesTab";
import { TransactionsTab } from "./tabs/TransactionsTab";
import { MessagesTab } from "./tabs/messages"; // Updated import path
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { toast } from "sonner";

export function GymDashboardContainer() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [user, setUser] = useState<{
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
    gymName?: string;
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('demo-user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // For demo purpose, add a gym name if not present
      if (!parsedUser.gymName) {
        parsedUser.gymName = "FitLife Gym";
      }
      setUser(parsedUser);
    }
    
    // Initialize unread messages count (mock data)
    setUnreadMessagesCount(3);
  }, []);

  // Function to mark messages as read when the messages tab is opened
  useEffect(() => {
    if (activeTab === "messages") {
      setUnreadMessagesCount(0);
    }
  }, [activeTab]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('demo-user');
    // Show toast notification
    toast.success("Logged out successfully!");
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <GymHeader 
        user={user} 
        onLogout={handleLogout}
        onMobileMenuClick={() => setShowSidebar(true)} 
      />
      
      <div className="flex-1 flex overflow-hidden">
        <GymSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          unreadMessagesCount={unreadMessagesCount}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-6 bg-gray-50">
          {activeTab === "overview" && <OverviewTab user={user} />}
          {activeTab === "trainers-management" && <TrainersManagementTab />}
          {activeTab === "group-sessions" && <GroupSessionsTab />}
          {activeTab === "availability" && <AvailabilityTab />}
          {activeTab === "performance" && <PerformanceTab />}
          {activeTab === "calendar" && <CalendarTab />}
          {activeTab === "members" && <MembersTab />}
          {activeTab === "packages" && <PackagesTab />}
          {activeTab === "transactions" && <TransactionsTab />}
          {activeTab === "messages" && <MessagesTab onMessagesRead={() => setUnreadMessagesCount(0)} />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "settings" && <SettingsTab user={user} />}
        </main>
      </div>
    </div>
  );
}
