import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, Users, MapPin, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { StudioSession } from "./StudioSessionList";

interface SessionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: StudioSession | null;
  onEdit: (session: StudioSession) => void;
  onCancel: (session: StudioSession) => void;
}

export function SessionDetailsDialog({
  open,
  onOpenChange,
  session,
  onEdit,
  onCancel,
}: SessionDetailsDialogProps) {
  if (!session) return null;

  const getStatusColor = (status: StudioSession["status"]) => {
    switch (status) {
      case "confirmed": return "default";
      case "scheduled": return "secondary";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{session.title}</DialogTitle>
            <Badge variant={getStatusColor(session.status)}>{session.status}</Badge>
          </div>
          <DialogDescription>
            Session details and management options
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(session.date), "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{session.startTime} - {session.endTime}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Trainer:</span>
              <span className="font-medium">{session.trainerName}</span>
            </div>
            
            {session.type === "personal" ? (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Client:</span>
                <span className="font-medium">{session.clientName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Participants:</span>
                <span className="font-medium">
                  {session.participants || 0} / {session.maxParticipants || 10}
                </span>
              </div>
            )}
            
            {session.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Location:</span>
                <span className="font-medium">{session.location}</span>
              </div>
            )}
          </div>
          
          {session.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{session.notes}</p>
              </div>
            </>
          )}
          
          <Separator />
          
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {session.type === "personal" ? "Personal Training" : "Group Class"}
            </Badge>
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button 
            variant="destructive" 
            onClick={() => {
              onCancel(session);
              onOpenChange(false);
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Cancel Session
          </Button>
          <Button 
            onClick={() => {
              onEdit(session);
              onOpenChange(false);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
