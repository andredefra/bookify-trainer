import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { ClientPostponementNotification } from "@/hooks/useClientPostponements";
import { toast } from "sonner";

interface PostponementNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postponement: ClientPostponementNotification | null;
  onRespond: (responseId: string, response: 'accepted' | 'declined', reason?: string) => Promise<{ success: boolean; error?: string }>;
}

export function PostponementNotificationDialog({
  open,
  onOpenChange,
  postponement,
  onRespond
}: PostponementNotificationDialogProps) {
  const [responseReason, setResponseReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!postponement) return null;

  const handleRespond = async (response: 'accepted' | 'declined') => {
    if (postponement.my_response !== 'pending') {
      toast.error("You have already responded to this postponement");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onRespond(postponement.id, response, responseReason || undefined);
      
      if (result.success) {
        toast.success(`Postponement ${response === 'accepted' ? 'accepted' : 'declined'} successfully`);
        onOpenChange(false);
        setResponseReason("");
      } else {
        toast.error(result.error || 'Failed to respond to postponement');
      }
    } catch (error) {
      toast.error('An error occurred while responding');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = new Date(postponement.deadline_for_responses) < new Date();
  const canRespond = postponement.my_response === 'pending' && !isExpired;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            Session Postponement
          </DialogTitle>
          <DialogDescription>
            Your trainer has requested to postpone a session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Session Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Session</h4>
              <p className="font-medium">{postponement.session_name}</p>
              <p className="text-sm text-muted-foreground">with {postponement.trainer_name}</p>
            </div>

            {/* Original Time */}
            <div>
              <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                <XCircle className="h-3 w-3 text-red-500" />
                Original Time
              </h4>
              <p className="text-sm">{formatDateTime(postponement.original_start)}</p>
            </div>

            {/* New Time */}
            <div>
              <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                New Time
              </h4>
              <p className="text-sm font-medium">{formatDateTime(postponement.new_start)}</p>
            </div>

            {/* Reason */}
            {postponement.reason && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Reason</h4>
                <p className="text-sm">{postponement.reason}</p>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge variant={
              postponement.my_response === 'pending' ? 'secondary' :
              postponement.my_response === 'accepted' ? 'default' : 'destructive'
            }>
              {postponement.my_response === 'pending' ? 'Pending Response' :
               postponement.my_response === 'accepted' ? 'Accepted' : 'Declined'}
            </Badge>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Response deadline:</span>
            <span className={isExpired ? "text-red-500 font-medium" : "font-medium"}>
              {formatDateTime(postponement.deadline_for_responses)}
            </span>
          </div>

          {isExpired && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">The response deadline has passed</span>
            </div>
          )}

          {/* Refund Info */}
          {postponement.requires_refund && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-700">
                {postponement.my_response === 'declined' && (
                  <>A refund of €{postponement.refund_amount?.toFixed(2)} will be processed if you decline.</>
                )}
                {postponement.my_response === 'pending' && (
                  <>If you decline, a refund of €{postponement.refund_amount?.toFixed(2)} will be processed.</>
                )}
              </div>
            </div>
          )}

          {/* Response Reason */}
          {canRespond && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Optional message (visible to your trainer)
              </label>
              <Textarea
                value={responseReason}
                onChange={(e) => setResponseReason(e.target.value)}
                placeholder="Add a message about your response..."
                rows={3}
                className="mt-1"
              />
            </div>
          )}

          {/* Previous response reason */}
          {postponement.my_response !== 'pending' && postponement.response_reason && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Your Response</h4>
              <p className="text-sm bg-muted/50 p-2 rounded">{postponement.response_reason}</p>
            </div>
          )}

          {/* Action Buttons */}
          {canRespond && (
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => handleRespond('declined')}
                disabled={isSubmitting}
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </Button>
              <Button
                onClick={() => handleRespond('accepted')}
                disabled={isSubmitting}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}