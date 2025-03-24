
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
}

interface SessionsTabProps {
  upcomingSessions: SessionItem[];
}

export function SessionsTab({ upcomingSessions }: SessionsTabProps) {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>View and manage your scheduled sessions</CardDescription>
          </div>
          <Button 
            className="flex items-center"
            onClick={() => navigate('/find-trainer')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Book New Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{session.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      With {session.trainer} • {session.date} • {session.time}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.status === 'confirmed' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Confirmed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    )}
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Strength Training</h3>
                  <div className="text-sm text-muted-foreground">
                    With Sarah Johnson • Last week • 15:00 - 16:00
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    Rate Session
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Cardio Kickboxing</h3>
                  <div className="text-sm text-muted-foreground">
                    With Alex Thompson • 2 weeks ago • 10:00 - 11:00
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Summary
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recurring">
            <div className="text-center py-8 text-muted-foreground">
              No recurring sessions scheduled yet
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
