
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SessionItem } from "@/types/sessions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Monitor, Users, User } from "lucide-react";

interface PastSessionsTabProps {
  pastSessions: SessionItem[];
}

// Mock participant data for past sessions
const sessionParticipants: Record<number, { name: string; avatar?: string }[]> = {
  201: [
    { name: "You" },
    { name: "Marco Rossi" },
    { name: "Elena Bianchi" },
    { name: "Luca Verdi" },
    { name: "Sofia Conti" },
    { name: "Andrea Marino" },
  ],
  202: [
    { name: "You" },
    { name: "Giulia Ferrari" },
    { name: "Paolo Ricci" },
    { name: "Chiara Colombo" },
    { name: "Davide Greco" },
    { name: "Valentina Bruno" },
    { name: "Matteo Romano" },
    { name: "Francesca Costa" },
  ],
};

export function PastSessionsTab({ pastSessions }: PastSessionsTabProps) {
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);

  const formatDate = (date: string | Date): string => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return date;
  };

  const participants = selectedSession ? sessionParticipants[selectedSession.id] || [] : [];

  return (
    <>
      <div className="space-y-4">
        {pastSessions.map((session) => (
          <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-medium">{session.name}</h3>
              <div className="text-sm text-muted-foreground">
                With {session.trainer} • {formatDate(session.date)} • {session.time}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border">
                Completed
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setSelectedSession(session)}>
                View Summary
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedSession} onOpenChange={(open) => !open && setSelectedSession(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedSession?.name}</DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-5">
              {/* Session Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{selectedSession.trainer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedSession.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{selectedSession.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {selectedSession.mode === "video" ? (
                    <Monitor className="h-4 w-4" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  <span className="capitalize">{selectedSession.mode}</span>
                </div>
              </div>

              {selectedSession.address && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3">
                  <MapPin className="h-3.5 w-3.5 inline mr-1" />
                  {selectedSession.address}
                </div>
              )}

              {/* Description */}
              {selectedSession.description && (
                <div>
                  <h4 className="text-sm font-medium mb-1.5">Session Recap</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSession.description}
                  </p>
                </div>
              )}

              {/* Participants */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">
                    Participants ({participants.length})
                  </h4>
                </div>
                <div className="space-y-2">
                  {participants.map((participant, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 rounded-md bg-muted/30"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                        {participant.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium">
                        {participant.name}
                        {participant.name === "You" && (
                          <Badge variant="outline" className="ml-2 text-xs py-0">You</Badge>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
