
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
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Create and manage your training sessions</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm" 
                className="rounded-none px-2 sm:px-3"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button 
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm" 
                className="rounded-none px-2 sm:px-3"
                onClick={() => setViewMode("calendar")}
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
            </div>
            <Button className="flex items-center" onClick={() => setShowCreateSessionDialog(true)}>
              <Plus className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Create Session</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-hidden">
        {viewMode === "calendar" ? (
          <CalendarView sessions={sessionsWithPaymentInfo} />
        ) : (
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6 grid grid-cols-3 w-full">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="space-y-4">
                {sessionsWithPaymentInfo.map((session) => (
                  <div key={session.id} className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <h3 className="font-medium line-clamp-1">{session.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {session.date} • {session.time}
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
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm">
                        <span className="font-medium">{session.participants}/{session.maxParticipants}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-8 px-3">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          <span className="hidden sm:inline">Cancel</span>
                          <span className="sm:hidden">X</span>
                        </Button>
                      </div>
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
