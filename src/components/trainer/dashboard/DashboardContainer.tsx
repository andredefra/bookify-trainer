
import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { ClientsTab } from "./tabs/ClientsTab";
import { SessionsTab } from "./tabs/SessionsTab";
import { ProgramsTab } from "./tabs/ProgramsTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { TransactionsTab } from "./tabs/TransactionsTab";
import { SalesTab } from "./tabs/SalesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { TrainerSessionItem } from "@/types/sessions";

// Sample sessions - these are the same ones used in the client dashboard
const sampleSessions: TrainerSessionItem[] = [
  {
    id: 1,
    name: "Morning HIIT",
    time: "09:00 - 10:00",
    date: "06/21/2023",
    participants: 5,
    maxParticipants: 10,
    paymentStatus: { paid: 4, pending: 1, total: 5 }
  },
  {
    id: 2,
    name: "Personal Training",
    time: "13:00 - 14:00",
    date: "06/22/2023",
    participants: 1,
    maxParticipants: 1,
    paymentStatus: { paid: 1, pending: 0, total: 1 }
  },
  {
    id: 3,
    name: "Yoga Basics",
    time: "17:30 - 18:30",
    date: "06/23/2023",
    participants: 8,
    maxParticipants: 12,
    paymentStatus: { paid: 6, pending: 2, total: 8 },
    waitingList: 2
  }
];

interface DashboardContainerProps {
  customName?: string;
}

export function DashboardContainer({ customName }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const isMobile = useIsMobile();

  // Mock data for components
  const clients = [
    { id: 1, name: "Emma Thompson", sessions: 12, lastSession: "May 15, 2023" },
    { id: 2, name: "Michael Chen", sessions: 8, lastSession: "May 17, 2023" },
    { id: 3, name: "Sarah Johnson", sessions: 15, lastSession: "May 18, 2023" },
  ];

  const messageRequests = [
    { id: 1, from: "Emma Thompson", preview: "Question about the training plan", time: "2 hours ago" },
    { id: 2, from: "Michael Chen", preview: "Need to reschedule my session", time: "Yesterday" },
  ];

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader
        name={customName || "Dashboard"}
        onMobileMenuToggle={toggleMobileSidebar}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showMobileSidebar={showMobileSidebar}
          setShowMobileSidebar={setShowMobileSidebar}
        />
        
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {activeTab === "overview" && (
              <OverviewTab
                upcomingSessions={sampleSessions}
                clients={clients}
                messageRequests={messageRequests}
              />
            )}
            {activeTab === "clients" && <ClientsTab />}
            {activeTab === "sessions" && <SessionsTab upcomingSessions={sampleSessions} />}
            {activeTab === "programs" && <ProgramsTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
            {activeTab === "messages" && <MessagesTab />}
            {activeTab === "transactions" && <TransactionsTab />}
            {activeTab === "sales" && <SalesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
