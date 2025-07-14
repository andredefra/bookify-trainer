import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CancelSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionTitle: string;
  scheduleId: string;
  scheduledDate: string;
  participantCount: number;
  onCancelSession: (scheduleId: string, reason: string) => void;
}

export function CancelSessionDialog({
  open,
  onOpenChange,
  sessionTitle,
  scheduleId,
  scheduledDate,
  participantCount,
  onCancelSession
}: CancelSessionDialogProps) {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    if (!reason.trim()) return;
    
    setIsLoading(true);
    try {
      await onCancelSession(scheduleId, reason);
      setReason("");
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] mx-4">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-left">Cancel Session</DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone. Participants will be notified automatically.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Session Details */}
          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Session Details</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{sessionTitle}</span>
                <Badge variant="destructive">Will be cancelled</Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(scheduledDate)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{participantCount} participant{participantCount !== 1 ? 's' : ''} will be notified</span>
              </div>
            </div>
          </div>

          {/* Cancellation Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Cancellation Reason *</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for cancelling this session (will be sent to participants)..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              This reason will be included in the notification sent to all participants.
            </p>
          </div>

          {/* Impact Warning */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <div className="flex gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">What happens next:</p>
                <ul className="mt-1 text-amber-700 space-y-1">
                  <li>• All {participantCount} participants will receive an email notification</li>
                  <li>• The session will be marked as cancelled in the system</li>
                  <li>• Participants can request refunds if applicable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Keep Session
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={!reason.trim() || isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Cancelling..." : "Cancel Session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}