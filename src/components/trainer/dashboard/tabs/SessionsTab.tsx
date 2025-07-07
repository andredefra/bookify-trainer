
import { useState } from "react";
import { TrainerSessionItem } from "@/types/sessions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SessionHeader } from "./sessions/components/SessionHeader";
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
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
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
        <CardHeader>
          <SessionHeader 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            onCreateSession={() => setShowCreateSessionDialog(true)} 
          />
        </CardHeader>
        <CardContent className="overflow-x-hidden">
          {viewMode === "calendar" ? (
            <CalendarView 
              sessions={sessionsToDisplay}
              onEditSession={handleEditSession}
              onCancelSession={handleCancelSession}
              onStartVideoSession={handleStartVideoSession}
            />
          ) : (
            <SessionList 
              sessions={sessionsToDisplay} 
              onEditSession={handleEditSession} 
              onCancelSession={handleCancelSession}
              onStartVideoSession={handleStartVideoSession}
              onPostponeSession={handlePostponeSession}
            />
          )}
          
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
