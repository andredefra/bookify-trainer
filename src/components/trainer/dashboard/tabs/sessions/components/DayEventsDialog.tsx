import { TrainerSessionItem } from "@/types/sessions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Video, Users } from "lucide-react";

interface DayEventsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  sessions: TrainerSessionItem[];
  onSessionClick: (session: TrainerSessionItem) => void;
}

export function DayEventsDialog({
  open,
  onOpenChange,
  date,
  sessions,
  onSessionClick,
}: DayEventsDialogProps) {
  const getSessionTypeColor = (session: TrainerSessionItem) => {
    if (session.mode === 'video') {
      return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
    }
    if (session.maxParticipants > 1) {
      return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
  };

  const sortedSessions = [...sessions].sort((a, b) => {
    const timeA = a.time.split(' - ')[0];
    const timeB = b.time.split(' - ')[0];
    return timeA.localeCompare(timeB);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {sortedSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => {
                onSessionClick(session);
                onOpenChange(false);
              }}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${getSessionTypeColor(session)}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-2">
                    {session.mode === 'video' && <Video className="h-4 w-4" />}
                    {session.name}
                  </div>
                  <div className="text-sm opacity-80">{session.time}</div>
                </div>
                <Badge variant="outline" className="bg-background">
                  <Users className="h-3 w-3 mr-1" />
                  {session.participants}/{session.maxParticipants}
                </Badge>
              </div>
              
              {session.description && (
                <div className="text-xs opacity-70 line-clamp-1 mt-1">
                  {session.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
