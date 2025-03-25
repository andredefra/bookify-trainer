
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
import { TrainerSessionItem } from "@/types/sessions";

interface DashboardContainerProps {
  customName?: string;
}

// Mock data for sessions, clients, and messages
const mockSessions: TrainerSessionItem[] = [
  { id: 1, name: "Personal Training", time: "10:00 AM", date: "Today", participants: 1, maxParticipants: 1 },
  { id: 2, name: "Group HIIT Class", time: "4:30 PM", date: "Tomorrow", participants: 8, maxParticipants: 12 },
  { id: 3, name: "Yoga Session", time: "7:00 PM", date: "Jul 25", participants: 5, maxParticipants: 10 },
];

const mockClients = [
  { id: 1, name: "Sarah Johnson", sessions: 12, lastSession: "Yesterday" },
  { id: 2, name: "Mike Peterson", sessions: 8, lastSession: "3 days ago" },
  { id: 3, name: "Lisa Garcia", sessions: 15, lastSession: "1 week ago" },
  { id: 4, name: "David Kim", sessions: 5, lastSession: "2 weeks ago" },
];

const mockMessages = [
  { id: 1, from: "Sarah Johnson", preview: "Hi, I need to reschedule my session tomorrow...", time: "10:24 AM" },
  { id: 2, from: "Mike Peterson", preview: "The new workout plan is really challenging but I'm enjoying it!", time: "Yesterday" },
  { id: 3, from: "New Client Inquiry", preview: "I'm interested in your weight loss program...", time: "2 days ago" },
];

// Mock user for settings
const mockUser = {
  name: "Trainer",
  email: "trainer@example.com",
  type: "trainer",
  plan: "pro"
};

export function DashboardContainer({ customName = "Alex" }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  // Mock logout function
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader 
        name={customName} 
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
        user={mockUser}
        onLogout={handleLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar 
          showSidebar={showSidebar} 
          setShowSidebar={setShowSidebar}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 py-6 px-4 md:px-8 pb-20 lg:pb-6">
          <div className="mx-auto max-w-6xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview" className="mt-0">
                <OverviewTab 
                  upcomingSessions={mockSessions}
                  clients={mockClients}
                  messageRequests={mockMessages}
                />
              </TabsContent>
              <TabsContent value="clients" className="mt-0">
                <ClientsTab clients={mockClients} />
              </TabsContent>
              <TabsContent value="programs" className="mt-0">
                <ProgramsTab />
              </TabsContent>
              <TabsContent value="sessions" className="mt-0">
                <SessionsTab upcomingSessions={mockSessions} />
              </TabsContent>
              <TabsContent value="messages" className="mt-0">
                <MessagesTab messageRequests={mockMessages} />
              </TabsContent>
              <TabsContent value="transactions" className="mt-0">
                <TransactionsTab />
              </TabsContent>
              <TabsContent value="analytics" className="mt-0">
                <AnalyticsTab />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <SettingsTab user={mockUser} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
