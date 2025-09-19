
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TransactionHistory } from "../TransactionHistory";
import { TransactionsByClient } from "../TransactionsByClient";
import { PendingInstallments } from "./PendingInstallments";
import { useTransactions } from "../context/TransactionsContext";
import { RevenueCards } from "./RevenueCards";

export function TransactionsTabsContent() {
  const { filteredTransactions, filteredClients, transactions } = useTransactions();
  
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-6">
        <TabsTrigger value="all">All Transactions</TabsTrigger>
        <TabsTrigger value="installments">Pending Installments</TabsTrigger>
        <TabsTrigger value="by-client">By Client</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <div className="space-y-6">
          <RevenueCards />
          <TransactionHistory />
        </div>
      </TabsContent>
      
      <TabsContent value="installments">
        <PendingInstallments />
      </TabsContent>
      
      <TabsContent value="by-client">
        <TransactionsByClient 
          clients={filteredClients} 
          transactions={transactions}
        />
      </TabsContent>
    </Tabs>
  );
}
