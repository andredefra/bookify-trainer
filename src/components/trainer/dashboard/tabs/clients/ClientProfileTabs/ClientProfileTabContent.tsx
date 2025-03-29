
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { GoalsTab } from "./GoalsTab";
import { MetricsTab } from "./MetricsTab";
import { ProgramsTab } from "./ProgramsTab";
import { NotesTab } from "./NotesTab";

interface ClientProfileTabContentProps {
  client: {
    id: number;
    name: string;
    sessions: number;
    lastSession: string;
  };
  mockClientDetails: {
    name: string;
    email: string;
    since: string;
    sessions: number;
    goals: string[];
    lastActivity: string;
    upcomingSessions: string[];
    weight: string;
    height: string;
    bodyFat: string;
    notes: string;
  };
}

export function ClientProfileTabContent({ 
  client, 
  mockClientDetails 
}: ClientProfileTabContentProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="goals">Goals</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="programs">Programs</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab 
          mockClientDetails={mockClientDetails} 
          clientSessions={client.sessions} 
        />
      </TabsContent>
      
      <TabsContent value="goals">
        <GoalsTab mockClientDetails={mockClientDetails} />
      </TabsContent>
      
      <TabsContent value="metrics">
        <MetricsTab />
      </TabsContent>
      
      <TabsContent value="programs">
        <ProgramsTab />
      </TabsContent>
      
      <TabsContent value="notes">
        <NotesTab mockClientDetails={mockClientDetails} />
      </TabsContent>
    </Tabs>
  );
}
