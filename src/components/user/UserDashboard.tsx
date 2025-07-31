import { useState } from "react";
import { UserHeader } from "./UserHeader";
import { UserSidebar } from "./UserSidebar";
import { UserOverview } from "./tabs/UserOverview";
import { UserTrainingProgram } from "./tabs/UserTrainingProgram";
import { UserTrainingLog } from "./tabs/UserTrainingLog";
import { UserAnalytics } from "./tabs/UserAnalytics";
import { UserTrainers } from "./tabs/UserTrainers";
import { UserMessages } from "./tabs/UserMessages";
import { UserSettings } from "./tabs/UserSettings";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  name: string;
  email: string;
  type: string;
  plan: string;
}

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

export function UserDashboardComponent({ user, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UserHeader
        user={user}
        onLogout={onLogout}
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
        showMobileMenuButton={isMobile}
      />
      <div className={`flex flex-1 ${isMobile ? 'overflow-hidden' : 'overflow-hidden'}`}>
        <UserSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          user={user}
          onLogout={onLogout}
        />
        
        <main className={`flex-1 overflow-y-auto bg-muted/20 ${
          isMobile 
            ? 'w-full p-2 pb-6' 
            : 'p-4 md:p-6 lg:p-8'
        }`}>
          <div className={`mx-auto ${
            isMobile 
              ? 'max-w-full px-1 space-y-3' 
              : 'max-w-6xl space-y-6'
          }`}>
            {activeTab === "overview" && <UserOverview />}
            {activeTab === "training-program" && <UserTrainingProgram />}
            {activeTab === "training-log" && <UserTrainingLog />}
            {activeTab === "analytics" && <UserAnalytics />}
            {activeTab === "my-trainers" && <UserTrainers onNavigateToMessages={() => setActiveTab("messages")} />}
            {activeTab === "messages" && <UserMessages />}
            {activeTab === "settings" && <UserSettings user={user} />}
          </div>
        </main>
      </div>
    </div>
  );
}