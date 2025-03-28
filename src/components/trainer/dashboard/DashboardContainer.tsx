
import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { ClientsTab } from "./tabs/ClientsTab";
import { ProgramsTab } from "./tabs/ProgramsTab";
import { SessionsTab } from "./tabs/SessionsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { TransactionsTab } from "./tabs/TransactionsTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { useMediaQuery } from "@/hooks/use-mobile";

interface DashboardContainerProps {
  customName?: string;
}

export function DashboardContainer({ customName }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Get user data from localStorage
  const storedUser = localStorage.getItem('demo-user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const name = user?.name || customName || "Trainer";

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    window.location.href = '/';
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "clients":
        return <ClientsTab />;
      case "programs":
        return <ProgramsTab />;
      case "sessions":
        return <SessionsTab />;
      case "messages":
        return <MessagesTab />;
      case "transactions":
        return <TransactionsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader
          name={name}
          onLogout={handleLogout}
          onMobileMenuClick={() => setShowSidebar(!showSidebar)}
          showMobileMenuButton={!isDesktop}
        />

        <main className="flex-1 overflow-y-auto pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
