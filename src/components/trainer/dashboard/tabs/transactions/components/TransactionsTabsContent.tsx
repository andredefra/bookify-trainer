
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
      <TabsList className="mb-6 w-full sm:w-auto overflow-x-auto flex flex-nowrap">
        <TabsTrigger value="all" className="flex-shrink-0 whitespace-nowrap">All Transactions</TabsTrigger>
        <TabsTrigger value="installments" className="flex-shrink-0 whitespace-nowrap">Pending Installments</TabsTrigger>
        <TabsTrigger value="by-client" className="flex-shrink-0 whitespace-nowrap">By Client</TabsTrigger>
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
