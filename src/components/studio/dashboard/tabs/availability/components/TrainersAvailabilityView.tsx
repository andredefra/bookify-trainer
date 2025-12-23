import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrainerAvailability, dayNames, trainerColors } from "../data/studioAvailabilityData";

interface TrainersAvailabilityViewProps {
  availability: TrainerAvailability[];
}

export function TrainersAvailabilityView({ availability }: TrainersAvailabilityViewProps) {
  // Group by trainer
  const trainerGroups = availability.reduce((acc, slot) => {
    if (!acc[slot.trainerId]) {
      acc[slot.trainerId] = {
        trainerId: slot.trainerId,
        trainerName: slot.trainerName,
        slots: []
      };
    }
    acc[slot.trainerId].slots.push(slot);
    return acc;
  }, {} as Record<string, { trainerId: string; trainerName: string; slots: TrainerAvailability[] }>);

  // Find overlaps
  const findOverlaps = (dayOfWeek: number) => {
    const daySlots = availability.filter(a => a.dayOfWeek === dayOfWeek);
    const overlaps: { time: string; trainers: string[] }[] = [];
    
    // Check each hour from 7 to 21
    for (let hour = 7; hour < 21; hour++) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      const availableTrainers = daySlots.filter(slot => {
        const start = parseInt(slot.startTime.split(':')[0]);
        const end = parseInt(slot.endTime.split(':')[0]);
        return hour >= start && hour < end;
      }).map(s => s.trainerName);
      
      if (availableTrainers.length >= 2) {
        overlaps.push({ time: timeStr, trainers: availableTrainers });
      }
    }
    
    return overlaps;
  };

  return (
    <div className="space-y-6">
      {/* Trainer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(trainerGroups).map((trainer) => (
          <Card key={trainer.trainerId}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${trainerColors[trainer.trainerId]}`} />
                <CardTitle className="text-lg">{trainer.trainerName}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {trainer.slots
                  .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                  .map((slot, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between text-sm p-2 rounded bg-muted/50"
                    >
                      <span className="font-medium">{dayNames[slot.dayOfWeek]}</span>
                      <span className="text-muted-foreground">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overlap Finder */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Overlaps</CardTitle>
          <p className="text-sm text-muted-foreground">
            Times when multiple trainers are available
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {[1, 2, 3, 4, 5, 6, 0].map((dayOfWeek) => {
              const overlaps = findOverlaps(dayOfWeek);
              const hasOverlaps = overlaps.length > 0;
              
              return (
                <div key={dayOfWeek} className="space-y-2">
                  <h4 className="font-medium text-sm text-center border-b pb-2">
                    {dayNames[dayOfWeek]}
                  </h4>
                  {hasOverlaps ? (
                    <div className="space-y-1">
                      {/* Group consecutive hours */}
                      {overlaps.slice(0, 3).map((overlap, idx) => (
                        <div 
                          key={idx}
                          className="text-xs p-2 rounded bg-emerald-50 border border-emerald-200"
                        >
                          <p className="font-medium text-emerald-700">{overlap.time}</p>
                          <p className="text-emerald-600 truncate">
                            {overlap.trainers.length} trainers
                          </p>
                        </div>
                      ))}
                      {overlaps.length > 3 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{overlaps.length - 3} more
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      No overlaps
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
