
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Dumbbell } from "lucide-react";

interface ClientSummaryProps {
  lastActivity: string;
  totalSessions: number;
}

export function ClientSummary({ lastActivity, totalSessions }: ClientSummaryProps) {
  return (
    <>
      <h3 className="text-sm font-medium">Client Summary</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Last activity: {lastActivity}</span>
        </div>
        <div className="flex items-center text-sm">
          <Dumbbell className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Total sessions: {totalSessions}</span>
        </div>
      </div>
    </>
  );
}
