
import { useState } from "react";
import { TrainerSessionItem } from "@/types/sessions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SessionHeader } from "./sessions/components/SessionHeader";
import { SessionList } from "./sessions/components/SessionList";
import { CalendarView } from "./sessions/components/CalendarView";
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
    date: "06/01/2025",
    participants: 5,
    maxParticipants: 10,
    paymentStatus: { paid: 4, pending: 1, total: 5 }
  },
  {
    id: 2,
    name: "Personal Training",
    time: "13:00 - 14:00",
    date: "06/02/2025",
    participants: 1,
    maxParticipants: 1,
    paymentStatus: { paid: 1, pending: 0, total: 1 }
  },
  {
    id: 3,
    name: "Yoga Basics",
    time: "17:30 - 18:30",
    date: "06/03/2025",
    participants: 8,
    maxParticipants: 12,
    paymentStatus: { paid: 6, pending: 2, total: 8 },
    waitingList: 2
  },
  {
    id: 4,
    name: "Core Strength Video Class",
    time: "19:00 - 20:00",
    date: "06/04/2025",
    participants: 15,
    maxParticipants: 30,
    paymentStatus: { paid: 12, pending: 3, total: 15 },
    mode: "video", 
    status: "scheduled" // Added to indicate this session needs to be started
  },
  {
    id: 5,
    name: "Mindfulness Yoga Session",
    time: "10:30 - 11:30",
    date: new Date().toLocaleDateString(), // Today's date
    participants: 6,
    maxParticipants: 20,
    paymentStatus: { paid: 5, pending: 1, total: 6 },
    mode: "video",
    status: "scheduled"
  }
];

interface SessionsTabProps {
  upcomingSessions?: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions = [] }: SessionsTabProps) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
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

  const handleStartVideoSession = (session: TrainerSessionItem) => {
    toast.success(`Video session "${session.name}" prepared - you can start it now`);
    // The actual launching of the video interface is handled by the SessionList component
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
