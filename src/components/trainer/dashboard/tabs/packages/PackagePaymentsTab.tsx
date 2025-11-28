import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePackagePayments } from '@/hooks/usePackagePayments';
import { CheckCircle2, Clock, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { RecordPaymentDialog } from '@/components/trainer/dialogs/RecordPaymentDialog';

interface PackagePaymentsTabProps {
  packageAssignmentId: string;
  clientName: string;
}

export const PackagePaymentsTab = ({ packageAssignmentId, clientName }: PackagePaymentsTabProps) => {
  const { payments, packagePrice, totalPaid, remainingAmount, loading } = usePackagePayments(packageAssignmentId);
  const [showRecordDialog, setShowRecordDialog] = useState(false);

  const progressPercentage = packagePrice > 0 ? (totalPaid / packagePrice) * 100 : 0;

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive">
            <Clock className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-8">Loading payment information...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Payment Progress Summary */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Payment Progress</h3>
              <p className="text-sm text-muted-foreground">Total package price: €{packagePrice.toFixed(2)}</p>
            </div>
            <Button onClick={() => setShowRecordDialog(true)}>
              <CreditCard className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">€{totalPaid.toFixed(2)} paid</span>
              <span className="text-muted-foreground">€{remainingAmount.toFixed(2)} remaining</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground text-right">{progressPercentage.toFixed(1)}% complete</p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">€{totalPaid.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Total Paid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">€{remainingAmount.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{payments.length}</div>
              <div className="text-xs text-muted-foreground">Installments</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Schedule */}
      <div>
        <h3 className="font-semibold mb-3">Payment Schedule</h3>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {payments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No payment records found</p>
            ) : (
              payments.map((payment, index) => (
                <Card key={payment.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">Installment #{index + 1}</span>
                        {getPaymentStatusBadge(payment.paymentStatus)}
                      </div>

                      <div className="space-y-1 text-sm">
                        {payment.paymentDate && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Paid on {format(new Date(payment.paymentDate), 'PPP')}
                          </div>
                        )}
                        {payment.dueDate && payment.paymentStatus === 'pending' && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Due: {format(new Date(payment.dueDate), 'PPP')}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          Amount: €{payment.amount.toFixed(2)}
                        </div>
                        {payment.paymentMethod && (
                          <div className="text-muted-foreground">
                            Method: {payment.paymentMethod.charAt(0).toUpperCase() + payment.paymentMethod.slice(1)}
                          </div>
                        )}
                        {payment.notes && <div className="text-muted-foreground italic">{payment.notes}</div>}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <RecordPaymentDialog
        open={showRecordDialog}
        onOpenChange={setShowRecordDialog}
        packageAssignmentId={packageAssignmentId}
        clientName={clientName}
      />
    </div>
  );
};
