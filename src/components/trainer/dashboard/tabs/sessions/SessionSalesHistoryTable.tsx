import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { 
  SessionSale, 
  PaymentMethod, 
  PaymentStatus, 
  InvoiceStatus 
} from "@/hooks/useSessionSales";
import { 
  CreditCard, 
  Banknote, 
  ChevronDown,
  FileText,
  Check,
  X,
  UserX,
  Send,
  Upload,
  Download,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface SessionSalesHistoryTableProps {
  sales: SessionSale[];
  isProTrainer?: boolean;
  onConfirmCashPayment: (saleId: string) => void;
  onRejectCashPayment: (saleId: string) => void;
  onMarkNoShow: (saleId: string) => void;
  onUpdateInvoiceStatus: (saleId: string, status: InvoiceStatus, url?: string) => void;
}

// Payment method badge component
function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const config: Record<PaymentMethod, { icon: React.ReactNode; label: string; className: string }> = {
    cash: { 
      icon: <Banknote className="h-3 w-3" />, 
      label: 'Cash',
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    },
    card: { 
      icon: <CreditCard className="h-3 w-3" />, 
      label: 'Card',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    },
    paypal: { 
      icon: <CreditCard className="h-3 w-3" />, 
      label: 'PayPal',
      className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
    },
    klarna: { 
      icon: <CreditCard className="h-3 w-3" />, 
      label: 'Klarna',
      className: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
    },
  };

  const { icon, label, className } = config[method];

  return (
    <Badge variant="outline" className={`gap-1 ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

// Payment status badge
function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config: Record<PaymentStatus, { label: string; className: string }> = {
    pending: { 
      label: '⏳ Pending',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    paid: { 
      label: '✓ Paid',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    },
    rejected: { 
      label: '✗ Rejected',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    },
    no_show: { 
      label: 'No-Show',
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

// Cash Payment Confirmation Dialog
function CashConfirmDialog({ 
  sale, 
  open, 
  onOpenChange, 
  onConfirm, 
  onReject, 
  onNoShow 
}: { 
  sale: SessionSale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onReject: () => void;
  onNoShow: () => void;
}) {
  if (!sale) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Cash Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-sm">
            <p><span className="text-muted-foreground">Client:</span> {sale.clientName}</p>
            <p><span className="text-muted-foreground">Session:</span> {sale.sessionTitle}</p>
            <p><span className="text-muted-foreground">Amount:</span> {formatCurrency(sale.price)}</p>
            <p><span className="text-muted-foreground">Date:</span> {format(new Date(sale.purchaseDate), "MMM dd, yyyy")}</p>
          </div>
          <div className="space-y-2">
            <Button 
              className="w-full" 
              onClick={() => { onConfirm(); onOpenChange(false); }}
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Payment Received
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => { onReject(); onOpenChange(false); }}
            >
              <X className="h-4 w-4 mr-2" />
              Reject - Client Didn't Pay
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => { onNoShow(); onOpenChange(false); }}
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

// Invoice Upload Dialog
function InvoiceUploadDialog({
  sale,
  open,
  onOpenChange,
  onUpload,
}: {
  sale: SessionSale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [sendToClient, setSendToClient] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    const mockUrl = `https://storage.example.com/invoices/${file.name}`;
    onUpload(mockUrl);
    setFile(null);
    onOpenChange(false);
    toast({
      title: "Invoice Sent",
      description: sendToClient ? "Invoice uploaded and sent to client" : "Invoice uploaded",
    });
  };

  if (!sale) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Invoice</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-sm">
            <p><span className="text-muted-foreground">Client:</span> {sale.clientName}</p>
            <p><span className="text-muted-foreground">Session:</span> {sale.sessionTitle}</p>
            <p><span className="text-muted-foreground">Amount:</span> {formatCurrency(sale.price)}</p>
          </div>

          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {file ? file.name : "Click to upload invoice PDF"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendToClient"
              checked={sendToClient}
              onCheckedChange={(checked) => setSendToClient(checked as boolean)}
            />
            <Label htmlFor="sendToClient" className="text-sm">
              Send to client via messages
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!file}>
            <Send className="h-4 w-4 mr-2" />
            Upload & Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Invoice Details Dialog
function InvoiceDetailsDialog({
  sale,
  open,
  onOpenChange,
}: {
  sale: SessionSale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!sale) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-sm">
            <p><span className="text-muted-foreground">Client:</span> {sale.clientName}</p>
            <p><span className="text-muted-foreground">Session:</span> {sale.sessionTitle}</p>
            <p><span className="text-muted-foreground">Amount:</span> {formatCurrency(sale.price)}</p>
            <p><span className="text-muted-foreground">Date:</span> {format(new Date(sale.purchaseDate), "MMM dd, yyyy")}</p>
          </div>

          {sale.invoiceSentAt && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              Sent on {format(new Date(sale.invoiceSentAt), "MMM dd, yyyy")}
            </div>
          )}

          {sale.invoiceUrl && (
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <a href={sale.invoiceUrl} download>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href={sale.invoiceUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </a>
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SessionSalesHistoryTable({ 
  sales, 
  isProTrainer = false,
  onConfirmCashPayment,
  onRejectCashPayment,
  onMarkNoShow,
  onUpdateInvoiceStatus,
}: SessionSalesHistoryTableProps) {
  const [cashDialogSale, setCashDialogSale] = useState<SessionSale | null>(null);
  const [invoiceUploadSale, setInvoiceUploadSale] = useState<SessionSale | null>(null);
  const [invoiceDetailsSale, setInvoiceDetailsSale] = useState<SessionSale | null>(null);

  // Sort by most recent first
  const sortedSales = [...sales].sort(
    (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
  );

  const handleInvoiceUpload = (url: string) => {
    if (invoiceUploadSale) {
      onUpdateInvoiceStatus(invoiceUploadSale.id, 'sent_to_client', url);
    }
  };

  // Render actions based on payment status and trainer tier
  const renderActions = (sale: SessionSale) => {
    // Cash payment pending - show confirmation button
    if (sale.paymentMethod === 'cash' && sale.paymentStatus === 'pending') {
      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCashDialogSale(sale)}
          className="h-8"
        >
          Confirmation
        </Button>
      );
    }

    // Payment is complete - show invoice options (Pro only)
    if (sale.paymentStatus === 'paid' && isProTrainer) {
      switch (sale.invoiceStatus) {
        case 'none':
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setInvoiceUploadSale(sale)}
              className="h-8"
            >
              <FileText className="h-3 w-3 mr-1" />
              Invoice
            </Button>
          );
        
        case 'draft':
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="h-8">
                  Draft
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onUpdateInvoiceStatus(sale.id, 'sent_to_client')}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Done
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setInvoiceUploadSale(sale)}>
                  <Send className="h-4 w-4 mr-2" />
                  Done and Upload
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        
        case 'sent_to_client':
          return (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setInvoiceDetailsSale(sale)}
              className="h-8 text-green-600 dark:text-green-400"
            >
              <Check className="h-3 w-3 mr-1" />
              Sent
            </Button>
          );
      }
    }

    // Paid but Essential trainer - no invoice workflow
    if (sale.paymentStatus === 'paid' && !isProTrainer) {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          ✓ Complete
        </Badge>
      );
    }

    return null;
  };

  if (sortedSales.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">No sales found</p>
        <p className="text-xs mt-1">Sales will appear here once clients book sessions</p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-xs font-medium">Date</th>
                <th className="text-left p-3 text-xs font-medium">Client</th>
                <th className="text-left p-3 text-xs font-medium hidden md:table-cell">Session</th>
                <th className="text-left p-3 text-xs font-medium hidden lg:table-cell">Type</th>
                <th className="text-right p-3 text-xs font-medium">Amount</th>
                <th className="text-center p-3 text-xs font-medium">Method</th>
                <th className="text-center p-3 text-xs font-medium">Status</th>
                <th className="text-center p-3 text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <span className="text-sm">
                      {format(new Date(sale.purchaseDate), "MMM dd")}
                    </span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(sale.purchaseDate), "yyyy")}
                    </span>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-sm">{sale.clientName}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {sale.clientEmail}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <p className="text-sm">{sale.sessionTitle}</p>
                  </td>
                  <td className="p-3 hidden lg:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {sale.sessionType === 'video' ? 'Video' : 'In-Person'}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <span className="font-semibold text-sm">
                      {formatCurrency(sale.price)}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <PaymentMethodBadge method={sale.paymentMethod} />
                  </td>
                  <td className="p-3 text-center">
                    <PaymentStatusBadge status={sale.paymentStatus} />
                  </td>
                  <td className="p-3 text-center">
                    {renderActions(sale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialogs */}
      <CashConfirmDialog
        sale={cashDialogSale}
        open={!!cashDialogSale}
        onOpenChange={(open) => !open && setCashDialogSale(null)}
        onConfirm={() => cashDialogSale && onConfirmCashPayment(cashDialogSale.id)}
        onReject={() => cashDialogSale && onRejectCashPayment(cashDialogSale.id)}
        onNoShow={() => cashDialogSale && onMarkNoShow(cashDialogSale.id)}
      />

      <InvoiceUploadDialog
        sale={invoiceUploadSale}
        open={!!invoiceUploadSale}
        onOpenChange={(open) => !open && setInvoiceUploadSale(null)}
        onUpload={handleInvoiceUpload}
      />

      <InvoiceDetailsDialog
        sale={invoiceDetailsSale}
        open={!!invoiceDetailsSale}
        onOpenChange={(open) => !open && setInvoiceDetailsSale(null)}
      />
    </>
  );
}
