import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Filter, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { GymCalendarEvent } from "@/hooks/gym/useGymCalendar";

interface GymCalendarViewProps {
  events: GymCalendarEvent[];
  trainers: { id: string; name: string }[];
  onEventClick: (event: GymCalendarEvent) => void;
  onCreateEvent: () => void;
  onDateChange?: (date: Date) => void;
}

export function GymCalendarView({ events, trainers, onEventClick, onCreateEvent, onDateChange }: GymCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('all');

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const days = direction === 'prev' ? -7 : 7;
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const days = direction === 'prev' ? -1 : 1;
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const getHeaderTitle = () => {
    switch (view) {
      case 'month':
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      case 'day':
        return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  const getNavigationFunction = () => {
    switch (view) {
      case 'month': return navigateMonth;
      case 'week': return navigateWeek;
      case 'day': return navigateDay;
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_datetime);
      return eventDate.toDateString() === date.toDateString() &&
        (selectedTrainer === 'all' || event.trainer_id === selectedTrainer);
    });
  };

  const getEventTypeColor = (category: string) => {
    switch (category) {
      case 'session': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sales_activity': return 'bg-green-100 text-green-800 border-green-200';
      case 'program_milestone': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      case 'personal_task': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'availability': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };


  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => getNavigationFunction()('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold min-w-[200px] text-center">
              {getHeaderTitle()}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => getNavigationFunction()('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-1">
            {(['month', 'week', 'day'] as const).map((viewType) => (
              <Button
                key={viewType}
                variant={view === viewType ? "default" : "outline"}
                size="sm"
                onClick={() => setView(viewType)}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTrainer}
            onChange={(e) => setSelectedTrainer(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="all">All Trainers</option>
            {trainers.map(trainer => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            ))}
          </select>

          <Button onClick={onCreateEvent} className="gap-2">
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      {/* Calendar Grid - Month View */}
      {view === 'month' && (
        <div className="border rounded-lg">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium bg-muted">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {getDaysInMonth().map((date, index) => {
              const dayEvents = getEventsForDate(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={cn(
                    "min-h-[120px] p-2 border-r border-b",
                    !isCurrentMonth && "bg-muted/30 text-muted-foreground",
                    isToday && "bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "text-sm font-medium mb-1",
                    isToday && "text-primary font-bold"
                  )}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={cn(
                          "text-xs p-1 rounded cursor-pointer truncate",
                          getEventTypeColor(event.event_category)
                        )}
                        title={`${event.title} - ${formatTime(event.start_datetime)}`}
                      >
                        {formatTime(event.start_datetime)} {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div className="border rounded-lg">
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 text-center text-sm font-medium bg-muted">Time</div>
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date(currentDate);
              date.setDate(currentDate.getDate() - currentDate.getDay() + i);
              return (
                <div key={i} className="p-2 text-center text-sm font-medium bg-muted">
                  {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          {Array.from({ length: 12 }, (_, hour) => {
            const timeSlot = hour + 8; // 8 AM to 8 PM
            return (
              <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
                <div className="p-2 text-xs text-muted-foreground border-r">
                  {timeSlot}:00
                </div>
                {Array.from({ length: 7 }, (_, day) => {
                  const date = new Date(currentDate);
                  date.setDate(currentDate.getDate() - currentDate.getDay() + day);
                  date.setHours(timeSlot, 0, 0, 0);
                  
                  const dayEvents = events.filter(event => {
                    const eventStart = new Date(event.start_datetime);
                    return eventStart.toDateString() === date.toDateString() &&
                           eventStart.getHours() === timeSlot &&
                           (selectedTrainer === 'all' || event.trainer_id === selectedTrainer);
                  });

                  return (
                    <div key={day} className="p-1 border-r">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          onClick={() => onEventClick(event)}
                          className={cn(
                            "text-xs p-1 rounded cursor-pointer mb-1",
                            getEventTypeColor(event.event_category)
                          )}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* Day View */}
      {view === 'day' && (
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-muted">
            <h3 className="font-medium">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
          </div>

          <div className="space-y-1">
            {Array.from({ length: 12 }, (_, hour) => {
              const timeSlot = hour + 8;
              const slotEvents = events.filter(event => {
                const eventStart = new Date(event.start_datetime);
                return eventStart.toDateString() === currentDate.toDateString() &&
                       eventStart.getHours() === timeSlot &&
                       (selectedTrainer === 'all' || event.trainer_id === selectedTrainer);
              });

              return (
                <div key={hour} className="flex border-b min-h-[80px]">
                  <div className="w-20 p-2 text-sm text-muted-foreground border-r">
                    {timeSlot}:00
                  </div>
                  <div className="flex-1 p-2">
                    {slotEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={cn(
                          "p-2 rounded cursor-pointer mb-2",
                          getEventTypeColor(event.event_category)
                        )}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs">
                          {formatTime(event.start_datetime)} - {formatTime(event.end_datetime)}
                        </div>
                        {event.trainer_name && (
                          <div className="text-xs">with {event.trainer_name}</div>
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
    </div>
  );
}