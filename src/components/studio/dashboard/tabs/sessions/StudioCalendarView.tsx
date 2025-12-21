import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, isToday } from "date-fns";
import { StudioSession } from "./StudioSessionList";

interface StudioCalendarViewProps {
  sessions: StudioSession[];
  trainers: { id: string; name: string }[];
  onSelectDate: (date: Date) => void;
  onSelectSession: (session: StudioSession) => void;
  onCreateSession: () => void;
}

export function StudioCalendarView({ 
  sessions, 
  trainers, 
  onSelectDate, 
  onSelectSession,
  onCreateSession 
}: StudioCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [trainerFilter, setTrainerFilter] = useState("all");

  const filteredSessions = useMemo(() => {
    if (trainerFilter === "all") return sessions;
    return sessions.filter(s => s.trainerId === trainerFilter);
  }, [sessions, trainerFilter]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  const getSessionsForDay = (day: Date) => {
    return filteredSessions.filter(session => 
      isSameDay(new Date(session.date), day)
    );
  };

  const getTrainerColor = (trainerId: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
    ];
    const index = trainerId.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(direction > 0 ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold min-w-[200px] text-center">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={trainerFilter} onValueChange={setTrainerFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by trainer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trainers</SelectItem>
              {trainers.map(trainer => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getTrainerColor(trainer.id)}`} />
                    {trainer.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onCreateSession}>
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      {/* Trainer Legend */}
      <div className="flex flex-wrap gap-3">
        {trainers.map(trainer => (
          <div key={trainer.id} className="flex items-center gap-1.5 text-sm">
            <div className={`w-3 h-3 rounded-full ${getTrainerColor(trainer.id)}`} />
            <span>{trainer.name}</span>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const daySessions = getSessionsForDay(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const today = isToday(day);
              
              return (
                <div
                  key={index}
                  onClick={() => onSelectDate(day)}
                  className={`
                    min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors
                    ${isCurrentMonth ? "bg-background" : "bg-muted/30"}
                    ${today ? "border-primary border-2" : "border-border"}
                    hover:bg-muted/50
                  `}
                >
                  <div className={`text-sm font-medium mb-1 ${today ? "text-primary" : isCurrentMonth ? "" : "text-muted-foreground"}`}>
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1">
                    {daySessions.slice(0, 3).map((session) => (
                      <div
                        key={session.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSession(session);
                        }}
                        className={`
                          text-xs p-1 rounded truncate text-white cursor-pointer
                          ${getTrainerColor(session.trainerId)}
                          hover:opacity-80
                        `}
                      >
                        {session.startTime} {session.title}
                      </div>
                    ))}
                    {daySessions.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{daySessions.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
