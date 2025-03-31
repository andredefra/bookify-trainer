
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CreateSessionDialog } from "../../dialogs/CreateSessionDialog";
import { EditSessionDialog } from "./EditSessionDialog";
import { CancelSessionDialog } from "./components/CancelSessionDialog";
import { TrainerSessionItem } from "@/types/sessions";
import { CalendarView } from "./CalendarView";
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
  
  // Initialize sessions state with the passed upcomingSessions prop
  const [sessions, setSessions] = useState<TrainerSessionItem[]>([]);
  
  // Update sessions when upcomingSessions changes
  useEffect(() => {
    console.log("Upcoming sessions received in TabContent:", upcomingSessions);
    if (upcomingSessions && upcomingSessions.length > 0) {
      setSessions(upcomingSessions);
      console.log("Sessions initialized from props:", upcomingSessions);
    }
  }, [upcomingSessions]);
  
  const handleEditSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowEditSessionDialog(true);
  };

  const handleUpdateSession = (data: SessionFormValues, sessionId: number) => {
    // Update the sessions array with edited data
    setSessions(sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          name: data.name,
          date: data.date instanceof Date ? 
            data.date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : 
            data.date,
          time: data.time,
          maxParticipants: Number(data.maxParticipants), // Convert to number
          description: data.description
        };
      }
      return session;
    }));
    
    toast.success("Session updated successfully!");
    setShowEditSessionDialog(false);
  };

  const handleCancelSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowCancelSessionDialog(true);
  };

  const confirmCancelSession = () => {
    if (selectedSession) {
      setSessions(sessions.filter(session => session.id !== selectedSession.id));
      toast.success(`Session "${selectedSession.name}" cancelled successfully`);
      setShowCancelSessionDialog(false);
    }
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
          <CalendarView sessions={sessions} />
        ) : (
          <SessionList 
            sessions={sessions} 
            onEditSession={handleEditSession} 
            onCancelSession={handleCancelSession}
          />
        )}
        
        <CreateSessionDialog 
          open={showCreateSessionDialog} 
          onOpenChange={setShowCreateSessionDialog}
          onSubmit={(data) => {
            // Add the new session to the state
            const newSession = {
              id: Math.floor(Math.random() * 1000),
              name: data.name,
              date: data.date instanceof Date ? 
                data.date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : 
                data.date,
              time: data.time,
              participants: 0,
              maxParticipants: Number(data.maxParticipants), // Convert to number
              paymentStatus: {
                paid: 0,
                pending: 0,
                get total() { return this.paid + this.pending; }
              },
              waitingList: 0,
              description: data.description
            };
            
            setSessions([...sessions, newSession]);
            toast.success("Session created successfully!");
            setShowCreateSessionDialog(false);
          }}
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
