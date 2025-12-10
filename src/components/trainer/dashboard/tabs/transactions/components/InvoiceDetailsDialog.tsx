import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, Send, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "../types/TransactionHistoryTypes";

interface InvoiceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onResend?: (transactionId: number) => void;
}

export const InvoiceDetailsDialog = ({
  open,
  onOpenChange,
  transaction,
  onResend,
}: InvoiceDetailsDialogProps) => {
  if (!transaction) return null;

  const handleDownload = () => {
    if (transaction.invoiceUrl) {
      window.open(transaction.invoiceUrl, '_blank');
    }
  };

  const handleView = () => {
    if (transaction.invoiceUrl) {
      window.open(transaction.invoiceUrl, '_blank');
    }
  };

  const handleResend = () => {
    onResend?.(transaction.id);
    onOpenChange(false);
  };

  const sentDate = transaction.invoiceSentAt 
    ? format(new Date(transaction.invoiceSentAt), "MMM d, yyyy 'at' HH:mm")
    : 'Unknown';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Transaction Info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
            <p><span className="text-muted-foreground">Client:</span> {transaction.client}</p>
            <p><span className="text-muted-foreground">Service:</span> {transaction.name}</p>
            <p><span className="text-muted-foreground">Amount:</span> €{transaction.amount.toFixed(2)}</p>
            <p><span className="text-muted-foreground">Transaction Date:</span> {transaction.date}</p>
          </div>

          {/* Sent Status */}
          <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Invoice sent on: {sentDate}</span>
          </div>

          {/* Invoice File Preview */}
          {transaction.invoiceUrl ? (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  invoice_{transaction.client.toLowerCase().replace(' ', '_')}_{transaction.date}.pdf
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={handleView}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4 text-center text-muted-foreground text-sm">
              No invoice file attached
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleResend}>
            <Send className="h-4 w-4 mr-2" />
            Resend to Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
