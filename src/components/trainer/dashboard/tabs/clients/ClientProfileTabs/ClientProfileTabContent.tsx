
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { GoalsTab } from "./GoalsTab";
import { MetricsTab } from "./MetricsTab";
import { ProgramsTab } from "./ProgramsTab";
import { NotesTab } from "./NotesTab";
import { Badge } from "@/components/ui/badge";

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
}

export function ClientProfileTabContent({ 
  client, 
  mockClientDetails,
  searchQuery = ""
}: ClientProfileTabContentProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [matchCounts, setMatchCounts] = useState<Record<string, number>>({
    overview: 0,
    goals: 0,
    metrics: 0,
    programs: 0,
    notes: 0
  });

  // Calculate search matches in each tab
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setMatchCounts({
        overview: 0,
        goals: 0,
        metrics: 0,
        programs: 0,
        notes: 0
      });
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const counts: Record<string, number> = {
      overview: 0,
      goals: 0,
      metrics: 0,
      programs: 0,
      notes: 0
    };
    
    // Overview tab matches
    if (
      mockClientDetails.lastActivity.toLowerCase().includes(query) || 
      mockClientDetails.upcomingSessions.some(s => s.toLowerCase().includes(query)) ||
      mockClientDetails.weight.toLowerCase().includes(query) ||
      mockClientDetails.height.toLowerCase().includes(query) ||
      mockClientDetails.bodyFat.toLowerCase().includes(query)
    ) {
      counts.overview++;
    }
    
    // Goals tab matches
    const goalMatches = mockClientDetails.goals.filter(g => 
      g.toLowerCase().includes(query)
    ).length;
    counts.goals = goalMatches;
    
    // Metrics tab matches (check weight, height, bodyFat)
    if (
      mockClientDetails.weight.toLowerCase().includes(query) || 
      mockClientDetails.height.toLowerCase().includes(query) ||
      mockClientDetails.bodyFat.toLowerCase().includes(query)
    ) {
      counts.metrics++;
    }
    
    // Programs tab has mock content, but we'll search for basic terms
    if (
      "strength conditioning flexibility recovery".includes(query)
    ) {
      counts.programs++;
    }
    
    // Notes tab matches
    if (mockClientDetails.notes.toLowerCase().includes(query)) {
      counts.notes++;
    }
    
    setMatchCounts(counts);
    
    // If there are no matches in the current tab but matches in other tabs,
    // automatically switch to the first tab with matches
    const totalMatches = Object.values(counts).reduce((acc, val) => acc + val, 0);
    if (totalMatches > 0 && counts[activeTab] === 0) {
      const firstMatchTab = Object.entries(counts)
        .find(([_, count]) => count > 0)?.[0];
      if (firstMatchTab) {
        setActiveTab(firstMatchTab);
      }
    }
  }, [searchQuery, mockClientDetails, activeTab]);

  // Pass the search query to each tab component
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="overview" className="relative">
          Overview
          {matchCounts.overview > 0 && (
            <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
              {matchCounts.overview}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="goals" className="relative">
          Goals
          {matchCounts.goals > 0 && (
            <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
              {matchCounts.goals}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="metrics" className="relative">
          Metrics
          {matchCounts.metrics > 0 && (
            <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
              {matchCounts.metrics}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="programs" className="relative">
          Programs
          {matchCounts.programs > 0 && (
            <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
              {matchCounts.programs}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="notes" className="relative">
          Notes
          {matchCounts.notes > 0 && (
            <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
              {matchCounts.notes}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab 
          mockClientDetails={mockClientDetails} 
          clientSessions={client.sessions}
          searchQuery={searchQuery} 
        />
      </TabsContent>
      
      <TabsContent value="goals">
        <GoalsTab 
          mockClientDetails={mockClientDetails} 
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
        />
      </TabsContent>
      
      <TabsContent value="programs">
        <ProgramsTab searchQuery={searchQuery} />
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
