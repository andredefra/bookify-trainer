import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, ChevronDown, RotateCcw, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { RequestInvoiceDialog } from "@/components/client/trainers/RequestInvoiceDialog";
import { RequestRefundDialog } from "@/components/client/trainers/RequestRefundDialog";

interface Payment {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: "paid" | "pending";
  invoiceSent?: boolean;
  invoiceRequested?: boolean;
  refundStatus?: "pending" | "approved" | "rejected";
}

interface TrainerPaymentsHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainerName: string;
  onMakePayment?: () => void;
}

// Mock payment data - in real app would come from database
const getMockPayments = (trainerName: string): Payment[] => {
  if (trainerName === "Sarah Johnson") {
    return [
      { id: "1", date: "2024-12-05", type: "Personal Session", amount: 50, status: "paid", invoiceSent: true },
      { id: "2", date: "2024-11-28", type: "Personal Session", amount: 50, status: "paid", invoiceSent: false },
      { id: "3", date: "2024-11-20", type: "Package (10 Sessions)", amount: 450, status: "paid", invoiceSent: true },
      { id: "4", date: "2024-11-15", type: "Personal Session", amount: 50, status: "paid", invoiceSent: false, invoiceRequested: true },
    ];
  }
  if (trainerName === "Alex Thompson") {
    return [
      { id: "5", date: "2024-12-03", type: "HIIT Session", amount: 45, status: "paid", invoiceSent: true },
      { id: "6", date: "2024-11-25", type: "HIIT Session", amount: 45, status: "paid", invoiceSent: false, refundStatus: "pending" },
    ];
  }
  return [];
};

export function TrainerPaymentsHistoryDialog({
  open,
  onOpenChange,
  trainerName,
  onMakePayment,
}: TrainerPaymentsHistoryDialogProps) {
  const payments = getMockPayments(trainerName);
  const totalPaid = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleDownloadInvoice = (paymentId: string) => {
    toast.success(`Downloading invoice for payment #${paymentId}`);
  };

  const handleRequestInvoice = (payment: Payment) => {
    setSelectedPayment(payment);
    setInvoiceDialogOpen(true);
  };

  const handleRequestRefund = (payment: Payment) => {
    setSelectedPayment(payment);
    setRefundDialogOpen(true);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderReceiptsCell = (payment: Payment) => {
    // If invoice is already sent, show download button
    if (payment.invoiceSent) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDownloadInvoice(payment.id)}
        >
          <FileText className="h-4 w-4 mr-1" />
          Invoice
        </Button>
      );
    }

    // If invoice has been requested, show pending badge
    if (payment.invoiceRequested) {
      return (
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          Invoice Requested
        </Badge>
      );
    }

    // If refund has been requested, show status
    if (payment.refundStatus) {
      if (payment.refundStatus === "pending") {
        return (
          <Badge variant="secondary" className="gap-1 bg-amber-500/10 text-amber-600">
            <Clock className="h-3 w-3" />
            Refund Pending
          </Badge>
        );
      }
      if (payment.refundStatus === "approved") {
        return (
          <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-600">
            <CheckCircle className="h-3 w-3" />
            Refund Approved
          </Badge>
        );
      }
      if (payment.refundStatus === "rejected") {
        return (
          <Badge variant="secondary" className="gap-1 bg-red-500/10 text-red-600">
            <XCircle className="h-3 w-3" />
            Refund Rejected
          </Badge>
        );
      }
    }

    // Otherwise, show dropdown with options
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Request
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleRequestInvoice(payment)}>
            <FileText className="h-4 w-4 mr-2" />
            Request Invoice
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRequestRefund(payment)}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Request Refund
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payment History - {trainerName}</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {payments.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Receipts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{formatDate(payment.date)}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell className="text-right font-medium">€{payment.amount}</TableCell>
                        <TableCell className="text-right">
                          {renderReceiptsCell(payment)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Total paid: <span className="font-semibold text-foreground">€{totalPaid}</span>
                  </div>
                  {onMakePayment && (
                    <Button onClick={onMakePayment} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Make Payment
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No payments found for this trainer.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedPayment && (
        <>
          <RequestInvoiceDialog
            open={invoiceDialogOpen}
            onOpenChange={setInvoiceDialogOpen}
            trainerName={trainerName}
            serviceName={selectedPayment.type}
            serviceDate={formatDate(selectedPayment.date)}
            amount={selectedPayment.amount}
          />
          <RequestRefundDialog
            open={refundDialogOpen}
            onOpenChange={setRefundDialogOpen}
            trainerName={trainerName}
            serviceName={selectedPayment.type}
            serviceDate={formatDate(selectedPayment.date)}
            amount={selectedPayment.amount}
          />
        </>
      )}
    </>
  );
}
