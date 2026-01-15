
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { MetricsTab } from "./MetricsTab";
import { ProgramsTab } from "./ProgramsTab";
import { PackagesTab } from "./PackagesTab";
import { NotesTab } from "./NotesTab";
import { ClientProfileTabList } from "./tabs/ClientProfileTabList";
import { useTabSearchResults } from "./hooks/useTabSearchResults";

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
  searchQuery?: string;
  initialTab?: string;
}

export function ClientProfileTabContent({ 
  client, 
  mockClientDetails,
  searchQuery = "",
  initialTab = "overview"
}: ClientProfileTabContentProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Use our custom hook to handle search functionality
  const { matchCounts, firstMatchTab } = useTabSearchResults({
    searchQuery,
    clientDetails: mockClientDetails,
    activeTab
  });
  
  // If there's a first match tab and it's different from active tab, switch to it
  useEffect(() => {
    if (firstMatchTab && firstMatchTab !== activeTab) {
      setActiveTab(firstMatchTab);
    }
  }, [firstMatchTab]);

  // Respect initialTab changes from parent
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Pass the search query to each tab component
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <ClientProfileTabList 
        activeTab={activeTab}
        matchCounts={matchCounts}
        onTabChange={setActiveTab}
      />
      
      <TabsContent value="overview">
        <OverviewTab 
          mockClientDetails={mockClientDetails} 
          clientSessions={client.sessions}
          searchQuery={searchQuery} 
        />
      </TabsContent>
      
      <TabsContent value="metrics">
        <MetricsTab 
          searchQuery={searchQuery}
          clientMetrics={{
            weight: mockClientDetails.weight,
            height: mockClientDetails.height,
            bodyFat: mockClientDetails.bodyFat
          }}
          clientId="00000000-0000-0000-0000-000000000002"
          clientName={mockClientDetails.name}
        />
      </TabsContent>
      
      <TabsContent value="programs">
        <ProgramsTab searchQuery={searchQuery} />
      </TabsContent>
      
      <TabsContent value="packages">
        <PackagesTab clientId={client.id} searchQuery={searchQuery} />
      </TabsContent>
      
      <TabsContent value="notes">
        <NotesTab 
          mockClientDetails={mockClientDetails} 
          searchQuery={searchQuery}
        />
      </TabsContent>
    </Tabs>
  );
}
