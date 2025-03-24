
import { Plus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SessionItem {
  id: number;
  name: string;
  time: string;
  date: string;
  participants: number;
  maxParticipants: number;
}

interface SessionsTabProps {
  upcomingSessions: SessionItem[];
}

export function SessionsTab({ upcomingSessions }: SessionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Create and manage your training sessions</CardDescription>
          </div>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{session.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {session.date} • {session.time}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm">
                      <span className="font-medium">{session.participants}/{session.maxParticipants}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
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
            <div className="text-center py-8 text-muted-foreground">
              Past sessions will appear here
            </div>
          </TabsContent>
          <TabsContent value="recurring">
            <div className="text-center py-8 text-muted-foreground">
              Recurring sessions will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
