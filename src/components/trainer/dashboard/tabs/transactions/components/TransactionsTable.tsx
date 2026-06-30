
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction, InvoiceStatus } from "../types/TransactionHistoryTypes";
import { PaymentMethodBadge } from "./PaymentMethodBadge";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { CashPaymentConfirmationDialog } from "./CashPaymentConfirmationDialog";
import { InvoiceUploadDialog } from "./InvoiceUploadDialog";
import { InvoiceDetailsDialog } from "./InvoiceDetailsDialog";
import { OpenInvoiceSystemDialog } from "./OpenInvoiceSystemDialog";
import { 
  FileText, 
  CheckCircle, 
  FileEdit, 
  Check, 
  Paperclip, 
  Send, 
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";

// Helper function to check if payment is complete
const isPaymentComplete = (transaction: Transaction): boolean => {
  // Single payment (no installments) is always complete when paid
  if (!transaction.installmentNumber || !transaction.totalInstallments) {
    return true;
  }
  
  // Installment payment is complete only when it's the final installment
  return transaction.installmentNumber === transaction.totalInstallments;
};

interface TransactionsTableProps {
  transactions: Transaction[];
  onConfirmCashPayment?: (transactionId: number) => void;
  onRejectCashPayment?: (transactionId: number) => void;
  onMarkNoShow?: (transactionId: number) => void;
  onToggleInvoice?: (transactionId: number) => void;
  onUpdateInvoiceStatus?: (transactionId: number, status: InvoiceStatus, invoiceUrl?: string) => void;
  onApproveRefund?: (transactionId: number) => void;
  onRejectRefund?: (transactionId: number) => void;
  selectedTransactions?: Set<number>;
  onToggleSelection?: (transactionId: number) => void;
}

export function TransactionsTable({
  transactions,
  onConfirmCashPayment,
  onRejectCashPayment,
  onMarkNoShow,
  onToggleInvoice,
  onUpdateInvoiceStatus,
  onApproveRefund,
  onRejectRefund,
  selectedTransactions = new Set(),
  onToggleSelection
}: TransactionsTableProps) {

  const [selectedCashTransaction, setSelectedCashTransaction] = useState<Transaction | null>(null);
  const [cashDialogOpen, setCashDialogOpen] = useState(false);
  const [showInvoiceUploadDialog, setShowInvoiceUploadDialog] = useState(false);
  const [showInvoiceDetailsDialog, setShowInvoiceDetailsDialog] = useState(false);
  const [showOpenInvoiceDialog, setShowOpenInvoiceDialog] = useState(false);
  const [selectedTransactionForInvoice, setSelectedTransactionForInvoice] = useState<Transaction | null>(null);

  const handleOpenCashDialog = (transaction: Transaction) => {
    setSelectedCashTransaction(transaction);
    setCashDialogOpen(true);
  };

  const handleConfirmCash = (transactionId: number) => {
    onConfirmCashPayment?.(transactionId);
  };

  const handleRejectCash = (transactionId: number) => {
    onRejectCashPayment?.(transactionId);
  };

  const handleNoShow = (transactionId: number) => {
    onMarkNoShow?.(transactionId);
  };

  // Invoice workflow handlers
  const handleOpenInvoiceSystem = (transaction: Transaction) => {
    setSelectedTransactionForInvoice(transaction);
    setShowOpenInvoiceDialog(true);
  };

  const handleCreateDraft = (transactionId: number) => {
    onUpdateInvoiceStatus?.(transactionId, 'draft');
    toast.info("Invoice marked as draft. Complete it in your invoicing system.");
  };

  const handleMarkDone = (transactionId: number) => {
    // "Done" marks invoice as sent without PDF
    onUpdateInvoiceStatus?.(transactionId, 'sent_to_client');
    toast.success("Invoice marked as sent");
  };

  const handleDoneAndUpload = (transaction: Transaction) => {
    setSelectedTransactionForInvoice(transaction);
    setShowInvoiceUploadDialog(true);
  };

  const handleDoneAndSend = (transaction: Transaction) => {
    setSelectedTransactionForInvoice(transaction);
    setShowInvoiceUploadDialog(true);
  };

  const handleViewInvoiceDetails = (transaction: Transaction) => {
    setSelectedTransactionForInvoice(transaction);
    setShowInvoiceDetailsDialog(true);
  };

  const handleResendInvoice = (transactionId: number) => {
    toast.success("Invoice resent to client");
  };

  const handleInvoiceUploadAndSend = (transactionId: number, file: File, sendViaMessages: boolean, sendEmailNotification: boolean) => {
    // In production: upload file to Supabase Storage
    const mockInvoiceUrl = URL.createObjectURL(file);
    
    onUpdateInvoiceStatus?.(transactionId, 'sent_to_client', mockInvoiceUrl);
    
    if (sendViaMessages) {
      toast.success("Invoice sent to client via messages");
    }
    if (sendEmailNotification) {
      toast.success("Email notification sent to client");
    }
    
    setShowInvoiceUploadDialog(false);
    setSelectedTransactionForInvoice(null);
  };

  // Get invoice status from transaction (with fallback for old data)
  const getInvoiceStatus = (transaction: Transaction): InvoiceStatus => {
    if (transaction.invoiceStatus) {
      return transaction.invoiceStatus;
    }
    // Fallback for legacy data
    if (transaction.invoiceSent) {
      return 'sent_to_client';
    }
    return 'none';
  };

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={transactions.length > 0 && transactions
                    .filter(t => t.status === 'paid' && !t.invoiceSent && isPaymentComplete(t))
                    .every(t => selectedTransactions.has(t.id))}
                  onCheckedChange={(checked) => {
                    if (onToggleSelection) {
                      transactions.forEach(t => {
                        if (t.status === 'paid' && !t.invoiceSent && isPaymentComplete(t)) {
                          if (checked && !selectedTransactions.has(t.id)) {
                            onToggleSelection(t.id);
                          } else if (!checked && selectedTransactions.has(t.id)) {
                            onToggleSelection(t.id);
                          }
                        }
                      });
                    }
                  }}
                />
              </TableHead>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Installment</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                const isSelected = selectedTransactions.has(transaction.id);
                const canSelect = transaction.status === 'paid' && !transaction.invoiceSent && isPaymentComplete(transaction);
                const invoiceStatus = getInvoiceStatus(transaction);
                
                return (
                  <TableRow key={transaction.id} className={isSelected ? 'bg-primary/5' : ''}>
                    <TableCell>
                      {canSelect && (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => onToggleSelection?.(transaction.id)}
                        />
                      )}
                    </TableCell>
                    <TableCell className="text-xs">{transaction.date}</TableCell>
                    <TableCell>{transaction.client}</TableCell>
                    <TableCell className="text-xs">{transaction.type}</TableCell>
                    <TableCell className="text-xs">{transaction.name}</TableCell>
                    <TableCell>
                      {transaction.installmentNumber && transaction.totalInstallments ? (
                        <Badge variant="secondary">
                          {transaction.installmentNumber}/{transaction.totalInstallments}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">€{transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {transaction.paymentMethod && (
                        <PaymentMethodBadge method={transaction.paymentMethod} />
                      )}
                    </TableCell>
                    <TableCell>
                      <TransactionStatusBadge status={transaction.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {/* Cash payment confirmation button - opens dialog */}
                        {transaction.paymentMethod === 'cash' && transaction.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs" 
                            onClick={() => handleOpenCashDialog(transaction)}
                          >
                            Confirmation
                          </Button>
                        )}
                        
                        {/* INVOICE WORKFLOW - Solo per pagamenti completati */}
                        {transaction.status === 'paid' && isPaymentComplete(transaction) && (
                          <>
                            {/* Stato: NONE - Nessuna fattura iniziata */}
                            {invoiceStatus === 'none' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-xs relative"
                                onClick={() => handleOpenInvoiceSystem(transaction)}
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Invoice
                                {transaction.invoiceRequestedByClient && (
                                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
                                )}
                              </Button>
                            )}
                            
                            {/* Stato: DRAFT - Fattura in lavorazione */}
                            {invoiceStatus === 'draft' && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="secondary" size="sm" className="h-7 text-xs">
                                    <FileEdit className="h-3 w-3 mr-1" />
                                    Draft
                                    <ChevronDown className="h-3 w-3 ml-1" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover">
                                  <DropdownMenuItem onClick={() => handleMarkDone(transaction.id)}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Done
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDoneAndUpload(transaction)}>
                                    <Paperclip className="h-4 w-4 mr-2" />
                                    Done and Upload
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDoneAndSend(transaction)}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Done and Send to Client
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                            
                            
                            {/* Stato: SENT - Cliccabile per vedere dettagli */}
                            {invoiceStatus === 'sent_to_client' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleViewInvoiceDetails(transaction)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Sent
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Cash Payment Confirmation Dialog */}
      <CashPaymentConfirmationDialog
        transaction={selectedCashTransaction}
        open={cashDialogOpen}
        onOpenChange={setCashDialogOpen}
        onConfirm={handleConfirmCash}
        onReject={handleRejectCash}
        onNoShow={handleNoShow}
      />

      {/* Invoice Upload Dialog */}
      <InvoiceUploadDialog
        open={showInvoiceUploadDialog}
        onOpenChange={setShowInvoiceUploadDialog}
        transaction={selectedTransactionForInvoice}
        onUploadAndSend={handleInvoiceUploadAndSend}
      />

      {/* Invoice Details Dialog */}
      <InvoiceDetailsDialog
        open={showInvoiceDetailsDialog}
        onOpenChange={setShowInvoiceDetailsDialog}
        transaction={selectedTransactionForInvoice}
        onResend={handleResendInvoice}
      />

      {/* Open Invoice System Dialog */}
      <OpenInvoiceSystemDialog
        open={showOpenInvoiceDialog}
        onOpenChange={setShowOpenInvoiceDialog}
        transaction={selectedTransactionForInvoice}
        onCreateDraft={handleCreateDraft}
      />
    </>
  );
}
