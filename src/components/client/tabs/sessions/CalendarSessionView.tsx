
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { SessionItem } from "@/types/sessions";
import { Badge } from "@/components/ui/badge";

interface CalendarSessionViewProps {
  sessions: SessionItem[];
  onViewDetails?: (session: SessionItem) => void;
  onRegister?: (session: SessionItem) => void;
}

export function CalendarSessionView({ sessions, onViewDetails, onRegister }: CalendarSessionViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Create a map of dates to session counts for highlighting dates with sessions
  const sessionDates = sessions.reduce((acc, session) => {
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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
      <Card className="md:col-span-5 lg:col-span-5">
        <CardContent className="p-2 sm:p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full mx-auto"
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
      
      <Card className="md:col-span-7 lg:col-span-7">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
            </h3>
          </div>
          
          <div className="h-[calc(100vh-24rem)] min-h-[280px]">
            {selectedDateSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No sessions scheduled for this date
              </div>
            ) : (
              <div className="space-y-3 max-h-full overflow-y-auto pr-1">
                {selectedDateSessions.map((session) => (
                  <div key={session.id} className="flex flex-col p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                      <div>
                        <h3 className="font-medium">{session.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {session.trainer} • {session.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.status === "available" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800 cursor-pointer"
                            onClick={() => onRegister && onRegister(session)}>
                            Register
                          </Badge>
                        )}
                        {session.status === "confirmed" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800">
                            Confirmed
                          </Badge>
                        )}
                        {session.status === "pending" && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800">
                            Pending
                          </Badge>
                        )}
                        <Badge 
                          variant="outline" 
                          className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 cursor-pointer"
                          onClick={() => onViewDetails && onViewDetails(session)}
                        >
                          Details
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
