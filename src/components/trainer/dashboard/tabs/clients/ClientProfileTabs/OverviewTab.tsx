
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Dumbbell } from "lucide-react";

interface OverviewTabProps {
  mockClientDetails: {
    lastActivity: string;
    upcomingSessions: string[];
    weight: string;
    height: string;
    bodyFat: string;
  };
  clientSessions: number;
}

export function OverviewTab({ mockClientDetails, clientSessions }: OverviewTabProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-sm font-medium">Client Summary</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Last activity: {mockClientDetails.lastActivity}</span>
          </div>
          <div className="flex items-center text-sm">
            <Dumbbell className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Total sessions: {clientSessions}</span>
          </div>
        </div>
        
        <h3 className="text-sm font-medium mt-2">Upcoming Sessions</h3>
        {mockClientDetails.upcomingSessions.map((session, i) => (
          <div key={i} className="text-sm p-2 bg-primary/5 rounded">
            {session}
          </div>
        ))}
        
        <h3 className="text-sm font-medium mt-2">Basic Measurements</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="text-xs text-muted-foreground">Weight</div>
            <div className="font-medium">{mockClientDetails.weight}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="text-xs text-muted-foreground">Height</div>
            <div className="font-medium">{mockClientDetails.height}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <div className="text-xs text-muted-foreground">Body Fat</div>
            <div className="font-medium">{mockClientDetails.bodyFat}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
