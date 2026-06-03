import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, ChevronLeft, ChevronRight, Plus, Users, Clock, MapPin, Settings, Eye, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarEvents, CalendarEvent } from "@/hooks/useCalendarEvents";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";
import { CreateEventDialog } from "../dialogs/CreateEventDialog";
import { PostponeSessionDialog } from "../dialogs/PostponeSessionDialog";

export function CalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
  const [showDayEventsDialog, setShowDayEventsDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDetailsDialog, setShowEventDetailsDialog] = useState(false);
  const [showPostponeDialog, setShowPostponeDialog] = useState(false);
  
  // Use dynamic trainer ID instead of hardcoded one
  const trainerId = getCurrentDemoUserId();
  const { events, loading, error, createEvent } = useCalendarEvents(trainerId);

  console.log('CalendarTab - Using trainer ID:', trainerId);

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'session': return 'Session';
      case 'sales_activity': return 'Sales';
      case 'program_milestone': return 'Program';
      case 'deadline': return 'Deadline';
      case 'personal_task': return 'Task';
      case 'availability': return 'Available';
      default: return 'Event';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const getNavigationFunction = () => {
    switch (view) {
      case 'week': return navigateWeek;
      case 'day': return navigateDay;
      default: return navigateMonth;
    }
  };

  const getHeaderTitle = () => {
    switch (view) {
      case 'week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'day':
        return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      default:
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const getWeekDays = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const showDayEvents = (dayEvents: CalendarEvent[], day: number | Date) => {
    setSelectedDayEvents(dayEvents);
    setShowDayEventsDialog(true);
  };

  // Mock participants data for sessions
  const getMockParticipants = (event: CalendarEvent) => {
    if (event.type !== 'session') return [];
    
    return [
      { 
        id: '1', 
        email: 'sarah@example.com', 
        name: 'Sarah Johnson', 
        paid_amount: event.client ? 50 : undefined 
      },
      { 
        id: '2', 
        email: 'mike@example.com', 
        name: 'Mike Peterson', 
        paid_amount: event.client ? 50 : undefined 
      }
    ];
  };

  const showEventDetails = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventDetailsDialog(true);
  };

  const handlePostponeSession = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowPostponeDialog(true);
    setShowEventDetailsDialog(false);
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const todayEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate.toDateString() === today.toDateString();
  });

  const upcomingEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate > today;
  }).slice(0, 5);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading calendar events...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">Error loading events: {error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Manage your schedule, sessions, and activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setView('month')} 
                    className={cn(view === 'month' && 'bg-primary text-primary-foreground')}>
              Month
            </Button>
            <Button variant="outline" size="sm" onClick={() => setView('week')}
                    className={cn(view === 'week' && 'bg-primary text-primary-foreground')}>
              Week
            </Button>
            <Button variant="outline" size="sm" onClick={() => setView('day')}
                    className={cn(view === 'day' && 'bg-primary text-primary-foreground')}>
              Day
            </Button>
            <Button size="sm" onClick={() => setShowCreateEventDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">
                {getHeaderTitle()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => getNavigationFunction()('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => getNavigationFunction()('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Month View */}
              {view === 'month' && (
                <div className="space-y-4">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth().map((day, index) => {
                      const dayEvents = day ? getEventsForDay(day) : [];
                      return (
                        <div
                          key={index}
                          className={cn(
                            "min-h-[80px] p-1 border rounded-md",
                            day ? "bg-white hover:bg-gray-50" : "bg-gray-50",
                            day === new Date().getDate() && 
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() === new Date().getFullYear() &&
                            "bg-blue-50 border-blue-200"
                          )}
                        >
                          {day && (
                            <>
                              <div className="text-sm font-medium mb-1">{day}</div>
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map((event) => (
                                  <div
                                    key={event.id}
                                    className={cn(
                                      "text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80",
                                      event.color
                                    )}
                                    title={event.title}
                                    onClick={() => showEventDetails(event)}
                                  >
                                    {event.title}
                                  </div>
                                ))}
                                {dayEvents.length > 2 && (
                                  <button
                                    className="text-xs text-muted-foreground hover:text-primary cursor-pointer underline"
                                    onClick={() => showDayEvents(dayEvents, day)}
                                  >
                                    +{dayEvents.length - 2} more
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Week View */}
              {view === 'week' && (
                <div className="space-y-4">
                  {/* Day headers */}
                  <div className="grid grid-cols-8 gap-1 text-center text-sm font-medium text-muted-foreground">
                    <div></div>
                    {getWeekDays().map((day, index) => (
                      <div key={index} className={cn(
                        "p-2",
                        day.toDateString() === new Date().toDateString() && "text-primary font-bold"
                      )}>
                        <div>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-lg">{day.getDate()}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Time slots */}
                  <div className="grid grid-cols-8 gap-1 max-h-96 overflow-y-auto">
                    {getTimeSlots().map((time) => (
                      <div key={time} className="contents">
                        <div className="text-xs text-muted-foreground p-2 border-r">{time}</div>
                        {getWeekDays().map((day, dayIndex) => {
                          const dayEvents = getEventsForDate(day);
                          const timeHour = parseInt(time.split(':')[0]);
                          const eventsAtTime = dayEvents.filter(event => {
                            const eventHour = new Date(event.start).getHours();
                            return eventHour === timeHour;
                          });
                          
                          return (
                            <div key={dayIndex} className="min-h-[60px] p-1 border border-gray-100">
                              {eventsAtTime.map((event) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    "text-xs p-1 rounded text-white mb-1 cursor-pointer hover:opacity-80",
                                    event.color
                                  )}
                                  onClick={() => showEventDetails(event)}
                                >
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Day View */}
              {view === 'day' && (
                <div className="space-y-4">
                  <div className="text-center text-lg font-medium">
                    {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {getTimeSlots().map((time) => {
                      const timeHour = parseInt(time.split(':')[0]);
                      const dayEvents = getEventsForDate(currentDate);
                      const eventsAtTime = dayEvents.filter(event => {
                        const eventHour = new Date(event.start).getHours();
                        return eventHour === timeHour;
                      });
                      
                      return (
                        <div key={time} className="flex gap-4 min-h-[60px] border-b border-gray-100">
                          <div className="w-16 text-sm text-muted-foreground p-2">{time}</div>
                          <div className="flex-1 p-2">
                            {eventsAtTime.map((event) => (
                              <div
                                key={event.id}
                                className={cn(
                                  "p-3 rounded-lg text-white mb-2 cursor-pointer hover:opacity-80",
                                  event.color
                                )}
                                onClick={() => showEventDetails(event)}
                              >
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm opacity-90">
                                  {formatTime(event.start)} - {formatTime(event.end)}
                                </div>
                                {event.client && (
                                  <div className="text-sm opacity-90">
                                    Client: {event.client}
                                  </div>
                                )}
                                {event.location && (
                                  <div className="text-sm opacity-90">
                                    Location: {event.location}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events today</p>
              ) : (
                todayEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={cn("w-3 h-3 rounded-full mt-1", event.color)} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.title}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(event.start)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.client && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Users className="h-3 w-3" />
                          <span>{event.client}</span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs mt-1">
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming events</p>
              ) : (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={cn("w-3 h-3 rounded-full mt-1", event.color)} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(event.start)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(event.start)}</span>
                      </div>
                      {event.client && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Users className="h-3 w-3" />
                          <span>{event.client}</span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs mt-1">
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Event Dialog */}
      <CreateEventDialog
        open={showCreateEventDialog}
        onOpenChange={setShowCreateEventDialog}
        onSubmit={async (eventData) => {
          const result = await createEvent(eventData);
          if (result.success) {
            setShowCreateEventDialog(false);
          }
        }}
      />

      {/* Day Events Dialog */}
      <Dialog open={showDayEventsDialog} onOpenChange={setShowDayEventsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Events for this day</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedDayEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50" onClick={() => showEventDetails(event)}>
                <div className={cn("w-3 h-3 rounded-full mt-1", event.color)} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{event.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.client && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Users className="h-3 w-3" />
                      <span>{event.client}</span>
                    </div>
                  )}
                  <Badge variant="outline" className="text-xs mt-1">
                    {getEventTypeLabel(event.type)}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={showEventDetailsDialog} onOpenChange={setShowEventDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className={cn("p-4 rounded-lg text-white", selectedEvent.color)}>
                <h3 className="font-medium text-lg">{selectedEvent.title}</h3>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {getEventTypeLabel(selectedEvent.type)}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatTime(selectedEvent.start)} - {formatTime(selectedEvent.end)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(selectedEvent.start)}</span>
                </div>
                
                {selectedEvent.client && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.client}</span>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                
                 {selectedEvent.description && (
                   <div className="pt-2 border-t">
                     <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                   </div>
                 )}
               </div>
               
               {/* Action buttons for sessions */}
               {selectedEvent.type === 'session' && (
                 <div className="flex gap-2 pt-4 border-t">
                   <Button 
                     variant="outline" 
                     size="sm"
                     onClick={() => handlePostponeSession(selectedEvent)}
                     className="flex items-center gap-2"
                   >
                     <AlertCircle className="h-4 w-4" />
                     Postpone Session
                   </Button>
                 </div>
               )}
             </div>
           )}
         </DialogContent>
       </Dialog>

       {/* Postpone Session Dialog */}
       <PostponeSessionDialog
         open={showPostponeDialog}
         onOpenChange={setShowPostponeDialog}
         event={selectedEvent}
         participants={selectedEvent ? getMockParticipants(selectedEvent) : []}
       />
     </div>
   );
 }
