import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { SessionWithSchedules } from "@/hooks/gym/useGymGroupSessions";

interface SessionCalendarProps {
  sessions: SessionWithSchedules[];
  onScheduleSession: (sessionId: string, startDateTime: string, endDateTime: string, trainerId?: string) => void;
}

export function SessionCalendar({ sessions, onScheduleSession }: SessionCalendarProps) {
  // Get next 7 days
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const allSchedules = sessions.flatMap(session => 
      session.schedules.map(schedule => ({
        ...schedule,
        session
      }))
    );
    
    return allSchedules.filter(schedule => 
      schedule.start_datetime.startsWith(dateStr)
    );
  };

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const days = getNext7Days();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weekly Session Calendar</h3>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule New Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
        {days.map((day) => {
          const sessionsForDay = getSessionsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <Card key={day.toISOString()} className={`min-h-[200px] ${isToday ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {formatDate(day)}
                  {isToday && <Badge variant="secondary" className="ml-2 text-xs">Today</Badge>}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-2">
                {sessionsForDay.length === 0 ? (
                  <div className="text-center py-4 text-xs text-muted-foreground">
                    No sessions scheduled
                  </div>
                ) : (
                  sessionsForDay.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="p-2 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-medium truncate">
                            {schedule.session.title}
                          </h4>
                          <Badge className={`text-xs ${getStatusColor(schedule.status)}`}>
                            {schedule.status}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(schedule.start_datetime)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{schedule.actual_participants}/{schedule.session.max_participants}</span>
                          </div>
                          
                          {schedule.session.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{schedule.session.location}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-xs">
                          <Badge variant="outline" className="text-xs">
                            ${schedule.session.price_per_participant}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Session Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Session Status Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
            <Badge className="bg-green-100 text-green-800">Ongoing</Badge>
            <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
            <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}