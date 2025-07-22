import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard, 
  Receipt, 
  DollarSign, 
  TrendingUp, 
  ArrowUpIcon, 
  ArrowDownIcon,
  Eye,
  Download,
  CheckCircle,
  FileText,
  Send,
  Filter
} from "lucide-react";
import { useGymTransactions, useTransactionStats } from "@/hooks/useGymTransactions";
import { useConfirmCashPayment, useMarkInvoiceSent } from "@/hooks/useGymPaymentActions";
import { TransactionDetailsModal } from "../TransactionDetailsModal";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TransactionsTab() {
  const { data: transactions, isLoading: transactionsLoading, refetch } = useGymTransactions();
  const { data: stats, isLoading: statsLoading } = useTransactionStats();
  const confirmCashPayment = useConfirmCashPayment();
  const markInvoiceSent = useMarkInvoiceSent();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [showReceiptFilter, setShowReceiptFilter] = useState<'all' | 'sent' | 'unsent'>('all');

  const handleConfirmCashPayment = async (transactionId: string) => {
    try {
      await confirmCashPayment.mutateAsync(transactionId);
      setTimeout(() => {
        refetch();
      }, 100);
      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setDetailsModalOpen(true);
  };

  const handleSendSingleReceipt = (transaction: any) => {
    const invoiceUrl = `https://invoice-partner.com/create?amount=${transaction.total_paid}&client=${encodeURIComponent(transaction.client_name)}&description=${encodeURIComponent(transaction.package_title)}`;
    
    window.open(invoiceUrl, 'invoice-popup', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    markInvoiceSent.mutate(transaction.id);
    
    toast.success("Invoice integration opened. Complete the process in the new window.", {
      duration: 4000
    });
  };

  const handleToggleSelection = (transactionId: string) => {
    const newSelection = new Set(selectedTransactions);
    if (newSelection.has(transactionId)) {
      newSelection.delete(transactionId);
    } else {
      newSelection.add(transactionId);
    }
    setSelectedTransactions(newSelection);
  };

  const handleSelectAll = () => {
    const paidTransactions = filteredTransactions.filter(t => t.payment_status === 'paid');
    if (selectedTransactions.size === paidTransactions.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(paidTransactions.map(t => t.id)));
    }
  };

  const handleBulkSendReceipts = () => {
    if (selectedTransactions.size === 0) {
      toast.error("Please select transactions to send receipts for");
      return;
    }

    const selectedTxns = filteredTransactions.filter(t => selectedTransactions.has(t.id));
    
    selectedTxns.forEach(transaction => {
      const invoiceUrl = `https://invoice-partner.com/create?amount=${transaction.total_paid}&client=${encodeURIComponent(transaction.client_name)}&description=${encodeURIComponent(transaction.package_title)}`;
      window.open(invoiceUrl, `invoice-${transaction.id}`, 'width=800,height=600,scrollbars=yes,resizable=yes');
      markInvoiceSent.mutate(transaction.id);
    });

    toast.success(`Opening invoice integration for ${selectedTransactions.size} transactions`, {
      duration: 4000
    });
    
    setSelectedTransactions(new Set());
  };

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

  const filteredTransactions = transactions?.filter(transaction => {
    if (showReceiptFilter === 'sent') {
      return transaction.receipt_sent_at;
    } else if (showReceiptFilter === 'unsent') {
      return !transaction.receipt_sent_at && transaction.payment_status === 'paid';
    }
    return true;
  }) || [];

  const paidTransactionsCount = filteredTransactions.filter(t => t.payment_status === 'paid').length;
  const unsentReceiptsCount = filteredTransactions.filter(t => !t.receipt_sent_at && t.payment_status === 'paid').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{statsLoading ? '...' : stats?.todayRevenue.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Real-time revenue tracking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : stats?.pendingPayments || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              require confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unsent Receipts
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {transactionsLoading ? '...' : unsentReceiptsCount}
            </div>
            <p className="text-xs text-muted-foreground">
              paid transactions missing receipts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Total
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{statsLoading ? '...' : stats?.monthlyRevenue.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {stats?.revenueGrowth && stats.revenueGrowth >= 0 ? (
                <>
                  <ArrowUpIcon className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">+{stats.revenueGrowth}%</span>
                </>
              ) : (
                <>
                  <ArrowDownIcon className="w-3 h-3 text-red-500" />
                  <span className="text-red-500">{stats?.revenueGrowth}%</span>
                </>
              )} vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Tabs value={showReceiptFilter} onValueChange={(value: any) => setShowReceiptFilter(value)}>
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="unsent">Missing Receipts ({unsentReceiptsCount})</TabsTrigger>
              <TabsTrigger value="sent">Receipts Sent</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {selectedTransactions.size > 0 && (
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium">
              {selectedTransactions.size} selected
            </span>
            <Button 
              size="sm" 
              onClick={handleBulkSendReceipts}
              className="h-8"
            >
              <Send className="w-4 h-4 mr-1" />
              Send Receipts
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedTransactions(new Set())}
              className="h-8"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Manage payments and send electronic receipts
              </CardDescription>
            </div>
            {paidTransactionsCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedTransactions.size === paidTransactionsCount ? 'Deselect All' : 'Select All Paid'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                </div>
              ))}
            </div>
          ) : filteredTransactions && filteredTransactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {transaction.payment_status === 'paid' && (
                        <Checkbox
                          checked={selectedTransactions.has(transaction.id)}
                          onCheckedChange={() => handleToggleSelection(transaction.id)}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.client_name}</div>
                        <div className="text-sm text-muted-foreground">{transaction.client_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.package_title}</div>
                        <Badge variant="secondary" className={`${getPackageTypeColor(transaction.package_type)} text-xs mt-1`}>
                          {transaction.package_type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      €{transaction.total_paid.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {transaction.purchase_date ? format(new Date(transaction.purchase_date), 'MMM dd, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${getPaymentStatusColor(transaction.payment_status)}`}>
                        {transaction.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.payment_status === 'paid' && (
                        <div className="flex items-center gap-1">
                          {transaction.receipt_sent_at ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Sent
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              <FileText className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.payment_status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleConfirmCashPayment(transaction.id)}
                            disabled={confirmCashPayment.isPending}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Confirm
                          </Button>
                        )}
                        
                        {transaction.payment_status === 'paid' && (
                          <Button 
                            variant="outline"
                            size="sm" 
                            onClick={() => handleSendSingleReceipt(transaction)}
                            disabled={markInvoiceSent.isPending}
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Send Receipt
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(transaction)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {showReceiptFilter === 'unsent' ? 'No transactions missing receipts' : 
               showReceiptFilter === 'sent' ? 'No receipts sent yet' : 
               'No transactions found'}
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionDetailsModal
        transaction={selectedTransaction}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
    </div>
  );
}