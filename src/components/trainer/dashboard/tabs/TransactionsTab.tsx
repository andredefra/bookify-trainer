
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TransactionsProvider } from "./transactions/context/TransactionsContext";
import { TransactionsHeader } from "./transactions/components/TransactionsHeader";
import { TransactionsSearch } from "./transactions/components/TransactionsSearch";
import { TransactionsTabsContent } from "./transactions/components/TransactionsTabsContent";
import { AddTransactionDialog } from "./transactions/AddTransactionDialog";
import { useTransactions } from "./transactions/context/TransactionsContext";

function TransactionsTabContent() {
  const { showAddDialog, setShowAddDialog, handleAddTransaction, clients } = useTransactions();
  
  return (
    <Card>
      <CardHeader>
        <TransactionsHeader />
      </CardHeader>
      <CardContent>
        <TransactionsSearch />
        <TransactionsTabsContent />
      </CardContent>
      
      <AddTransactionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddTransaction}
        clients={clients}
      />
    </Card>
  );
}

export function TransactionsTab() {
  return (
    <TransactionsProvider>
      <TransactionsTabContent />
    </TransactionsProvider>
  );
}
