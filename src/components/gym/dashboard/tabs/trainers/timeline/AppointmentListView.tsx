import { format, startOfWeek, addDays, isSameDay, isToday, isTomorrow, isYesterday } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin, User, Calendar as CalendarIcon, AlertCircle, CheckCircle, Phone } from "lucide-react";
import { useCalendarEvents, CalendarEvent } from "@/hooks/useCalendarEvents";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";

interface AppointmentListViewProps {
  selectedTrainers: string[];
  currentWeek: Date;
}

export function AppointmentListView({ selectedTrainers, currentWeek }: AppointmentListViewProps) {
  const { trainers } = useGymTrainersData();
  
  // Get events for selected trainers
  const trainerEvents = selectedTrainers.map(trainerId => {
    const { events, loading } = useCalendarEvents(trainerId);
    return { trainerId, events, loading };
  });

  // Calculate week range
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Filter and group events by day
  const eventsByDay = weekDays.map(day => {
    const dayEvents: Array<CalendarEvent & { trainerName: string }> = [];
    
    trainerEvents.forEach(({ trainerId, events }) => {
      const trainer = trainers.find(t => t.id === trainerId);
      if (!trainer) return;

      events.forEach(event => {
        if (isSameDay(event.start, day)) {
          dayEvents.push({
            ...event,
            trainerName: trainer.name
          });
        }
      });
    });

    // Sort events by start time
    dayEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

    return {
      date: day,
      events: dayEvents
    };
  });

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'session':
        return <User className="h-4 w-4" />;
      case 'sales_activity':
        return <Phone className="h-4 w-4" />;
      case 'deadline':
        return <AlertCircle className="h-4 w-4" />;
      case 'availability':
        return <CheckCircle className="h-4 w-4" />;
      case 'program_milestone':
        return <CalendarIcon className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'session':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sales_activity':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'availability':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'program_milestone':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDayLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isYesterday(date)) return "Yesterday";
    return format(date, 'EEEE', { locale: enUS });
  };

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', { locale: enUS });
  };

  const totalEvents = eventsByDay.reduce((sum, day) => sum + day.events.length, 0);
  const availableSlots = eventsByDay.reduce((sum, day) => 
    sum + day.events.filter(event => event.type === 'availability').length, 0
  );
  const sessions = eventsByDay.reduce((sum, day) => 
    sum + day.events.filter(event => event.type === 'session').length, 0
  );

  return (
    <div className="space-y-6">
      {/* Week Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Appointments</p>
              <p className="text-2xl font-bold">{totalEvents}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Training Sessions</p>
              <p className="text-2xl font-bold">{sessions}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-muted-foreground">Available Slots</p>
              <p className="text-2xl font-bold">{availableSlots}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Week Range Header */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center justify-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <h3 className="text-lg font-semibold">
            {format(weekStart, 'd MMM', { locale: enUS })} - {format(addDays(weekStart, 6), 'd MMM yyyy', { locale: enUS })}
          </h3>
        </div>
      </Card>

      {/* Daily Schedule */}
      <div className="space-y-6">
        {eventsByDay.map(({ date, events }) => (
          <div key={date.getTime()} className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b">
              <h4 className="text-lg font-semibold">
                {formatDayLabel(date)}
              </h4>
              <span className="text-sm text-muted-foreground">
                {format(date, 'd MMMM yyyy', { locale: enUS })}
              </span>
              <Badge variant="outline" className="ml-auto">
                {events.length} {events.length === 1 ? 'appointment' : 'appointments'}
              </Badge>
            </div>

            {events.length === 0 ? (
              <Card className="p-6 text-center bg-muted/20">
                <p className="text-muted-foreground">No appointments scheduled for this day</p>
                <p className="text-sm text-muted-foreground mt-1">Perfect opportunity for new bookings!</p>
              </Card>
            ) : (
              <div className="grid gap-3">
                {events.map(event => (
                  <Card key={event.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="text-sm">
                            {event.trainerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getEventTypeColor(event.type)}>
                                {getEventTypeIcon(event.type)}
                                <span className="ml-1 capitalize">{event.type.replace('_', ' ')}</span>
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                with {event.trainerName}
                              </span>
                            </div>
                            
                            <h5 className="font-medium text-base mb-2 line-clamp-1">
                              {event.title}
                            </h5>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {formatTime(event.start)} - {formatTime(event.end)}
                                </span>
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}

                              {event.client && (
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{event.client}</span>
                                </div>
                              )}
                            </div>

                            {event.description && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {event.description}
                              </p>
                            )}
                          </div>

                          <div className="flex-shrink-0">
                            <Badge 
                              variant="outline" 
                              className={
                                event.type === 'availability' 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                  : event.type === 'deadline'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                              }
                            >
                              {event.type === 'availability' ? 'Available for Booking' : 
                               event.type === 'deadline' ? 'Deadline' : 'Scheduled'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats Footer */}
      <Card className="p-4 bg-muted/20">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            This week: <strong>{sessions} training sessions</strong>, <strong>{availableSlots} available slots</strong>
            {availableSlots > 0 && (
              <span className="text-emerald-600 ml-2">
                • Great opportunities for new bookings!
              </span>
            )}
          </p>
        </div>
      </Card>
    </div>
  );
}