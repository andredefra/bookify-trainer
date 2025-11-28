
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "../types/TransactionHistoryTypes";
import { PaymentMethodBadge } from "./PaymentMethodBadge";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Helper function to check if payment is complete
const isPaymentComplete = (transaction: Transaction): boolean => {
  // Single payment (no installments) is always complete when paid
  if (!transaction.installmentNumber || !transaction.totalInstallments) {
    return true;
  }
  
  // Installment payment is complete only when it's the final installment
  return transaction.installmentNumber === transaction.totalInstallments;
};

interface TransactionsTableProps {
  transactions: Transaction[];
  onConfirmCashPayment?: (transactionId: number) => void;
  onToggleInvoice?: (transactionId: number) => void;
  selectedTransactions?: Set<number>;
  onToggleSelection?: (transactionId: number) => void;
}

export function TransactionsTable({ 
  transactions, 
  onConfirmCashPayment, 
  onToggleInvoice,
  selectedTransactions = new Set(),
  onToggleSelection
}: TransactionsTableProps) {
  const handleSendInvoice = (transaction: Transaction) => {
    // Open popup/modal that redirects to the integrated invoice partner
    const invoiceUrl = `https://invoice-partner.com/create?amount=${transaction.amount}&client=${encodeURIComponent(transaction.client)}&description=${encodeURIComponent(transaction.name)}`;
    
    // Open in new window/tab
    window.open(invoiceUrl, 'invoice-popup', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    // Mark invoice as sent
    if (onToggleInvoice) {
      onToggleInvoice(transaction.id);
    }
    
    toast.success("Invoice integration opened. Complete the process in the new window.", {
      duration: 4000
    });
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={transactions.length > 0 && transactions
                  .filter(t => t.status === 'paid' && !t.invoiceSent && isPaymentComplete(t))
                  .every(t => selectedTransactions.has(t.id))}
                onCheckedChange={(checked) => {
                  if (onToggleSelection) {
                    transactions.forEach(t => {
                      if (t.status === 'paid' && !t.invoiceSent && isPaymentComplete(t)) {
                        if (checked && !selectedTransactions.has(t.id)) {
                          onToggleSelection(t.id);
                        } else if (!checked && selectedTransactions.has(t.id)) {
                          onToggleSelection(t.id);
                        }
                      }
                    });
                  }
                }}
              />
            </TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Installment</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const isSelected = selectedTransactions.has(transaction.id);
              const canSelect = transaction.status === 'paid' && !transaction.invoiceSent && isPaymentComplete(transaction);
              
              return (
                <TableRow key={transaction.id} className={isSelected ? 'bg-primary/5' : ''}>
                  <TableCell>
                    {canSelect && (
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onToggleSelection?.(transaction.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-xs">{transaction.date}</TableCell>
                  <TableCell>{transaction.client}</TableCell>
                  <TableCell className="text-xs">{transaction.type}</TableCell>
                  <TableCell className="text-xs">{transaction.name}</TableCell>
                  <TableCell>
                    {transaction.installmentNumber && transaction.totalInstallments ? (
                      <Badge variant="secondary">
                        {transaction.installmentNumber}/{transaction.totalInstallments}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">€{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {transaction.paymentMethod && (
                      <PaymentMethodBadge method={transaction.paymentMethod} />
                    )}
                  </TableCell>
                  <TableCell>
                    <TransactionStatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      {/* Cash payment confirmation button */}
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
                      
                      {/* Invoice button - only for completed payments */}
                      {transaction.status === 'paid' && isPaymentComplete(transaction) && (
                        <Button 
                          variant={transaction.invoiceSent ? "secondary" : "outline"}
                          size="sm" 
                          className="h-7 text-xs" 
                          onClick={() => handleSendInvoice(transaction)}
                        >
                          {transaction.invoiceSent ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Sent
                            </>
                          ) : (
                            <>
                              <FileText className="h-3 w-3 mr-1" />
                              Invoice
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
