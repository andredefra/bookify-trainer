import { BaseWidget } from "./BaseWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MoreVertical, Phone, Video } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SessionAgenda } from "./types";

export function TodaysAgendaWidget() {
  const sessions: SessionAgenda[] = [
    {
      id: "1",
      time: "09:00",
      clientName: "Marco Rossi",
      type: "Personal Training",
      duration: 60,
      isPaid: true,
      status: "upcoming"
    },
    {
      id: "2",
      time: "11:00",
      clientName: "Anna Bianchi",
      type: "Nutrition Consultation",
      duration: 45,
      isPaid: false,
      status: "upcoming"
    },
    {
      id: "3",
      time: "14:30",
      clientName: "Luca Verdi",
      type: "Assessment",
      duration: 30,
      isPaid: true,
      status: "upcoming"
    }
  ];

  if (sessions.length === 0) {
    return (
      <BaseWidget title="Today's Agenda" icon={Clock} className="col-span-full lg:col-span-2">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No sessions scheduled for today</p>
          <Button variant="outline" size="sm" className="mt-4">
            Schedule Session
          </Button>
        </div>
      </BaseWidget>
    );
  }

  return (
    <BaseWidget 
      title="Today's Agenda" 
      icon={Clock}
      className="col-span-full lg:col-span-2"
      action={
        <Button variant="ghost" size="sm">View All</Button>
      }
    >
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex flex-col items-center min-w-[60px]">
              <span className="text-sm font-semibold">{session.time}</span>
              <span className="text-xs text-muted-foreground">{session.duration}min</span>
            </div>
            
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {session.clientName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{session.clientName}</p>
              <p className="text-sm text-muted-foreground truncate">{session.type}</p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={session.isPaid ? "secondary" : "destructive"}>
                {session.isPaid ? "Paid" : "Unpaid"}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Client
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Video className="h-4 w-4 mr-2" />
                    Start Session
                  </DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}
