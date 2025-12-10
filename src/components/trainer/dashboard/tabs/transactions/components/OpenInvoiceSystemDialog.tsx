import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Transaction } from "../types/TransactionHistoryTypes";
import { 
  Copy, 
  ExternalLink, 
  FileText, 
  AlertTriangle,
  Settings,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface InvoicingProvider {
  name: string;
  url: string;
  vatNumber?: string;
}

interface OpenInvoiceSystemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onCreateDraft: (transactionId: number) => void;
}

export function OpenInvoiceSystemDialog({
  open,
  onOpenChange,
  transaction,
  onCreateDraft,
}: OpenInvoiceSystemDialogProps) {
  const navigate = useNavigate();
  const [connectedProvider, setConnectedProvider] = useState<InvoicingProvider | null>(null);

  useEffect(() => {
    // Load connected invoicing provider from localStorage
    const storedProvider = localStorage.getItem('invoicing-provider');
    if (storedProvider) {
      try {
        setConnectedProvider(JSON.parse(storedProvider));
      } catch {
        setConnectedProvider(null);
      }
    }
  }, [open]);

  if (!transaction) return null;

  const transactionData = `
Client: ${transaction.client}
Service: ${transaction.name}
Type: ${transaction.type}
Amount: €${transaction.amount.toFixed(2)}
Date: ${transaction.date}
Payment Method: ${transaction.paymentMethod || 'N/A'}
Transaction ID: #${transaction.id}
  `.trim();

  const handleCopyData = () => {
    navigator.clipboard.writeText(transactionData);
    toast.success("Transaction data copied to clipboard");
  };

  const handleOpenProvider = () => {
    if (connectedProvider?.url) {
      window.open(connectedProvider.url, '_blank');
    }
  };

  const handleGoToSettings = () => {
    onOpenChange(false);
    navigate('/dashboard?tab=settings');
  };

  const handleCreateDraft = () => {
    onCreateDraft(transaction.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Invoice
          </DialogTitle>
          <DialogDescription>
            Use your invoicing system to create an invoice for this transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Transaction Data Card */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Transaction Data
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={handleCopyData}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy Data
              </Button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client:</span>
                <span className="font-medium">{transaction.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{transaction.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium text-primary">€{transaction.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{transaction.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment:</span>
                <span className="font-medium capitalize">{transaction.paymentMethod || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Invoicing Provider Status */}
          {connectedProvider ? (
            <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-4 space-y-3">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Connected to {connectedProvider.name}
                </span>
              </div>
              {connectedProvider.vatNumber && (
                <div className="text-xs text-green-600 dark:text-green-500">
                  VAT: {connectedProvider.vatNumber}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-green-300 text-green-700 hover:bg-green-100 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
                onClick={handleOpenProvider}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open {connectedProvider.name}
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  No Invoicing System Connected
                </span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-500">
                Connect an invoicing provider in Settings to streamline your invoice workflow.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950"
                onClick={handleGoToSettings}
              >
                <Settings className="h-4 w-4 mr-2" />
                Go to Settings
              </Button>
            </div>
          )}

          {/* Info message */}
          <p className="text-xs text-muted-foreground text-center">
            After creating the invoice in your system, click below to mark it as draft.
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateDraft}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Invoice Created → Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
