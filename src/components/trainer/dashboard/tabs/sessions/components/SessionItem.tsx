import { TrainerSessionItem } from "@/types/sessions";
import { Badge } from "@/components/ui/badge";
import { Video, Clock } from "lucide-react";
import { SessionActions } from "./SessionActions";
import { formatSessionDate } from "../utils/sessionDateUtils";
import { useSessionPostponements } from "@/hooks/useSessionPostponements";

interface SessionItemProps {
  session: TrainerSessionItem;
  onEditSession: (session: TrainerSessionItem) => void;
  onCancelSession: (session: TrainerSessionItem) => void;
  onStartVideoSession?: (session: TrainerSessionItem) => void;
  onPostponeSession?: (session: TrainerSessionItem) => void;
  onViewParticipants: (session: TrainerSessionItem) => void;
}

export function SessionItem({ 
  session, 
  onEditSession, 
  onCancelSession, 
  onStartVideoSession, 
  onPostponeSession,
  onViewParticipants 
}: SessionItemProps) {
  const { canPostponeSession } = useSessionPostponements();
  const formattedDate = formatSessionDate(session.date);
  const isVideo = session.mode === 'video' || session.name.toLowerCase().includes('hiit');
  
  // Check if session can be postponed
  let isPostponable = false;
  try {
    const sessionDate = typeof session.date === 'string' ? session.date : session.date.toISOString().split('T')[0];
    const sessionTime = session.time.split(' - ')[0];
    const sessionDateTime = new Date(`${sessionDate}T${sessionTime}:00`);
    
    if (!isNaN(sessionDateTime.getTime())) {
      isPostponable = canPostponeSession(sessionDateTime) && !!onPostponeSession;
    }
  } catch (error) {
    console.error('Error checking postponement for session:', session.name, error);
  }

  return (
    <div className="flex flex-col p-3 sm:p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <h3 className="font-medium text-base line-clamp-1">
            {session.name}
            {isVideo && (
              <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-200">
                <Video className="h-3 w-3 mr-1" /> Video
              </Badge>
            )}
            {isPostponable && (
              <Badge variant="outline" className="ml-2 bg-orange-100 text-orange-700 border-orange-200">
                <Clock className="h-3 w-3 mr-1" /> Postponable
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
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm">
            <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
          </div>
          
          <SessionActions
            session={session}
            isVideo={isVideo}
            onEditSession={onEditSession}
            onCancelSession={onCancelSession}
            onStartVideoSession={onStartVideoSession}
            onPostponeSession={onPostponeSession}
            onViewParticipants={onViewParticipants}
          />
        </div>
      </div>
    </div>
  );
}