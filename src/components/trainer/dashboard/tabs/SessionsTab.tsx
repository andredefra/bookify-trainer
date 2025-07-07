
import { useState } from "react";
import { TrainerSessionItem } from "@/types/sessions";
import { SessionParticipant, WaitingListEntry } from "@/types/sessionParticipants";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SessionHeader } from "./sessions/components/SessionHeader";
import { SessionList } from "./sessions/components/SessionList";
import { CalendarView } from "./sessions/components/CalendarView";
import { CreateSessionDialog } from "../dialogs/CreateSessionDialog";
import { EditSessionDialog } from "./sessions/EditSessionDialog";
import { CancelSessionDialog } from "./sessions/components/CancelSessionDialog";
import { PostponeSessionDialog } from "../dialogs/PostponeSessionDialog";
import { toast } from "sonner";
import { SessionFormValues } from "../dialogs/session/SessionFormSchema";
import { CalendarEvent } from "@/hooks/useCalendarEvents";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";

// Sample participants data
const sampleParticipants: SessionParticipant[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    isClient: true,
    paymentStatus: 'paid',
    bookedAt: '2024-03-10T09:30:00Z',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Mike Peterson',
    email: 'mike@example.com',
    isClient: true,
    paymentStatus: 'paid',
    bookedAt: '2024-03-10T10:15:00Z'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    isClient: false,
    paymentStatus: 'pending',
    bookedAt: '2024-03-11T14:20:00Z',
    phone: '+1987654321'
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@example.com',
    isClient: false,
    paymentStatus: 'unpaid',
    bookedAt: '2024-03-11T16:45:00Z'
  }
];

const sampleWaitingList: WaitingListEntry[] = [
  {
    id: '5',
    name: 'Lisa Garcia',
    email: 'lisa@example.com',
    isClient: true,
    addedAt: '2024-03-12T08:30:00Z',
    priority: 1
  },
  {
    id: '6',
    name: 'David Chen',
    email: 'david@example.com',
    isClient: false,
    addedAt: '2024-03-12T11:20:00Z',
    priority: 2
  }
];

// Sample data to guarantee we have sessions to display - using ISO date format for proper parsing
const sampleSessions: TrainerSessionItem[] = [
  {
    id: 1,
    name: "Morning HIIT",
    time: "09:00 - 10:00",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
    participants: 5,
    maxParticipants: 10,
    paymentStatus: { paid: 4, pending: 1, total: 5 },
    participantDetails: sampleParticipants.slice(0, 5),
    waitingListDetails: []
  },
  {
    id: 2,
    name: "Personal Training - POSTPONABLE",
    time: "14:00 - 15:00",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now at 14:00
    participants: 1,
    maxParticipants: 1,
    paymentStatus: { paid: 1, pending: 0, total: 1 },
    participantDetails: sampleParticipants.slice(0, 1),
    waitingListDetails: []
  },
  {
    id: 3,
    name: "Yoga Basics",
    time: "17:30 - 18:30",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days from now
    participants: 8,
    maxParticipants: 12,
    paymentStatus: { paid: 6, pending: 2, total: 8 },
    waitingList: 2,
    participantDetails: sampleParticipants.slice(0, 4),
    waitingListDetails: sampleWaitingList
  },
  {
    id: 4,
    name: "Core Strength Video Class",
    time: "19:00 - 20:00",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    participants: 15,
    maxParticipants: 30,
    paymentStatus: { paid: 12, pending: 3, total: 15 },
    mode: "video", 
    status: "scheduled",
    participantDetails: sampleParticipants,
    waitingListDetails: []
  },
  {
    id: 5,
    name: "Tomorrow Morning Session - POSTPONABLE", 
    time: "10:30 - 11:30",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 day from now
    participants: 6,
    maxParticipants: 20,
    paymentStatus: { paid: 5, pending: 1, total: 6 },
    mode: "video",
    status: "scheduled",
    participantDetails: sampleParticipants.slice(0, 3),
    waitingListDetails: []
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
  const [showPostponeSessionDialog, setShowPostponeSessionDialog] = useState(false);
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

  const handlePostponeSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowPostponeSessionDialog(true);
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
            onPostponeSession={handlePostponeSession}
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

        <PostponeSessionDialog
          open={showPostponeSessionDialog}
          onOpenChange={setShowPostponeSessionDialog}
          event={selectedSession ? {
            id: selectedSession.id.toString(),
            start: new Date(`${selectedSession.date} ${selectedSession.time.split(' - ')[0]}`),
            end: new Date(`${selectedSession.date} ${selectedSession.time.split(' - ')[1]}`),
            title: selectedSession.name,
            type: 'session' as const,
            color: '#3B82F6',
            status: 'scheduled',
            trainer_id: getCurrentDemoUserId()
          } : null}
          participants={selectedSession?.participantDetails?.map(p => ({
            id: p.id,
            email: p.email,
            name: p.name,
            paid_amount: p.paymentStatus === 'paid' ? 50 : undefined // Mock amount
          })) || []}
        />
      </CardContent>
    </Card>
  );
}
