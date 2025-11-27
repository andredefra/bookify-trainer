
import { TrainerSessionItem } from "@/types/sessions";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionList } from "./sessions/components/SessionList";
import { CalendarView } from "./sessions/components/CalendarView";
import { SessionDialogs } from "./sessions/components/SessionDialogs";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { sampleSessions } from "./sessions/data/sampleSessionData";
import { useSessionManagement } from "./sessions/hooks/useSessionManagement";

interface SessionsTabProps {
  upcomingSessions?: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions = [] }: SessionsTabProps) {
  const {
    showCreateSessionDialog,
    setShowCreateSessionDialog,
    showEditSessionDialog,
    setShowEditSessionDialog,
    showCancelSessionDialog,
    setShowCancelSessionDialog,
    showPostponeSessionDialog,
    setShowPostponeSessionDialog,
    selectedSession,
    handleEditSession,
    handleCancelSession,
    handlePostponeSession,
    confirmCancelSession,
    handleCreateSession,
    handleUpdateSession,
    handleStartVideoSession
  } = useSessionManagement();

  // Ensure we have data by combining props with sample data if needed
  const sessionsToDisplay = upcomingSessions.length > 0 ? upcomingSessions : sampleSessions;

  return (
    <ErrorBoundary>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Create and manage your training sessions</CardDescription>
          </div>
          <Button 
            className="flex items-center w-full sm:w-auto"
            onClick={() => setShowCreateSessionDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-6 w-full sm:w-auto">
              <TabsTrigger value="list" className="flex-1 sm:flex-none">List</TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1 sm:flex-none">Calendar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-0">
              <SessionList 
                sessions={sessionsToDisplay} 
                onEditSession={handleEditSession} 
                onCancelSession={handleCancelSession}
                onStartVideoSession={handleStartVideoSession}
                onPostponeSession={handlePostponeSession}
              />
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0">
              <CalendarView 
                sessions={sessionsToDisplay}
                onEditSession={handleEditSession}
                onCancelSession={handleCancelSession}
                onStartVideoSession={handleStartVideoSession}
              />
            </TabsContent>
          </Tabs>
          
          <SessionDialogs
            showCreateSessionDialog={showCreateSessionDialog}
            setShowCreateSessionDialog={setShowCreateSessionDialog}
            showEditSessionDialog={showEditSessionDialog}
            setShowEditSessionDialog={setShowEditSessionDialog}
            showCancelSessionDialog={showCancelSessionDialog}
            setShowCancelSessionDialog={setShowCancelSessionDialog}
            showPostponeSessionDialog={showPostponeSessionDialog}
            setShowPostponeSessionDialog={setShowPostponeSessionDialog}
            selectedSession={selectedSession}
            onCreateSession={handleCreateSession}
            onUpdateSession={handleUpdateSession}
            onConfirmCancel={confirmCancelSession}
          />
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
