
import { SessionItem } from "@/types/sessions";
import { SessionHeader } from "./session-card/SessionHeader";
import { SessionDetails } from "./session-card/SessionDetails";
import { SessionActions } from "./session-card/SessionActions";
import { SessionBadges } from "./session-card/SessionBadges";
import { useLiveSession } from "./session-card/useLiveSession";
import { formatDate, getBgColor } from "./session-card/utils";

interface MobileSessionCardProps {
  session: SessionItem;
  onViewDetails?: (session: SessionItem) => void;
  onRegister?: (session: SessionItem) => void;
  onAddToCalendar?: (session: SessionItem) => void;
  onCancel?: (session: SessionItem) => void;
  onJoinSession?: (session: SessionItem) => void;
  featured?: boolean;
  isPast?: boolean;
}

export function MobileSessionCard({
  session,
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel,
  onJoinSession,
  featured = false,
  isPast = false
}: MobileSessionCardProps) {
  const formattedDate = formatDate(session);
  const { isLive, isVideoSession } = useLiveSession(session, formattedDate);
  const bgColor = getBgColor(featured, isPast, session);

  return (
    <div className={`rounded-lg border p-3 ${bgColor}`}>
      {/* Session header */}
      <SessionHeader 
        session={session} 
        isVideoSession={isVideoSession} 
        isLive={isLive} 
      />
      
      {/* Session details */}
      <SessionDetails 
        session={session} 
        formattedDate={formattedDate} 
      />
      
      {/* Session actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-100">
        {/* Status badges */}
        <SessionBadges 
          session={session} 
          isVideoSession={isVideoSession} 
          isLive={isLive}
          featured={featured}
          isPast={isPast}
        />
        
        {/* Action buttons */}
        <SessionActions
          session={session}
          isLive={isLive}
          isVideoSession={isVideoSession}
          isPast={isPast}
          onViewDetails={onViewDetails}
          onRegister={onRegister}
          onAddToCalendar={onAddToCalendar}
          onCancel={onCancel}
          onJoinSession={onJoinSession}
        />
      </div>
    </div>
  );
}
