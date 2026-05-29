import { useState, useMemo } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { ClientsTab } from "./tabs/ClientsTab";
import { SessionsTab } from "./tabs/SessionsTab";
import { ProgramsTab } from "./tabs/ProgramsTab";
import { ServicesTab } from "./tabs/ServicesTab";
import { PackagesTab } from "./tabs/PackagesTab";
import { CalendarTab } from "./tabs/CalendarTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { TransactionsTab } from "./tabs/TransactionsTab";
import { SalesTab } from "./tabs/SalesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { TrainerPlanProvider, TrainerPlan } from "@/context/TrainerPlanContext";

const PLAN_ALLOWED_TABS: Record<TrainerPlan, string[]> = {
  basic: ["overview", "sales", "clients", "services", "calendar", "messages", "reviews", "settings"],
  essential: ["overview", "sales", "clients", "programs", "services", "packages", "sessions", "calendar", "messages", "transactions", "analytics", "reviews", "settings"],
  pro: ["overview", "sales", "clients", "programs", "services", "packages", "sessions", "calendar", "messages", "transactions", "analytics", "reviews", "settings"],
};
import { TrainerSessionItem } from "@/types/sessions";

// Sample sessions - these are the same ones used in the client dashboard
const sampleSessions: TrainerSessionItem[] = [
  {
    id: 1,
    name: "Morning HIIT",
    time: "09:00 - 10:00",
    date: "06/21/2025",
    participants: 5,
    maxParticipants: 10,
    paymentStatus: { paid: 4, pending: 1, total: 5 }
  },
  {
    id: 2,
    name: "Personal Training",
    time: "13:00 - 14:00",
    date: "06/22/2025",
    participants: 1,
    maxParticipants: 1,
    paymentStatus: { paid: 1, pending: 0, total: 1 }
  },
  {
    id: 3,
    name: "Yoga Basics",
    time: "17:30 - 18:30",
    date: "06/23/2025",
    participants: 8,
    maxParticipants: 12,
    paymentStatus: { paid: 6, pending: 2, total: 8 },
    waitingList: 2
  }
];

// Sample clients data - IDs match database demo data
const sampleClients = [
  { id: 2, name: "Emma Thompson", sessions: 12, lastSession: "May 15, 2023" },
  { id: 1, name: "Michael Chen", sessions: 8, lastSession: "May 17, 2023" },
  { id: 3, name: "Sarah Johnson", sessions: 15, lastSession: "May 18, 2023" },
];

// Sample message requests data
const sampleMessageRequests = [
  { id: 1, from: "Emma Thompson", preview: "Question about the training plan", time: "2 hours ago" },
  { id: 2, from: "Michael Chen", preview: "Need to reschedule my session", time: "Yesterday" },
];

// Sample user data
const sampleUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  type: "trainer",
  plan: "pro",
  profileImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
};

interface DashboardContainerProps {
  customName?: string;
}

export function DashboardContainer({ customName }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader
        name={customName || "Dashboard"} 
        onLogout={() => console.log("Logout clicked")}
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
        showMobileMenuButton={isMobile}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          userName={sampleUser.name}
          userEmail={sampleUser.email}
          upcomingSessions={sampleSessions}
        />
        
        <main className="flex-1 overflow-y-auto bg-muted/20 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8">
          <div className="mx-auto max-w-full xl:max-w-7xl space-y-3 sm:space-y-4 md:space-y-6">
            {activeTab === "overview" && (
              <OverviewTab
                upcomingSessions={sampleSessions}
                clients={sampleClients}
                messageRequests={sampleMessageRequests}
                onNavigateToTab={setActiveTab}
              />
            )}
            {activeTab === "clients" && <ClientsTab clients={sampleClients} />}
            {activeTab === "sessions" && <SessionsTab upcomingSessions={sampleSessions} />}
            {activeTab === "programs" && <ProgramsTab />}
            {activeTab === "services" && <ServicesTab />}
            {activeTab === "packages" && <PackagesTab />}
            {activeTab === "calendar" && <CalendarTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
            {activeTab === "messages" && <MessagesTab messageRequests={sampleMessageRequests} />}
            {activeTab === "transactions" && <TransactionsTab />}
            {activeTab === "sales" && <SalesTab />}
            {activeTab === "reviews" && <ReviewsTab />}
            {activeTab === "settings" && <SettingsTab user={sampleUser} />}
          </div>
        </main>
      </div>
    </div>
  );
}
