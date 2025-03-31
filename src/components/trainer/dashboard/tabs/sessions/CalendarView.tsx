
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { TrainerSessionItem } from "@/types/sessions";

interface CalendarViewProps {
  sessions: TrainerSessionItem[];
}

export function CalendarView({ sessions }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Function to convert any date format to a Date object
  const parseSessionDate = (dateString: string | Date): Date | null => {
    // If it's already a Date object
    if (dateString instanceof Date) {
      return dateString;
    }
    
    // Handle MM/DD/YYYY format (which our mock data uses)
    if (typeof dateString === 'string' && dateString.includes('/')) {
      const [month, day, year] = dateString.split('/').map(Number);
      if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
        return new Date(year, month - 1, day);
      }
    }
    
    // Try direct Date parsing as a fallback
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
    
    console.warn(`Could not parse date: ${dateString}`);
    return null;
  };

  // Get all session dates for highlighting in the calendar
  const getSessionDates = (): Date[] => {
    const dates: Date[] = [];
    
    sessions.forEach(session => {
      const sessionDate = parseSessionDate(session.date);
      if (sessionDate) {
        dates.push(sessionDate);
      }
    });
    
    return dates;
  };

  // Get sessions for the selected date
  const getSessionsForSelectedDate = (): TrainerSessionItem[] => {
    if (!selectedDate) return [];
    
    const selectedDateStr = format(selectedDate, "MM/dd/yyyy");
    
    return sessions.filter(session => {
      const sessionDate = parseSessionDate(session.date);
      if (!sessionDate) return false;
      
      const sessionDateStr = format(sessionDate, "MM/dd/yyyy");
      return sessionDateStr === selectedDateStr;
    });
  };

  const sessionsOnSelectedDate = getSessionsForSelectedDate();
  const highlightedDates = getSessionDates();

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div className="md:col-span-3">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-md p-3"
          modifiers={{
            highlighted: highlightedDates
          }}
          modifiersStyles={{
            highlighted: {
              fontWeight: 'bold',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6'
            }
          }}
        />
      </div>
      <div className="md:col-span-4">
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-medium text-lg">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {sessionsOnSelectedDate.length} sessions scheduled
              </p>
            </div>
            <ScrollArea className="h-[400px] p-4">
              {sessionsOnSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {sessionsOnSelectedDate.map((session) => (
                    <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{session.name}</h4>
                          <p className="text-sm text-muted-foreground">{session.time}</p>
                          <div className="flex items-center mt-2 text-sm">
                            <span className="font-medium">{session.participants}/{session.maxParticipants}</span>
                            <span className="mx-2">•</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {session.paymentStatus?.paid || 0} paid
                            </Badge>
                            {(session.paymentStatus?.pending || 0) > 0 && (
                              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                                {session.paymentStatus?.pending || 0} pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No sessions scheduled for this date
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
