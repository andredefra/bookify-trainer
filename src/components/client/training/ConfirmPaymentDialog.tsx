import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrainingProgram } from "@/data/training/types";
import { CheckCircle, DollarSign } from "lucide-react";

interface ConfirmPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: TrainingProgram | null;
  onConfirm: (notes?: string) => void;
}

export function ConfirmPaymentDialog({
  open,
  onOpenChange,
  program,
  onConfirm
}: ConfirmPaymentDialogProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onConfirm(notes);
    setIsSubmitting(false);
    // Reset form
    setConfirmed(false);
    setNotes("");
  };

  if (!program) return null;

  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Confirm Payment
          </DialogTitle>
          <DialogDescription>
            Confirm that you have completed the payment for this program
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Summary */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Program</p>
              <p className="font-medium">{program.title}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trainer</p>
              <p className="font-medium">{program.trainerName}</p>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Amount</span>
                </div>
                <p className="text-xl font-bold">{formatCurrency(program.totalPrice || 0)}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Payment method: {program.paymentMethod?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start space-x-3 bg-primary/5 p-4 rounded-lg">
            <Checkbox 
              id="confirm-payment" 
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <div className="space-y-1 leading-none">
              <Label 
                htmlFor="confirm-payment"
                className="text-sm font-medium leading-tight cursor-pointer"
              >
                I confirm I have made this payment in cash
              </Label>
              <p className="text-xs text-muted-foreground">
                By checking this box, you confirm that you have paid the full amount to your trainer
              </p>
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-2">
            <Label htmlFor="payment-notes" className="text-sm">
              Notes (optional)
            </Label>
            <Textarea
              id="payment-notes"
              placeholder="Add any notes about the payment (e.g., date, reference number...)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!confirmed || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              "Confirming..."
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Confirm Payment
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
