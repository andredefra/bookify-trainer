
import { TransactionsTable } from "./components/TransactionsTable";
import { useTransactions } from "./context/TransactionsContext";

export function TransactionHistory() {
  const { 
    filteredTransactions, 
    handleConfirmCashPayment, 
    handleToggleInvoice,
    selectedTransactions,
    setSelectedTransactions
  } = useTransactions();

  const handleToggleSelection = (transactionId: number) => {
    const newSelection = new Set(selectedTransactions);
    if (newSelection.has(transactionId)) {
      newSelection.delete(transactionId);
    } else {
      newSelection.add(transactionId);
    }
    setSelectedTransactions(newSelection);
  };

  return (
    <TransactionsTable 
      transactions={filteredTransactions} 
      onConfirmCashPayment={handleConfirmCashPayment}
      onToggleInvoice={handleToggleInvoice}
      selectedTransactions={selectedTransactions}
      onToggleSelection={handleToggleSelection}
    />
  );
}
