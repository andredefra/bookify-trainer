import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Plus, Clock, Dumbbell, Heart, Flame, Bed, Video, MapPin, User } from "lucide-react";
import { SessionItem } from "@/types/sessions";
import { format, isSameDay, parseISO, isToday, isTomorrow, addDays } from "date-fns";
import { cn } from "@/lib/utils";

interface PlannedActivity {
  id: string;
  date: Date;
  time: string;
  type: "workout" | "cardio" | "stretching" | "rest";
  notes: string;
}

interface MyCalendarTabProps {
  upcomingSessions: SessionItem[];
}

const activityTypes = [
  { value: "workout", label: "Workout", icon: Dumbbell, color: "bg-blue-500" },
  { value: "cardio", label: "Cardio", icon: Flame, color: "bg-orange-500" },
  { value: "stretching", label: "Stretching", icon: Heart, color: "bg-purple-500" },
  { value: "rest", label: "Rest Day", icon: Bed, color: "bg-green-500" },
];

function resolveSessionDate(dateStr: string | Date): Date {
  if (dateStr instanceof Date) return dateStr;
  const lower = dateStr.toLowerCase();
  if (lower === "today") return new Date();
  if (lower === "tomorrow") return addDays(new Date(), 1);
  // Try day names
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayIndex = days.indexOf(lower);
  if (dayIndex !== -1) {
    const today = new Date();
    const diff = (dayIndex - today.getDay() + 7) % 7 || 7;
    return addDays(today, diff);
  }
  try { return parseISO(dateStr); } catch { return new Date(); }
}

export function MyCalendarTab({ upcomingSessions }: MyCalendarTabProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [plannedActivities, setPlannedActivities] = useState<PlannedActivity[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({ time: "09:00", type: "workout", notes: "" });

  // Resolve session dates
  const sessionsWithDates = useMemo(() =>
    upcomingSessions.map(s => ({ ...s, resolvedDate: resolveSessionDate(s.date) })),
    [upcomingSessions]
  );

  // Days that have activities
  const daysWithSessions = useMemo(() =>
    sessionsWithDates.map(s => s.resolvedDate),
    [sessionsWithDates]
  );
  const daysWithPlanned = useMemo(() =>
    plannedActivities.map(a => a.date),
    [plannedActivities]
  );

  // Activities for selected date
  const selectedDaySessions = sessionsWithDates.filter(s => isSameDay(s.resolvedDate, selectedDate));
  const selectedDayPlanned = plannedActivities.filter(a => isSameDay(a.date, selectedDate));

  const handleAddActivity = () => {
    const activity: PlannedActivity = {
      id: crypto.randomUUID(),
      date: selectedDate,
      time: newActivity.time,
      type: newActivity.type as PlannedActivity["type"],
      notes: newActivity.notes,
    };
    setPlannedActivities(prev => [...prev, activity]);
    setNewActivity({ time: "09:00", type: "workout", notes: "" });
    setDialogOpen(false);
  };

  const handleRemovePlanned = (id: string) => {
    setPlannedActivities(prev => prev.filter(a => a.id !== id));
  };

  const getActivityIcon = (type: string) => {
    const found = activityTypes.find(a => a.value === type);
    return found ? found.icon : Dumbbell;
  };

  const getActivityColor = (type: string) => {
    const found = activityTypes.find(a => a.value === type);
    return found ? found.color : "bg-muted";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            My Calendar
          </h1>
          <p className="text-muted-foreground mt-1">View upcoming activities and plan your training days</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Plan Training Day
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Plan Training Day</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newActivity.time}
                  onChange={e => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label>Activity Type</Label>
                <Select value={newActivity.type} onValueChange={v => setNewActivity(prev => ({ ...prev, type: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map(t => (
                      <SelectItem key={t.value} value={t.value}>
                        <span className="flex items-center gap-2">
                          <t.icon className="h-4 w-4" />
                          {t.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="e.g. Focus on upper body, 45 min..."
                  value={newActivity.notes}
                  onChange={e => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddActivity} className="w-full">Add to Calendar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
        {/* Calendar */}
        <Card className="w-fit">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={d => d && setSelectedDate(d)}
              className="pointer-events-auto"
              modifiers={{
                hasSession: daysWithSessions,
                hasPlanned: daysWithPlanned,
              }}
              modifiersClassNames={{
                hasSession: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-primary",
                hasPlanned: "relative before:absolute before:bottom-1 before:left-[calc(50%-5px)] before:h-1.5 before:w-1.5 before:rounded-full before:bg-green-500",
              }}
            />
            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 px-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Sessions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Planned
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Day detail */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {isToday(selectedDate) ? "Today" : isTomorrow(selectedDate) ? "Tomorrow" : format(selectedDate, "EEEE, MMMM d")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDaySessions.length === 0 && selectedDayPlanned.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No activities scheduled</p>
                <p className="text-sm mt-1">Click "Plan Training Day" to add one</p>
              </div>
            ) : (
              <>
                {/* Sessions */}
                {selectedDaySessions.map(session => (
                  <div key={session.id} className="flex items-start gap-3 p-3 rounded-lg border bg-primary/5 border-primary/20">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {session.mode === "video" ? <Video className="h-4 w-4 text-primary" /> : <MapPin className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{session.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{session.trainer}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs capitalize">{session.status}</Badge>
                  </div>
                ))}

                {/* Planned activities */}
                {selectedDayPlanned.map(activity => {
                  const Icon = getActivityIcon(activity.type);
                  const colorClass = getActivityColor(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <div className={cn("h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", colorClass)}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground capitalize">{activity.type}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{activity.time}</span>
                        </div>
                        {activity.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{activity.notes}</p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleRemovePlanned(activity.id)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
