
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
  
  // Parse any session date to a Date object
  const parseDate = (dateInput: string | Date): Date | null => {
    try {
      // Handle Date objects
      if (dateInput instanceof Date) {
        return dateInput;
      }
      
      // Handle MM/DD/YYYY format
      if (typeof dateInput === 'string' && dateInput.includes('/')) {
        const [month, day, year] = dateInput.split('/').map(Number);
        return new Date(year, month - 1, day);
      }
      
      // Try standard date parsing
      const date = new Date(dateInput);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.error("Error parsing date:", dateInput, error);
      return null;
    }
  };

  // Get all session dates for highlighting in the calendar
  const sessionDates = sessions
    .map(session => parseDate(session.date))
    .filter((date): date is Date => date !== null);

  // Get sessions for the selected date
  const sessionsOnSelectedDate = selectedDate 
    ? sessions.filter(session => {
        const sessionDate = parseDate(session.date);
        if (!sessionDate) return false;
        
        return format(sessionDate, "MM/dd/yyyy") === format(selectedDate, "MM/dd/yyyy");
      })
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div className="md:col-span-3">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-md p-3"
          modifiers={{
            highlighted: sessionDates
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
                          <div className="flex flex-wrap items-center mt-2 text-sm">
                            <span className="font-medium mr-2">{session.participants}/{session.maxParticipants}</span>
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
