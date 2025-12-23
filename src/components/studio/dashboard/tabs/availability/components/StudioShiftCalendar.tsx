import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { StudioShift, trainerColors } from "../data/studioAvailabilityData";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

interface StudioShiftCalendarProps {
  shifts: StudioShift[];
}

export function StudioShiftCalendar({ shifts }: StudioShiftCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

  const getShiftsForDay = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return shifts.filter(s => s.date === dateStr);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      confirmed: "bg-emerald-100 text-emerald-700",
      scheduled: "bg-blue-100 text-blue-700",
      pending: "bg-amber-100 text-amber-700",
      cancelled: "bg-rose-100 text-rose-700"
    };
    return styles[status] || styles.scheduled;
  };

  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const goToToday = () => setCurrentDate(new Date());

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Shift Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={prevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[200px] text-center">
              {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
            </span>
            <Button variant="outline" size="icon" onClick={nextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Shift
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 border-b">
              <div className="p-2 text-sm font-medium text-muted-foreground">Time</div>
              {weekDays.map((day) => (
                <div 
                  key={day.toISOString()} 
                  className={`p-2 text-center border-l ${
                    isSameDay(day, new Date()) ? "bg-primary/5" : ""
                  }`}
                >
                  <p className="text-sm font-medium">{format(day, "EEE")}</p>
                  <p className={`text-lg ${isSameDay(day, new Date()) ? "text-primary font-bold" : ""}`}>
                    {format(day, "d")}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Time slots */}
            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
                  <div className="p-2 text-sm text-muted-foreground">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  {weekDays.map((day) => {
                    const dayShifts = getShiftsForDay(day);
                    const shiftsAtHour = dayShifts.filter(s => {
                      const startHour = parseInt(s.startTime.split(':')[0]);
                      const endHour = parseInt(s.endTime.split(':')[0]);
                      return hour >= startHour && hour < endHour;
                    });
                    
                    return (
                      <div 
                        key={`${day.toISOString()}-${hour}`} 
                        className={`border-l p-1 ${
                          isSameDay(day, new Date()) ? "bg-primary/5" : ""
                        }`}
                      >
                        {shiftsAtHour.map((shift) => {
                          const startHour = parseInt(shift.startTime.split(':')[0]);
                          if (hour === startHour) {
                            return (
                              <div
                                key={shift.id}
                                className={`${trainerColors[shift.trainerId]} text-white text-xs p-1 rounded mb-1`}
                              >
                                <p className="font-medium truncate">{shift.trainerName}</p>
                                <p className="opacity-80">{shift.startTime}-{shift.endTime}</p>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
          <span className="text-sm text-muted-foreground">Trainers:</span>
          {Object.entries(trainerColors).slice(0, 3).map(([id, color]) => {
            const trainer = shifts.find(s => s.trainerId === id);
            return trainer ? (
              <div key={id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${color}`} />
                <span className="text-sm">{trainer.trainerName}</span>
              </div>
            ) : null;
          })}
        </div>
      </CardContent>
    </Card>
  );
}
