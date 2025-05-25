
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Transaction } from "../types/TransactionHistoryTypes";
import { PaymentMethodBadge } from "./PaymentMethodBadge";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { FileInvoice } from "lucide-react";
import { toast } from "sonner";

interface TransactionsTableProps {
  transactions: Transaction[];
  onConfirmCashPayment?: (transactionId: number) => void;
}

export function TransactionsTable({ transactions, onConfirmCashPayment }: TransactionsTableProps) {
  const handleSendInvoice = (transaction: Transaction) => {
    // Open popup/modal that redirects to the integrated invoice partner
    const invoiceUrl = `https://invoice-partner.com/create?amount=${transaction.amount}&client=${encodeURIComponent(transaction.client)}&description=${encodeURIComponent(transaction.name)}`;
    
    // Open in new window/tab
    window.open(invoiceUrl, 'invoice-popup', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    toast.success("Invoice integration opened. Complete the process in the new window.", {
      duration: 4000
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-xs">{transaction.date}</TableCell>
                <TableCell>{transaction.client}</TableCell>
                <TableCell className="text-xs">{transaction.type}</TableCell>
                <TableCell className="text-xs">{transaction.name}</TableCell>
                <TableCell className="font-medium">€{transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {transaction.paymentMethod && (
                    <PaymentMethodBadge method={transaction.paymentMethod} />
                  )}
                </TableCell>
                <TableCell>
                  <TransactionStatusBadge status={transaction.status} />
                </TableCell>
                <TableCell>
                  {transaction.status === 'paid' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs" 
                      onClick={() => handleSendInvoice(transaction)}
                    >
                      <FileInvoice className="h-3 w-3 mr-1" />
                      Invoice
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.paymentMethod === 'cash' && transaction.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs" 
                      onClick={() => onConfirmCashPayment && onConfirmCashPayment(transaction.id)}
                    >
                      Confirm Receipt
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
