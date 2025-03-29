
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Euro, CreditCard, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Transaction {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod?: 'card' | 'cash';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onConfirmCashPayment?: (transactionId: number) => void;
}

export function TransactionHistory({ transactions, onConfirmCashPayment }: TransactionHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/10 text-green-600 hover:bg-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20';
      case 'failed': return 'bg-red-500/10 text-red-600 hover:bg-red-500/20';
      default: return '';
    }
  };
  
  // Calculate totals
  const totalRevenue = transactions.reduce((sum, t) => 
    t.status === 'paid' ? sum + t.amount : sum, 0
  ).toFixed(2);
  
  const pendingRevenue = transactions.reduce((sum, t) => 
    t.status === 'pending' ? sum + t.amount : sum, 0
  ).toFixed(2);

  const handleConfirmPayment = (transactionId: number) => {
    if (onConfirmCashPayment) {
      onConfirmCashPayment(transactionId);
    } else {
      toast.error("Payment confirmation functionality is not available");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-1.5 rounded-full">
              <Euro className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-green-600">Total Revenue</div>
              <div className="text-xl font-bold">€{totalRevenue}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-100 p-1.5 rounded-full">
              <Euro className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-yellow-600">Pending Payments</div>
              <div className="text-xl font-bold">€{pendingRevenue}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-xs">{transaction.date}</TableCell>
                  <TableCell>{transaction.client}</TableCell>
                  <TableCell className="text-xs">{transaction.type}</TableCell>
                  <TableCell className="text-xs">{transaction.name}</TableCell>
                  <TableCell className="font-medium">€{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {transaction.paymentMethod === 'cash' ? (
                      <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" variant="outline">
                        <Coins className="mr-1 h-3 w-3" />
                        Cash
                      </Badge>
                    ) : (
                      <Badge className="bg-slate-500/10 text-slate-600 hover:bg-slate-500/20" variant="outline">
                        <CreditCard className="mr-1 h-3 w-3" />
                        Card
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)} variant="outline">
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.paymentMethod === 'cash' && transaction.status === 'pending' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs" 
                        onClick={() => handleConfirmPayment(transaction.id)}
                      >
                        Confirm Receipt
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
