
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { TrainerSessionItem } from "@/types/sessions";
import { Badge } from "@/components/ui/badge";

interface CalendarViewProps {
  sessions: TrainerSessionItem[];
}

export function CalendarView({ sessions }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Create a map of dates to session counts for highlighting dates with sessions
  const sessionDates = sessions.reduce((acc, session) => {
    const date = new Date(session.date);
    // Handle 'Today' and 'Tomorrow' strings
    const sessionDate = session.date === 'Today' 
      ? new Date() 
      : session.date === 'Tomorrow'
      ? new Date(new Date().setDate(new Date().getDate() + 1))
      : new Date(session.date);
    
    const dateString = sessionDate.toDateString();
    acc[dateString] = (acc[dateString] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get sessions for the selected date
  const getSessionsForDate = (date: Date | undefined) => {
    if (!date) return [];
    const dateString = date.toDateString();
    
    return sessions.filter(session => {
      if (session.date === 'Today') {
        return new Date().toDateString() === dateString;
      } else if (session.date === 'Tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toDateString() === dateString;
      } else {
        const sessionDate = new Date(session.date);
        return sessionDate.toDateString() === dateString;
      }
    });
  };
  
  const selectedDateSessions = getSessionsForDate(selectedDate);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-3 md:pt-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="p-0 pointer-events-auto"
            modifiers={{
              booked: (date) => {
                const dateString = date.toDateString();
                return Boolean(sessionDates[dateString]);
              }
            }}
            modifiersStyles={{
              booked: { 
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                fontWeight: "bold",
                position: "relative"
              }
            }}
            components={{
              DayContent: ({ date }) => {
                const dateString = date.toDateString();
                const hasSession = sessionDates[dateString];
                
                return (
                  <div className="relative">
                    <div>{date.getDate()}</div>
                    {hasSession && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardContent className="p-4 md:pt-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
            </h3>
          </div>
          
          {selectedDateSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sessions scheduled for this date
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateSessions.map((session) => (
                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{session.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {session.time}
                    </div>
                    <div className="flex mt-2 gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {session.paymentStatus?.paid || 0} paid
                      </Badge>
                      {(session.paymentStatus?.pending || 0) > 0 && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          {session.paymentStatus?.pending || 0} pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <div className="mr-4 text-sm">
                      <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                    </div>
                    <Badge variant="outline">
                      {session.time}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
