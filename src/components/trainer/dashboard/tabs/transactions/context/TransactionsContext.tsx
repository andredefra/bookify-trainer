import { createContext, useState, useContext, ReactNode } from "react";
import { TransactionType } from "../types/transactionTypes";
import { ClientSummary, ClientData } from "../types/TransactionsTabTypes";
import { toast } from "sonner";

// Mock transaction data for demonstration
const initialTransactions = [
  { id: 1, client: "Sarah Johnson", type: "Program", name: "Strength & Conditioning", amount: 49.99, date: "2023-06-15", status: "paid" as const, paymentMethod: "card" as const, invoiceSent: false },
  { id: 2, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 35, date: "2023-06-12", status: "paid" as const, paymentMethod: "card" as const, invoiceSent: true },
  { id: 3, client: "Lisa Garcia", type: "Program", name: "Weight Loss Program", amount: 79.99, date: "2023-06-10", status: "paid" as const, paymentMethod: "card" as const, invoiceSent: false },
  { id: 4, client: "David Kim", type: "Session", name: "Group Session", amount: 20, date: "2023-06-08", status: "pending" as const, paymentMethod: "cash" as const, invoiceSent: false },
  { id: 5, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 35, date: "2023-06-05", status: "paid" as const, paymentMethod: "card" as const, invoiceSent: true },
  { id: 6, client: "Mike Peterson", type: "Program", name: "Mobility & Recovery", amount: 39.99, date: "2023-06-03", status: "paid" as const, paymentMethod: "cash" as const, invoiceSent: false },
  { id: 7, client: "Lisa Garcia", type: "Session", name: "Assessment", amount: 25, date: "2023-06-01", status: "paid" as const, paymentMethod: "cash" as const, invoiceSent: true },
  { id: 8, client: "James Wilson", type: "Session", name: "Personal Training", amount: 45, date: "2023-06-18", status: "pending" as const, paymentMethod: "cash" as const, invoiceSent: false },
  { id: 9, client: "Emma Thompson", type: "Session", name: "Private Yoga", amount: 40, date: "2023-06-17", status: "pending" as const, paymentMethod: "cash" as const, invoiceSent: false },
  { id: 10, client: "Ryan Murphy", type: "Program", name: "Fat Loss Program", amount: 89.99, date: "2023-06-14", status: "pending" as const, paymentMethod: "cash" as const, invoiceSent: false },
  { id: 11, client: "Olivia Chen", type: "Session", name: "Nutrition Consultation", amount: 55, date: "2023-06-09", status: "pending" as const, paymentMethod: "cash" as const, invoiceSent: false },
  { id: 12, client: "Daniel Lee", type: "Session", name: "Personal Training", amount: 45, date: "2023-06-07", status: "paid" as const, paymentMethod: "cash" as const, invoiceSent: false },
];

// Client data
const clientList: ClientData[] = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Mike Peterson" },
  { id: 3, name: "Lisa Garcia" },
  { id: 4, name: "David Kim" },
  { id: 5, name: "James Wilson" },
  { id: 6, name: "Emma Thompson" },
  { id: 7, name: "Ryan Murphy" },
  { id: 8, name: "Olivia Chen" },
  { id: 9, name: "Daniel Lee" },
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
  handleToggleInvoice: (transactionId: number) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionType[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
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
      
      if (transaction.status === 'paid') {
        summary[transaction.client].totalSpent += transaction.amount;
      }
      
      if (transaction.type === 'Session') {
        summary[transaction.client].sessions += 1;
      } else if (transaction.type === 'Program') {
        summary[transaction.client].programs += 1;
      }
      
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
      invoiceSent: false,
    };
    
    setTransactions([transaction, ...transactions]);
    
    if (transaction.paymentMethod === 'cash') {
      toast.success("Cash transaction added. Remember to confirm receipt when paid.", {
        duration: 3000 // Auto-dismiss after 3 seconds
      });
    } else {
      toast.success("Transaction added successfully", {
        duration: 3000 // Auto-dismiss after 3 seconds
      });
    }
  };
  
  const handleConfirmCashPayment = (transactionId: number) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: 'paid' as const } 
        : transaction
    ));
    
    toast.success("Cash payment confirmed", {
      duration: 3000 // Auto-dismiss after 3 seconds
    });
  };

  const handleToggleInvoice = (transactionId: number) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, invoiceSent: !transaction.invoiceSent } 
        : transaction
    ));
    
    toast.success("Invoice status updated", {
      duration: 3000
    });
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
    handleConfirmCashPayment,
    handleToggleInvoice
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
