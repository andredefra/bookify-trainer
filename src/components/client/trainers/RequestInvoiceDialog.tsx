import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RequestInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainerName: string;
  serviceName: string;
  serviceDate: string;
  amount: number;
}

export function RequestInvoiceDialog({
  open,
  onOpenChange,
  trainerName,
  serviceName,
  serviceDate,
  amount,
}: RequestInvoiceDialogProps) {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call - in production this would send notification to trainer
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success(`Invoice request sent to ${trainerName}`);
    setNote("");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Request Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Request an invoice from <span className="font-medium text-foreground">{trainerName}</span> for:
          </p>

          <div className="rounded-md bg-muted p-3 space-y-1">
            <p className="text-sm font-medium">{serviceName}</p>
            <p className="text-sm text-muted-foreground">{serviceDate}</p>
            <p className="text-sm font-semibold">€{amount}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              placeholder="I need the invoice for tax purposes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
