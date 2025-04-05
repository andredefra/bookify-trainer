
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, CreditCard, Clock, Calendar, Video } from "lucide-react";
import { SessionItem } from "@/types/sessions";
import { useState, useEffect } from "react";

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
  const [isLive, setIsLive] = useState(false);

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
    
  // Check if this is a video session
  const isVideoSession = session.mode === 'video' || 
    (session.name && session.name.toLowerCase().includes('hiit'));
  
  // Check if this session is currently live
  useEffect(() => {
    const checkIfLive = () => {
      // For demo purposes, we'll just check if it's today
      const isToday = formattedDate === 'Today' || 
                     (new Date()).toLocaleDateString() === formattedDate;
      
      // Parse the time (simple implementation for demo)
      const timeStart = session.time.split(' - ')[0];
      const [hours, minutes] = timeStart.split(':').map(Number);
      
      // Get current time
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Session is live if it's today and current time is within 30 min of session start
      const isTimeMatch = (currentHour === hours && currentMinute >= minutes) || 
                          (currentHour === hours + 1 && currentMinute < 30);
      
      setIsLive(isToday && isTimeMatch);
    };
    
    checkIfLive();
    // Check every minute
    const interval = setInterval(checkIfLive, 60000);
    return () => clearInterval(interval);
  }, [session, formattedDate]);
  
  return (
    <div className={`rounded-lg border p-3 ${getBgColor()}`}>
      {/* Session header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-base">{session.name}</h3>
          {isVideoSession && (
            <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-700 border-blue-200">
              <Video className="h-3 w-3 mr-1" /> Video
            </Badge>
          )}
          {isLive && isVideoSession && (
            <Badge className="mt-1 ml-1 bg-red-100 text-red-700 border-red-200 animate-pulse">
              LIVE NOW
            </Badge>
          )}
        </div>
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
