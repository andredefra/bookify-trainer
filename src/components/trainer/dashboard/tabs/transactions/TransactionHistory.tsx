
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

interface Transaction {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-green-600">Total Revenue</div>
              <div className="text-2xl font-bold">€{totalRevenue}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-100 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-yellow-600">Pending Payments</div>
              <div className="text-2xl font-bold">€{pendingRevenue}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.client}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell className="font-medium">€{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)} variant="outline">
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
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
