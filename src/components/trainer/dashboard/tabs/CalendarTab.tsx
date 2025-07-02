import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Plus, Users, Clock, MapPin, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";

export function CalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView<'month' | 'week' | 'day'>('month');
  
  // Use dynamic trainer ID instead of hardcoded one
  const trainerId = getCurrentDemoUserId();
  const { events, loading, error } = useCalendarEvents(trainerId);

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
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Google Calendar
            </Button>
            <Button size="sm">
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
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
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
                    {getDaysInMonth().map((day, index) => (
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
                              {getEventsForDay(day).slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    "text-xs p-1 rounded text-white truncate",
                                    event.color
                                  )}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {getEventsForDay(day).length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{getEventsForDay(day).length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Google Calendar Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Google Calendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Not Connected</span>
                </div>
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Sync your calendar events with Google Calendar for seamless scheduling
              </p>
            </CardContent>
          </Card>

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
    </div>
  );
}
