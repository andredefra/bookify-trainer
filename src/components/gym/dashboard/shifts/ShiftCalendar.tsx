import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Calendar } from 'lucide-react';
import { useTrainerShifts } from '@/hooks/gym/useTrainerShifts';
import { useGymTrainersData } from '@/hooks/gym/useGymTrainersData';
import { CreateShiftDialog } from './CreateShiftDialog';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from 'date-fns';

export function ShiftCalendar() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { shifts, loading } = useTrainerShifts();
  const { trainers } = useGymTrainersData();

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getShiftsForDayAndHour = (date: Date, hour: number) => {
    return shifts.filter(shift => {
      const shiftStart = new Date(shift.start_datetime);
      const shiftEnd = new Date(shift.end_datetime);
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(date);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      return isSameDay(shiftStart, date) && 
             shiftStart < slotEnd && 
             shiftEnd > slotStart;
    });
  };

  const getTrainerName = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer ? trainer.name : `Trainer ${trainerId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Loading shift calendar...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            Week of {format(currentWeek, 'MMM d, yyyy')}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Shift
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 border-r bg-muted/50">
              <span className="text-sm font-medium">Time</span>
            </div>
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="p-4 text-center border-r last:border-r-0">
                <div className="font-medium">{format(day, 'EEE')}</div>
                <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
              </div>
            ))}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {timeSlots.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
                <div className="p-2 border-r bg-muted/30 text-center">
                  <span className="text-xs text-muted-foreground">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
                {weekDays.map((day, dayIndex) => {
                  const dayShifts = getShiftsForDayAndHour(day, hour);
                  return (
                    <div key={dayIndex} className="p-1 border-r last:border-r-0 min-h-[60px]">
                      {dayShifts.map((shift) => (
                        <Badge
                          key={shift.id}
                          variant="secondary"
                          className={`text-xs mb-1 block truncate cursor-pointer ${getStatusColor(shift.status)}`}
                          title={`${getTrainerName(shift.trainer_id)} - ${shift.shift_type}`}
                        >
                          {getTrainerName(shift.trainer_id).split(' ')[0]}
                        </Badge>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateShiftDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}