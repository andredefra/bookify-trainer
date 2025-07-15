import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Calendar, MoreHorizontal } from 'lucide-react';
import { useTrainerShifts } from '@/hooks/gym/useTrainerShifts';
import { useGymTrainersData } from '@/hooks/gym/useGymTrainersData';
import { CreateShiftDialog } from './CreateShiftDialog';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay, isToday } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

export function ShiftCalendar() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [currentDay, setCurrentDay] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [showAllHours, setShowAllHours] = useState(false);
  const { shifts, loading } = useTrainerShifts();
  const { trainers } = useGymTrainersData();
  const isMobile = useIsMobile();

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  
  // Smart time range: business hours (6 AM - 10 PM) or all hours
  const businessHours = Array.from({ length: 17 }, (_, i) => i + 6); // 6 AM to 10 PM
  const allHours = Array.from({ length: 24 }, (_, i) => i);
  const timeSlots = showAllHours ? allHours : businessHours;

  const getShiftsForDay = (date: Date) => {
    return shifts.filter(shift => {
      const shiftStart = new Date(shift.start_datetime);
      return isSameDay(shiftStart, date);
    });
  };

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

  const hasShiftsInHour = (date: Date, hour: number) => {
    return getShiftsForDayAndHour(date, hour).length > 0;
  };

  const getDayShiftCount = (date: Date) => {
    return getShiftsForDay(date).length;
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDay = direction === 'prev' 
      ? addDays(currentDay, -1) 
      : addDays(currentDay, 1);
    setCurrentDay(newDay);
    
    // Update week if day goes outside current week
    const weekStart = startOfWeek(newDay);
    if (weekStart.getTime() !== currentWeek.getTime()) {
      setCurrentWeek(weekStart);
    }
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
    <div className="space-y-4">
      {/* Mobile: Day Navigation */}
      {isMobile ? (
        <div className="space-y-4">
          {/* Day Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDay('prev')}
              className="min-h-[44px] px-3"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                {format(currentDay, 'EEEE')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {format(currentDay, 'MMM d, yyyy')}
                {isToday(currentDay) && ' (Today)'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDay('next')}
              className="min-h-[44px] px-3"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Week Overview */}
          <div className="flex justify-center space-x-2">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setCurrentDay(day)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isSameDay(day, currentDay)
                    ? 'bg-primary text-primary-foreground'
                    : isToday(day)
                    ? 'bg-secondary text-secondary-foreground ring-2 ring-primary'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <div className="text-center">
                  <div>{format(day, 'd')}</div>
                  {getDayShiftCount(day) > 0 && (
                    <div className="w-1 h-1 bg-current rounded-full mx-auto mt-0.5" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Time Range Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {showAllHours ? 'All Hours' : 'Business Hours (6 AM - 10 PM)'}
              </span>
            </div>
            <Switch
              checked={showAllHours}
              onCheckedChange={setShowAllHours}
            />
          </div>

          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="w-full min-h-[44px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Shift
          </Button>
        </div>
      ) : (
        /* Desktop: Week Navigation */
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
              className="min-h-[44px] px-3"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-base sm:text-lg font-semibold text-center">
              Week of {format(currentWeek, 'MMM d, yyyy')}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              className="min-h-[44px] px-3"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="show-all-hours" className="text-sm font-medium">
                Show all hours
              </label>
              <Switch
                id="show-all-hours"
                checked={showAllHours}
                onCheckedChange={setShowAllHours}
              />
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="min-h-[44px]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Shift
            </Button>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          {/* Mobile: Single day view */}
          {isMobile ? (
            <div className="space-y-2 p-4">
              {timeSlots.map((hour) => {
                const dayShifts = getShiftsForDayAndHour(currentDay, hour);
                const hasShifts = dayShifts.length > 0;
                
                // Only show hours with shifts or if showing all hours
                if (!hasShifts && !showAllHours) {
                  // Check if we should show empty slots during business hours for context
                  const isBusinessHour = hour >= 6 && hour <= 22;
                  if (!isBusinessHour) return null;
                }

                return (
                  <div key={hour} className={`rounded-lg border transition-colors ${
                    hasShifts ? 'bg-card border-border' : 'bg-muted/20 border-muted'
                  }`}>
                    <div className="flex items-start gap-3 p-3">
                      <div className="text-sm font-medium text-muted-foreground min-w-[60px] pt-1">
                        {format(new Date().setHours(hour, 0, 0, 0), 'h:mm a')}
                      </div>
                      
                      {hasShifts ? (
                        <div className="flex-1 space-y-2">
                          {dayShifts.map((shift) => {
                            const startTime = new Date(shift.start_datetime);
                            const endTime = new Date(shift.end_datetime);
                            return (
                              <div
                                key={shift.id}
                                className={`p-3 rounded-md cursor-pointer transition-all min-h-[60px] ${getStatusColor(shift.status)}`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">
                                      {getTrainerName(shift.trainer_id)}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {shift.shift_type} • {shift.status}
                                    </div>
                                  </div>
                                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                </div>
                                {shift.notes && (
                                  <div className="text-xs text-muted-foreground mt-2 p-2 bg-background/50 rounded">
                                    {shift.notes}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex-1 text-center py-4 text-sm text-muted-foreground">
                          No shifts scheduled
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Empty state for days with no shifts */}
              {getShiftsForDay(currentDay).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium mb-1">No shifts scheduled</p>
                  <p className="text-sm">for {format(currentDay, 'EEEE, MMM d')}</p>
                </div>
              )}
            </div>
          ) : (
            /* Desktop: Grid layout */
            <div>
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
                        {format(new Date().setHours(hour, 0, 0, 0), 'h:mm a')}
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
            </div>
          )}
        </CardContent>
      </Card>

      <CreateShiftDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}