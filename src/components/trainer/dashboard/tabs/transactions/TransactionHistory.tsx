
import { TransactionsTable } from "./components/TransactionsTable";
import { useTransactions } from "./context/TransactionsContext";

export function TransactionHistory() {
  const { filteredTransactions, handleConfirmCashPayment, handleToggleInvoice } = useTransactions();

  return (
    <TransactionsTable 
      transactions={filteredTransactions} 
      onConfirmCashPayment={handleConfirmCashPayment}
      onToggleInvoice={handleToggleInvoice}
    />
  );
}
