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

export function CalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [trainerFilter, setTrainerFilter] = useState("all");

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const sessions = [
    { time: "09:00", endTime: "10:00", client: "Sarah Johnson", trainer: "Marco Rossi", type: "Personal Training", status: "confirmed" },
    { time: "10:00", endTime: "10:45", client: "Group Session (8/12)", trainer: "Laura Bianchi", type: "HIIT Class", status: "confirmed" },
    { time: "11:00", endTime: "12:00", client: "Michael Brown", trainer: "Marco Rossi", type: "Personal Training", status: "confirmed" },
    { time: "14:00", endTime: "15:00", client: "Emma Wilson", trainer: "Giuseppe Verde", type: "Strength Training", status: "pending" },
    { time: "16:00", endTime: "17:00", client: "Group Session (15/20)", trainer: "Laura Bianchi", type: "Yoga Class", status: "confirmed" },
    { time: "17:30", endTime: "18:30", client: "Sofia Martinez", trainer: "Marco Rossi", type: "Personal Training", status: "confirmed" },
  ];

  const trainers = ["Marco Rossi", "Laura Bianchi", "Giuseppe Verde"];

  const filteredSessions = trainerFilter === "all" 
    ? sessions 
    : sessions.filter(s => s.trainer === trainerFilter);

  const stats = {
    todaySessions: sessions.length,
    confirmedSessions: sessions.filter(s => s.status === "confirmed").length,
    totalClients: new Set(sessions.map(s => s.client)).size,
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
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
              <p className="text-sm text-muted-foreground">Clients Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="min-w-[180px] text-center">{monthName}</CardTitle>
            <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
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
                  <SelectItem key={trainer} value={trainer}>{trainer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              <Button variant={viewMode === "day" ? "default" : "outline"} size="sm" onClick={() => setViewMode("day")}>Day</Button>
              <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>Week</Button>
              <Button variant={viewMode === "month" ? "default" : "outline"} size="sm" onClick={() => setViewMode("month")}>Month</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Today's Sessions</h3>
            {filteredSessions.map((session, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-24 flex-shrink-0">
                  <p className="font-medium">{session.time}</p>
                  <p className="text-xs text-muted-foreground">{session.endTime}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{session.client}</p>
                  <p className="text-sm text-muted-foreground">{session.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{session.trainer}</p>
                    <p className="text-xs text-muted-foreground">Trainer</p>
                  </div>
                  <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                    {session.status}
                  </Badge>
                </div>
              </div>
            ))}
            {filteredSessions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No sessions scheduled for the selected filter.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
