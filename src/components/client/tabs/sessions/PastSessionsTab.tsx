
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SessionItem } from "@/types/sessions";

interface PastSessionsTabProps {
  pastSessions: SessionItem[];
}

export function PastSessionsTab({ pastSessions }: PastSessionsTabProps) {
  return (
    <div className="space-y-4">
      {pastSessions.map((session) => (
        <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium">{session.name}</h3>
            <div className="text-sm text-muted-foreground">
              With {session.trainer} • {session.date} • {session.time}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              Completed
            </Badge>
            <Button variant="outline" size="sm">
              {session.id % 2 === 0 ? "View Summary" : "Rate Session"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
