
import { TrainerSessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";
import { useState } from "react";
import { VideoSessionDialog } from "./VideoSessionDialog";

interface CalendarViewProps {
  sessions: TrainerSessionItem[];
  onEditSession: (session: TrainerSessionItem) => void;
  onCancelSession: (session: TrainerSessionItem) => void;
  onStartVideoSession?: (session: TrainerSessionItem) => void;
}

export function CalendarView({ 
  sessions, 
  onEditSession, 
  onCancelSession,
  onStartVideoSession
}: CalendarViewProps) {
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [selectedVideoSession, setSelectedVideoSession] = useState<TrainerSessionItem | null>(null);
  
  // Group sessions by date
  const groupedSessions: Record<string, TrainerSessionItem[]> = {};
  
  sessions.forEach(session => {
    const date = typeof session.date === 'string' ? session.date : session.date.toLocaleDateString();
    
    if (!groupedSessions[date]) {
      groupedSessions[date] = [];
    }
    
    groupedSessions[date].push(session);
  });
  
  // Sort dates
  const sortedDates = Object.keys(groupedSessions).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  const handleStartVideo = (session: TrainerSessionItem) => {
    setSelectedVideoSession(session);
    setShowVideoDialog(true);
    if (onStartVideoSession) {
      onStartVideoSession(session);
    }
  };
  
  return (
    <div className="space-y-8">
      {sortedDates.map(date => (
        <div key={date} className="space-y-4">
          <h3 className="font-semibold text-lg">{date}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedSessions[date].map(session => (
              <div 
                key={session.id}
                className="p-4 bg-white border rounded-lg shadow-sm flex flex-col space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-base">
                      {session.name}
                      {session.mode === 'video' && (
                        <span className="ml-2 inline-flex items-center">
                          <Video className="h-4 w-4 text-blue-500" />
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">{session.time}</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-transparent">
                    {session.participants}/{session.maxParticipants}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  {session.mode === 'video' && session.status === 'scheduled' && onStartVideoSession ? (
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="flex-1"
                      onClick={() => handleStartVideo(session)}
                    >
                      <Video className="h-4 w-4 mr-2" /> Start Video
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => onEditSession(session)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => onCancelSession(session)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {sortedDates.length === 0 && (
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
