import { useState } from "react";
import { SessionRequest } from "@/hooks/useSessionSales";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { XCircle } from "lucide-react";

interface DeclineRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: SessionRequest | null;
  onConfirm: (requestId: string, reason?: string) => void;
}

export function DeclineRequestDialog({
  open,
  onOpenChange,
  request,
  onConfirm,
}: DeclineRequestDialogProps) {
  const [reason, setReason] = useState("");
  const [sendNotification, setSendNotification] = useState(true);

  if (!request) return null;

  const handleConfirm = () => {
    onConfirm(request.id, sendNotification ? reason : undefined);
    onOpenChange(false);
    // Reset state
    setReason("");
    setSendNotification(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            Decline Session Request
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to decline the request from {request.clientName}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Session Info */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="font-medium text-sm">{request.sessionTitle}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {request.clientName} • {request.clientEmail}
            </p>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">
              Reason for declining (optional)
            </Label>
            <Textarea
              id="reason"
              placeholder="E.g., Schedule conflict, session type not available, etc."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* Send Notification */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="send-notification"
              checked={sendNotification}
              onCheckedChange={(checked) => setSendNotification(checked as boolean)}
            />
            <Label htmlFor="send-notification" className="cursor-pointer text-sm">
              Send notification to {request.clientName}
              {reason && (
                <span className="text-muted-foreground block mt-1">
                  (Your reason will be included in the notification)
                </span>
              )}
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="gap-2"
          >
            <XCircle className="h-4 w-4" />
            Decline Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
