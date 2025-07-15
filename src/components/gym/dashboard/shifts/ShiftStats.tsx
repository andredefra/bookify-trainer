import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, UserCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import { useTrainerShifts } from '@/hooks/gym/useTrainerShifts';
import { useGymTrainersData } from '@/hooks/gym/useGymTrainersData';
import { format, isThisWeek, isToday } from 'date-fns';

export function ShiftStats() {
  const { shifts, loading } = useTrainerShifts();
  const { trainers } = useGymTrainersData();

  const todayShifts = shifts.filter(shift => 
    isToday(new Date(shift.start_datetime))
  );

  const weekShifts = shifts.filter(shift => 
    isThisWeek(new Date(shift.start_datetime))
  );

  const activeShifts = todayShifts.filter(shift => shift.status === 'active');
  const scheduledShifts = weekShifts.filter(shift => shift.status === 'scheduled');

  const availableTrainersCount = trainers.filter(trainer => {
    const hasActiveShift = activeShifts.some(shift => shift.trainer_id === trainer.id);
    return !hasActiveShift;
  }).length;

  const coverage = weekShifts.length > 0 ? Math.round((scheduledShifts.length / (weekShifts.length || 1)) * 100) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Shifts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayShifts.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeShifts.length} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Trainers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTrainersCount}</div>
            <p className="text-xs text-muted-foreground">
              out of {trainers.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Week Coverage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coverage}%</div>
            <p className="text-xs text-muted-foreground">
              {weekShifts.length} shifts scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shift Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {shifts.filter(s => s.status === 'cancelled').length}
            </div>
            <p className="text-xs text-muted-foreground">
              cancelled this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Shifts Today */}
      {todayShifts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayShifts.map((shift) => {
                const trainer = trainers.find(t => t.id === shift.trainer_id);
                return (
                  <div key={shift.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3 sm:gap-0">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium text-sm sm:text-base">{trainer?.name || `Trainer ${shift.trainer_id}`}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {format(new Date(shift.start_datetime), 'h:mm a')} - {format(new Date(shift.end_datetime), 'h:mm a')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-xs ${getStatusColor(shift.status)}`}>
                        {shift.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{shift.shift_type}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}