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
import { CreditCard, FileText, Download, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RequestInvoiceDialog } from "./RequestInvoiceDialog";
import { RequestRefundDialog } from "./RequestRefundDialog";

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

  const renderReceiptsCell = (payment: Payment) => {
    // If invoice is available, show download button
    if (payment.invoiceSent) {
      return (
        <Button variant="ghost" size="sm" className="text-primary">
          <Download className="h-4 w-4 mr-1" />
          Invoice
        </Button>
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

    // If refund status exists, show appropriate badge
    if (payment.refundStatus) {
      const statusConfig = {
        pending: { label: "Refund Pending", className: "text-amber-600 border-amber-300 bg-amber-50" },
        approved: { label: "Refund Approved", className: "text-green-600 border-green-300 bg-green-50" },
        rejected: { label: "Refund Rejected", className: "text-red-600 border-red-300 bg-red-50" },
      };
      const config = statusConfig[payment.refundStatus];
      return (
        <Badge variant="outline" className={config.className}>
          {config.label}
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
