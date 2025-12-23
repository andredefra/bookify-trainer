export interface StudioTransaction {
  id: string;
  clientName: string;
  clientEmail: string;
  trainerName: string;
  trainerId: string;
  packageName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  paymentMethod: 'card' | 'cash' | 'transfer' | 'online';
  date: string;
  invoiceNumber?: string;
  invoiceSent: boolean;
}

export interface TrainerStats {
  trainerId: string;
  trainerName: string;
  totalRevenue: number;
  transactionCount: number;
  pendingAmount: number;
  commission: number;
}

export const mockStudioTransactions: StudioTransaction[] = [
  {
    id: "1",
    clientName: "Emma Thompson",
    clientEmail: "emma@example.com",
    trainerName: "Marco Rossi",
    trainerId: "t1",
    packageName: "Premium PT Package",
    amount: 450,
    status: "paid",
    paymentMethod: "card",
    date: "2024-01-15",
    invoiceNumber: "INV-2024-001",
    invoiceSent: true
  },
  {
    id: "2",
    clientName: "James Wilson",
    clientEmail: "james@example.com",
    trainerName: "Giulia Bianchi",
    trainerId: "t2",
    packageName: "Monthly Coaching",
    amount: 280,
    status: "pending",
    paymentMethod: "transfer",
    date: "2024-01-18",
    invoiceSent: false
  },
  {
    id: "3",
    clientName: "Sofia Martinez",
    clientEmail: "sofia@example.com",
    trainerName: "Marco Rossi",
    trainerId: "t1",
    packageName: "10 Sessions Pack",
    amount: 350,
    status: "paid",
    paymentMethod: "online",
    date: "2024-01-20",
    invoiceNumber: "INV-2024-002",
    invoiceSent: true
  },
  {
    id: "4",
    clientName: "Alex Chen",
    clientEmail: "alex@example.com",
    trainerName: "Paolo Verdi",
    trainerId: "t3",
    packageName: "Strength Program",
    amount: 520,
    status: "overdue",
    paymentMethod: "card",
    date: "2024-01-10",
    invoiceSent: true
  },
  {
    id: "5",
    clientName: "Maria Garcia",
    clientEmail: "maria@example.com",
    trainerName: "Giulia Bianchi",
    trainerId: "t2",
    packageName: "Wellness Package",
    amount: 180,
    status: "paid",
    paymentMethod: "cash",
    date: "2024-01-22",
    invoiceNumber: "INV-2024-003",
    invoiceSent: true
  },
  {
    id: "6",
    clientName: "David Brown",
    clientEmail: "david@example.com",
    trainerName: "Marco Rossi",
    trainerId: "t1",
    packageName: "VIP Training",
    amount: 800,
    status: "pending",
    paymentMethod: "transfer",
    date: "2024-01-25",
    invoiceSent: false
  },
  {
    id: "7",
    clientName: "Lisa Anderson",
    clientEmail: "lisa@example.com",
    trainerName: "Paolo Verdi",
    trainerId: "t3",
    packageName: "Starter Pack",
    amount: 150,
    status: "refunded",
    paymentMethod: "card",
    date: "2024-01-08",
    invoiceNumber: "INV-2024-004",
    invoiceSent: true
  }
];

export const mockTrainerStats: TrainerStats[] = [
  {
    trainerId: "t1",
    trainerName: "Marco Rossi",
    totalRevenue: 1600,
    transactionCount: 3,
    pendingAmount: 800,
    commission: 320
  },
  {
    trainerId: "t2",
    trainerName: "Giulia Bianchi",
    totalRevenue: 460,
    transactionCount: 2,
    pendingAmount: 280,
    commission: 92
  },
  {
    trainerId: "t3",
    trainerName: "Paolo Verdi",
    totalRevenue: 670,
    transactionCount: 2,
    pendingAmount: 520,
    commission: 134
  }
];

export const studioTrainers = [
  { id: "t1", name: "Marco Rossi" },
  { id: "t2", name: "Giulia Bianchi" },
  { id: "t3", name: "Paolo Verdi" }
];
