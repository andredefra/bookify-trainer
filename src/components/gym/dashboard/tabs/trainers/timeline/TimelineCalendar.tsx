import { useState } from "react";
import { WeekNavigation } from "./WeekNavigation";
import { TimelineGrid } from "./TimelineGrid";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";
import { enUS } from "date-fns/locale";

interface TimelineCalendarProps {
  selectedTrainers: string[];
  currentWeek?: Date;
  onWeekChange?: (date: Date) => void;
}

export function TimelineCalendar({ 
  selectedTrainers, 
  currentWeek: externalCurrentWeek, 
  onWeekChange 
}: TimelineCalendarProps) {
  const [internalCurrentWeek, setInternalCurrentWeek] = useState(new Date());
  const currentWeek = externalCurrentWeek || internalCurrentWeek;
  const { trainers, loading: trainersLoading } = useGymTrainersData();
  
  // Get events for selected trainers
  const trainerEvents = selectedTrainers.map(trainerId => {
    const { events, loading } = useCalendarEvents(trainerId);
    return { trainerId, events, loading };
  });

  // Calculate week data without useMemo for now
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Filter events for current week and aggregate by day/hour - simplified
  const weekEvents: Record<string, Array<{
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
          if (!weekEvents[dayKey]) {
            weekEvents[dayKey] = [];
          }
          weekEvents[dayKey].push({
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

  const handlePrevWeek = () => {
    const newWeek = addDays(currentWeek, -7);
    if (onWeekChange) {
      onWeekChange(newWeek);
    } else {
      setInternalCurrentWeek(newWeek);
    }
  };

  const handleNextWeek = () => {
    const newWeek = addDays(currentWeek, 7);
    if (onWeekChange) {
      onWeekChange(newWeek);
    } else {
      setInternalCurrentWeek(newWeek);
    }
  };

  const handleToday = () => {
    const today = new Date();
    if (onWeekChange) {
      onWeekChange(today);
    } else {
      setInternalCurrentWeek(today);
    }
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
            Time
          </div>
          {weekDays.map(day => (
            <div key={day.getTime()} className="p-3 text-center border-r last:border-r-0">
              <div className="text-sm font-medium">
                {format(day, 'EEE', { locale: enUS })}
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