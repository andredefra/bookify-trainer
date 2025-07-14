import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  FileText
} from "lucide-react";
import { useGymTransactions, useTransactionStats } from "@/hooks/useGymTransactions";
import { useConfirmCashPayment, useMarkInvoiceSent } from "@/hooks/useGymPaymentActions";
import { TransactionDetailsModal } from "../TransactionDetailsModal";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

export function TransactionsTab() {
  const { data: transactions, isLoading: transactionsLoading, refetch } = useGymTransactions();
  const { data: stats, isLoading: statsLoading } = useTransactionStats();
  const confirmCashPayment = useConfirmCashPayment();
  const markInvoiceSent = useMarkInvoiceSent();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleConfirmCashPayment = async (transactionId: string) => {
    try {
      await confirmCashPayment.mutateAsync(transactionId);
      // Force multiple refetches to ensure UI updates
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

  const handleSendInvoice = (transaction: any) => {
    const invoiceUrl = `https://invoice-partner.com/create?amount=${transaction.total_paid}&client=${encodeURIComponent(transaction.client_name)}&description=${encodeURIComponent(transaction.package_title)}`;
    
    window.open(invoiceUrl, 'invoice-popup', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    markInvoiceSent.mutate(transaction.id);
    
    toast.success("Invoice integration opened. Complete the process in the new window.", {
      duration: 4000
    });
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Methods
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : Object.keys(stats?.paymentMethods || {}).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.paymentMethods ? Object.keys(stats.paymentMethods).join(', ') : 'Card, Cash, Transfer'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest package purchases and payments
          </CardDescription>
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
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.slice(0, 10).map((transaction) => (
                <div key={transaction.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg gap-4">
                  {/* Mobile Layout - Stacked */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{transaction.client_name}</div>
                      <div className="text-sm text-muted-foreground truncate">{transaction.package_title}</div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.purchase_date ? format(new Date(transaction.purchase_date), 'MMM dd, yyyy') : 'Date not available'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile/Desktop - Badges and Amount */}
                  <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                    <Badge variant="secondary" className={`${getPackageTypeColor(transaction.package_type)} text-xs`}>
                      {transaction.package_type}
                    </Badge>
                    <Badge variant="secondary" className={`${getPaymentStatusColor(transaction.payment_status)} text-xs`}>
                      {transaction.payment_status}
                    </Badge>
                    <div className="text-right">
                      <div className="font-semibold">€{transaction.total_paid.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Cash payment confirmation button */}
                    {transaction.payment_status === 'pending' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs flex-shrink-0"
                        onClick={() => handleConfirmCashPayment(transaction.id)}
                        disabled={confirmCashPayment.isPending}
                      >
                        <CheckCircle className="w-3 h-3 lg:mr-1" />
                        <span className="hidden lg:inline">Confirm Receipt</span>
                      </Button>
                    )}
                    
                    {/* Invoice button - only for paid transactions */}
                    {transaction.payment_status === 'paid' && (
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="h-8 text-xs flex-shrink-0"
                        onClick={() => handleSendInvoice(transaction)}
                        disabled={markInvoiceSent.isPending}
                      >
                        <FileText className="w-3 h-3 lg:mr-1" />
                        <span className="hidden lg:inline">Invoice</span>
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 flex-shrink-0"
                      onClick={() => handleViewDetails(transaction)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods Breakdown</CardTitle>
            <CardDescription>
              Distribution of payment methods used
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-10" />
                  </div>
                ))}
              </div>
            ) : stats?.paymentMethods ? (
              <div className="space-y-3">
                {Object.entries(stats.paymentMethods).map(([method, count]) => (
                  <div key={method} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-sm font-medium">{method}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{count} transactions</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No payment data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage payments and generate reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Receipt className="w-4 h-4 mr-2" />
              Process Pending Payments
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Generate Financial Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Revenue Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      <TransactionDetailsModal
        transaction={selectedTransaction}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
    </div>
  );
}