
import { z } from "zod";

// Define the transaction type
export type TransactionType = {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod?: 'card' | 'cash';
}

// Define the form schema
export const transactionSchema = z.object({
  client: z.string().min(1, { message: "Please select a client" }),
  type: z.string().min(1, { message: "Please select a type" }),
  name: z.string().min(1, { message: "Required" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  date: z.string().min(1, { message: "Required" }),
  status: z.enum(["paid", "pending", "failed"]),
  paymentMethod: z.enum(["card", "cash"])
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

export interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<TransactionType, 'id'>) => void;
  clients: { id: number; name: string }[];
}
