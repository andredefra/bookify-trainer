
export interface Transaction {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod?: 'card' | 'cash';
  invoiceSent?: boolean;
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
  onConfirmCashPayment?: (transactionId: number) => void;
  onToggleInvoice?: (transactionId: number) => void;
}
