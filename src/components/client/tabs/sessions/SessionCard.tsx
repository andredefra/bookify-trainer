
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, CreditCard } from "lucide-react";
import { SessionItem, SessionStatus } from "@/types/sessions";

interface SessionCardProps {
  session: SessionItem;
  onViewDetails?: (session: SessionItem) => void;
  onRegister?: (session: SessionItem) => void;
  onAddToCalendar?: (session: SessionItem) => void;
  onCancel?: (session: SessionItem) => void;
  variant?: 'default' | 'featured';
}

export function SessionCard({
  session,
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel,
  variant = 'default'
}: SessionCardProps) {
  const bgColor = variant === 'featured' ? 'bg-white border shadow-sm' : 'bg-white border shadow-sm';
  
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 ${bgColor} rounded-lg`}>
      <div className="mb-2 sm:mb-0">
        <h3 className="font-medium text-sm sm:text-base">{session.name}</h3>
        <div className="text-xs sm:text-sm text-muted-foreground">
          With {session.trainer} • {session.date} • {session.time}
        </div>
        {session.price && (
          <div className="text-xs sm:text-sm font-medium mt-1">
            €{session.price}
          </div>
        )}
        {session.attendees !== undefined && session.maxAttendees && (
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3 mr-1" />
            <span>{session.attendees}/{session.maxAttendees} attending</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {session.status === 'registered' || session.status === 'confirmed' ? (
          <>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              Registered
            </Badge>
            {onAddToCalendar && (
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => onAddToCalendar(session)}>
                <CalendarCheck className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Add to Calendar</span>
                <span className="sm:hidden">Calendar</span>
              </Button>
            )}
            {onCancel && (
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onCancel(session)}>
                Cancel
              </Button>
            )}
          </>
        ) : (
          <>
            {onViewDetails && (
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => onViewDetails(session)}>
                <span className="hidden sm:inline">Register to this session</span>
                <span className="sm:hidden">Register</span>
              </Button>
            )}
            {onRegister && variant === 'featured' && (
              <Button variant="default" size="sm" className="h-7 text-xs" onClick={() => onRegister(session)}>
                <span className="hidden sm:inline">Register Now</span>
                <span className="sm:hidden">Register</span>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
