
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { SessionItem } from "@/types/sessions";

interface SessionDetailsProps {
  session: SessionItem;
  formattedDate: string;
}

export function SessionDetails({ session, formattedDate }: SessionDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
      <div className="flex items-center text-muted-foreground">
        <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
        {formattedDate}
      </div>
      <div className="flex items-center text-muted-foreground">
        <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
        {session.time}
      </div>
      <div className="flex items-center text-muted-foreground col-span-2">
        <Users className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
        With {session.trainer}
        {session.attendees !== undefined && session.maxAttendees && (
          <span className="ml-2">({session.attendees}/{session.maxAttendees})</span>
        )}
      </div>
      {/* Show location for in-person sessions */}
      {session.mode === 'in-person' && session.address && (
        <div className="flex items-center text-muted-foreground col-span-2">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{session.address.split(',')[0]}</span>
        </div>
      )}
    </div>
  );
}
