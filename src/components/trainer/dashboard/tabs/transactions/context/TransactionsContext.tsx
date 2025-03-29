
import { createContext, useState, useContext, ReactNode } from "react";
import { TransactionType } from "../types/transactionTypes";
import { ClientSummary, ClientData } from "../types/TransactionsTabTypes";
import { toast } from "sonner";

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
const clientList: ClientData[] = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Mike Peterson" },
  { id: 3, name: "Lisa Garcia" },
  { id: 4, name: "David Kim" },
  { id: 5, name: "James Wilson" },
];

interface TransactionsContextType {
  transactions: TransactionType[];
  searchQuery: string;
  showAddDialog: boolean;
  clients: ClientData[];
  clientSummaries: ClientSummary[];
  filteredTransactions: TransactionType[];
  filteredClients: ClientSummary[];
  setSearchQuery: (query: string) => void;
  setShowAddDialog: (show: boolean) => void;
  handleAddTransaction: (newTransaction: Omit<TransactionType, 'id'>) => void;
  handleConfirmCashPayment: (transactionId: number) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionType[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
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
  
  const clientSummaries = generateClientSummary();
  
  const handleAddTransaction = (newTransaction: Omit<TransactionType, 'id'>) => {
    const transaction: TransactionType = {
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
  
  const filteredClients = clientSummaries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const value = {
    transactions,
    searchQuery,
    showAddDialog,
    clients: clientList,
    clientSummaries,
    filteredTransactions,
    filteredClients,
    setSearchQuery,
    setShowAddDialog,
    handleAddTransaction,
    handleConfirmCashPayment
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
}
