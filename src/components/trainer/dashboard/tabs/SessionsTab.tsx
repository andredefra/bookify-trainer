
import { useState } from "react";
import { TrainerSessionItem } from "@/types/sessions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SessionList } from "./sessions/components/SessionList";
import { CreateSessionDialog } from "../dialogs/CreateSessionDialog";
import { EditSessionDialog } from "./sessions/EditSessionDialog";
import { CancelSessionDialog } from "./sessions/components/CancelSessionDialog";
import { toast } from "sonner";
import { SessionFormValues } from "../dialogs/session/SessionFormSchema";

// Sample data to guarantee we have sessions to display
const sampleSessions: TrainerSessionItem[] = [
  {
    id: 1,
    name: "Morning HIIT",
    time: "09:00 - 10:00",
    date: "06/01/2023",
    participants: 5,
    maxParticipants: 10,
    paymentStatus: { paid: 4, pending: 1, total: 5 }
  },
  {
    id: 2,
    name: "Personal Training",
    time: "13:00 - 14:00",
    date: "06/02/2023",
    participants: 1,
    maxParticipants: 1,
    paymentStatus: { paid: 1, pending: 0, total: 1 }
  },
  {
    id: 3,
    name: "Yoga Basics",
    time: "17:30 - 18:30",
    date: "06/03/2023",
    participants: 8,
    maxParticipants: 12,
    paymentStatus: { paid: 6, pending: 2, total: 8 },
    waitingList: 2
  }
];

interface SessionsTabProps {
  upcomingSessions?: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions = [] }: SessionsTabProps) {
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false);
  const [showEditSessionDialog, setShowEditSessionDialog] = useState(false);
  const [showCancelSessionDialog, setShowCancelSessionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TrainerSessionItem | null>(null);

  // Ensure we have data by combining props with sample data if needed
  const sessionsToDisplay = upcomingSessions.length > 0 ? upcomingSessions : sampleSessions;

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

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold leading-none tracking-tight">Training Sessions</h2>
            <p className="text-sm text-muted-foreground">Create and manage your training sessions</p>
          </div>
          <Button className="flex items-center" onClick={() => setShowCreateSessionDialog(true)}>
            <Plus className="sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Create Session</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-hidden">
        <SessionList 
          sessions={sessionsToDisplay} 
          onEditSession={handleEditSession} 
          onCancelSession={handleCancelSession}
        />
        
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
