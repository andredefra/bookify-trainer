import { SessionItem } from "@/types/sessions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Video, Euro, MessageSquare } from "lucide-react";

interface AcceptInvitePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onAccept: () => void;
}

export function AcceptInvitePaymentDialog({
  open,
  onOpenChange,
  session,
  onAccept
}: AcceptInvitePaymentDialogProps) {
  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Accept Session Invitation</DialogTitle>
          <DialogDescription>
            Review session details and confirm your attendance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Details */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{session.name}</h3>
                <p className="text-sm text-muted-foreground">with {session.trainer}</p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Invited Session
              </Badge>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{typeof session.date === 'string' ? session.date : session.date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {session.mode === 'video' ? (
                  <>
                    <Video className="w-4 h-4 text-muted-foreground" />
                    <span>Video Session</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{session.address}</span>
                  </>
                )}
              </div>
            </div>

            {session.description && (
              <p className="text-sm text-muted-foreground">{session.description}</p>
            )}
          </div>

          <Separator />

          {/* Trainer Message */}
          {session.inviteMessage && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-start gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-sm font-medium">Message from {session.trainer}</span>
              </div>
              <p className="text-sm italic text-muted-foreground ml-6">
                "{session.inviteMessage}"
              </p>
            </div>
          )}

          {/* Price Info */}
          {session.paymentRequired && session.price && (
            <>
              <Separator />
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Session Price</span>
                  <div className="text-2xl font-bold text-primary flex items-center gap-1">
                    <Euro className="w-5 h-5" />
                    {session.price}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  You'll complete payment in the next step after accepting this invitation
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={onAccept}
            className="w-full sm:w-auto"
          >
            Accept Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
