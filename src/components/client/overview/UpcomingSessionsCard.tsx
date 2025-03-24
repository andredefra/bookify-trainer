
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
}

interface UpcomingSessionsCardProps {
  upcomingSessions: SessionItem[];
}

export function UpcomingSessionsCard({ upcomingSessions }: UpcomingSessionsCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled training sessions</CardDescription>
        </div>
        <Button 
          onClick={() => navigate('/find-trainer')}
          className="flex items-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">{session.name}</h3>
                <div className="text-sm text-muted-foreground">
                  With {session.trainer} • {session.date} • {session.time}
                </div>
              </div>
              <div className="flex items-center">
                {session.status === 'confirmed' ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Confirmed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Pending
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="ml-2">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
