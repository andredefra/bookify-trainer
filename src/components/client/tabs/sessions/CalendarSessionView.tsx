
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
        <CardContent className="py-3 px-2 sm:py-4 sm:px-3">
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
                backgroundColor: "hsl(var(--muted))",
                fontWeight: "600",
                position: "relative",
                color: "hsl(var(--foreground))"
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
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-7 lg:col-span-7">
        <CardContent className="py-3 px-2 sm:py-4 sm:px-3">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
            </h3>
          </div>
          
          <div className="h-[calc(100vh-26rem)] min-h-[280px] max-h-[400px]">
            {selectedDateSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No sessions scheduled for this date
              </div>
            ) : (
              <div className="space-y-3 max-h-full overflow-y-auto pr-1">
                {selectedDateSessions.map((session) => (
                  <div key={session.id} className="flex flex-col p-3 bg-muted/50 rounded-lg border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{session.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {session.trainer} • {session.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {session.status === "available" && (
                          <Badge 
                            variant="outline" 
                            className="bg-background hover:bg-muted cursor-pointer border-border"
                            onClick={() => onRegister && onRegister(session)}
                          >
                            Register
                          </Badge>
                        )}
                        {session.status === "confirmed" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                            Confirmed
                          </Badge>
                        )}
                        {session.status === "pending" && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                            Pending
                          </Badge>
                        )}
                        <Badge 
                          variant="outline" 
                          className="bg-background hover:bg-muted cursor-pointer border-border"
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
