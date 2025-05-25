
export interface TransactionType {
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
