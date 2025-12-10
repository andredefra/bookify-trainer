import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Receipt, Plus } from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: "paid" | "pending";
}

interface TrainerPaymentsHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainerName: string;
  onMakePayment?: () => void;
}

// Mock payment data - in real app would come from database
const getMockPayments = (trainerName: string): Payment[] => {
  if (trainerName === "Sarah Johnson") {
    return [
      { id: "1", date: "2024-12-05", type: "Personal Session", amount: 50, status: "paid" },
      { id: "2", date: "2024-11-28", type: "Personal Session", amount: 50, status: "paid" },
      { id: "3", date: "2024-11-20", type: "Package (10 Sessions)", amount: 450, status: "paid" },
      { id: "4", date: "2024-11-15", type: "Personal Session", amount: 50, status: "paid" },
    ];
  }
  if (trainerName === "Alex Thompson") {
    return [
      { id: "5", date: "2024-12-03", type: "HIIT Session", amount: 45, status: "paid" },
      { id: "6", date: "2024-11-25", type: "HIIT Session", amount: 45, status: "paid" },
    ];
  }
  return [];
};

export function TrainerPaymentsHistoryDialog({
  open,
  onOpenChange,
  trainerName,
  onMakePayment,
}: TrainerPaymentsHistoryDialogProps) {
  const payments = getMockPayments(trainerName);
  const totalPaid = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadInvoice = (paymentId: string) => {
    toast.success(`Downloading invoice for payment #${paymentId}`);
  };

  const handleDownloadReceipt = (paymentId: string) => {
    toast.success(`Downloading receipt for payment #${paymentId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payment History - {trainerName}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {payments.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell className="text-right font-medium">€{payment.amount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(payment.id)}
                            title="Download Invoice"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadReceipt(payment.id)}
                            title="Download Receipt"
                          >
                            <Receipt className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  Total paid: <span className="font-semibold text-foreground">€{totalPaid}</span>
                </div>
                {onMakePayment && (
                  <Button onClick={onMakePayment} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Make Payment
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No payments found for this trainer.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
