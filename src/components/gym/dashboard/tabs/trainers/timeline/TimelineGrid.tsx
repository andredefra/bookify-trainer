import { useMemo } from "react";
import { format } from "date-fns";
import { SessionBlock } from "./SessionBlock";

interface TimelineGridProps {
  weekDays: Date[];
  weekEvents: Record<string, Array<{
    id: string;
    trainerId: string;
    trainerName: string;
    title: string;
    start: Date;
    end: Date;
    color: string;
    type: string;
  }>>;
  selectedTrainers: string[];
}

export function TimelineGrid({ weekDays, weekEvents, selectedTrainers }: TimelineGridProps) {
  // Generate time slots from 7:00 to 22:00 in 30-minute intervals
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 7; hour <= 21; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 21) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  }, []);

  const getEventsForDayAndTime = (day: Date, timeSlot: string) => {
    const dayKey = format(day, 'yyyy-MM-dd');
    const dayEvents = weekEvents[dayKey] || [];
    
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotTime = new Date(day);
    slotTime.setHours(hours, minutes, 0, 0);
    
    return dayEvents.filter(event => {
      const eventStart = event.start;
      const eventEnd = event.end;
      
      // Check if this time slot overlaps with the event
      const slotEnd = new Date(slotTime.getTime() + 30 * 60 * 1000); // 30 minutes later
      
      return (
        (eventStart <= slotTime && eventEnd > slotTime) ||
        (eventStart < slotEnd && eventEnd >= slotEnd) ||
        (eventStart >= slotTime && eventStart < slotEnd)
      );
    });
  };

  return (
    <>
      {/* Mobile: Stack days vertically */}
      <div className="block sm:hidden">
        {weekDays.map(day => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const dayEvents = weekEvents[dayKey] || [];
          
          return (
            <div key={day.toISOString()} className="border-b last:border-b-0">
              <div className="p-3 bg-muted/50 border-b">
                <div className="font-medium text-center">
                  {format(day, 'EEEE, MMM d')}
                </div>
              </div>
              <div className="space-y-1 p-2 min-h-[100px]">
                {dayEvents.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-4">
                    No events scheduled
                  </div>
                ) : (
                  dayEvents.map(event => (
                    <div key={event.id} className="mb-2">
                      <SessionBlock
                        event={event}
                        isCompact={false}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden sm:block overflow-auto max-h-[600px]">
        {timeSlots.map((timeSlot, slotIndex) => (
          <div
            key={timeSlot}
            className={`grid grid-cols-8 border-b last:border-b-0 min-h-[60px] ${
              slotIndex % 2 === 0 ? 'bg-background' : 'bg-muted/20'
            }`}
          >
            {/* Time column */}
            <div className="p-3 border-r bg-muted/30 flex items-center">
              <span className="text-sm font-medium text-muted-foreground">
                {timeSlot}
              </span>
            </div>

            {/* Day columns */}
            {weekDays.map(day => {
              const dayEvents = getEventsForDayAndTime(day, timeSlot);
              
              return (
                <div
                  key={`${day.toISOString()}-${timeSlot}`}
                  className="border-r last:border-r-0 p-1 relative min-h-[60px]"
                >
                  {dayEvents.map(event => (
                    <SessionBlock
                      key={`${event.id}-${timeSlot}`}
                      event={event}
                      isCompact={dayEvents.length > 1}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}