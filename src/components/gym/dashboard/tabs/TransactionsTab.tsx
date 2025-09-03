import { useState } from "react";
import { useGymTransactions, useTransactionStats } from "@/hooks/useGymTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Users, 
  Calendar, 
  CheckCircle, 
  Send,
  Filter,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function TransactionsTab() {
  const { data: transactions, isLoading: transactionsLoading, refetch } = useGymTransactions();
  const { data: stats, isLoading: statsLoading } = useTransactionStats();
  
  const queryClient = useQueryClient();
  
  // Mutations
  const confirmCashPayment = useMutation({
    mutationFn: async (transactionId: string) => {
      const { error } = await supabase
        .from('gym_package_assignments')
        .update({ payment_status: 'paid' })
        .eq('id', transactionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gym-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
      toast.success("Payment confirmed successfully");
    },
    onError: (error) => {
      toast.error("Failed to confirm payment");
      console.error('Payment confirmation error:', error);
    }
  });

  const markInvoiceSent = useMutation({
    mutationFn: async (transactionId: string) => {
      const { error } = await supabase
        .from('gym_package_assignments')
        .update({ 
          receipt_sent_at: new Date().toISOString(),
          receipt_number: `INV-${Date.now()}`
        })
        .eq('id', transactionId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gym-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
    },
    onError: (error) => {
      console.error('Mark invoice sent error:', error);
    }
  });

  // Local state
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [showInvoiceFilter, setShowInvoiceFilter] = useState<'all' | 'sent' | 'unsent'>('all');

  const handleConfirmCashPayment = async (transactionId: string) => {
    try {
      await confirmCashPayment.mutateAsync(transactionId);
      setTimeout(() => {
        refetch();
      }, 100);
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setDetailsModalOpen(true);
  };

  const handleSendSingleInvoice = (transaction: any) => {
    const invoiceUrl = `https://invoice-partner.com/create?amount=${transaction.total_paid}&client=${encodeURIComponent(transaction.client_name)}&description=${encodeURIComponent(transaction.package_title)}`;
    
    window.open(invoiceUrl, 'invoice-popup', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    markInvoiceSent.mutate(transaction.id);
    
    toast.success("Invoice integration opened. Complete the process in the new window.", {
      duration: 4000
    });
  };

  const handleSelectAll = () => {
    const paidTransactions = filteredTransactions.filter(t => 
      t.payment_status === 'paid' && !t.receipt_sent_at
    );
    
    if (selectedTransactions.size === paidTransactions.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(paidTransactions.map(t => t.id)));
    }
  };

  const handleBulkSendInvoices = () => {
    if (selectedTransactions.size === 0) {
      toast.error("Please select transactions to send invoices for");
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

  const handleToggleSelection = (transactionId: string) => {
    const newSelection = new Set(selectedTransactions);
    if (newSelection.has(transactionId)) {
      newSelection.delete(transactionId);
    } else {
      newSelection.add(transactionId);
    }
    setSelectedTransactions(newSelection);
  };

  // Helper functions
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
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'sessions': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions?.filter(transaction => {
    if (showInvoiceFilter === 'sent') {
      return transaction.receipt_sent_at;
    } else if (showInvoiceFilter === 'unsent') {
      return !transaction.receipt_sent_at && transaction.payment_status === 'paid';
    }
    return true;
  }) || [];

  const paidTransactionsCount = filteredTransactions.filter(t => t.payment_status === 'paid').length;
  const unsentInvoicesCount = filteredTransactions.filter(t => !t.receipt_sent_at && t.payment_status === 'paid').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Transactions</h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {statsLoading ? '...' : `€${stats?.todayRevenue?.toFixed(2) || '0.00'}`}
            </div>
            <p className="text-xs text-muted-foreground">
              from completed payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {statsLoading ? '...' : stats?.pendingPayments || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unsent Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {transactionsLoading ? '...' : unsentInvoicesCount}
            </div>
            <p className="text-xs text-muted-foreground">
              paid transactions missing invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Total
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : `€${stats?.monthlyRevenue?.toFixed(2) || '0.00'}`}
            </div>
            <p className="text-xs text-muted-foreground">
              {statsLoading ? '...' : `${stats?.totalTransactions || 0} transactions`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters and Bulk Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Tabs value={showInvoiceFilter} onValueChange={(value: any) => setShowInvoiceFilter(value)}>
                <TabsList>
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="unsent">Missing Invoices ({unsentInvoicesCount})</TabsTrigger>
                  <TabsTrigger value="sent">Invoices Sent</TabsTrigger>
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
                  onClick={handleBulkSendInvoices}
                  className="h-8"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Send Invoices
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

          {filteredTransactions && filteredTransactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        filteredTransactions.filter(t => t.payment_status === 'paid' && !t.receipt_sent_at).length > 0 &&
                        filteredTransactions
                          .filter(t => t.payment_status === 'paid' && !t.receipt_sent_at)
                          .every(t => selectedTransactions.has(t.id))
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    className={selectedTransactions.has(transaction.id) ? 'bg-primary/5' : ''}
                  >
                    <TableCell>
                      {transaction.payment_status === 'paid' && !transaction.receipt_sent_at && (
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
                        <Badge variant="outline" className={getPackageTypeColor(transaction.package_type)}>
                          {transaction.package_type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      €{transaction.total_paid.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.purchase_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(transaction.payment_status)}>
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
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(transaction)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                        
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
                            onClick={() => handleSendSingleInvoice(transaction)}
                            disabled={markInvoiceSent.isPending}
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Send Invoice
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {showInvoiceFilter === 'unsent' ? 'No transactions missing invoices' : 
               showInvoiceFilter === 'sent' ? 'No invoices sent yet' : 
               'No transactions found'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}