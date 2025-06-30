
import { useState } from "react";
import { ClientHeader } from "./ClientHeader";
import { ClientSidebar } from "./ClientSidebar";
import { Overview } from "./tabs/Overview";
import { SessionsTab } from "./tabs/SessionsTab";
import { TrainingProgramTab } from "./tabs/TrainingProgramTab";
import { TrainingLogTab } from "./tabs/TrainingLogTab";
import { TrainersTab } from "./tabs/TrainersTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { MyPackagesTab } from "./tabs/packages/MyPackagesTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { SessionItem } from "@/types/sessions";

// Sample upcoming sessions data
const upcomingSessions: SessionItem[] = [
  {
    id: 1,
    name: "Morning HIIT",
    trainer: "John Doe",
    date: "Today",
    time: "09:00 - 10:00",
    price: 50,
    status: "confirmed",
    attendees: 5,
    maxAttendees: 10,
    location: "Studio A",
    description: "High-intensity interval training session"
  },
  {
    id: 2,
    name: "Personal Training",
    trainer: "John Doe",
    date: "Tomorrow",
    time: "13:00 - 14:00",
    price: 0, // Part of package
    status: "confirmed",
    attendees: 1,
    maxAttendees: 1,
    location: "Main Gym",
    description: "One-on-one personal training session",
    packageSession: true
  }
];

interface ClientDashboardProps {
  customName?: string;
}

export function ClientDashboard({ customName }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader
        name={customName || "Client Dashboard"} 
        onLogout={() => console.log("Logout clicked")}
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
        showMobileMenuButton={isMobile}
      />
      <div className="flex flex-1 overflow-hidden">
        <ClientSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {activeTab === "overview" && <Overview />}
            {activeTab === "sessions" && <SessionsTab upcomingSessions={upcomingSessions} />}
            {activeTab === "packages" && <MyPackagesTab />}
            {activeTab === "training-program" && <TrainingProgramTab />}
            {activeTab === "training-log" && <TrainingLogTab />}
            {activeTab === "trainers" && <TrainersTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
            {activeTab === "messages" && <MessagesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
