
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, CreditCard, Clock, Calendar } from "lucide-react";
import { SessionItem } from "@/types/sessions";

interface MobileSessionCardProps {
  session: SessionItem;
  onViewDetails?: (session: SessionItem) => void;
  onRegister?: (session: SessionItem) => void;
  onAddToCalendar?: (session: SessionItem) => void;
  onCancel?: (session: SessionItem) => void;
  featured?: boolean;
  isPast?: boolean;
}

export function MobileSessionCard({
  session,
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel,
  featured = false,
  isPast = false
}: MobileSessionCardProps) {
  const getBgColor = () => {
    if (featured) return 'bg-blue-50 border-blue-100';
    if (isPast) return 'bg-gray-50 border-gray-200';
    if (session.status === 'registered' || session.status === 'confirmed') return 'bg-accent/40 border-accent/30';
    return 'bg-gray-50 border-gray-100';
  };
  
  // Format date if it's a Date object
  const formattedDate = session.date instanceof Date 
    ? session.date.toLocaleDateString() 
    : session.date;
  
  return (
    <div className={`rounded-lg border p-3 ${getBgColor()}`}>
      {/* Session header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-base">{session.name}</h3>
        {session.price && (
          <div className="text-sm font-medium">
            €{session.price}
          </div>
        )}
      </div>
      
      {/* Session details */}
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
      </div>
      
      {/* Session actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-100">
        {/* Status badges */}
        <div className="flex flex-wrap gap-2">
          {session.status === 'registered' || session.status === 'confirmed' ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Registered
            </Badge>
          ) : isPast ? (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              Completed
            </Badge>
          ) : featured ? (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Premium
            </Badge>
          ) : null}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          {session.status === 'registered' || session.status === 'confirmed' ? (
            <>
              {onAddToCalendar && (
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
            </>
          ) : isPast ? (
            <Button variant="outline" size="sm" className="h-8">
              Rate
            </Button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
