
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionHistoryProps } from "./types/TransactionHistoryTypes";
import { toast } from "sonner";

export function TransactionHistory({ transactions, onConfirmCashPayment }: TransactionHistoryProps) {
  // Calculate totals
  const totalRevenue = transactions.reduce((sum, t) => 
    t.status === 'paid' ? sum + t.amount : sum, 0
  ).toFixed(2);
  
  const pendingRevenue = transactions.reduce((sum, t) => 
    t.status === 'pending' ? sum + t.amount : sum, 0
  ).toFixed(2);

  const handleConfirmPayment = (transactionId: number) => {
    if (onConfirmCashPayment) {
      onConfirmCashPayment(transactionId);
    } else {
      toast.error("Payment confirmation functionality is not available");
    }
  };

  return (
    <div className="space-y-6">
      <TransactionsTable 
        transactions={transactions}
        onConfirmCashPayment={handleConfirmPayment}
      />
    </div>
  );
}
