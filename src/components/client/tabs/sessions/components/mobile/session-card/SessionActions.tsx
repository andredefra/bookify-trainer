
import { Button } from "@/components/ui/button";
import { CalendarCheck, CreditCard, Video } from "lucide-react";
import { SessionItem } from "@/types/sessions";

interface SessionActionsProps {
  session: SessionItem;
  isLive: boolean;
  isVideoSession: boolean;
  isPast?: boolean;
  onViewDetails?: (session: SessionItem) => void;
  onRegister?: (session: SessionItem) => void;
  onAddToCalendar?: (session: SessionItem) => void;
  onCancel?: (session: SessionItem) => void;
  onJoinSession?: (session: SessionItem) => void;
}

export function SessionActions({ 
  session,
  isLive,
  isVideoSession,
  isPast = false,
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel,
  onJoinSession
}: SessionActionsProps) {
  if (session.status === 'registered' || session.status === 'confirmed') {
    return (
      <div className="flex gap-2">
        {isVideoSession && isLive && onJoinSession && (
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 bg-red-600 hover:bg-red-700" 
            onClick={() => onJoinSession(session)}
          >
            <Video className="h-3.5 w-3.5 mr-1" />
            Join Live
          </Button>
        )}
        {onAddToCalendar && !isLive && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8" 
            onClick={() => onAddToCalendar(session)}
          >
            <CalendarCheck className="h-3.5 w-3.5 mr-1" />
            Calendar
          </Button>
        )}
        {onCancel && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8" 
            onClick={() => onCancel(session)}
          >
            Cancel
          </Button>
        )}
      </div>
    );
  }
  
  if (isPast) {
    return (
      <Button variant="outline" size="sm" className="h-8">
        Rate
      </Button>
    );
  }
  
  return (
    <>
      {onRegister && (
        <Button 
          variant="secondary" 
          size="sm" 
          className="h-8" 
          onClick={() => onRegister(session)}
        >
          <CreditCard className="h-3.5 w-3.5 mr-1" />
          Register
        </Button>
      )}
      {onViewDetails && (
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8" 
          onClick={() => onViewDetails(session)}
        >
          Details
        </Button>
      )}
    </>
  );
}
