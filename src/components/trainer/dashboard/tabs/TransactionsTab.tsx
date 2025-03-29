
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileDown, Calendar, Plus } from "lucide-react";
import { TransactionHistory } from "./transactions/TransactionHistory";
import { TransactionsByClient } from "./transactions/TransactionsByClient";
import { AddTransactionDialog } from "./transactions/AddTransactionDialog";
import { toast } from "sonner";

// Transaction type
interface Transaction {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod?: 'card' | 'cash';
}

// Client summary type
interface ClientSummary {
  id: number;
  name: string;
  totalSpent: number;
  lastPayment: string;
  sessions: number;
  programs: number;
}

// Mock transaction data for demonstration
const initialTransactions = [
  { id: 1, client: "Sarah Johnson", type: "Program", name: "Strength & Conditioning", amount: 49.99, date: "2023-06-15", status: "paid" as const, paymentMethod: "card" as const },
  { id: 2, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 35, date: "2023-06-12", status: "paid" as const, paymentMethod: "card" as const },
  { id: 3, client: "Lisa Garcia", type: "Program", name: "Weight Loss Program", amount: 79.99, date: "2023-06-10", status: "paid" as const, paymentMethod: "card" as const },
  { id: 4, client: "David Kim", type: "Session", name: "Group Session", amount: 20, date: "2023-06-08", status: "pending" as const, paymentMethod: "card" as const },
  { id: 5, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 35, date: "2023-06-05", status: "paid" as const, paymentMethod: "card" as const },
  { id: 6, client: "Mike Peterson", type: "Program", name: "Mobility & Recovery", amount: 39.99, date: "2023-06-03", status: "paid" as const, paymentMethod: "card" as const },
  { id: 7, client: "Lisa Garcia", type: "Session", name: "Assessment", amount: 25, date: "2023-06-01", status: "paid" as const, paymentMethod: "card" as const },
  { id: 8, client: "James Wilson", type: "Session", name: "Personal Training", amount: 45, date: "2023-06-18", status: "pending" as const, paymentMethod: "cash" as const },
];

// Client data
const clientList = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Mike Peterson" },
  { id: 3, name: "Lisa Garcia" },
  { id: 4, name: "David Kim" },
  { id: 5, name: "James Wilson" },
];

export function TransactionsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Calculate client summary based on transactions
  const generateClientSummary = (): ClientSummary[] => {
    const summary: Record<string, ClientSummary> = {};
    
    transactions.forEach(transaction => {
      if (!summary[transaction.client]) {
        summary[transaction.client] = {
          id: Math.random(), // In a real app, this would be a proper id
          name: transaction.client,
          totalSpent: 0,
          lastPayment: "",
          sessions: 0,
          programs: 0
        };
      }
      
      // Only add paid transactions to total spent
      if (transaction.status === 'paid') {
        summary[transaction.client].totalSpent += transaction.amount;
      }
      
      // Update sessions/programs count
      if (transaction.type === 'Session') {
        summary[transaction.client].sessions += 1;
      } else if (transaction.type === 'Program') {
        summary[transaction.client].programs += 1;
      }
      
      // Update last payment date if newer
      if (!summary[transaction.client].lastPayment || 
          new Date(transaction.date) > new Date(summary[transaction.client].lastPayment)) {
        summary[transaction.client].lastPayment = transaction.date;
      }
    });
    
    return Object.values(summary);
  };
  
  const clientSummary = generateClientSummary();
  
  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: transactions.length + 1, // Simple id generation
    };
    
    setTransactions([transaction, ...transactions]);
    
    // Show toast with appropriate message based on payment method
    if (transaction.paymentMethod === 'cash') {
      toast.success("Cash transaction added. Remember to confirm receipt when paid.");
    } else {
      toast.success("Transaction added successfully");
    }
  };
  
  const handleConfirmCashPayment = (transactionId: number) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: 'paid' as const } 
        : transaction
    ));
    
    toast.success("Cash payment confirmed");
  };
  
  const filteredTransactions = transactions.filter(t => 
    t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredClients = clientSummary.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Button variant="outline" size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
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
              transactions={filteredTransactions} 
              onConfirmCashPayment={handleConfirmCashPayment}
            />
          </TabsContent>
          
          <TabsContent value="by-client">
            <TransactionsByClient 
              clients={filteredClients} 
              transactions={transactions}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <AddTransactionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddTransaction}
        clients={clientList}
      />
    </Card>
  );
}
