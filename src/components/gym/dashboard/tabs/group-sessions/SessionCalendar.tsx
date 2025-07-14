import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users } from "lucide-react";
import { SessionWithSchedules } from "@/hooks/gym/useGymGroupSessions";

interface SessionCalendarProps {
  sessions: SessionWithSchedules[];
  onScheduleSession: (sessionId: string, startDateTime: string, endDateTime: string, trainerId?: string) => void;
}

export function SessionCalendar({ sessions, onScheduleSession }: SessionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
  const calendarDays = [];
  const currentDay = new Date(startDate);
  
  while (currentDay <= endDate) {
    calendarDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getDayEvents = (day: Date) => {
    // Mock events for demo - in real app, filter actual scheduled sessions
    const events = [];
    const dayOfWeek = day.getDay();
    
    // Add some mock scheduled sessions
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) { // Mon, Wed, Fri
      events.push({
        id: `event-${day.getTime()}-1`,
        title: "Morning HIIT",
        time: "07:00",
        participants: 12,
        maxParticipants: 20,
        status: "confirmed"
      });
    }
    
    if (dayOfWeek === 2 || dayOfWeek === 4) { // Tue, Thu
      events.push({
        id: `event-${day.getTime()}-2`,
        title: "Evening Yoga",
        time: "19:00",
        participants: 8,
        maxParticipants: 15,
        status: "confirmed"
      });
    }
    
    if (dayOfWeek === 6) { // Saturday
      events.push({
        id: `event-${day.getTime()}-3`,
        title: "Weekend Bootcamp",
        time: "10:00",
        participants: 18,
        maxParticipants: 25,
        status: "confirmed"
      });
    }
    
    return events;
  };

  const isToday = (day: Date) => {
    return day.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Session Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold min-w-[140px] text-center">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const dayEvents = getDayEvents(day);
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-lg ${
                    isCurrentMonth(day) ? 'bg-background' : 'bg-muted/30'
                  } ${isToday(day) ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isToday(day) ? 'text-primary' : isCurrentMonth(day) ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1 bg-primary/10 text-primary rounded cursor-pointer hover:bg-primary/20 transition-colors"
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-2 w-2" />
                          {event.time}
                          <Users className="h-2 w-2 ml-1" />
                          {event.participants}/{event.maxParticipants}
                        </div>
                      </div>
                    ))}
                    
                    {isCurrentMonth(day) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-6 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          // In real app, open schedule dialog for this day
                          console.log('Schedule session for', day.toDateString());
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => {
              const futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + i + 1);
              
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      {i % 2 === 0 ? "Morning HIIT Blast" : "Evening Yoga Flow"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {futureDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} 
                      at {i % 2 === 0 ? "07:00 AM" : "07:00 PM"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {12 + i * 2}/20 booked
                    </Badge>
                    <Badge variant={i % 3 === 0 ? "default" : "secondary"}>
                      {i % 3 === 0 ? "Confirmed" : "Pending"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}