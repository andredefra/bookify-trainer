
import { Card, CardContent } from "@/components/ui/card";
import { ClientSummary } from "./overview/ClientSummary";
import { UpcomingSessions } from "./overview/UpcomingSessions";
import { BasicMeasurements } from "./overview/BasicMeasurements";

interface OverviewTabProps {
  mockClientDetails: {
    lastActivity: string;
    upcomingSessions: string[];
    weight: string;
    height: string;
    bodyFat: string;
  };
  clientSessions: number;
  searchQuery?: string;
}

export function OverviewTab({ mockClientDetails, clientSessions, searchQuery = "" }: OverviewTabProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <ClientSummary 
          lastActivity={mockClientDetails.lastActivity} 
          totalSessions={clientSessions}
          searchQuery={searchQuery}
        />
        
        <UpcomingSessions 
          sessions={mockClientDetails.upcomingSessions}
          searchQuery={searchQuery}
        />
        
        <BasicMeasurements 
          weight={mockClientDetails.weight} 
          height={mockClientDetails.height} 
          bodyFat={mockClientDetails.bodyFat}
          searchQuery={searchQuery}
        />
      </CardContent>
    </Card>
  );
}
