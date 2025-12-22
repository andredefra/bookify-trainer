import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Users, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

interface CalendarSession {
  id: string;
  time: string;
  endTime: string;
  client: string;
  trainer: string;
  trainerColor: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled";
  date: Date;
}

const trainerColors: Record<string, string> = {
  "Marco Rossi": "bg-blue-500",
  "Laura Bianchi": "bg-green-500",
  "Giuseppe Verde": "bg-purple-500",
};

export function CalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
  const [trainerFilter, setTrainerFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDayDialog, setShowDayDialog] = useState(false);

  const trainers = ["Marco Rossi", "Laura Bianchi", "Giuseppe Verde"];

  // Mock sessions data
  const sessions: CalendarSession[] = [
    { id: "1", time: "09:00", endTime: "10:00", client: "Sarah Johnson", trainer: "Marco Rossi", trainerColor: trainerColors["Marco Rossi"], type: "Personal Training", status: "confirmed", date: new Date() },
    { id: "2", time: "10:00", endTime: "10:45", client: "Group Session (8/12)", trainer: "Laura Bianchi", trainerColor: trainerColors["Laura Bianchi"], type: "HIIT Class", status: "confirmed", date: new Date() },
    { id: "3", time: "11:00", endTime: "12:00", client: "Michael Brown", trainer: "Marco Rossi", trainerColor: trainerColors["Marco Rossi"], type: "Personal Training", status: "confirmed", date: new Date() },
    { id: "4", time: "14:00", endTime: "15:00", client: "Emma Wilson", trainer: "Giuseppe Verde", trainerColor: trainerColors["Giuseppe Verde"], type: "Strength Training", status: "pending", date: new Date() },
    { id: "5", time: "16:00", endTime: "17:00", client: "Group Session (15/20)", trainer: "Laura Bianchi", trainerColor: trainerColors["Laura Bianchi"], type: "Yoga Class", status: "confirmed", date: addDays(new Date(), 1) },
    { id: "6", time: "17:30", endTime: "18:30", client: "Sofia Martinez", trainer: "Marco Rossi", trainerColor: trainerColors["Marco Rossi"], type: "Personal Training", status: "confirmed", date: addDays(new Date(), 1) },
    { id: "7", time: "09:00", endTime: "10:00", client: "John Doe", trainer: "Giuseppe Verde", trainerColor: trainerColors["Giuseppe Verde"], type: "Personal Training", status: "confirmed", date: addDays(new Date(), 2) },
    { id: "8", time: "11:00", endTime: "12:00", client: "Jane Smith", trainer: "Laura Bianchi", trainerColor: trainerColors["Laura Bianchi"], type: "Pilates", status: "pending", date: addDays(new Date(), 3) },
  ];

  const filteredSessions = trainerFilter === "all" 
    ? sessions 
    : sessions.filter(s => s.trainer === trainerFilter);

  const getSessionsForDate = (date: Date) => {
    return filteredSessions.filter(s => isSameDay(s.date, date));
  };

  const navigate = (direction: number) => {
    if (viewMode === "month") {
      setCurrentDate(direction > 0 ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
    } else if (viewMode === "week") {
      setCurrentDate(direction > 0 ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, direction));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowDayDialog(true);
  };

  const stats = {
    todaySessions: getSessionsForDate(new Date()).length,
    confirmedSessions: sessions.filter(s => s.status === "confirmed").length,
    totalClients: new Set(sessions.map(s => s.client)).size,
  };

  // Generate calendar days for month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Generate week days for week view
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const renderMonthView = () => (
    <div className="grid grid-cols-7 gap-1">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
        <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
          {day}
        </div>
      ))}
      {calendarDays.map((day, index) => {
        const daySessions = getSessionsForDate(day);
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, currentDate);
        
        return (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`min-h-[80px] md:min-h-[100px] p-1 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
              isToday ? "bg-primary/10 border-primary" : "border-border"
            } ${!isCurrentMonth ? "opacity-40" : ""}`}
          >
            <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>
              {format(day, "d")}
            </div>
            <div className="space-y-0.5">
              {daySessions.slice(0, 3).map((session) => (
                <div
                  key={session.id}
                  className={`text-xs px-1 py-0.5 rounded text-white truncate ${session.trainerColor}`}
                  title={`${session.time} - ${session.client}`}
                >
                  <span className="hidden md:inline">{session.time} </span>
                  {session.client.split(" ")[0]}
                </div>
              ))}
              {daySessions.length > 3 && (
                <div className="text-xs text-muted-foreground px-1">
                  +{daySessions.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderWeekView = () => (
    <div className="grid grid-cols-7 gap-2">
      {weekDays.map((day, index) => {
        const daySessions = getSessionsForDate(day);
        const isToday = isSameDay(day, new Date());
        
        return (
          <div key={index} className="min-h-[300px]">
            <div
              className={`text-center py-2 mb-2 rounded-lg ${
                isToday ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <div className="text-xs font-medium">{format(day, "EEE")}</div>
              <div className="text-lg font-bold">{format(day, "d")}</div>
            </div>
            <div className="space-y-1">
              {daySessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-2 rounded text-white text-xs ${session.trainerColor}`}
                >
                  <div className="font-medium">{session.time}</div>
                  <div className="truncate">{session.client}</div>
                  <div className="truncate opacity-80">{session.type}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderDayView = () => {
    const daySessions = getSessionsForDate(currentDate);
    const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7 AM to 6 PM
    
    return (
      <div className="space-y-2">
        <div className="text-center py-4 bg-muted rounded-lg mb-4">
          <div className="text-lg font-bold">{format(currentDate, "EEEE, MMMM d, yyyy")}</div>
        </div>
        <div className="space-y-1">
          {hours.map((hour) => {
            const hourSessions = daySessions.filter(s => parseInt(s.time) === hour);
            return (
              <div key={hour} className="flex gap-4 min-h-[60px] border-t pt-2">
                <div className="w-16 text-sm text-muted-foreground">
                  {hour.toString().padStart(2, "0")}:00
                </div>
                <div className="flex-1 space-y-1">
                  {hourSessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-2 rounded text-white ${session.trainerColor}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{session.time} - {session.endTime}</div>
                          <div>{session.client}</div>
                          <div className="text-sm opacity-80">{session.type}</div>
                        </div>
                        <Badge variant={session.status === "confirmed" ? "default" : "secondary"} className="bg-white/20">
                          {session.status}
                        </Badge>
                      </div>
                      <div className="text-sm mt-1">Trainer: {session.trainer}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getTitle = () => {
    if (viewMode === "month") return format(currentDate, "MMMM yyyy");
    if (viewMode === "week") return `Week of ${format(weekStart, "MMM d")} - ${format(addDays(weekStart, 6), "MMM d, yyyy")}`;
    return format(currentDate, "EEEE, MMMM d, yyyy");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">View and manage all studio sessions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{stats.todaySessions}</div>
              <p className="text-sm text-muted-foreground">Today's Sessions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Clock className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.confirmedSessions}</div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Users className="h-8 w-8 text-muted-foreground" />
            <div>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-sm text-muted-foreground">Clients This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <CardTitle className="min-w-[200px] text-center">{getTitle()}</CardTitle>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={trainerFilter} onValueChange={setTrainerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by trainer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                {trainers.map(trainer => (
                  <SelectItem key={trainer} value={trainer}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${trainerColors[trainer]}`} />
                      {trainer}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-1 bg-muted p-1 rounded-lg">
              <Button 
                variant={viewMode === "day" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("day")}
              >
                Day
              </Button>
              <Button 
                variant={viewMode === "week" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button 
                variant={viewMode === "month" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "month" && renderMonthView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
        </CardContent>
      </Card>

      {/* Trainer Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {trainers.map(trainer => (
          <div key={trainer} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${trainerColors[trainer]}`} />
            <span className="text-sm">{trainer}</span>
          </div>
        ))}
      </div>

      {/* Day Details Dialog */}
      <Dialog open={showDayDialog} onOpenChange={setShowDayDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
            </DialogTitle>
            <DialogDescription>
              Sessions scheduled for this day
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {selectedDate && getSessionsForDate(selectedDate).length > 0 ? (
              getSessionsForDate(selectedDate).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                >
                  <div className={`w-2 h-full min-h-[40px] rounded-full ${session.trainerColor}`} />
                  <div className="flex-1">
                    <div className="font-medium">{session.time} - {session.endTime}</div>
                    <div className="text-sm">{session.client}</div>
                    <div className="text-xs text-muted-foreground">{session.type} • {session.trainer}</div>
                  </div>
                  <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                    {session.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No sessions scheduled for this day
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDayDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowDayDialog(false);
              // TODO: Open create session dialog
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
