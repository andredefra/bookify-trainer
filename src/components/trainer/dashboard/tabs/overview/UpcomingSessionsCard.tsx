
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrainerSessionItem } from "@/types/sessions";

interface UpcomingSessionsCardProps {
  sessions: TrainerSessionItem[];
  onNewSession: () => void;
  onViewDetails?: (session: TrainerSessionItem) => void;
}

export function UpcomingSessionsCard({ sessions, onNewSession, onViewDetails }: UpcomingSessionsCardProps) {
  // Get the first three upcoming sessions to display in the overview
  const nextSessions = sessions.slice(0, 3);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled training sessions</CardDescription>
        </div>
        <Button className="flex items-center whitespace-nowrap" onClick={onNewSession}>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">New Session</span>
          <span className="sm:hidden">New</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextSessions.map((session) => {
            // Format date if it's a Date object
            const formattedDate = session.date instanceof Date 
              ? session.date.toLocaleDateString() 
              : session.date;
              
            return (
              <div key={session.id} className="flex flex-col p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col gap-3">
                  <div className="space-y-2">
                    <h3 className="font-medium text-base line-clamp-1">{session.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {formattedDate} • {session.time}
                    </div>
                    <div className="flex flex-wrap mt-2 gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {session.paymentStatus?.paid || 0} paid
                      </Badge>
                      {(session.paymentStatus?.pending || 0) > 0 && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          {session.paymentStatus?.pending || 0} pending
                        </Badge>
                      )}
                      {(session.waitingList || 0) > 0 && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {session.waitingList || 0} waiting
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm">
                      <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 sm:px-4"
                      onClick={() => onViewDetails && onViewDetails(session)}
                    >
                      <span className="hidden sm:inline">Details</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-center py-4">
        <Button variant="link">View all sessions</Button>
      </CardFooter>
    </Card>
  );
}
