
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
  
  // Initialize sessions when component mounts or upcomingSessions changes
  useEffect(() => {
    console.log("Upcoming sessions received in TabContent:", upcomingSessions);
    if (upcomingSessions && upcomingSessions.length > 0) {
      setSessions(upcomingSessions);
      console.log("Sessions initialized from props:", upcomingSessions);
    } else {
      // Add some mock data if no sessions provided
      const mockSessions = [
        {
          id: 1,
          name: "Morning Workout",
          date: "05/15/2023",
          time: "08:00 AM",
          participants: 4,
          maxParticipants: 10,
          description: "Start your day with energy",
          waitingList: 0,
          paymentStatus: {
            paid: 3,
            pending: 1,
            get total() { return this.paid + this.pending; }
          }
        },
        {
          id: 2,
          name: "Evening Yoga",
          date: "05/16/2023",
          time: "06:00 PM",
          participants: 6,
          maxParticipants: 8,
          description: "Relax after work",
          waitingList: 2,
          paymentStatus: {
            paid: 4,
            pending: 2,
            get total() { return this.paid + this.pending; }
          }
        }
      ];
      setSessions(mockSessions);
      console.log("Sessions initialized with mock data:", mockSessions);
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
          date: data.date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}),
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
              date: data.date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}),
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
