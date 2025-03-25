
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface DashboardContainerProps {
  customName?: string;
}

export function DashboardContainer({ customName = "Alex" }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(true);

  const handleMobileMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader 
        name={customName} 
        onMobileMenuClick={handleMobileMenuClick} 
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar 
          showSidebar={showSidebar} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 py-6 px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview" className="mt-0">
                <OverviewTab />
              </TabsContent>
              <TabsContent value="clients" className="mt-0">
                <ClientsTab />
              </TabsContent>
              <TabsContent value="programs" className="mt-0">
                <ProgramsTab />
              </TabsContent>
              <TabsContent value="sessions" className="mt-0">
                <SessionsTab />
              </TabsContent>
              <TabsContent value="messages" className="mt-0">
                <MessagesTab />
              </TabsContent>
              <TabsContent value="transactions" className="mt-0">
                <TransactionsTab />
              </TabsContent>
              <TabsContent value="analytics" className="mt-0">
                <AnalyticsTab />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <SettingsTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
