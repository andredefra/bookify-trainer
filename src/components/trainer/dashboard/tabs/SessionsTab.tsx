
import { useState } from "react";
import { Plus, Calendar as CalendarIcon, List } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CreateSessionDialog } from "../dialogs/CreateSessionDialog";
import { Badge } from "@/components/ui/badge";
import { TrainerSessionItem } from "@/types/sessions";
import { CalendarView } from "./sessions/CalendarView";

interface SessionsTabProps {
  upcomingSessions: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions }: SessionsTabProps) {
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  
  // Add payment status and waiting list to mock data if not available
  const sessionsWithPaymentInfo = upcomingSessions.map(session => ({
    ...session,
    waitingList: session.waitingList || 0,
    paymentStatus: session.paymentStatus || {
      paid: Math.floor(Math.random() * session.participants),
      pending: Math.floor(Math.random() * session.participants),
      get total() { return this.paid + this.pending; }
    }
  }));
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Create and manage your training sessions</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm" 
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button 
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm" 
                className="rounded-none"
                onClick={() => setViewMode("calendar")}
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                Calendar
              </Button>
            </div>
            <Button className="flex items-center" onClick={() => setShowCreateSessionDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Session
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "calendar" ? (
          <CalendarView sessions={sessionsWithPaymentInfo} />
        ) : (
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="space-y-4">
                {sessionsWithPaymentInfo.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{session.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {session.date} • {session.time}
                      </div>
                      <div className="flex mt-2 gap-2">
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
        )}
        
        <CreateSessionDialog 
          open={showCreateSessionDialog} 
          onOpenChange={setShowCreateSessionDialog}
          onSubmit={(data) => {
            // Here you would typically save the session to your database
            console.log("New session data:", data);
            toast.success("Session created successfully!");
            setShowCreateSessionDialog(false);
          }}
        />
      </CardContent>
    </Card>
  );
}
