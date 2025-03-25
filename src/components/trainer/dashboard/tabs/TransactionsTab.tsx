
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileDown, Calendar, DollarSign } from "lucide-react";
import { TransactionHistory } from "./transactions/TransactionHistory";
import { TransactionsByClient } from "./transactions/TransactionsByClient";

// Mock transaction data for demonstration
const mockTransactions = [
  { id: 1, client: "Sarah Johnson", type: "Program", name: "Strength & Conditioning", amount: 49.99, date: "2023-06-15", status: "paid" },
  { id: 2, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 35, date: "2023-06-12", status: "paid" },
  { id: 3, client: "Lisa Garcia", type: "Program", name: "Weight Loss Program", amount: 79.99, date: "2023-06-10", status: "paid" },
  { id: 4, client: "David Kim", type: "Session", name: "Group Session", amount: 20, date: "2023-06-08", status: "pending" },
  { id: 5, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 35, date: "2023-06-05", status: "paid" },
  { id: 6, client: "Mike Peterson", type: "Program", name: "Mobility & Recovery", amount: 39.99, date: "2023-06-03", status: "paid" },
  { id: 7, client: "Lisa Garcia", type: "Session", name: "Assessment", amount: 25, date: "2023-06-01", status: "paid" },
];

// Client summary for the by-client view
const clientSummary = [
  { id: 1, name: "Sarah Johnson", totalSpent: 84.99, lastPayment: "2023-06-15", sessions: 2, programs: 1 },
  { id: 2, name: "Mike Peterson", totalSpent: 74.99, lastPayment: "2023-06-12", sessions: 1, programs: 1 },
  { id: 3, name: "Lisa Garcia", totalSpent: 104.99, lastPayment: "2023-06-10", sessions: 1, programs: 1 },
  { id: 4, name: "David Kim", totalSpent: 20, lastPayment: "2023-06-08", sessions: 1, programs: 0 },
];

export function TransactionsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Transactions & Payments</CardTitle>
            <CardDescription>Manage your revenue and client payments</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="by-client">By Client</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <TransactionHistory 
              transactions={mockTransactions.filter(t => 
                t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.name.toLowerCase().includes(searchQuery.toLowerCase())
              )} 
            />
          </TabsContent>
          
          <TabsContent value="by-client">
            <TransactionsByClient 
              clients={clientSummary.filter(c => 
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
              )} 
              transactions={mockTransactions}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
