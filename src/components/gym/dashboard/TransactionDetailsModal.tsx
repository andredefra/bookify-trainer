import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { User, Package, CreditCard, Calendar, Receipt } from "lucide-react";

interface Transaction {
  id: string;
  client_name: string;
  package_title: string;
  package_type: string;
  payment_status: string;
  total_paid: number;
  purchase_date: string;
  start_date: string;
  end_date?: string;
  sessions_total?: number;
  sessions_used?: number;
}

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsModal({ transaction, open, onOpenChange }: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'monthly': return 'bg-blue-100 text-blue-800';
      case 'annual': return 'bg-purple-100 text-purple-800';
      case 'weekly': return 'bg-green-100 text-green-800';
      case 'sessions': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Client Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <User className="w-4 h-4" />
              Client Information
            </div>
            <div className="pl-6">
              <div className="font-medium">{transaction.client_name}</div>
            </div>
          </div>

          <Separator />

          {/* Package Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Package className="w-4 h-4" />
              Package Details
            </div>
            <div className="pl-6 space-y-1">
              <div className="font-medium">{transaction.package_title}</div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={getPackageTypeColor(transaction.package_type)}>
                  {transaction.package_type}
                </Badge>
              </div>
              {transaction.sessions_total && (
                <div className="text-sm text-muted-foreground">
                  Sessions: {transaction.sessions_used || 0} / {transaction.sessions_total}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CreditCard className="w-4 h-4" />
              Payment Information
            </div>
            <div className="pl-6 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Amount:</span>
                <span className="font-semibold">€{transaction.total_paid.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant="secondary" className={getPaymentStatusColor(transaction.payment_status)}>
                  {transaction.payment_status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Date Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Important Dates
            </div>
            <div className="pl-6 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Purchase Date:</span>
                <span>{format(new Date(transaction.purchase_date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span>Start Date:</span>
                <span>{format(new Date(transaction.start_date), 'MMM dd, yyyy')}</span>
              </div>
              {transaction.end_date && (
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span>{format(new Date(transaction.end_date), 'MMM dd, yyyy')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}