import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export function CalendarTab() {
  const today = new Date();
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  const sessions = [
    { time: "09:00", client: "Sarah Johnson", trainer: "Marco Rossi", type: "Personal Training" },
    { time: "10:00", client: "Group Session", trainer: "Laura Bianchi", type: "HIIT Class" },
    { time: "11:00", client: "Michael Brown", trainer: "Marco Rossi", type: "Personal Training" },
    { time: "14:00", client: "Emma Wilson", trainer: "Giuseppe Verde", type: "Strength Training" },
    { time: "16:00", client: "Group Session", trainer: "Laura Bianchi", type: "Yoga Class" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">View and manage all studio sessions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle>{monthName}</CardTitle>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Day</Button>
            <Button variant="default" size="sm">Week</Button>
            <Button variant="outline" size="sm">Month</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold">Today's Sessions</h3>
            {sessions.map((session, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-16 text-sm font-medium">{session.time}</div>
                <div className="flex-1">
                  <p className="font-medium">{session.client}</p>
                  <p className="text-sm text-muted-foreground">{session.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{session.trainer}</p>
                  <p className="text-xs text-muted-foreground">Trainer</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
