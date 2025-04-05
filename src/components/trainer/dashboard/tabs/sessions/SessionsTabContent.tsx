
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CreateSessionDialog } from "../../dialogs/CreateSessionDialog";
import { EditSessionDialog } from "./EditSessionDialog";
import { CancelSessionDialog } from "./components/CancelSessionDialog";
import { TrainerSessionItem } from "@/types/sessions";
import { CalendarView } from "./components/CalendarView";
import { SessionHeader } from "./components/SessionHeader";
import { SessionList } from "./components/SessionList";
import { SessionFormValues } from "../../dialogs/session/SessionFormSchema";

interface SessionsTabContentProps {
  upcomingSessions: TrainerSessionItem[];
}

export function SessionsTabContent({ upcomingSessions }: SessionsTabContentProps) {
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false);
  const [showEditSessionDialog, setShowEditSessionDialog] = useState(false);
  const [showCancelSessionDialog, setShowCancelSessionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TrainerSessionItem | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const handleEditSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowEditSessionDialog(true);
  };

  const handleCancelSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowCancelSessionDialog(true);
  };

  const confirmCancelSession = () => {
    if (!selectedSession) return;
    
    toast.success(`Session "${selectedSession.name}" cancelled successfully`);
    setShowCancelSessionDialog(false);
  };

  const handleCreateSession = (data: SessionFormValues) => {
    toast.success("Session created successfully!");
    setShowCreateSessionDialog(false);
  };

  const handleUpdateSession = (data: SessionFormValues, sessionId: number) => {
    toast.success("Session updated successfully!");
    setShowEditSessionDialog(false);
  };

  const handleStartVideoSession = (session: TrainerSessionItem) => {
    toast.success(`Video session "${session.name}" started!`);
    // In a real application, this would navigate to a video session page or launch the video interface
  };

  return (
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
            sessions={upcomingSessions}
            onEditSession={handleEditSession}
            onCancelSession={handleCancelSession}
            onStartVideoSession={handleStartVideoSession}
          />
        ) : (
          <SessionList 
            sessions={upcomingSessions} 
            onEditSession={handleEditSession} 
            onCancelSession={handleCancelSession}
            onStartVideoSession={handleStartVideoSession}
          />
        )}
        
        <CreateSessionDialog 
          open={showCreateSessionDialog} 
          onOpenChange={setShowCreateSessionDialog}
          onSubmit={handleCreateSession}
        />
        
        <EditSessionDialog
          open={showEditSessionDialog}
          onOpenChange={setShowEditSessionDialog}
          session={selectedSession}
          onSubmit={handleUpdateSession}
        />

        <CancelSessionDialog
          open={showCancelSessionDialog}
          onOpenChange={setShowCancelSessionDialog}
          sessionName={selectedSession?.name || ""}
          onConfirm={confirmCancelSession}
        />
      </CardContent>
    </Card>
  );
}
