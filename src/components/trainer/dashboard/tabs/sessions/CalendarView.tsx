
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, parse, isValid } from "date-fns";
import { TrainerSessionItem } from "@/types/sessions";

interface CalendarViewProps {
  sessions: TrainerSessionItem[];
}

export function CalendarView({ sessions }: CalendarViewProps) {
  console.log("Calendar View received sessions:", sessions);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Helper function to parse date string to Date object
  const parseDate = (dateStr: string | Date): Date | null => {
    // If it's already a Date object
    if (dateStr instanceof Date) {
      return dateStr;
    }
    
    // If it's a string
    if (typeof dateStr === 'string') {
      // Try specifically MM/DD/YYYY format (which our mock data uses)
      if (dateStr.includes('/')) {
        const [month, day, year] = dateStr.split('/').map(Number);
        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          // Ensure we're using correct year for 2-digit years
          const fullYear = year < 100 ? 2000 + year : year;
          const parsedDate = new Date(fullYear, month - 1, day);
          if (isValid(parsedDate)) {
            return parsedDate;
          }
        }
      }
      
      // Try other date formats as fallback
      const formats = ["yyyy-MM-dd", "MMMM d, yyyy"];
      for (const formatStr of formats) {
        try {
          const parsedDate = parse(dateStr, formatStr, new Date());
          if (isValid(parsedDate)) {
            return parsedDate;
          }
        } catch (error) {
          continue;
        }
      }
      
      // If none of the formats work, try direct Date parsing as a fallback
      const directParsed = new Date(dateStr);
      if (isValid(directParsed)) {
        return directParsed;
      }
    }
    
    console.warn(`Could not parse date: ${dateStr}`);
    return null;
  };

  // Function to get sessions for the selected date
  const getSessionsForDate = (date: Date | undefined): TrainerSessionItem[] => {
    if (!date || !sessions || sessions.length === 0) return [];
    
    const formattedSelectedDate = format(date, "MM/dd/yyyy");
    console.log("Looking for sessions on date:", formattedSelectedDate);
    
    const sessionsOnDate = sessions.filter(session => {
      // Parse the session date
      const sessionDate = parseDate(session.date);
      
      if (!sessionDate) return false;
      
      const formattedSessionDate = format(sessionDate, "MM/dd/yyyy");
      const match = formattedSessionDate === formattedSelectedDate;
      if (match) {
        console.log("Found matching session:", session.name, "on date", formattedSessionDate);
      }
      return match;
    });
    
    console.log("Selected date sessions:", sessionsOnDate);
    return sessionsOnDate;
  };

  // Get sessions for the currently selected date
  const sessionsOnSelectedDate = selectedDate ? getSessionsForDate(selectedDate) : [];

  // Function to highlight dates with sessions
  const highlightedDates = () => {
    if (!sessions || sessions.length === 0) return [];
    
    const dates = sessions.reduce((dates: Date[], session) => {
      const sessionDate = parseDate(session.date);
      
      if (sessionDate) {
        console.log(`Adding highlight for ${session.name} on ${format(sessionDate, "MM/dd/yyyy")}`);
        dates.push(sessionDate);
      }
      return dates;
    }, []);
    
    console.log("Highlighted dates:", dates);
    return dates;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div className="md:col-span-3">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-md p-3"
          modifiers={{
            highlighted: highlightedDates()
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
