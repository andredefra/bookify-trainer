
import { TrainerSessionItem } from "@/types/sessions";
import { useMediaQuery } from "@/hooks/use-mobile";
import { VideoSessionDialog } from "./VideoSessionDialog";
import { SessionParticipantsDialog } from "./SessionParticipantsDialog";
import { SessionItem } from "./SessionItem";
import { useSessionDialogs } from "../hooks/useSessionDialogs";

interface SessionListProps {
  sessions: TrainerSessionItem[];
  onEditSession: (session: TrainerSessionItem) => void;
  onCancelSession: (session: TrainerSessionItem) => void;
  onStartVideoSession?: (session: TrainerSessionItem) => void;
  onPostponeSession?: (session: TrainerSessionItem) => void;
}

export function SessionList({ 
  sessions, 
  onEditSession, 
  onCancelSession,
  onStartVideoSession,
  onPostponeSession
}: SessionListProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    showVideoDialog,
    setShowVideoDialog,
    showParticipantsDialog,
    setShowParticipantsDialog,
    selectedVideoSession,
    selectedParticipantsSession,
    handleStartVideo,
    handleViewParticipants
  } = useSessionDialogs();

  const handleStartVideoWithCallback = (session: TrainerSessionItem) => {
    handleStartVideo(session, onStartVideoSession);
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          onEditSession={onEditSession}
          onCancelSession={onCancelSession}
          onStartVideoSession={handleStartVideoWithCallback}
          onPostponeSession={onPostponeSession}
          onViewParticipants={handleViewParticipants}
        />
      ))}

      {sessions.length === 0 && (
        <div className="flex items-center justify-center h-40 bg-muted/20 rounded-lg border border-dashed">
          <p className="text-muted-foreground">No sessions scheduled</p>
        </div>
      )}

      <VideoSessionDialog 
        open={showVideoDialog} 
        onOpenChange={setShowVideoDialog} 
        session={selectedVideoSession} 
      />

      <SessionParticipantsDialog 
        open={showParticipantsDialog} 
        onOpenChange={setShowParticipantsDialog} 
        session={selectedParticipantsSession} 
      />
    </div>
  );
}
