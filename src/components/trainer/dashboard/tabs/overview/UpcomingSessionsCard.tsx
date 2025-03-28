
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrainerSessionItem } from "@/types/sessions";

interface UpcomingSessionsCardProps {
  sessions: TrainerSessionItem[];
  onNewSession: () => void;
}

export function UpcomingSessionsCard({ sessions, onNewSession }: UpcomingSessionsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled training sessions</CardDescription>
          </div>
          <Button size="sm" className="flex items-center whitespace-nowrap self-start" onClick={onNewSession}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Session</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex flex-col p-3 bg-white border rounded-lg shadow-sm">
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-medium text-base truncate">{session.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {session.date} • {session.time}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    {session.paymentStatus?.paid || 0} paid
                  </Badge>
                  {(session.paymentStatus?.pending || 0) > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
                      {session.paymentStatus?.pending || 0} pending
                    </Badge>
                  )}
                  {(session.waitingList || 0) > 0 && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      {session.waitingList || 0} waiting
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs">
                    <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-center py-3">
        <Button variant="link" size="sm">View all sessions</Button>
      </CardFooter>
    </Card>
  );
}
