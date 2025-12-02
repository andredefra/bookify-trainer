
import { TransactionsTable } from "./components/TransactionsTable";
import { useTransactions } from "./context/TransactionsContext";

export function TransactionHistory() {
  const { 
    filteredTransactions, 
    handleConfirmCashPayment, 
    handleRejectCashPayment,
    handleMarkNoShow,
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
      onRejectCashPayment={handleRejectCashPayment}
      onMarkNoShow={handleMarkNoShow}
      onToggleInvoice={handleToggleInvoice}
      selectedTransactions={selectedTransactions}
      onToggleSelection={handleToggleSelection}
    />
  );
}
