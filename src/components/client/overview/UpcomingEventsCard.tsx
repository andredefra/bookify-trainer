import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Dumbbell, Flame, Heart, Bed, User, Clock, ArrowRight, Plus } from "lucide-react";
import { addDays, format, isToday, isTomorrow } from "date-fns";

interface CalendarEvent {
  id: string;
  date: string; // ISO
  time: string;
  category: "training" | "session";
  type: string;
  notes?: string;
  trainer?: string;
  sessionMode?: "video" | "in-person";
}

const STORAGE_KEY = "basic-calendar-events-v2";

function getSeedEvents(): CalendarEvent[] {
  const now = new Date();
  return [
    {
      id: "seed-1",
      date: now.toISOString(),
      time: "18:30",
      category: "training",
      type: "workout",
      notes: "Upper Body Workout",
    },
    {
      id: "seed-2",
      date: addDays(now, 1).toISOString(),
      time: "07:30",
      category: "training",
      type: "cardio",
      notes: "Morning Run 5K",
    },
    {
      id: "seed-3",
      date: addDays(now, 2).toISOString(),
      time: "10:00",
      category: "session",
      type: "workout",
      trainer: "Marco Rossi",
      sessionMode: "in-person",
      notes: "Personal training – Lower Body",
    },
    {
      id: "seed-4",
      date: addDays(now, 4).toISOString(),
      time: "19:00",
      category: "training",
      type: "workout",
      notes: "HIIT 20'",
    },
    {
      id: "seed-5",
      date: addDays(now, 6).toISOString(),
      time: "09:00",
      category: "session",
      type: "workout",
      trainer: "Marco Rossi",
      sessionMode: "video",
      notes: "Weekly check-in review",
    },
  ];
}

function iconFor(ev: CalendarEvent) {
  if (ev.category === "session") return User;
  switch (ev.type) {
    case "cardio": return Flame;
    case "stretching": return Heart;
    case "rest": return Bed;
    default: return Dumbbell;
  }
}

function colorFor(ev: CalendarEvent) {
  if (ev.category === "session") return "bg-primary/10 text-primary";
  switch (ev.type) {
    case "cardio": return "bg-orange-500/10 text-orange-600";
    case "stretching": return "bg-purple-500/10 text-purple-600";
    case "rest": return "bg-green-500/10 text-green-600";
    default: return "bg-blue-500/10 text-blue-600";
  }
}

function labelFor(ev: CalendarEvent) {
  if (ev.category === "session") return ev.notes || `Session with ${ev.trainer ?? "trainer"}`;
  const map: Record<string, string> = {
    workout: "Workout",
    cardio: "Cardio",
    stretching: "Stretching",
    rest: "Rest Day",
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

  const goCalendar = () =>
    navigate("/client-dashboard-basic", { state: { activeTab: "my-calendar" } });

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
          <Button onClick={goCalendar} variant="default" size="sm" className="w-full sm:w-auto">
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
            <Button onClick={goCalendar} size="sm" variant="outline">
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
                  onClick={goCalendar}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorFor(ev)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground truncate">{labelFor(ev)}</p>
                      <Badge variant={ev.category === "session" ? "default" : "secondary"} className="text-xs">
                        {ev.category === "session" ? "Session" : "Training"}
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
    </Card>
  );
}
