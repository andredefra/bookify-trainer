import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Eye, Calendar, Clock, User, Users } from "lucide-react";
import { format } from "date-fns";

export interface StudioSession {
  id: string;
  title: string;
  clientName: string;
  clientId?: string;
  trainerName: string;
  trainerId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "personal" | "group";
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  participants?: number;
  maxParticipants?: number;
  location?: string;
  notes?: string;
}

interface StudioSessionListProps {
  sessions: StudioSession[];
  onViewSession: (session: StudioSession) => void;
  onEditSession: (session: StudioSession) => void;
  onCancelSession: (session: StudioSession) => void;
}

export function StudioSessionList({ 
  sessions, 
  onViewSession, 
  onEditSession, 
  onCancelSession 
}: StudioSessionListProps) {
  const getStatusColor = (status: StudioSession["status"]) => {
    switch (status) {
      case "confirmed": return "default";
      case "scheduled": return "secondary";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getTrainerColor = (trainerId: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-pink-100 text-pink-800",
    ];
    const index = trainerId.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 bg-muted/20 rounded-lg border border-dashed">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No sessions found</p>
        <p className="text-sm text-muted-foreground">Create a new session to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <Card key={session.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-20 flex-shrink-0 text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    {format(new Date(session.date), "MMM dd")}
                  </p>
                  <p className="text-lg font-bold">{session.startTime}</p>
                  <p className="text-xs text-muted-foreground">{session.endTime}</p>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate">{session.title}</h4>
                    <Badge variant={getStatusColor(session.status)} className="text-xs">
                      {session.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {session.type === "personal" ? (
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {session.clientName}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {session.participants || 0}/{session.maxParticipants || 10} participants
                      </span>
                    )}
                    
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getTrainerColor(session.trainerId)}`}>
                      {session.trainerName}
                    </span>
                    
                    {session.location && (
                      <span className="text-xs">{session.location}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onViewSession(session)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditSession(session)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Session
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => onCancelSession(session)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel Session
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
