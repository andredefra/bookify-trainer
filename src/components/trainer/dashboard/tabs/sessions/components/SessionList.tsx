
import { TrainerSessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Users, Clock } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useState } from "react";
import { VideoSessionDialog } from "./VideoSessionDialog";
import { SessionParticipantsDialog } from "./SessionParticipantsDialog";
import { InviteLinkButton } from "./InviteLinkButton";
import { useSessionPostponements } from "@/hooks/useSessionPostponements";

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
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [selectedVideoSession, setSelectedVideoSession] = useState<TrainerSessionItem | null>(null);
  const [selectedParticipantsSession, setSelectedParticipantsSession] = useState<TrainerSessionItem | null>(null);
  
  const { canPostponeSession } = useSessionPostponements();

  const handleStartVideo = (session: TrainerSessionItem) => {
    setSelectedVideoSession(session);
    setShowVideoDialog(true);
    if (onStartVideoSession) {
      onStartVideoSession(session);
    }
  };

  const handleViewParticipants = (session: TrainerSessionItem) => {
    setSelectedParticipantsSession(session);
    setShowParticipantsDialog(true);
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        // Format date properly handling both string and Date types
        const formattedDate = typeof session.date === 'string' 
          ? session.date 
          : session.date.toLocaleDateString();
        
        // Check if this is a video session - ensure it's set for all sessions that should have it
        const isVideo = session.mode === 'video' || session.name.toLowerCase().includes('hiit');
        // Check if the video session can be started
        const canStartVideo = isVideo && session.status === 'scheduled' && onStartVideoSession;
        
        // Check if session can be postponed (12 hours before)
        const sessionDateTime = new Date(`${session.date} ${session.time.split(' - ')[0]}`);
        const canPostpone = canPostponeSession(sessionDateTime) && onPostponeSession;
        
        // Debug logging
        console.log('Session:', session.name, 'DateTime:', sessionDateTime, 'CanPostpone:', canPostpone);

        return (
          <div key={session.id} className="flex flex-col p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <h3 className="font-medium text-base line-clamp-1">
                  {session.name}
                  {isVideo && (
                    <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-200">
                      <Video className="h-3 w-3 mr-1" /> Video
                    </Badge>
                  )}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {formattedDate} • {session.time}
                </div>
                <div className="flex flex-wrap mt-2 gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {session.paymentStatus?.paid || 0} paid
                  </Badge>
                  {(session.paymentStatus?.pending || 0) > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {session.paymentStatus?.pending || 0} pending
                    </Badge>
                  )}
                  {(session.waitingList || 0) > 0 && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {session.waitingList || 0} waiting
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Mobile-first responsive button layout */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm">
                  <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                </div>
                
                {/* Button container with responsive wrapping */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <InviteLinkButton 
                    session={session} 
                    variant="outline" 
                    size="sm"
                  />
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 flex items-center min-w-0 flex-shrink-0"
                    onClick={() => handleViewParticipants(session)}
                  >
                    <Users className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline ml-1">Participants</span>
                  </Button>
                  
                  {canStartVideo ? (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-8 flex items-center min-w-0 flex-shrink-0"
                      onClick={() => handleStartVideo(session)}
                    >
                      <Video className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline ml-1">Start</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 flex items-center min-w-0 flex-shrink-0"
                      onClick={() => onEditSession(session)}
                    >
                      <span className="text-sm">Details</span>
                    </Button>
                  )}
                  
                  {canPostpone && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 flex items-center min-w-0 flex-shrink-0"
                      onClick={() => onPostponeSession!(session)}
                    >
                      <Clock className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline ml-1">Postpone</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex items-center min-w-0 flex-shrink-0"
                    onClick={() => onCancelSession(session)}
                  >
                    <span className="text-sm">Cancel</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

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
