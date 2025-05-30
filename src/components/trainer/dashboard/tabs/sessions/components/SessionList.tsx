
import { TrainerSessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Video, Users } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useState } from "react";
import { VideoSessionDialog } from "./VideoSessionDialog";
import { SessionParticipantsDialog } from "./SessionParticipantsDialog";

interface SessionListProps {
  sessions: TrainerSessionItem[];
  onEditSession: (session: TrainerSessionItem) => void;
  onCancelSession: (session: TrainerSessionItem) => void;
  onStartVideoSession?: (session: TrainerSessionItem) => void;
}

export function SessionList({ 
  sessions, 
  onEditSession, 
  onCancelSession,
  onStartVideoSession
}: SessionListProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [selectedVideoSession, setSelectedVideoSession] = useState<TrainerSessionItem | null>(null);
  const [selectedParticipantsSession, setSelectedParticipantsSession] = useState<TrainerSessionItem | null>(null);

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
        // Format date if it's a Date object
        const formattedDate = session.date instanceof Date 
          ? session.date.toLocaleDateString() 
          : session.date;
        
        // Check if this is a video session - ensure it's set for all sessions that should have it
        const isVideo = session.mode === 'video' || session.name.toLowerCase().includes('hiit');
        // Check if the video session can be started
        const canStartVideo = isVideo && session.status === 'scheduled' && onStartVideoSession;

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
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm">
                  <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-2 sm:px-4 flex items-center"
                    onClick={() => handleViewParticipants(session)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Participants</span>
                    <span className="sm:hidden">Users</span>
                  </Button>
                  {canStartVideo ? (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-8 px-2 sm:px-4 flex items-center"
                      onClick={() => handleStartVideo(session)}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Start Video</span>
                      <span className="sm:hidden">Video</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2 sm:px-4"
                      onClick={() => onEditSession(session)}
                    >
                      <span className="hidden sm:inline">Details</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 sm:px-4"
                    onClick={() => onCancelSession(session)}
                  >
                    <span className="hidden sm:inline">Cancel</span>
                    <span className="sm:hidden">Cancel</span>
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
