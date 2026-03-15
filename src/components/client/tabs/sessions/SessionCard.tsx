
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, CreditCard, Video, MapPin } from "lucide-react";
import { SessionItem, SessionStatus } from "@/types/sessions";
import { useState, useEffect } from "react";

interface SessionCardProps {
  session: SessionItem;
  onViewDetails?: (session: SessionItem) => void;
  onRegister?: (session: SessionItem) => void;
  onAddToCalendar?: (session: SessionItem) => void;
  onCancel?: (session: SessionItem) => void;
  onJoinSession?: (session: SessionItem) => void;
  variant?: 'default' | 'featured';
}

export function SessionCard({
  session,
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel,
  onJoinSession,
  variant = 'default'
}: SessionCardProps) {
  const bgColor = variant === 'featured' ? 'bg-gray-50 border border-gray-100' : 'bg-gray-50';
  const [isLive, setIsLive] = useState(false);
  
  // Format date if it's a Date object
  const formattedDate = session.date instanceof Date 
    ? session.date.toLocaleDateString() 
    : session.date;
  
  // Check if this is a video session
  const isVideoSession = session.mode === 'video' || 
    (session.name && session.name.toLowerCase().includes('hiit'));
  
  // For debugging
  useEffect(() => {
    if (isVideoSession) {
      console.log(`Video session found: ${session.name}, Status: ${session.status}, Date: ${formattedDate}`);
    }
  }, [session, isVideoSession, formattedDate]);
  
  // Check if this session is currently live
  useEffect(() => {
    const checkIfLive = () => {
      // For demo purposes, set sessions for "Today" to be live
      const isToday = formattedDate === 'Today' || 
                     (new Date()).toLocaleDateString() === formattedDate;
      
      // For demo, always consider the session live if it's today
      // In a real app, we would check the actual time
      if (isToday && isVideoSession) {
        console.log(`Setting session ${session.name} as LIVE`);
        setIsLive(true);
        return;
      }
      
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
  }, [session, formattedDate, isVideoSession]);
  
  // For debugging
  useEffect(() => {
    if (isLive && isVideoSession) {
      console.log(`LIVE session: ${session.name}, Join handler present: ${!!onJoinSession}`);
    }
  }, [isLive, isVideoSession, session, onJoinSession]);
  
  return (
    <div className={`flex items-center justify-between p-4 ${bgColor} rounded-lg`}>
      <div>
        <h3 className="font-medium">
          {session.name}
          {isVideoSession && (
            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-200">
              <Video className="h-3 w-3 mr-1" /> Video
            </Badge>
          )}
          {session.mode === 'in-person' && (
            <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 border-green-200">
              <MapPin className="h-3 w-3 mr-1" /> In-Person
            </Badge>
          )}
          {isLive && isVideoSession && (
            <Badge className="ml-2 bg-red-100 text-red-700 border-red-200 animate-pulse">
              LIVE NOW
            </Badge>
          )}
        </h3>
        <div className="text-sm text-muted-foreground">
          With {session.trainer} • {formattedDate} • {session.time}
        </div>
        {/* Show location for in-person sessions */}
        {session.mode === 'in-person' && session.address && (
          <div className="text-sm text-muted-foreground flex items-center mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="truncate max-w-xs">{session.address}</span>
          </div>
        )}
        {session.price && (
          <div className="text-sm font-medium mt-1">
            €{session.price}
          </div>
        )}
        {session.attendees !== undefined && session.maxAttendees && (
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span className={isFull ? "text-orange-600 font-medium" : ""}>
              {session.attendees}/{session.maxAttendees} attending
              {isFull && " · Full"}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {session.status === 'registered' || session.status === 'confirmed' ? (
          <>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Registered
            </Badge>
            {isVideoSession && isLive && onJoinSession && (
              <Button variant="default" size="sm" className="flex items-center bg-red-600 hover:bg-red-700" 
                onClick={() => onJoinSession(session)}>
                <Video className="h-3.5 w-3.5 mr-1" />
                Join Live
              </Button>
            )}
            {onAddToCalendar && !isLive && (
              <Button variant="outline" size="sm" className="flex items-center" onClick={() => onAddToCalendar(session)}>
                <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                Add to Calendar
              </Button>
            )}
            {onCancel && (
              <Button variant="ghost" size="sm" onClick={() => onCancel(session)}>
                Cancel
              </Button>
            )}
          </>
        ) : (
          <>
            {onViewDetails && (
              <Button variant="outline" size="sm" onClick={() => onViewDetails(session)}>
                Register to this session
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
