import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { TransactionType, InvoiceStatus } from "../types/transactionTypes";
import { ClientSummary, ClientData } from "../types/TransactionsTabTypes";
import { toast } from "sonner";
import {
  getDemoTransactions,
  subscribeDemoTransactions,
  upsertDemoTransaction,
  patchDemoTransaction,
  removeDemoTransaction,
  DEMO_CLIENT_NAME,
} from "@/lib/demoTransactionsBridge";
import { notifyDemo } from "@/lib/demoNotify";


// Enhanced mock transaction data - 2025 with realistic revenue distribution
const initialTransactions: TransactionType[] = [
  // January 2025
  { id: 1, client: "Sarah Johnson", type: "Package", name: "Elite Training Package (12 sessions)", amount: 450, date: "2025-01-05", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 2, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 45, date: "2025-01-08", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 3, client: "Lisa Garcia", type: "Program", name: "Strength Building Program", amount: 120, date: "2025-01-12", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 4, client: "David Kim", type: "Session", name: "Personal Training", amount: 40, date: "2025-01-15", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 5, client: "Emma Thompson", type: "Session", name: "Personal Training", amount: 50, date: "2025-01-18", status: "paid", paymentMethod: "cash", invoiceSent: false },
  
  // February 2025
  { id: 6, client: "James Wilson", type: "Package", name: "Transformation Package (20 sessions)", amount: 500, date: "2025-02-03", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 7, client: "Ryan Murphy", type: "Program", name: "Fat Loss Program", amount: 95, date: "2025-02-07", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 8, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 45, date: "2025-02-10", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 9, client: "Olivia Chen", type: "Session", name: "Personal Training", amount: 40, date: "2025-02-14", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 10, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 45, date: "2025-02-20", status: "paid", paymentMethod: "card", invoiceSent: false },
  
  // March 2025
  { id: 11, client: "Daniel Lee", type: "Package", name: "Beginner Package (8 sessions)", amount: 280, date: "2025-03-02", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 12, client: "Lisa Garcia", type: "Program", name: "Mobility & Flexibility", amount: 85, date: "2025-03-08", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 13, client: "David Kim", type: "Session", name: "Personal Training", amount: 40, date: "2025-03-12", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 14, client: "Emma Thompson", type: "Session", name: "Personal Training", amount: 50, date: "2025-03-15", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 15, client: "Ryan Murphy", type: "Session", name: "Personal Training", amount: 45, date: "2025-03-22", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 16, client: "James Wilson", type: "Session", name: "Personal Training", amount: 45, date: "2025-03-28", status: "paid", paymentMethod: "cash", invoiceSent: false },
  
  // April 2025
  { id: 17, client: "Sarah Johnson", type: "Package", name: "Advanced Training Package (15 sessions)", amount: 520, date: "2025-04-05", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 18, client: "Olivia Chen", type: "Program", name: "Core Strength Program", amount: 110, date: "2025-04-09", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 19, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 45, date: "2025-04-13", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 20, client: "Lisa Garcia", type: "Session", name: "Personal Training", amount: 40, date: "2025-04-18", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 21, client: "David Kim", type: "Session", name: "Personal Training", amount: 40, date: "2025-04-24", status: "paid", paymentMethod: "card", invoiceSent: false },
  
  // May 2025
  { id: 22, client: "Daniel Lee", type: "Program", name: "Hypertrophy Program", amount: 135, date: "2025-05-02", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 23, client: "Emma Thompson", type: "Package", name: "Premium Package (10 sessions)", amount: 380, date: "2025-05-06", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 24, client: "James Wilson", type: "Session", name: "Personal Training", amount: 45, date: "2025-05-11", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 25, client: "Ryan Murphy", type: "Session", name: "Personal Training", amount: 45, date: "2025-05-16", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 26, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 45, date: "2025-05-22", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 27, client: "Olivia Chen", type: "Session", name: "Personal Training", amount: 40, date: "2025-05-28", status: "paid", paymentMethod: "cash", invoiceSent: false },
  
  // June 2025
  { id: 28, client: "Mike Peterson", type: "Package", name: "Summer Shred Package (12 sessions)", amount: 460, date: "2025-06-03", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 29, client: "Lisa Garcia", type: "Program", name: "Athletic Performance", amount: 145, date: "2025-06-08", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 30, client: "David Kim", type: "Session", name: "Personal Training", amount: 40, date: "2025-06-14", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 31, client: "Daniel Lee", type: "Session", name: "Personal Training", amount: 45, date: "2025-06-19", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 32, client: "Emma Thompson", type: "Session", name: "Personal Training", amount: 50, date: "2025-06-25", status: "paid", paymentMethod: "card", invoiceSent: false },
  
  // July 2025
  { id: 33, client: "James Wilson", type: "Program", name: "Endurance Training", amount: 115, date: "2025-07-02", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 34, client: "Ryan Murphy", type: "Package", name: "Intensive Training Package (16 sessions)", amount: 550, date: "2025-07-07", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 35, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 45, date: "2025-07-12", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 36, client: "Olivia Chen", type: "Session", name: "Personal Training", amount: 40, date: "2025-07-18", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 37, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 45, date: "2025-07-24", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 38, client: "Lisa Garcia", type: "Session", name: "Personal Training", amount: 40, date: "2025-07-29", status: "paid", paymentMethod: "cash", invoiceSent: false },
  
  // August 2025
  { id: 39, client: "David Kim", type: "Package", name: "Back to Basics Package (10 sessions)", amount: 350, date: "2025-08-04", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 40, client: "Daniel Lee", type: "Program", name: "Power Building", amount: 125, date: "2025-08-09", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 41, client: "Emma Thompson", type: "Session", name: "Personal Training", amount: 50, date: "2025-08-15", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 42, client: "James Wilson", type: "Session", name: "Personal Training", amount: 45, date: "2025-08-20", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 43, client: "Ryan Murphy", type: "Session", name: "Personal Training", amount: 45, date: "2025-08-26", status: "paid", paymentMethod: "card", invoiceSent: false },
  
  // September 2025
  { id: 44, client: "Sarah Johnson", type: "Program", name: "Competition Prep", amount: 150, date: "2025-09-03", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 45, client: "Olivia Chen", type: "Package", name: "Fall Fitness Package (14 sessions)", amount: 490, date: "2025-09-08", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 46, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 45, date: "2025-09-13", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 47, client: "Lisa Garcia", type: "Session", name: "Personal Training", amount: 40, date: "2025-09-19", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 48, client: "David Kim", type: "Session", name: "Personal Training", amount: 40, date: "2025-09-24", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 49, client: "Daniel Lee", type: "Session", name: "Personal Training", amount: 45, date: "2025-09-28", status: "paid", paymentMethod: "card", invoiceSent: false },
  
  // October 2025
  { id: 50, client: "Emma Thompson", type: "Program", name: "Functional Fitness", amount: 105, date: "2025-10-02", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 51, client: "James Wilson", type: "Package", name: "Ultimate Package (18 sessions)", amount: 600, date: "2025-10-07", status: "paid", paymentMethod: "card", invoiceSent: false, isPackagePayment: true },
  { id: 52, client: "Ryan Murphy", type: "Session", name: "Personal Training", amount: 45, date: "2025-10-12", status: "paid", paymentMethod: "cash", invoiceSent: false },
  { id: 53, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 45, date: "2025-10-17", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 54, client: "Olivia Chen", type: "Session", name: "Personal Training", amount: 40, date: "2025-10-23", status: "paid", paymentMethod: "card", invoiceSent: false },
  { id: 55, client: "Mike Peterson", type: "Session", name: "Personal Training", amount: 45, date: "2025-10-28", status: "paid", paymentMethod: "cash", invoiceSent: false },
  
  // November 2025 - Various invoice states for demo
  { id: 56, client: "Lisa Garcia", type: "Package", name: "Year-End Package (12 sessions)", amount: 480, date: "2025-11-02", status: "paid", paymentMethod: "card", invoiceStatus: "sent_to_client", invoiceUrl: "https://example.com/invoices/56.pdf", invoiceSentAt: "2025-11-03T14:30:00Z", isPackagePayment: true },
  { id: 57, client: "David Kim", type: "Program", name: "Injury Prevention", amount: 95, date: "2025-11-06", status: "paid", paymentMethod: "card", invoiceStatus: "draft" },
  { id: 58, client: "Daniel Lee", type: "Session", name: "Personal Training", amount: 45, date: "2025-11-10", status: "paid", paymentMethod: "card", invoiceStatus: "sent_to_client", invoiceUrl: "https://example.com/invoices/58.pdf", invoiceSentAt: "2025-11-11T10:00:00Z" },
  { id: 59, client: "Emma Thompson", type: "Session", name: "Personal Training", amount: 50, date: "2025-11-14", status: "paid", paymentMethod: "cash", invoiceStatus: "none", invoiceRequestedByClient: true, invoiceRequestedAt: "2025-11-15T10:00:00Z" },
  { id: 60, client: "James Wilson", type: "Session", name: "Personal Training", amount: 45, date: "2025-11-18", status: "paid", paymentMethod: "card", invoiceStatus: "sent_to_client", invoiceUrl: "https://example.com/invoices/60.pdf", invoiceSentAt: "2025-11-19T09:15:00Z" },
  
  // December 2025 - Paid transactions (various states)
  { id: 70, client: "Ryan Murphy", type: "Session", name: "Personal Training", amount: 45, date: "2025-12-01", status: "paid", paymentMethod: "card", invoiceStatus: "sent_to_client", invoiceUrl: "https://example.com/invoices/70.pdf", invoiceSentAt: "2025-12-02T11:00:00Z" },
  { id: 71, client: "Sarah Johnson", type: "Session", name: "Personal Training", amount: 45, date: "2025-12-01", status: "paid", paymentMethod: "card", invoiceStatus: "none" },
  
  // December 2025 - CASH payments pending confirmation (for demo: confirm receipt flow)
  { id: 72, client: "Emma Thompson", type: "Session", name: "Personal Training", amount: 50, date: "2025-12-03", status: "pending", paymentMethod: "cash", invoiceSent: false },
  { id: 73, client: "David Kim", type: "Session", name: "Personal Training", amount: 40, date: "2025-12-03", status: "pending", paymentMethod: "cash", invoiceSent: false },
  { id: 74, client: "Lisa Garcia", type: "Program", name: "Core Training Program", amount: 120, date: "2025-12-02", status: "pending", paymentMethod: "cash", invoiceSent: false },
  
  // Sarah Johnson - Elite Annual Package in 3 installments (with installmentStatus and dueDate)
  { 
    id: 63, 
    client: "Sarah Johnson", 
    type: "Package", 
    name: "Elite Annual Package - Installment 1/3", 
    amount: 200, 
    date: "2025-10-15", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 1,
    totalInstallments: 3,
    parentTransactionId: "63",
    dueDate: "2025-10-15",
    installmentStatus: "paid"
  },
  { 
    id: 64, 
    client: "Sarah Johnson", 
    type: "Package", 
    name: "Elite Annual Package - Installment 2/3", 
    amount: 200, 
    date: "2025-11-15", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 2,
    totalInstallments: 3,
    parentTransactionId: "63",
    dueDate: "2025-11-15",
    installmentStatus: "paid"
  },
  { 
    id: 65, 
    client: "Sarah Johnson", 
    type: "Package", 
    name: "Elite Annual Package - Installment 3/3", 
    amount: 200, 
    date: "2025-12-15", 
    status: "pending", 
    paymentMethod: "card",
    invoiceSent: false,
    isInstallment: true,
    installmentNumber: 3,
    totalInstallments: 3,
    parentTransactionId: "63",
    dueDate: "2025-12-15",
    installmentStatus: "pending"
  },
  
  // Mike Peterson - Premium Training Package in 4 installments (with 4/4 overdue)
  { 
    id: 66, 
    client: "Mike Peterson", 
    type: "Package", 
    name: "Premium Training Package - Installment 1/4", 
    amount: 150, 
    date: "2025-08-01", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 1,
    totalInstallments: 4,
    parentTransactionId: "66",
    dueDate: "2025-08-01",
    installmentStatus: "paid"
  },
  { 
    id: 67, 
    client: "Mike Peterson", 
    type: "Package", 
    name: "Premium Training Package - Installment 2/4", 
    amount: 150, 
    date: "2025-09-01", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 2,
    totalInstallments: 4,
    parentTransactionId: "66",
    dueDate: "2025-09-01",
    installmentStatus: "paid"
  },
  { 
    id: 68, 
    client: "Mike Peterson", 
    type: "Package", 
    name: "Premium Training Package - Installment 3/4", 
    amount: 150, 
    date: "2025-10-01", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 3,
    totalInstallments: 4,
    parentTransactionId: "66",
    dueDate: "2025-10-01",
    installmentStatus: "paid"
  },
  
  // James Wilson - Transformation Pro Package in 2 installments (1 paid, 1 pending)
  { 
    id: 75, 
    client: "James Wilson", 
    type: "Package", 
    name: "Transformation Pro Package - Installment 1/2", 
    amount: 300, 
    date: "2025-11-15", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 1,
    totalInstallments: 2,
    parentTransactionId: "75",
    dueDate: "2025-11-15",
    installmentStatus: "paid"
  },
  { 
    id: 76, 
    client: "James Wilson", 
    type: "Package", 
    name: "Transformation Pro Package - Installment 2/2", 
    amount: 300, 
    date: "2025-12-15", 
    status: "pending", 
    paymentMethod: "card",
    invoiceSent: false,
    isInstallment: true,
    installmentNumber: 2,
    totalInstallments: 2,
    parentTransactionId: "75",
    dueDate: "2025-12-15",
    installmentStatus: "pending"
  },
  
  // Olivia Chen - Fitness Journey Package in 3 installments (2 paid, 1 overdue)
  { 
    id: 77, 
    client: "Olivia Chen", 
    type: "Package", 
    name: "Fitness Journey Package - Installment 1/3", 
    amount: 180, 
    date: "2025-09-20", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 1,
    totalInstallments: 3,
    parentTransactionId: "77",
    dueDate: "2025-09-20",
    installmentStatus: "paid"
  },
  { 
    id: 78, 
    client: "Olivia Chen", 
    type: "Package", 
    name: "Fitness Journey Package - Installment 2/3", 
    amount: 180, 
    date: "2025-10-20", 
    status: "paid", 
    paymentMethod: "card",
    invoiceSent: true,
    isInstallment: true,
    installmentNumber: 2,
    totalInstallments: 3,
    parentTransactionId: "77",
    dueDate: "2025-10-20",
    installmentStatus: "paid"
  },
  
  // Emily Davis - Coaching Package in 4 installments (3 paid, 1 OVERDUE)
  { 
    id: 80, 
    client: "Emily Davis", 
    type: "Package", 
    name: "Coaching Package - Installment 4/4", 
    amount: 150, 
    date: "2025-11-01", 
    status: "pending", 
    paymentMethod: "card",
    invoiceSent: false,
    isInstallment: true,
    installmentNumber: 4,
    totalInstallments: 4,
    parentTransactionId: "80",
    dueDate: "2025-11-01",
    installmentStatus: "overdue"
  },
  
  // Alex Thompson - Personal Training Plan in 3 installments (2 paid, 1 OVERDUE)
  { 
    id: 81, 
    client: "Alex Thompson", 
    type: "Program", 
    name: "Personal Training Plan - Installment 3/3", 
    amount: 180, 
    date: "2025-11-20", 
    status: "pending", 
    paymentMethod: "card",
    invoiceSent: false,
    isInstallment: true,
    installmentNumber: 3,
    totalInstallments: 3,
    parentTransactionId: "81",
    dueDate: "2025-11-20",
    installmentStatus: "overdue"
  },
];

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
  selectedTransactions: Set<number>;
  clients: ClientData[];
  clientSummaries: ClientSummary[];
  filteredTransactions: TransactionType[];
  filteredClients: ClientSummary[];
  setSearchQuery: (query: string) => void;
  setShowAddDialog: (show: boolean) => void;
  setSelectedTransactions: (transactions: Set<number>) => void;
  handleAddTransaction: (newTransaction: Omit<TransactionType, 'id'>) => void;
  handleConfirmCashPayment: (transactionId: number) => void;
  handleRejectCashPayment: (transactionId: number) => void;
  handleMarkNoShow: (transactionId: number) => void;
  handleToggleInvoice: (transactionId: number) => void;
  handleUpdateInvoiceStatus: (transactionId: number, status: InvoiceStatus, invoiceUrl?: string) => void;
  selectAllPaidTransactions: () => void;
  clearSelection: () => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [bridgeTx, setBridgeTx] = useState<TransactionType[]>(() => getDemoTransactions() as TransactionType[]);

  useEffect(() => {
    const refresh = () => setBridgeTx(getDemoTransactions() as TransactionType[]);
    refresh();
    return subscribeDemoTransactions(refresh);
  }, []);

  // Merge bridge demo entries (Andrea) with the in-memory mock seed.
  const mergedSeed: TransactionType[] = [
    ...bridgeTx,
    ...initialTransactions.filter((t) => !bridgeTx.find((b) => b.id === t.id)),
  ];

  const [transactions, setTransactions] = useState<TransactionType[]>(mergedSeed);

  // Sync trainer state when bridge changes (e.g. client requests invoice/refund or confirms receipt)
  useEffect(() => {
    setTransactions((prev) => {
      const bridgeIds = new Set(bridgeTx.map((t) => t.id));
      const merged = [
        ...bridgeTx,
        ...prev.filter((t) => !bridgeIds.has(t.id) && !isDemoTx(t)),
      ];
      return merged;
    });
  }, [bridgeTx]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<number>>(new Set());
  
  const generateClientSummary = (): ClientSummary[] => {
    const summary: Record<string, any> = {};
    
    transactions.forEach(transaction => {
      if (!summary[transaction.client]) {
        summary[transaction.client] = {
          id: Math.random(), // Generate a simple id
          name: transaction.client,
          totalSpent: 0,
          lastPayment: transaction.date,
          sessions: 0,
          programs: 0
        };
      }
      
      const clientSummary = summary[transaction.client];
      
      if (transaction.status === 'paid') {
        clientSummary.totalSpent += transaction.amount;
      }
      
      if (new Date(transaction.date) > new Date(clientSummary.lastPayment)) {
        clientSummary.lastPayment = transaction.date;
      }
      
      if (transaction.type === 'Session') {
        clientSummary.sessions++;
      } else if (transaction.type === 'Program') {
        clientSummary.programs++;
      }
    });
    
    return Object.values(summary);
  };

  const clientSummaries = generateClientSummary();

  const handleAddTransaction = (newTransaction: Omit<TransactionType, 'id'>) => {
    const transaction: TransactionType = {
      ...newTransaction,
      id: Math.max(...transactions.map(t => t.id)) + 1
    };
    setTransactions(prev => [transaction, ...prev]);
    setShowAddDialog(false);
    toast.success("Transaction added successfully", { duration: 2000 });
  };

  const handleConfirmCashPayment = (transactionId: number) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId ? { ...t, status: 'paid' as const } : t
      )
    );
    toast.success("Cash payment confirmed", { duration: 2000 });
  };

  const handleRejectCashPayment = (transactionId: number) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId ? { ...t, status: 'rejected' as const } : t
      )
    );
    toast.info("Payment rejected - transaction cancelled", { duration: 2000 });
  };

  const handleMarkNoShow = (transactionId: number) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId ? { ...t, status: 'no_show' as const } : t
      )
    );
    toast.warning("Client marked as no-show", { duration: 2000 });
  };

  const handleToggleInvoice = (transactionId: number) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId ? { ...t, invoiceSent: !t.invoiceSent } : t
      )
    );
  };

  const handleUpdateInvoiceStatus = (transactionId: number, status: InvoiceStatus, invoiceUrl?: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { 
              ...t, 
              invoiceStatus: status,
              invoiceUrl: invoiceUrl || t.invoiceUrl,
              invoiceSentAt: status === 'sent_to_client' ? new Date().toISOString() : t.invoiceSentAt
            } 
          : t
      )
    );
  };

  const selectAllPaidTransactions = () => {
    const paidTransactionIds = transactions
      .filter(t => t.status === 'paid' && !t.invoiceSent)
      .map(t => t.id);
    setSelectedTransactions(new Set(paidTransactionIds));
  };

  const clearSelection = () => {
    setSelectedTransactions(new Set());
  };

  const getFilteredTransactions = () => {
    return transactions
      // Exclude card pending transactions (they belong in Pending Installments tab)
      // Only cash pending should show here as they await manual confirmation
      .filter(t => !(t.status === 'pending' && t.paymentMethod === 'card'))
      .filter(t => 
        t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const filteredTransactions = getFilteredTransactions();
  
  const getFilteredClients = () => {
    return clientSummaries.filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredClients = getFilteredClients();

  const value: TransactionsContextType = {
    transactions,
    searchQuery,
    showAddDialog,
    selectedTransactions,
    clients: clientList,
    clientSummaries,
    filteredTransactions,
    filteredClients,
    setSearchQuery,
    setShowAddDialog,
    setSelectedTransactions,
    handleAddTransaction,
    handleConfirmCashPayment,
    handleRejectCashPayment,
    handleMarkNoShow,
    handleToggleInvoice,
    handleUpdateInvoiceStatus,
    selectAllPaidTransactions,
    clearSelection
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