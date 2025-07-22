
import { z } from "zod";

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
  receiptSent?: boolean;
  receiptSentAt?: string;
  receiptNumber?: string;
  receiptUrl?: string;
  packageId?: string;
  packageAssignmentId?: string;
  isPackagePayment?: boolean;
  installmentNumber?: number;
  totalInstallments?: number;
}

// Form validation schema
export const transactionSchema = z.object({
  client: z.string().min(1, "Client is required"),
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(['paid', 'pending', 'failed']),
  paymentMethod: z.enum(['card', 'cash']),
  isPackagePayment: z.boolean().optional(),
  installmentNumber: z.number().optional(),
  totalInstallments: z.number().optional()
});

// Form values type
export type TransactionFormValues = z.infer<typeof transactionSchema>;

// Dialog props interface
export interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<TransactionType, 'id'>) => void;
  clients: { id: number; name: string }[];
}

// Bulk operations interface
export interface BulkReceiptOperation {
  transactionIds: number[];
  templateId?: string;
  customMessage?: string;
}

// Receipt template interface
export interface ReceiptTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}
