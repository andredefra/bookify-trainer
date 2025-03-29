
import { TransactionType } from "./transactionTypes";

// Client summary type
export interface ClientSummary {
  id: number;
  name: string;
  totalSpent: number;
  lastPayment: string;
  sessions: number;
  programs: number;
}

// Client data type
export interface ClientData {
  id: number;
  name: string;
}
