import { TrainerSessionItem } from "@/types/sessions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Users, MapPin, Calendar, Clock } from "lucide-react";
import { InviteLinkButton } from "./InviteLinkButton";

interface SessionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: TrainerSessionItem | null;
  onEdit: (session: TrainerSessionItem) => void;
  onCancel: (session: TrainerSessionItem) => void;
  onStartVideo?: (session: TrainerSessionItem) => void;
  onViewParticipants: (session: TrainerSessionItem) => void;
}

export function SessionDetailsDialog({
  open,
  onOpenChange,
  session,
  onEdit,
  onCancel,
  onStartVideo,
  onViewParticipants,
}: SessionDetailsDialogProps) {
  if (!session) return null;

  const handleEdit = () => {
    onEdit(session);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel(session);
    onOpenChange(false);
  };

  const handleStartVideo = () => {
    if (onStartVideo) {
      onStartVideo(session);
      onOpenChange(false);
    }
  };

  const handleViewParticipants = () => {
    onViewParticipants(session);
    onOpenChange(false);
  };

  const getSessionTypeColor = () => {
    if (session.mode === 'video') {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
    if (session.maxParticipants > 1) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {session.mode === 'video' && <Video className="h-5 w-5 text-purple-600" />}
            {session.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Session Type Badge */}
          <div>
            <Badge className={getSessionTypeColor()}>
              {session.mode === 'video' ? 'Video Session' : session.maxParticipants > 1 ? 'Group Session' : 'Personal Training'}
            </Badge>
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {typeof session.date === 'string' 
                  ? new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                  : session.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{session.time}</span>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Participants</span>
            </div>
            <Badge variant="outline">
              {session.participants}/{session.maxParticipants}
            </Badge>
          </div>

          {/* Location (if in-person) */}
          {session.mode === 'in-person' && session.address && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground">{session.address}</div>
                {session.locationNotes && (
                  <div className="text-xs text-muted-foreground mt-1">{session.locationNotes}</div>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {session.description && (
            <div className="text-sm">
              <div className="font-medium mb-1">Description</div>
              <div className="text-muted-foreground">{session.description}</div>
            </div>
          )}

          {/* Payment Status */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">Payment Status</span>
            <div className="text-sm">
              <span className="text-green-600 font-medium">{session.paymentStatus.paid} paid</span>
              {session.paymentStatus.pending > 0 && (
                <span className="text-orange-600 font-medium ml-2">· {session.paymentStatus.pending} pending</span>
              )}
            </div>
          </div>

          {/* Waiting List */}
          {session.waitingList && session.waitingList > 0 && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm">
              <span className="font-medium text-orange-800">{session.waitingList} on waiting list</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <InviteLinkButton session={session} />
          <Button variant="outline" onClick={handleViewParticipants} className="w-full sm:w-auto">
            <Users className="h-4 w-4 mr-2" />
            View Participants
          </Button>
          {session.mode === 'video' && session.status === 'scheduled' && onStartVideo ? (
            <Button variant="secondary" onClick={handleStartVideo} className="w-full sm:w-auto">
              <Video className="h-4 w-4 mr-2" />
              Start Video
            </Button>
          ) : (
            <Button variant="outline" onClick={handleEdit} className="w-full sm:w-auto">
              Edit
            </Button>
          )}
          <Button variant="destructive" onClick={handleCancel} className="w-full sm:w-auto">
            Cancel Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
