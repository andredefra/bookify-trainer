
import { z } from "zod";

export type InvoiceStatus = 'none' | 'draft' | 'uploaded' | 'sent_to_client';

export interface TransactionType {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed' | 'rejected' | 'no_show';
  paymentMethod?: 'card' | 'cash';
  invoiceSent?: boolean;
  packageId?: string;
  packageAssignmentId?: string;
  isPackagePayment?: boolean;
  installmentNumber?: number;
  totalInstallments?: number;
  // New installment fields
  parentTransactionId?: string;
  dueDate?: string;
  isInstallment?: boolean;
  installmentStatus?: 'scheduled' | 'pending' | 'paid' | 'overdue';
  // Invoice workflow fields
  invoiceStatus?: InvoiceStatus;
  invoiceUrl?: string;
  invoiceRequestedByClient?: boolean;
  invoiceRequestedAt?: string;
  invoiceSentAt?: string;
}

// Form validation schema
export const transactionSchema = z.object({
  client: z.string().min(1, "Client is required"),
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(['paid', 'pending', 'failed', 'rejected', 'no_show']),
  paymentMethod: z.enum(['card', 'cash']),
  isPackagePayment: z.boolean().optional(),
  installmentNumber: z.number().optional(),
  totalInstallments: z.number().optional(),
  parentTransactionId: z.string().optional(),
  dueDate: z.string().optional(),
  isInstallment: z.boolean().optional(),
  installmentStatus: z.enum(['scheduled', 'pending', 'paid', 'overdue']).optional()
}).refine(
  (data) => {
    // If isInstallment is true, installmentNumber and totalInstallments are required
    if (data.isInstallment) {
      if (!data.installmentNumber || !data.totalInstallments) {
        return false;
      }
      
      // parentTransactionId is required ONLY if installmentNumber > 1
      if (data.installmentNumber > 1 && !data.parentTransactionId) {
        return false;
      }
      
      return true;
    }
    return true;
  },
  {
    message: "Installment number and total are required. Parent transaction required for installments 2+",
  }
);

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
