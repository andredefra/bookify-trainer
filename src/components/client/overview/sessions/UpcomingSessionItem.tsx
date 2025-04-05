
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, CreditCard, Video } from "lucide-react";
import { SessionItem } from "@/types/sessions";
import { useState, useEffect } from "react";

interface UpcomingSessionItemProps {
  session: SessionItem;
  onRegister: (session: SessionItem) => void;
  onJoinSession?: (session: SessionItem) => void;
  featured?: boolean;
}

export function UpcomingSessionItem({ 
  session, 
  onRegister, 
  onJoinSession,
  featured = false 
}: UpcomingSessionItemProps) {
  const [isLive, setIsLive] = useState(false);
  
  const bgClass = featured 
    ? "bg-blue-50 border border-blue-100" 
    : "bg-gray-50";
  
  const handleRegisterClick = () => {
    // Explicitly call onRegister with the session
    console.log("Register button clicked for session:", session.id);
    onRegister(session);
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
    <div className={`p-4 ${bgClass} rounded-lg`}>
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-medium">
            {session.name}
            {isVideoSession && (
              <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-200">
                <Video className="h-3 w-3 mr-1" /> Video
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
          {session.price && (
            <div className="text-sm font-medium">
              €{session.price}
            </div>
          )}
          {session.attendees !== undefined && session.maxAttendees && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{session.attendees}/{session.maxAttendees} attending</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {session.status === 'registered' ? (
            <>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Registered
              </Badge>
              {isVideoSession && isLive && onJoinSession && (
                <Button variant="default" size="sm" className="flex items-center bg-red-600 hover:bg-red-700" onClick={() => onJoinSession(session)}>
                  <Video className="h-3.5 w-3.5 mr-1" />
                  <span className="hidden sm:inline">Join Live</span>
                  <span className="sm:hidden">Join</span>
                </Button>
              )}
              {!isLive && (
                <Button variant="outline" size="sm" className="flex items-center">
                  <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                  <span className="hidden sm:inline">Add to Calendar</span>
                  <span className="sm:hidden">Calendar</span>
                </Button>
              )}
            </>
          ) : (
            <>
              {featured && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Premium
                </Badge>
              )}
              <Button 
                variant="secondary"
                size="sm" 
                className="flex items-center" 
                onClick={handleRegisterClick}
              >
                <CreditCard className="h-3.5 w-3.5 mr-1" />
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
