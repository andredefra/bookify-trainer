import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Transaction } from "../types/TransactionHistoryTypes";
import { CheckCircle, XCircle, UserX, Banknote } from "lucide-react";

interface CashPaymentConfirmationDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (transactionId: number) => void;
  onReject: (transactionId: number) => void;
  onNoShow: (transactionId: number) => void;
}

export function CashPaymentConfirmationDialog({
  transaction,
  open,
  onOpenChange,
  onConfirm,
  onReject,
  onNoShow,
}: CashPaymentConfirmationDialogProps) {
  if (!transaction) return null;

  const handleConfirm = () => {
    onConfirm(transaction.id);
    onOpenChange(false);
  };

  const handleReject = () => {
    onReject(transaction.id);
    onOpenChange(false);
  };

  const handleNoShow = () => {
    onNoShow(transaction.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" />
            Cash Payment Confirmation
          </DialogTitle>
          <DialogDescription>
            What happened with this cash payment?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Transaction Info */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Client</span>
              <span className="font-medium">{transaction.client}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Service</span>
              <span className="font-medium">{transaction.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="font-medium">{transaction.type}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-bold text-lg">€{transaction.amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleConfirm}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Payment Received
            </Button>

            <Button
              onClick={handleReject}
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject - Client Didn't Pay
            </Button>

            <Button
              onClick={handleNoShow}
              variant="outline"
              className="w-full border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
            >
              <UserX className="h-4 w-4 mr-2" />
              Client No-Show
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
