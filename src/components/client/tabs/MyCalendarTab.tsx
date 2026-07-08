import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Plus, Clock, Dumbbell, Heart, Flame, Bed, Video, MapPin, User, Send, Info } from "lucide-react";
import { SessionItem } from "@/types/sessions";
import { format, isSameDay, parseISO, isToday, isTomorrow, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PlannedActivity {
  id: string;
  date: Date;
  time: string;
  category: "training" | "session";
  type: "workout" | "cardio" | "stretching" | "rest";
  title?: string;
  notes: string;
  trainer?: string;
  sessionMode?: "video" | "in-person";
  requestStatus?: "pending" | "confirmed" | "declined";
  trainerPlan?: "free" | "essential" | "pro";
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

const mockTrainers = [
  { id: "1", name: "Marco Rossi", plan: "pro" as const },
  { id: "2", name: "Laura Bianchi", plan: "essential" as const },
  { id: "3", name: "Giovanni Verdi", plan: "free" as const },
];

function resolveSessionDate(dateStr: string | Date): Date {
  if (dateStr instanceof Date) return dateStr;
  const lower = dateStr.toLowerCase();
  if (lower === "today") return new Date();
  if (lower === "tomorrow") return addDays(new Date(), 1);
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
  const [plannedActivities, setPlannedActivities] = useState<PlannedActivity[]>(() => {
    try {
      const raw = localStorage.getItem("basic-calendar-events");
      if (!raw) return [];
      const parsed = JSON.parse(raw) as any[];
      return parsed.map(a => ({ ...a, date: new Date(a.date) }));
    } catch { return []; }
  });

  useEffect(() => {
    try {
      const serializable = plannedActivities.map(a => ({
        ...a,
        date: (a.date instanceof Date ? a.date : new Date(a.date)).toISOString(),
      }));
      localStorage.setItem("basic-calendar-events", JSON.stringify(serializable));
    } catch {}
  }, [plannedActivities]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventCategory, setEventCategory] = useState<"training" | "session">("training");
  const [newActivity, setNewActivity] = useState({
    time: "09:00",
    type: "workout",
    notes: "",
    trainerId: "",
    sessionMode: "in-person" as "video" | "in-person",
  });
  const { toast } = useToast();

  const sessionsWithDates = useMemo(() =>
    upcomingSessions.map(s => ({ ...s, resolvedDate: resolveSessionDate(s.date) })),
    [upcomingSessions]
  );

  const daysWithSessions = useMemo(() =>
    sessionsWithDates.map(s => s.resolvedDate),
    [sessionsWithDates]
  );
  const daysWithPlanned = useMemo(() =>
    plannedActivities.filter(a => a.category === "training").map(a => a.date),
    [plannedActivities]
  );
  const daysWithSessionRequests = useMemo(() =>
    plannedActivities.filter(a => a.category === "session").map(a => a.date),
    [plannedActivities]
  );

  const selectedDaySessions = sessionsWithDates.filter(s => isSameDay(s.resolvedDate, selectedDate));
  const selectedDayPlanned = plannedActivities.filter(a => isSameDay(a.date, selectedDate));

  const handleAddActivity = () => {
    if (eventCategory === "session") {
      const trainer = mockTrainers.find(t => t.id === newActivity.trainerId);
      if (!trainer) {
        toast({ title: "Please select a trainer", variant: "destructive" });
        return;
      }

      const isBasicPlan = trainer.plan === "free";

      const activity: PlannedActivity = {
        id: crypto.randomUUID(),
        date: selectedDate,
        time: newActivity.time,
        category: "session",
        type: "workout",
        notes: newActivity.notes,
        trainer: trainer.name,
        sessionMode: newActivity.sessionMode,
        trainerPlan: trainer.plan,
        requestStatus: isBasicPlan ? undefined : "pending",
      };
      setPlannedActivities(prev => [...prev, activity]);

      if (isBasicPlan) {
        toast({
          title: "Event added",
          description: "This trainer is on a basic plan — session added as a calendar event.",
        });
      } else {
        toast({
          title: "Request sent",
          description: `Session request sent to ${trainer.name}.`,
        });
      }
    } else {
      const activity: PlannedActivity = {
        id: crypto.randomUUID(),
        date: selectedDate,
        time: newActivity.time,
        category: "training",
        type: newActivity.type as PlannedActivity["type"],
        notes: newActivity.notes,
      };
      setPlannedActivities(prev => [...prev, activity]);
    }

    setNewActivity({ time: "09:00", type: "workout", notes: "", trainerId: "", sessionMode: "in-person" });
    setEventCategory("training");
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
          <p className="text-muted-foreground mt-1">View upcoming activities and plan your events</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Plan an Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Plan an Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              {/* Event category selector */}
              <div>
                <Label className="text-sm font-medium">Event Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setEventCategory("training")}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-colors",
                      eventCategory === "training"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <Dumbbell className="h-4 w-4" />
                    Training Day
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventCategory("session")}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-colors",
                      eventCategory === "session"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <User className="h-4 w-4" />
                    Session with Trainer
                  </button>
                </div>
              </div>

              {/* Date */}
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
              </div>

              {/* Time */}
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newActivity.time}
                  onChange={e => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>

              {/* Category-specific fields */}
              {eventCategory === "training" ? (
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
              ) : (
                <>
                  <div>
                    <Label>Trainer</Label>
                    <Select value={newActivity.trainerId} onValueChange={v => setNewActivity(prev => ({ ...prev, trainerId: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a trainer" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTrainers.map(t => (
                          <SelectItem key={t.id} value={t.id}>
                            <span className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {t.name}
                              {t.plan === "free" && (
                                <span className="text-xs text-muted-foreground">(Basic)</span>
                              )}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Session Mode</Label>
                    <Select value={newActivity.sessionMode} onValueChange={v => setNewActivity(prev => ({ ...prev, sessionMode: v as "video" | "in-person" }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            In Person
                          </span>
                        </SelectItem>
                        <SelectItem value="video">
                          <span className="flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            Video Call
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Info about basic plan trainers */}
                  {newActivity.trainerId && mockTrainers.find(t => t.id === newActivity.trainerId)?.plan === "free" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-400">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>This trainer is on a basic plan. The session will be added as a calendar event only — no request will be sent.</span>
                    </div>
                  )}
                  {newActivity.trainerId && mockTrainers.find(t => t.id === newActivity.trainerId)?.plan !== "free" && newActivity.trainerId !== "" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary">
                      <Send className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>A session request will be sent to the trainer for confirmation.</span>
                    </div>
                  )}
                </>
              )}

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder={eventCategory === "training" ? "e.g. Focus on upper body, 45 min..." : "e.g. Want to work on technique..."}
                  value={newActivity.notes}
                  onChange={e => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <Button onClick={handleAddActivity} className="w-full gap-2">
                {eventCategory === "session" && newActivity.trainerId && mockTrainers.find(t => t.id === newActivity.trainerId)?.plan !== "free" ? (
                  <>
                    <Send className="h-4 w-4" />
                    Send Request
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add to Calendar
                  </>
                )}
              </Button>
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
                hasRequest: daysWithSessionRequests,
              }}
              modifiersClassNames={{
                hasSession: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-primary",
                hasPlanned: "relative before:absolute before:bottom-1 before:left-[calc(50%-5px)] before:h-1.5 before:w-1.5 before:rounded-full before:bg-green-500",
                hasRequest: "relative [&>*]:after:absolute [&>*]:after:bottom-1 [&>*]:after:left-[calc(50%+3px)] [&>*]:after:h-1.5 [&>*]:after:w-1.5 [&>*]:after:rounded-full [&>*]:after:bg-amber-500",
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
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Requests
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
                <p className="text-sm mt-1">Click &quot;Plan an Event&quot; to add one</p>
              </div>
            ) : (
              <>
                {/* Trainer sessions */}
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

                {/* Planned activities & session requests */}
                {selectedDayPlanned.map(activity => {
                  if (activity.category === "session") {
                    const isBasic = activity.trainerPlan === "free";
                    return (
                      <div key={activity.id} className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border",
                        isBasic ? "bg-muted/30" : "bg-amber-500/5 border-amber-500/20"
                      )}>
                        <div className={cn(
                          "h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          isBasic ? "bg-muted" : "bg-amber-500/10"
                        )}>
                          {activity.sessionMode === "video"
                            ? <Video className={cn("h-4 w-4", isBasic ? "text-muted-foreground" : "text-amber-600")} />
                            : <MapPin className={cn("h-4 w-4", isBasic ? "text-muted-foreground" : "text-amber-600")} />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">Session with {activity.trainer}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                            {activity.sessionMode === "video" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                            <span className="capitalize">{activity.sessionMode === "in-person" ? "In Person" : "Video Call"}</span>
                          </div>
                          {activity.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{activity.notes}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {activity.requestStatus === "pending" && (
                            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-xs">Request Sent</Badge>
                          )}
                          {activity.requestStatus === "confirmed" && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/30 text-xs">Confirmed</Badge>
                          )}
                          {activity.requestStatus === "declined" && (
                            <Badge variant="destructive" className="text-xs">Declined</Badge>
                          )}
                          {isBasic && !activity.requestStatus && (
                            <Badge variant="outline" className="text-xs">Calendar Event</Badge>
                          )}
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive text-xs h-7" onClick={() => handleRemovePlanned(activity.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  }

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
