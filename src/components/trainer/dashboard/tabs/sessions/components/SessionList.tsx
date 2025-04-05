
import { TrainerSessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Video, Users } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useState } from "react";
import { VideoSessionDialog } from "./VideoSessionDialog";

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
  const [selectedVideoSession, setSelectedVideoSession] = useState<TrainerSessionItem | null>(null);

  const handleStartVideo = (session: TrainerSessionItem) => {
    setSelectedVideoSession(session);
    setShowVideoDialog(true);
    if (onStartVideoSession) {
      onStartVideoSession(session);
    }
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        // Format date if it's a Date object
        const formattedDate = session.date instanceof Date 
          ? session.date.toLocaleDateString() 
          : session.date;
        
        // Check if this is a video session
        const isVideo = session.mode === 'video';
        // Check if the video session can be started
        const canStartVideo = isVideo && session.status === 'scheduled' && onStartVideoSession;

        return (
          <Card key={session.id} className="p-4 hover:bg-accent/5 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-base">
                      {session.name}
                    </h3>
                    {isVideo && (
                      <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-200 flex items-center">
                        <Video className="h-3 w-3 mr-1" /> Video
                      </Badge>
                    )}
                  </div>
                  
                  <div className={`text-sm text-muted-foreground mt-1 ${isMobile ? 'flex flex-col gap-1' : 'flex items-center gap-2'}`}>
                    <span>{formattedDate} • {session.time}</span>
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{session.participants}/{session.maxParticipants}</span>
                      {session.waitingList && session.waitingList > 0 && (
                        <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-600 border-orange-200 text-xs">
                          +{session.waitingList} waiting
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0 flex-wrap">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {session.paymentStatus?.paid || 0} paid
                  </Badge>
                  {(session.paymentStatus?.pending || 0) > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {session.paymentStatus?.pending || 0} pending
                    </Badge>
                  )}
                </div>
              </div>

              <div className={`flex ${isMobile ? 'flex-col' : ''} gap-2`}>
                {canStartVideo ? (
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => handleStartVideo(session)}
                  >
                    <Video className="h-4 w-4 mr-2" /> Start Video
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => onEditSession(session)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => onCancelSession(session)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
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
    </div>
  );
}
