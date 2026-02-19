import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PackageSale } from "@/hooks/usePackageSales";
import { safeFormatDate } from "@/utils/safeFormatDate";
import { 
  Banknote, 
  CreditCard, 
  ChevronDown, 
  CheckCircle, 
  XCircle, 
  UserX,
  FileText,
  Upload,
  Download,
  Send,
  Eye
} from "lucide-react";

interface PackageSalesHistoryTableProps {
  sales: PackageSale[];
  searchQuery: string;
  isProTrainer?: boolean;
  onConfirmCashPayment: (id: string) => void;
  onRejectCashPayment: (id: string) => void;
  onMarkNoShow: (id: string) => void;
  onUpdateInvoiceStatus: (id: string, status: 'none' | 'draft' | 'sent_to_client', url?: string) => void;
}

// Payment Method Badge Component
function PaymentMethodBadge({ method }: { method: string }) {
  const config: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
    cash: {
      icon: <Banknote className="h-3 w-3" />,
      label: 'Cash',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    card: {
      icon: <CreditCard className="h-3 w-3" />,
      label: 'Card',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    paypal: {
      icon: <CreditCard className="h-3 w-3" />,
      label: 'PayPal',
      className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    klarna: {
      icon: <CreditCard className="h-3 w-3" />,
      label: 'Klarna',
      className: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    },
  };

  const { icon, label, className } = config[method] || config.cash;

  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

// Payment Status Badge Component
function PaymentStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pending: {
      label: '⏳ Pending',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    paid: {
      label: '✓ Paid',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    rejected: {
      label: '✗ Rejected',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
    no_show: {
      label: '👤 No-Show',
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    },
  };

  const { label, className } = config[status] || config.pending;

  return <Badge className={className}>{label}</Badge>;
}

// Package Type Badge Component
function PackageTypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; className: string }> = {
    sessions_only: {
      label: 'Sessions',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    program_only: {
      label: 'Program',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    hybrid: {
      label: 'Hybrid',
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    },
    service: {
      label: 'Service',
      className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    },
  };

  const { label, className } = config[type] || { label: type, className: '' };

  return <Badge variant="outline" className={`text-xs ${className}`}>{label}</Badge>;
}

export function PackageSalesHistoryTable({ 
  sales, 
  searchQuery,
  isProTrainer = false,
  onConfirmCashPayment,
  onRejectCashPayment,
  onMarkNoShow,
  onUpdateInvoiceStatus,
}: PackageSalesHistoryTableProps) {
  const [cashConfirmDialog, setCashConfirmDialog] = useState<{ open: boolean; saleId: string | null }>({
    open: false,
    saleId: null,
  });
  const [invoiceUploadDialog, setInvoiceUploadDialog] = useState<{ open: boolean; saleId: string | null }>({
    open: false,
    saleId: null,
  });
  const [invoiceDetailsDialog, setInvoiceDetailsDialog] = useState<{ open: boolean; sale: PackageSale | null }>({
    open: false,
    sale: null,
  });
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  const filteredSales = sales.filter(sale => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      sale.clientName.toLowerCase().includes(query) ||
      sale.packageTitle.toLowerCase().includes(query) ||
      sale.clientEmail.toLowerCase().includes(query)
    );
  });

  // Sort: pending cash payments first, then by date
  const sortedSales = [...filteredSales].sort((a, b) => {
    // Pending cash payments first
    const aIsPendingCash = a.paymentMethod === 'cash' && a.paymentStatus === 'pending';
    const bIsPendingCash = b.paymentMethod === 'cash' && b.paymentStatus === 'pending';
    if (aIsPendingCash && !bIsPendingCash) return -1;
    if (!aIsPendingCash && bIsPendingCash) return 1;
    // Then by date
    return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
  });

  const handleCashConfirm = (action: 'confirm' | 'reject' | 'no_show') => {
    if (!cashConfirmDialog.saleId) return;
    
    switch (action) {
      case 'confirm':
        onConfirmCashPayment(cashConfirmDialog.saleId);
        break;
      case 'reject':
        onRejectCashPayment(cashConfirmDialog.saleId);
        break;
      case 'no_show':
        onMarkNoShow(cashConfirmDialog.saleId);
        break;
    }
    setCashConfirmDialog({ open: false, saleId: null });
  };

  const handleInvoiceUpload = () => {
    if (!invoiceUploadDialog.saleId) return;
    // Simulate file upload
    const fakeUrl = `/invoices/inv-${Date.now()}.pdf`;
    onUpdateInvoiceStatus(invoiceUploadDialog.saleId, 'sent_to_client', fakeUrl);
    setInvoiceUploadDialog({ open: false, saleId: null });
    setInvoiceFile(null);
  };

  const renderActions = (sale: PackageSale) => {
    // Cash + Pending: Show confirmation button
    if (sale.paymentMethod === 'cash' && sale.paymentStatus === 'pending') {
      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCashConfirmDialog({ open: true, saleId: sale.id })}
        >
          Confirmation
        </Button>
      );
    }

    // Paid + Essential: Just show complete badge
    if (sale.paymentStatus === 'paid' && !isProTrainer) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          ✓ Complete
        </Badge>
      );
    }

    // Paid + Pro: Invoice workflow
    if (sale.paymentStatus === 'paid' && isProTrainer) {
      switch (sale.invoiceStatus) {
        case 'none':
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateInvoiceStatus(sale.id, 'draft')}
            >
              <FileText className="h-3 w-3 mr-1" />
              Invoice
            </Button>
          );
        case 'draft':
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <FileText className="h-3 w-3 mr-1" />
                  Draft
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onUpdateInvoiceStatus(sale.id, 'sent_to_client')}>
                  <Send className="h-4 w-4 mr-2" />
                  Done (Mark as Sent)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setInvoiceUploadDialog({ open: true, saleId: sale.id })}>
                  <Upload className="h-4 w-4 mr-2" />
                  Done and Upload PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        case 'sent_to_client':
          return (
            <Button
              size="sm"
              variant="outline"
              className="text-green-600"
              onClick={() => setInvoiceDetailsDialog({ open: true, sale })}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Sent
            </Button>
          );
      }
    }

    // Rejected or No-Show
    if (sale.paymentStatus === 'rejected' || sale.paymentStatus === 'no_show') {
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-500">
          Closed
        </Badge>
      );
    }

    return null;
  };

  if (sortedSales.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchQuery ? "No sales match your search" : "No sales found"}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="hidden md:table-cell">Package</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSales.map((sale) => (
              <TableRow 
                key={sale.id}
                className={sale.paymentMethod === 'cash' && sale.paymentStatus === 'pending' ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''}
              >
                <TableCell className="font-medium">
                  {safeFormatDate(sale.purchaseDate, 'MMM dd')}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{sale.clientName}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{sale.clientEmail}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <p className="truncate max-w-[200px]">{sale.packageTitle}</p>
                  {sale.sessionsTotal && sale.sessionsTotal > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {sale.sessionsUsed || 0}/{sale.sessionsTotal} sessions
                    </p>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <PackageTypeBadge type={sale.packageType} />
                </TableCell>
                <TableCell className="text-right font-semibold">
                  €{sale.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <PaymentMethodBadge method={sale.paymentMethod} />
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={sale.paymentStatus} />
                </TableCell>
                <TableCell className="text-right">
                  {renderActions(sale)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cash Confirmation Dialog */}
      <Dialog open={cashConfirmDialog.open} onOpenChange={(open) => setCashConfirmDialog({ open, saleId: open ? cashConfirmDialog.saleId : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cash Payment Confirmation</DialogTitle>
            <DialogDescription>
              Choose an action for this cash payment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => handleCashConfirm('confirm')}
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Confirm Payment Received
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => handleCashConfirm('reject')}
            >
              <XCircle className="h-4 w-4 mr-2 text-red-600" />
              Reject - Client Didn't Pay
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => handleCashConfirm('no_show')}
            >
              <UserX className="h-4 w-4 mr-2 text-gray-600" />
              Client No-Show
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invoice Upload Dialog */}
      <Dialog open={invoiceUploadDialog.open} onOpenChange={(open) => setInvoiceUploadDialog({ open, saleId: open ? invoiceUploadDialog.saleId : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Invoice</DialogTitle>
            <DialogDescription>
              Upload a PDF invoice to send to the client
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-file">Invoice PDF</Label>
              <Input
                id="invoice-file"
                type="file"
                accept=".pdf"
                onChange={(e) => setInvoiceFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceUploadDialog({ open: false, saleId: null })}>
              Cancel
            </Button>
            <Button onClick={handleInvoiceUpload} disabled={!invoiceFile}>
              <Send className="h-4 w-4 mr-2" />
              Upload & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Details Dialog */}
      <Dialog open={invoiceDetailsDialog.open} onOpenChange={(open) => setInvoiceDetailsDialog({ open, sale: open ? invoiceDetailsDialog.sale : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              Invoice sent to {invoiceDetailsDialog.sale?.clientName}
            </DialogDescription>
          </DialogHeader>
          {invoiceDetailsDialog.sale && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-medium">{invoiceDetailsDialog.sale.clientName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">€{invoiceDetailsDialog.sale.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Package</p>
                  <p className="font-medium">{invoiceDetailsDialog.sale.packageTitle}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sent At</p>
                  <p className="font-medium">
                    {invoiceDetailsDialog.sale.invoiceSentAt 
                      ? safeFormatDate(invoiceDetailsDialog.sale.invoiceSentAt, 'MMM dd, yyyy HH:mm')
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
              {invoiceDetailsDialog.sale.invoiceUrl && (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Invoice
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Resend
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
