import { useState, useMemo } from "react";
import { WeekNavigation } from "./WeekNavigation";
import { TimelineGrid } from "./TimelineGrid";
import { SessionBlock } from "./SessionBlock";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";
import { it } from "date-fns/locale";

interface TimelineCalendarProps {
  selectedTrainers: string[];
}

export function TimelineCalendar({ selectedTrainers }: TimelineCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { trainers, loading: trainersLoading } = useGymTrainersData();
  
  // Get events for selected trainers
  const trainerEvents = selectedTrainers.map(trainerId => {
    const { events, loading } = useCalendarEvents(trainerId);
    return { trainerId, events, loading };
  });

  const weekStart = useMemo(() => startOfWeek(currentWeek, { weekStartsOn: 1 }), [currentWeek]);
  const weekDays = useMemo(() => 
    Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), 
    [weekStart]
  );

  // Filter events for current week and aggregate by day/hour
  const weekEvents = useMemo(() => {
    const eventsByDay: Record<string, Array<{
      id: string;
      trainerId: string;
      trainerName: string;
      title: string;
      start: Date;
      end: Date;
      color: string;
      type: string;
    }>> = {};

    trainerEvents.forEach(({ trainerId, events }) => {
      const trainer = trainers.find(t => t.id === trainerId);
      if (!trainer) return;

      events.forEach(event => {
        weekDays.forEach(day => {
          if (isSameDay(event.start, day)) {
            const dayKey = format(day, 'yyyy-MM-dd');
            if (!eventsByDay[dayKey]) {
              eventsByDay[dayKey] = [];
            }
            eventsByDay[dayKey].push({
              id: event.id,
              trainerId,
              trainerName: trainer.name,
              title: event.title,
              start: event.start,
              end: event.end,
              color: event.color,
              type: event.type
            });
          }
        });
      });
    });

    return eventsByDay;
  }, [weekStart.getTime(), selectedTrainers.length, trainers.length]);

  const handlePrevWeek = () => {
    setCurrentWeek(prev => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => addDays(prev, 7));
  };

  const handleToday = () => {
    setCurrentWeek(new Date());
  };

  if (trainersLoading || trainerEvents.some(t => t.loading)) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted/50 rounded animate-pulse" />
        <div className="h-96 bg-muted/50 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <WeekNavigation 
        currentWeek={currentWeek}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />
      
      <div className="border rounded-lg overflow-hidden bg-background">
        <div className="grid grid-cols-8 border-b bg-muted/30">
          <div className="p-3 text-sm font-medium text-muted-foreground border-r">
            Orario
          </div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="p-3 text-center border-r last:border-r-0">
              <div className="text-sm font-medium">
                {format(day, 'EEE', { locale: it })}
              </div>
              <div className="text-lg font-semibold mt-1">
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>

        <TimelineGrid
          weekDays={weekDays}
          weekEvents={weekEvents}
          selectedTrainers={selectedTrainers}
        />
      </div>
    </div>
  );
}