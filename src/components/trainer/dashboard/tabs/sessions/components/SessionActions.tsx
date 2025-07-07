import { TrainerSessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { Video, Users, Clock } from "lucide-react";
import { InviteLinkButton } from "./InviteLinkButton";
import { useSessionPostponements } from "@/hooks/useSessionPostponements";

interface SessionActionsProps {
  session: TrainerSessionItem;
  isVideo: boolean;
  onEditSession: (session: TrainerSessionItem) => void;
  onCancelSession: (session: TrainerSessionItem) => void;
  onStartVideoSession?: (session: TrainerSessionItem) => void;
  onPostponeSession?: (session: TrainerSessionItem) => void;
  onViewParticipants: (session: TrainerSessionItem) => void;
}

export function SessionActions({
  session,
  isVideo,
  onEditSession,
  onCancelSession,
  onStartVideoSession,
  onPostponeSession,
  onViewParticipants
}: SessionActionsProps) {
  const { canPostponeSession } = useSessionPostponements();
  
  const canStartVideo = isVideo && session.status === 'scheduled' && onStartVideoSession;
  
  // Check if session can be postponed (12 hours before) - ENHANCED DEBUGGING
  let canPostpone = false;
  
  try {
    const sessionDate = typeof session.date === 'string' ? session.date : session.date.toISOString().split('T')[0];
    const sessionTime = session.time.split(' - ')[0];
    const sessionDateTime = new Date(`${sessionDate}T${sessionTime}:00`);
    
    // Debug logging with safe handling
    const now = new Date();
    const isValidDate = !isNaN(sessionDateTime.getTime());
    
    console.log(`🔍 Postponement check for "${session.name}":`, {
      sessionDate,
      sessionTime,
      sessionDateTime: isValidDate ? sessionDateTime.toISOString() : 'INVALID DATE',
      currentTime: now.toISOString(),
      sessionDateTimeValid: isValidDate,
      timeDiffMs: isValidDate ? sessionDateTime.getTime() - now.getTime() : 'N/A',
      timeDiffHours: isValidDate ? (sessionDateTime.getTime() - now.getTime()) / (1000 * 60 * 60) : 'N/A',
      onPostponeSessionAvailable: !!onPostponeSession
    });
    
    // Only proceed if date is valid
    if (isValidDate) {
      const postponementResult = canPostponeSession(sessionDateTime);
      canPostpone = postponementResult && !!onPostponeSession;
      
      console.log(`${canPostpone ? '✅' : '❌'} Session "${session.name}" ${canPostpone ? 'CAN' : 'CANNOT'} be postponed`, {
        canPostponeSessionResult: postponementResult,
        finalCanPostpone: canPostpone
      });
    } else {
      console.log(`❌ Invalid session date for "${session.name}"`);
    }
  } catch (error) {
    console.error('❌ Error parsing session date for postponement:', error, session.name);
    canPostpone = false;
  }

  return (
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
        onClick={() => onViewParticipants(session)}
      >
        <Users className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline ml-1">Participants</span>
      </Button>
      
      {canStartVideo ? (
        <Button 
          variant="secondary" 
          size="sm" 
          className="h-8 flex items-center min-w-0 flex-shrink-0"
          onClick={() => onStartVideoSession!(session)}
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
  );
}