
export interface Transaction {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed' | 'rejected' | 'no_show';
  paymentMethod?: 'card' | 'cash';
  invoiceSent?: boolean;
  installmentNumber?: number;
  totalInstallments?: number;
  parentTransactionId?: string;
  dueDate?: string;
  isInstallment?: boolean;
  installmentStatus?: 'scheduled' | 'pending' | 'paid' | 'overdue';
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
  onConfirmCashPayment?: (transactionId: number) => void;
  onRejectCashPayment?: (transactionId: number) => void;
  onMarkNoShow?: (transactionId: number) => void;
  onToggleInvoice?: (transactionId: number) => void;
}
