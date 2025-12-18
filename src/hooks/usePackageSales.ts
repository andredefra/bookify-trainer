import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

export interface PackageSale {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  packageId: string;
  packageTitle: string;
  price: number;
  purchaseDate: string;
  status: 'active' | 'completed' | 'expired';
  packageType: string;
  sessionsTotal?: number;
  sessionsUsed?: number;
  paymentMethod: 'cash' | 'card' | 'paypal' | 'klarna';
  paymentStatus: 'pending' | 'paid' | 'rejected' | 'no_show';
  invoiceStatus: 'none' | 'draft' | 'sent_to_client';
  invoiceUrl?: string;
  invoiceSentAt?: string;
}

export interface PackageSalesData {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  allSales: PackageSale[];
  paidSales: PackageSale[];
  pendingCashPayments: PackageSale[];
  totalSalesCount: number;
  loading: boolean;
}

// Mock data for demo mode
const getMockSales = (): PackageSale[] => {
  const now = new Date();
  
  return [
    // Pending cash payments (show at top for demo)
    {
      id: 'pkg-sale-1',
      clientId: 'client-1',
      clientName: 'Emma Thompson',
      clientEmail: 'emma@example.com',
      packageId: 'pkg-template-1',
      packageTitle: 'Personal Training Package',
      price: 500,
      purchaseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'sessions_only',
      sessionsTotal: 10,
      sessionsUsed: 0,
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      invoiceStatus: 'none',
    },
    {
      id: 'pkg-sale-2',
      clientId: 'client-2',
      clientName: 'David Kim',
      clientEmail: 'david@example.com',
      packageId: 'pkg-template-2',
      packageTitle: 'Complete Transformation',
      price: 750,
      purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'hybrid',
      sessionsTotal: 8,
      sessionsUsed: 0,
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      invoiceStatus: 'none',
    },
    // Paid sales
    {
      id: 'pkg-sale-3',
      clientId: 'client-3',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      packageId: 'pkg-template-1',
      packageTitle: 'Personal Training Package',
      price: 500,
      purchaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'sessions_only',
      sessionsTotal: 10,
      sessionsUsed: 3,
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: '/invoices/inv-003.pdf',
      invoiceSentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'pkg-sale-4',
      clientId: 'client-4',
      clientName: 'Mike Peterson',
      clientEmail: 'mike@example.com',
      packageId: 'pkg-template-2',
      packageTitle: 'Complete Transformation',
      price: 750,
      purchaseDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'hybrid',
      sessionsTotal: 8,
      sessionsUsed: 2,
      paymentMethod: 'paypal',
      paymentStatus: 'paid',
      invoiceStatus: 'draft',
    },
    {
      id: 'pkg-sale-5',
      clientId: 'client-5',
      clientName: 'Lisa Garcia',
      clientEmail: 'lisa@example.com',
      packageId: 'pkg-template-3',
      packageTitle: "Beginner's Program",
      price: 200,
      purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      sessionsTotal: 0,
      sessionsUsed: 0,
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      invoiceStatus: 'none',
    },
    {
      id: 'pkg-sale-6',
      clientId: 'client-6',
      clientName: 'John Martinez',
      clientEmail: 'john@example.com',
      packageId: 'pkg-template-4',
      packageTitle: 'Nutrition Consultation',
      price: 150,
      purchaseDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'service',
      sessionsTotal: 0,
      sessionsUsed: 0,
      paymentMethod: 'klarna',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: '/invoices/inv-006.pdf',
      invoiceSentAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'pkg-sale-7',
      clientId: 'client-7',
      clientName: 'Sophie Chen',
      clientEmail: 'sophie@example.com',
      packageId: 'pkg-template-1',
      packageTitle: 'Personal Training Package',
      price: 500,
      purchaseDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'sessions_only',
      sessionsTotal: 10,
      sessionsUsed: 8,
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: '/invoices/inv-007.pdf',
      invoiceSentAt: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // Last month sales
    {
      id: 'pkg-sale-lastmonth-1',
      clientId: 'client-8',
      clientName: 'Anna Rossi',
      clientEmail: 'anna@example.com',
      packageId: 'pkg-template-2',
      packageTitle: 'Complete Transformation',
      price: 750,
      purchaseDate: new Date(now.getFullYear(), now.getMonth() - 1, 12).toISOString(),
      status: 'active',
      packageType: 'hybrid',
      sessionsTotal: 8,
      sessionsUsed: 6,
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: '/invoices/inv-lm1.pdf',
      invoiceSentAt: new Date(now.getFullYear(), now.getMonth() - 1, 13).toISOString(),
    },
    {
      id: 'pkg-sale-lastmonth-2',
      clientId: 'client-9',
      clientName: 'Marco Bianchi',
      clientEmail: 'marco@example.com',
      packageId: 'pkg-template-3',
      packageTitle: "Beginner's Program",
      price: 200,
      purchaseDate: new Date(now.getFullYear(), now.getMonth() - 1, 22).toISOString(),
      status: 'active',
      packageType: 'program_only',
      sessionsTotal: 0,
      sessionsUsed: 0,
      paymentMethod: 'paypal',
      paymentStatus: 'paid',
      invoiceStatus: 'draft',
    },
  ];
};

// Calculate date ranges
const getDateRange = (period: 'week' | 'month' | 'quarter') => {
  const now = new Date();
  const start = new Date();
  
  switch (period) {
    case 'week':
      start.setDate(now.getDate() - 7);
      break;
    case 'month':
      start.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      start.setMonth(now.getMonth() - 3);
      break;
  }
  
  return { start: start.toISOString().split('T')[0], end: now.toISOString().split('T')[0] };
};

const getPreviousDateRange = (period: 'week' | 'month' | 'quarter') => {
  const now = new Date();
  const start = new Date();
  const end = new Date();
  
  switch (period) {
    case 'week':
      start.setDate(now.getDate() - 14);
      end.setDate(now.getDate() - 8);
      break;
    case 'month':
      start.setMonth(now.getMonth() - 1);
      start.setDate(1);
      end.setMonth(now.getMonth());
      end.setDate(0);
      break;
    case 'quarter':
      start.setMonth(now.getMonth() - 6);
      end.setMonth(now.getMonth() - 3);
      end.setDate(0);
      break;
  }
  
  return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
};

export function usePackageSales(trainerId?: string) {
  const effectiveTrainerId = trainerId || getCurrentDemoUserId();
  const [salesData, setSalesData] = useState<PackageSalesData>({
    weeklyRevenue: 0,
    previousWeekRevenue: 0,
    monthlyRevenue: 0,
    previousMonthRevenue: 0,
    quarterlyRevenue: 0,
    previousQuarterRevenue: 0,
    allSales: [],
    paidSales: [],
    pendingCashPayments: [],
    totalSalesCount: 0,
    loading: true,
  });

  const fetchPackageSales = async () => {
    try {
      setSalesData(prev => ({ ...prev, loading: true }));

      // Fetch all package assignments
      const { data: assignments, error } = await supabase
        .from('client_package_assignments')
        .select(`
          *,
          client_packages:package_id (
            id,
            title,
            price,
            package_type,
            sessions_count
          )
        `)
        .eq('trainer_id', effectiveTrainerId)
        .in('status', ['active', 'completed', 'expired']);

      if (error) throw error;

      // If no real data, use mock data for demo
      const useMockData = !assignments || assignments.length === 0;
      
      if (useMockData) {
        const mockSales = getMockSales();
        const paidSales = mockSales.filter(s => s.paymentStatus === 'paid');
        const pendingCashPayments = mockSales.filter(s => s.paymentMethod === 'cash' && s.paymentStatus === 'pending');
        
        // Calculate revenue from mock data (only paid sales)
        const weekRange = getDateRange('week');
        const monthRange = getDateRange('month');
        const quarterRange = getDateRange('quarter');

        const previousWeekRange = getPreviousDateRange('week');
        const previousMonthRange = getPreviousDateRange('month');
        const previousQuarterRange = getPreviousDateRange('quarter');

        const weeklyRevenue = paidSales
          .filter(s => s.purchaseDate >= weekRange.start)
          .reduce((sum, s) => sum + s.price, 0);

        const previousWeekRevenue = paidSales
          .filter(s => s.purchaseDate >= previousWeekRange.start && s.purchaseDate <= previousWeekRange.end)
          .reduce((sum, s) => sum + s.price, 0);

        const monthlyRevenue = paidSales
          .filter(s => s.purchaseDate >= monthRange.start)
          .reduce((sum, s) => sum + s.price, 0);

        const previousMonthRevenue = paidSales
          .filter(s => s.purchaseDate >= previousMonthRange.start && s.purchaseDate <= previousMonthRange.end)
          .reduce((sum, s) => sum + s.price, 0);

        const quarterlyRevenue = paidSales
          .filter(s => s.purchaseDate >= quarterRange.start)
          .reduce((sum, s) => sum + s.price, 0);

        const previousQuarterRevenue = paidSales
          .filter(s => s.purchaseDate >= previousQuarterRange.start && s.purchaseDate <= previousQuarterRange.end)
          .reduce((sum, s) => sum + s.price, 0);

        setSalesData({
          weeklyRevenue,
          previousWeekRevenue,
          monthlyRevenue,
          previousMonthRevenue,
          quarterlyRevenue,
          previousQuarterRevenue,
          allSales: mockSales,
          paidSales,
          pendingCashPayments,
          totalSalesCount: paidSales.length,
          loading: false,
        });
        return;
      }

      // Transform data
      const sales: PackageSale[] = await Promise.all(
        (assignments || []).map(async (assignment) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', assignment.client_id)
            .single();

          const pkg = assignment.client_packages;
          
          return {
            id: assignment.id,
            clientId: assignment.client_id,
            clientName: profile?.full_name || 'Unknown Client',
            clientEmail: profile?.email || '',
            packageId: pkg?.id || '',
            packageTitle: pkg?.title || 'Unknown Package',
            price: assignment.total_paid || pkg?.price || 0,
            purchaseDate: assignment.purchase_date || assignment.created_at,
            status: assignment.status as 'active' | 'completed' | 'expired',
            packageType: pkg?.package_type || 'unknown',
            sessionsTotal: assignment.sessions_total || pkg?.sessions_count || 0,
            sessionsUsed: assignment.sessions_used || 0,
            paymentMethod: 'cash' as const,
            paymentStatus: 'paid' as const,
            invoiceStatus: 'none' as const,
          };
        })
      );

      const paidSales = sales.filter(s => s.paymentStatus === 'paid');
      const pendingCashPayments = sales.filter(s => s.paymentMethod === 'cash' && s.paymentStatus === 'pending');

      const weekRange = getDateRange('week');
      const monthRange = getDateRange('month');
      const quarterRange = getDateRange('quarter');

      const previousWeekRange = getPreviousDateRange('week');
      const previousMonthRange = getPreviousDateRange('month');
      const previousQuarterRange = getPreviousDateRange('quarter');

      const weeklyRevenue = paidSales
        .filter(s => s.purchaseDate >= weekRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousWeekRevenue = paidSales
        .filter(s => s.purchaseDate >= previousWeekRange.start && s.purchaseDate <= previousWeekRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      const monthlyRevenue = paidSales
        .filter(s => s.purchaseDate >= monthRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousMonthRevenue = paidSales
        .filter(s => s.purchaseDate >= previousMonthRange.start && s.purchaseDate <= previousMonthRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      const quarterlyRevenue = paidSales
        .filter(s => s.purchaseDate >= quarterRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousQuarterRevenue = paidSales
        .filter(s => s.purchaseDate >= previousQuarterRange.start && s.purchaseDate <= previousQuarterRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      setSalesData({
        weeklyRevenue,
        previousWeekRevenue,
        monthlyRevenue,
        previousMonthRevenue,
        quarterlyRevenue,
        previousQuarterRevenue,
        allSales: sales,
        paidSales,
        pendingCashPayments,
        totalSalesCount: paidSales.length,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching package sales:', error);
      toast({
        title: "Error",
        description: "Failed to load package sales data",
        variant: "destructive"
      });
      setSalesData(prev => ({ ...prev, loading: false }));
    }
  };

  const confirmCashPayment = async (saleId: string) => {
    try {
      // Update in database if real data
      const { error } = await supabase
        .from('client_package_assignments')
        .update({ 
          status: 'active',
          purchase_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', saleId);

      if (error) throw error;

      // Update local state for demo
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(sale =>
          sale.id === saleId ? { ...sale, paymentStatus: 'paid' as const } : sale
        ),
        pendingCashPayments: prev.pendingCashPayments.filter(s => s.id !== saleId),
      }));

      toast({
        title: "Payment Confirmed",
        description: "Cash payment has been confirmed",
      });

      await fetchPackageSales();
    } catch (error) {
      console.error('Error confirming cash payment:', error);
      toast({
        title: "Error",
        description: "Failed to confirm payment",
        variant: "destructive"
      });
    }
  };

  const rejectCashPayment = async (saleId: string) => {
    try {
      const { error } = await supabase
        .from('client_package_assignments')
        .update({ status: 'expired' })
        .eq('id', saleId);

      if (error) throw error;

      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(sale =>
          sale.id === saleId ? { ...sale, paymentStatus: 'rejected' as const } : sale
        ),
        pendingCashPayments: prev.pendingCashPayments.filter(s => s.id !== saleId),
      }));

      toast({
        title: "Payment Rejected",
        description: "Client didn't pay - sale rejected",
      });

      await fetchPackageSales();
    } catch (error) {
      console.error('Error rejecting payment:', error);
      toast({
        title: "Error",
        description: "Failed to reject payment",
        variant: "destructive"
      });
    }
  };

  const markNoShow = async (saleId: string) => {
    try {
      const { error } = await supabase
        .from('client_package_assignments')
        .update({ status: 'expired' })
        .eq('id', saleId);

      if (error) throw error;

      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(sale =>
          sale.id === saleId ? { ...sale, paymentStatus: 'no_show' as const } : sale
        ),
        pendingCashPayments: prev.pendingCashPayments.filter(s => s.id !== saleId),
      }));

      toast({
        title: "Marked as No-Show",
        description: "Client was marked as no-show",
      });

      await fetchPackageSales();
    } catch (error) {
      console.error('Error marking no-show:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const updateInvoiceStatus = async (saleId: string, status: 'none' | 'draft' | 'sent_to_client', url?: string) => {
    setSalesData(prev => ({
      ...prev,
      allSales: prev.allSales.map(sale =>
        sale.id === saleId
          ? {
              ...sale,
              invoiceStatus: status,
              invoiceUrl: url || sale.invoiceUrl,
              invoiceSentAt: status === 'sent_to_client' ? new Date().toISOString() : sale.invoiceSentAt,
            }
          : sale
      ),
    }));

    toast({
      title: status === 'sent_to_client' ? "Invoice Sent" : "Invoice Updated",
      description: status === 'sent_to_client' 
        ? "Invoice has been sent to the client" 
        : "Invoice status updated",
    });
  };

  useEffect(() => {
    if (effectiveTrainerId) {
      fetchPackageSales();
    }
  }, [effectiveTrainerId]);

  return {
    ...salesData,
    confirmCashPayment,
    rejectCashPayment,
    markNoShow,
    updateInvoiceStatus,
    refetch: fetchPackageSales,
  };
}
