
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SessionItem } from "@/types/sessions";

interface UpcomingSessionsCardProps {
  sessions: SessionItem[];
  onNewSession: () => void;
}

export function UpcomingSessionsCard({ sessions, onNewSession }: UpcomingSessionsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled training sessions</CardDescription>
        </div>
        <Button className="flex items-center" onClick={onNewSession}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">{session.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {session.date} • {session.time}
                </div>
                <div className="flex mt-2 gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {session.paymentStatus.paid} paid
                  </Badge>
                  {session.paymentStatus.pending > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {session.paymentStatus.pending} pending
                    </Badge>
                  )}
                  {session.waitingList > 0 && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {session.waitingList} waiting
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-sm">
                  <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-center py-4">
        <Button variant="link">View all sessions</Button>
      </CardFooter>
    </Card>
  );
}
