
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CreateSessionDialog } from "../../dialogs/CreateSessionDialog";
import { EditSessionDialog } from "./EditSessionDialog";
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
  const [selectedSession, setSelectedSession] = useState<TrainerSessionItem | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  
  // Initialize sessions state with the passed upcomingSessions prop
  const [sessions, setSessions] = useState(upcomingSessions.map(session => ({
    ...session,
    waitingList: session.waitingList || 0,
    paymentStatus: session.paymentStatus || {
      paid: Math.floor(Math.random() * session.participants),
      pending: Math.floor(Math.random() * session.participants),
      get total() { return this.paid + this.pending; }
    }
  })));
  
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
          date: data.date.toLocaleDateString(),
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
          <SessionList sessions={sessions} onEditSession={handleEditSession} />
        )}
        
        <CreateSessionDialog 
          open={showCreateSessionDialog} 
          onOpenChange={setShowCreateSessionDialog}
          onSubmit={(data) => {
            // Add the new session to the state
            const newSession = {
              id: Math.floor(Math.random() * 1000),
              name: data.name,
              date: data.date.toLocaleDateString(),
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
      </CardContent>
    </Card>
  );
}
