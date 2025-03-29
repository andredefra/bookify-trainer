
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

interface TransactionsTableProps {
  transactions: Transaction[];
  onConfirmCashPayment?: (transactionId: number) => void;
}

export function TransactionsTable({ transactions, onConfirmCashPayment }: TransactionsTableProps) {
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
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
