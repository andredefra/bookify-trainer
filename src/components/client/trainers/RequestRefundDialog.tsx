import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RotateCcw, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { patchDemoTransaction } from "@/lib/demoTransactionsBridge";
import { notifyDemo } from "@/lib/demoNotify";

interface RequestRefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId?: number;
  trainerName: string;
  serviceName: string;
  serviceDate: string;
  amount: number;
}

export function RequestRefundDialog({
  open,
  onOpenChange,
  transactionId,
  trainerName,
  serviceName,
  serviceDate,
  amount,
}: RequestRefundDialogProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for your refund request");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    if (transactionId) {
      patchDemoTransaction(transactionId, {
        refundStatus: "pending",
        refundReason: reason,
        refundRequestedAt: new Date().toISOString(),
      });
      notifyDemo({
        to: "trainer",
        title: "Nuova richiesta di rimborso",
        description: `${serviceName} del ${serviceDate} — €${amount} · Motivo: ${reason}`,
      });
    }
    toast.success(`Refund request sent to ${trainerName}`);
    setReason("");
    setIsSubmitting(false);
    onOpenChange(false);
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Request Refund
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Request a refund from <span className="font-medium text-foreground">{trainerName}</span> for:
          </p>

          <div className="rounded-md bg-muted p-3 space-y-1">
            <p className="text-sm font-medium">{serviceName}</p>
            <p className="text-sm text-muted-foreground">{serviceDate}</p>
            <p className="text-sm font-semibold">€{amount}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for refund *</Label>
            <Textarea
              id="reason"
              placeholder="The session was cancelled..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="flex items-start gap-2 rounded-md bg-amber-500/10 p-3 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-muted-foreground">
              Your trainer will be notified and can approve or reject this request.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !reason.trim()}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
