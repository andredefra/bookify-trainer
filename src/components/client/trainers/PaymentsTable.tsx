import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, FileText, Download, ChevronDown, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RequestInvoiceDialog } from "./RequestInvoiceDialog";
import { RequestRefundDialog } from "./RequestRefundDialog";
import { removeDemoTransaction, patchDemoTransaction } from "@/lib/demoTransactionsBridge";
import { notifyDemo } from "@/lib/demoNotify";


interface Payment {
  id: number;
  trainer: string;
  amount: number;
  date: string;
  type: string;
  invoiceSent?: boolean;
  invoiceRequested?: boolean;
  refundStatus?: 'pending' | 'approved' | 'rejected';
}

interface PaymentsTableProps {
  payments: Payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);

  const handleNavigateToPaymentSettings = () => {
    navigate('/client-dashboard', { state: { activeTab: 'settings', settingsSection: 'payments' } });
  };

  const handleRequestInvoice = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowInvoiceDialog(true);
  };

  const handleRequestRefund = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowRefundDialog(true);
  };

  const handleConfirmReceipt = (payment: Payment) => {
    patchDemoTransaction(payment.id, { clientConfirmedReceipt: true });
    // Remove from both sides after a brief moment so trainer also sees it disappear
    setTimeout(() => removeDemoTransaction(payment.id), 200);
    notifyDemo({
      to: "trainer",
      title: "Ricezione confermata",
      description: `Il cliente ha confermato la ricezione per ${payment.type} del ${payment.date} (€${payment.amount}).`,
    });
  };

  const renderReceiptsCell = (payment: Payment) => {
    // Refund approved → client must confirm receipt of refund
    if (payment.refundStatus === "approved") {
      return (
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleConfirmReceipt(payment)}>
          <CheckCircle2 className="h-4 w-4 mr-1" />
          Conferma rimborso
        </Button>
      );
    }

    // Refund pending
    if (payment.refundStatus === "pending") {
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
          Refund Pending
        </Badge>
      );
    }

    // Refund rejected
    if (payment.refundStatus === "rejected") {
      return (
        <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
          Refund Rejected
        </Badge>
      );
    }

    // Invoice sent → client confirms receipt
    if (payment.invoiceSent) {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-primary">
            <Download className="h-4 w-4 mr-1" />
            Invoice
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleConfirmReceipt(payment)}>
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Conferma
          </Button>
        </div>
      );
    }

    // If invoice was requested, show pending badge
    if (payment.invoiceRequested) {
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
          <FileText className="h-3 w-3 mr-1" />
          Invoice Requested
        </Badge>
      );
    }

    // Otherwise show dropdown with request options
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Request
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border shadow-md">
          <DropdownMenuItem onClick={() => handleRequestInvoice(payment)}>
            <FileText className="h-4 w-4 mr-2" />
            Request Invoice
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRequestRefund(payment)}>
            <CreditCard className="h-4 w-4 mr-2" />
            Request Refund
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };


  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Receipts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.trainer}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>€{payment.amount}</TableCell>
                <TableCell>
                  {renderReceiptsCell(payment)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={handleNavigateToPaymentSettings}>
          <CreditCard className="mr-2 h-4 w-4" />
          Manage Payment Methods
        </Button>
      </div>

      {/* Request Invoice Dialog */}
      {selectedPayment && (
        <RequestInvoiceDialog
          open={showInvoiceDialog}
          onOpenChange={setShowInvoiceDialog}
          trainerName={selectedPayment.trainer}
          serviceName={selectedPayment.type}
          serviceDate={selectedPayment.date}
          amount={selectedPayment.amount}
        />
      )}

      {/* Request Refund Dialog */}
      {selectedPayment && (
        <RequestRefundDialog
          open={showRefundDialog}
          onOpenChange={setShowRefundDialog}
          trainerName={selectedPayment.trainer}
          serviceName={selectedPayment.type}
          serviceDate={selectedPayment.date}
          amount={selectedPayment.amount}
        />
      )}
    </div>
  );
}
