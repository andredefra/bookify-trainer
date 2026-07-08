import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CalendarDays, Dumbbell, Flame, Heart, Bed, User, Clock, ArrowRight, Plus, Video, MapPin, UserCheck, UserPlus } from "lucide-react";
import { addDays, format, isToday, isTomorrow } from "date-fns";

interface CalendarEvent {
  id: string;
  date: string; // ISO
  time: string;
  category: "training" | "session" | "general";
  type: string;
  title?: string;
  notes?: string;
  trainer?: string;
  sessionMode?: "video" | "in-person";
  origin?: "self" | "trainer"; // who created the event
  requestStatus?: "pending" | "confirmed" | "declined";
}

const STORAGE_KEY = "basic-calendar-events-v3";

function getSeedEvents(): CalendarEvent[] {
  const now = new Date();
  return [
    {
      id: "seed-1",
      date: now.toISOString(),
      time: "18:30",
      category: "training",
      type: "workout",
      title: "Upper Body Workout",
      notes: "Focus on chest & shoulders, 45 min. Superset bench + rows.",
      origin: "self",
    },
    {
      id: "seed-2",
      date: addDays(now, 1).toISOString(),
      time: "07:30",
      category: "training",
      type: "cardio",
      title: "Morning Run 5K",
      notes: "Easy pace, target 28 min. Warm-up 5 min walk.",
      origin: "self",
    },
    {
      id: "seed-3",
      date: addDays(now, 2).toISOString(),
      time: "10:00",
      category: "session",
      type: "workout",
      title: "Personal training – Lower Body",
      trainer: "Marco Rossi",
      sessionMode: "in-person",
      notes: "Working on squat depth and hip mobility.",
      origin: "self",
      requestStatus: "confirmed",
    },
    {
      id: "seed-4",
      date: addDays(now, 4).toISOString(),
      time: "19:00",
      category: "training",
      type: "workout",
      title: "HIIT 20'",
      notes: "Tabata intervals, bodyweight only.",
      origin: "self",
    },
    {
      id: "seed-5",
      date: addDays(now, 6).toISOString(),
      time: "09:00",
      category: "session",
      type: "workout",
      title: "Weekly check-in review",
      trainer: "Marco Rossi",
      sessionMode: "video",
      notes: "Review last week's progress and adjust the plan.",
      origin: "trainer",
      requestStatus: "confirmed",
    },
  ];
}

function iconFor(ev: CalendarEvent) {
  if (ev.category === "session") return User;
  if (ev.category === "general") return CalendarDays;
  switch (ev.type) {
    case "cardio": return Flame;
    case "stretching": return Heart;
    default: return Dumbbell;
  }
}

function colorFor(ev: CalendarEvent) {
  if (ev.category === "session") return "bg-primary/10 text-primary";
  if (ev.category === "general") return "bg-slate-500/10 text-slate-600";
  switch (ev.type) {
    case "cardio": return "bg-orange-500/10 text-orange-600";
    case "stretching": return "bg-purple-500/10 text-purple-600";
    default: return "bg-blue-500/10 text-blue-600";
  }
}

function labelFor(ev: CalendarEvent) {
  if (ev.title) return ev.title;
  if (ev.category === "session") return ev.notes || `Session with ${ev.trainer ?? "trainer"}`;
  if (ev.category === "general") return ev.notes || "General Event";
  const map: Record<string, string> = {
    workout: "Workout",
    cardio: "Cardio",
    stretching: "Stretching",
  };
  return ev.notes || map[ev.type] || "Training";
}

function formatDay(d: Date) {
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  return format(d, "EEE d MMM");
}

export function UpcomingEventsCard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selected, setSelected] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEvents(JSON.parse(raw));
        return;
      }
    } catch {}
    const seed = getSeedEvents();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    setEvents(seed);
  }, []);

  const upcoming = events
    .map(e => ({ ...e, _d: new Date(e.date) }))
    .filter(e => e._d.getTime() >= new Date(new Date().toDateString()).getTime())
    .sort((a, b) => a._d.getTime() - b._d.getTime())
    .slice(0, 4);

  const goCalendar = (dateIso?: string) =>
    navigate("/client-dashboard-basic", {
      state: { activeTab: "my-calendar", ...(dateIso ? { selectedDate: dateIso } : {}) },
    });

  const originBadge = (ev: CalendarEvent) => {
    if (ev.category === "training") {
      return (
        <Badge variant="secondary" className="gap-1">
          <UserCheck className="h-3 w-3" /> Planned by you
        </Badge>
      );
    }
    if (ev.origin === "trainer") {
      return (
        <Badge className="gap-1 bg-primary/10 text-primary border-primary/30 hover:bg-primary/10">
          <UserPlus className="h-3 w-3" /> Invited by {ev.trainer ?? "trainer"}
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="gap-1">
        <UserCheck className="h-3 w-3" /> Requested by you
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Planned activities and sessions from your calendar</CardDescription>
          </div>
          <Button onClick={() => goCalendar()} variant="default" size="sm" className="w-full sm:w-auto">
            Open Calendar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No upcoming events</p>
            <p className="text-sm mt-1 mb-4">Plan a workout or request a session with your trainer</p>
            <Button onClick={() => goCalendar()} size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Plan an Event
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map(ev => {
              const Icon = iconFor(ev);
              return (
                <div
                  key={ev.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => setSelected(ev)}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorFor(ev)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground truncate">{labelFor(ev)}</p>
                      <Badge variant={ev.category === "session" ? "default" : "secondary"} className="text-xs">
                        {ev.category === "session" ? "Session" : ev.category === "general" ? "General" : "Training"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDay(ev._d)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {ev.time}
                      </span>
                      {ev.trainer && <span className="truncate">with {ev.trainer}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Event details dialog */}
      <Dialog open={!!selected} onOpenChange={o => !o && setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-start gap-2 pr-6">
                  <span className="flex-1">{labelFor(selected)}</span>
                </DialogTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant={selected.category === "session" ? "default" : "secondary"}>
                    {selected.category === "session" ? "Session" : "Training"}
                  </Badge>
                  {originBadge(selected)}
                  {selected.requestStatus && (
                    <Badge
                      variant="outline"
                      className={
                        selected.requestStatus === "confirmed"
                          ? "text-green-600 border-green-500/40"
                          : selected.requestStatus === "declined"
                          ? "text-destructive border-destructive/40"
                          : "text-amber-600 border-amber-500/40"
                      }
                    >
                      {selected.requestStatus.charAt(0).toUpperCase() + selected.requestStatus.slice(1)}
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDay(new Date(selected.date))} · {format(new Date(selected.date), "EEEE, MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{selected.time}</span>
                </div>
                {selected.trainer && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>with {selected.trainer}</span>
                  </div>
                )}
                {selected.sessionMode && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {selected.sessionMode === "video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    <span>{selected.sessionMode === "video" ? "Video Call" : "In Person"}</span>
                  </div>
                )}
                {selected.notes && (
                  <div className="p-3 rounded-lg bg-muted/50 text-foreground">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
                    <p className="whitespace-pre-wrap">{selected.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
                <Button onClick={() => { const iso = selected.date; setSelected(null); goCalendar(iso); }}>
                  Open in Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
