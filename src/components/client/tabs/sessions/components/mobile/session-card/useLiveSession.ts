
import { useState, useEffect } from "react";
import { SessionItem } from "@/types/sessions";

export function useLiveSession(session: SessionItem, formattedDate: string) {
  const [isLive, setIsLive] = useState(false);
  const isVideoSession = session.mode === 'video' || 
    (session.name && session.name.toLowerCase().includes('hiit'));
    
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
  
  return { isLive, isVideoSession };
}
