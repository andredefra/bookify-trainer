
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
      <div className="overflow-x-auto mb-6 max-w-full">
        <TabsList className="w-auto flex flex-nowrap justify-start min-w-max">
          <TabsTrigger value="all" className="flex-shrink-0 whitespace-nowrap">All Transactions</TabsTrigger>
          <TabsTrigger value="installments" className="flex-shrink-0 whitespace-nowrap">Pending Installments</TabsTrigger>
          <TabsTrigger value="by-client" className="flex-shrink-0 whitespace-nowrap">By Client</TabsTrigger>
        </TabsList>
      </div>
      
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
