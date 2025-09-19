import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Send } from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";
import { TransactionType } from "../types/transactionTypes";

export function PendingInstallments() {
  const { filteredTransactions } = useTransactions();

  // Filter for pending installments
  const pendingInstallments = filteredTransactions.filter(
    transaction => 
      transaction.isInstallment && 
      (transaction.installmentStatus === 'pending' || transaction.installmentStatus === 'overdue')
  );

  // Group by client
  const groupedByClient = pendingInstallments.reduce((acc, transaction) => {
    const clientName = transaction.client;
    if (!acc[clientName]) {
      acc[clientName] = [];
    }
    acc[clientName].push(transaction);
    return acc;
  }, {} as Record<string, TransactionType[]>);

  const handleSendReminder = (transactionId: number) => {
    // TODO: Implement reminder functionality
    console.log('Sending reminder for transaction:', transactionId);
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'overdue':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const isOverdue = (dueDate: string | undefined) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  if (pendingInstallments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-muted-foreground">No Pending Installments</h3>
            <p className="text-sm text-muted-foreground mt-2">
              All installment payments are up to date
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedByClient).map(([clientName, transactions]) => {
        const totalPending = transactions.reduce((sum, t) => sum + t.amount, 0);
        const hasOverdue = transactions.some(t => t.installmentStatus === 'overdue' || isOverdue(t.dueDate));

        return (
          <Card key={clientName}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {hasOverdue && <AlertCircle className="h-4 w-4 text-destructive" />}
                  {clientName}
                  <Badge variant={hasOverdue ? "destructive" : "secondary"}>
                    {transactions.length} installment{transactions.length > 1 ? 's' : ''} pending
                  </Badge>
                </CardTitle>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Pending</p>
                  <p className="font-semibold">€{totalPending.toFixed(2)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package/Program</TableHead>
                    <TableHead>Installment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.name}</p>
                          <p className="text-sm text-muted-foreground">{transaction.type}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {transaction.installmentNumber}/{transaction.totalInstallments}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        €{transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {transaction.dueDate ? (
                          <div className={isOverdue(transaction.dueDate) ? "text-destructive" : ""}>
                            {new Date(transaction.dueDate).toLocaleDateString()}
                            {isOverdue(transaction.dueDate) && (
                              <p className="text-xs">Overdue</p>
                            )}
                          </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.installmentStatus)}>
                          {transaction.installmentStatus || 'pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendReminder(transaction.id)}
                          className="flex items-center gap-1"
                        >
                          <Send className="h-3 w-3" />
                          Remind
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}