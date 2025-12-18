import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

export type PaymentMethod = 'cash' | 'card' | 'paypal' | 'klarna';
export type PaymentStatus = 'pending' | 'paid' | 'rejected' | 'no_show';
export type InvoiceStatus = 'none' | 'draft' | 'sent_to_client';

export interface ProgramSale {
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
  // Payment fields
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  invoiceStatus: InvoiceStatus;
  invoiceUrl?: string;
  invoiceSentAt?: string;
}

export interface ProgramSalesData {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  allSales: ProgramSale[];
  paidSales: ProgramSale[];
  pendingCashPayments: ProgramSale[];
  totalSalesCount: number;
  loading: boolean;
}

// Mock data for demo mode - Direct sales with payment info
const getMockSales = (): ProgramSale[] => {
  const now = new Date();
  
  return [
    // Recent pending cash payment
    {
      id: 'mock-sale-cash-1',
      clientId: 'client-1',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      packageId: 'pkg-1',
      packageTitle: 'Strength & Conditioning',
      price: 69.99,
      purchaseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      invoiceStatus: 'none',
    },
    // Another pending cash
    {
      id: 'mock-sale-cash-2',
      clientId: 'client-2',
      clientName: 'Mike Peterson',
      clientEmail: 'mike@example.com',
      packageId: 'pkg-2',
      packageTitle: 'Weight Loss Program',
      price: 99.99,
      purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      invoiceStatus: 'none',
    },
    // Paid cash - invoice sent
    {
      id: 'mock-sale-3',
      clientId: 'client-3',
      clientName: 'Lisa Garcia',
      clientEmail: 'lisa@example.com',
      packageId: 'pkg-3',
      packageTitle: 'Flexibility Program',
      price: 49.99,
      purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: 'https://example.com/invoice/123',
      invoiceSentAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // Card payment - paid
    {
      id: 'mock-sale-4',
      clientId: 'client-4',
      clientName: 'David Kim',
      clientEmail: 'david@example.com',
      packageId: 'pkg-4',
      packageTitle: 'Nutrition + Training Combo',
      price: 149.99,
      purchaseDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'hybrid',
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'draft',
    },
    // PayPal payment - invoice sent
    {
      id: 'mock-sale-5',
      clientId: 'client-5',
      clientName: 'Emma Wilson',
      clientEmail: 'emma@example.com',
      packageId: 'pkg-5',
      packageTitle: 'Core Strength',
      price: 79.99,
      purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      paymentMethod: 'paypal',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: 'https://example.com/invoice/456',
      invoiceSentAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    // Klarna payment
    {
      id: 'mock-sale-6',
      clientId: 'client-6',
      clientName: 'John Martinez',
      clientEmail: 'john.m@example.com',
      packageId: 'pkg-6',
      packageTitle: 'Bodybuilding Program',
      price: 129.99,
      purchaseDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      paymentMethod: 'klarna',
      paymentStatus: 'paid',
      invoiceStatus: 'none',
    },
    // Card - paid
    {
      id: 'mock-sale-7',
      clientId: 'client-7',
      clientName: 'Sophie Chen',
      clientEmail: 'sophie@example.com',
      packageId: 'pkg-7',
      packageTitle: 'HIIT Training',
      price: 89.99,
      purchaseDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'none',
    },
    // Last month sales
    {
      id: 'mock-sale-lastmonth-1',
      clientId: 'client-12',
      clientName: 'Anna Rossi',
      clientEmail: 'anna.r@example.com',
      packageId: 'pkg-12',
      packageTitle: 'Personal Training Package',
      price: 119.99,
      purchaseDate: new Date(now.getFullYear(), now.getMonth() - 1, 10).toISOString(),
      status: 'active',
      packageType: 'hybrid',
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
    },
    {
      id: 'mock-sale-lastmonth-2',
      clientId: 'client-13',
      clientName: 'Marco Bianchi',
      clientEmail: 'marco.b@example.com',
      packageId: 'pkg-13',
      packageTitle: 'Functional Training',
      price: 89.99,
      purchaseDate: new Date(now.getFullYear(), now.getMonth() - 1, 20).toISOString(),
      status: 'active',
      packageType: 'program_only',
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      invoiceStatus: 'none',
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

export function useProgramSales(trainerId?: string) {
  const effectiveTrainerId = trainerId || getCurrentDemoUserId();
  const [salesData, setSalesData] = useState<ProgramSalesData>({
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

  const fetchProgramSales = async () => {
    try {
      setSalesData(prev => ({ ...prev, loading: true }));

      // For demo, always use mock data
      const mockSales = getMockSales();
      
      // Filter by payment status
      const paidSales = mockSales.filter(s => s.paymentStatus === 'paid');
      const pendingCashPayments = mockSales.filter(s => s.paymentMethod === 'cash' && s.paymentStatus === 'pending');

      // Calculate revenue from paid sales only
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
    } catch (error) {
      console.error('Error fetching program sales:', error);
      toast({
        title: "Error",
        description: "Failed to load sales data",
        variant: "destructive"
      });
      setSalesData(prev => ({ ...prev, loading: false }));
    }
  };

  // Confirm cash payment received
  const confirmCashPayment = async (saleId: string) => {
    try {
      // In real implementation, update database
      // For demo, update local state
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(sale => 
          sale.id === saleId 
            ? { ...sale, paymentStatus: 'paid' as PaymentStatus }
            : sale
        ),
        pendingCashPayments: prev.pendingCashPayments.filter(s => s.id !== saleId),
      }));

      toast({
        title: "Payment Confirmed",
        description: "Cash payment has been confirmed",
      });
    } catch (error) {
      console.error('Error confirming cash payment:', error);
      toast({
        title: "Error",
        description: "Failed to confirm payment",
        variant: "destructive"
      });
    }
  };

  // Reject cash payment
  const rejectCashPayment = async (saleId: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(sale => 
          sale.id === saleId 
            ? { ...sale, paymentStatus: 'rejected' as PaymentStatus }
            : sale
        ),
        pendingCashPayments: prev.pendingCashPayments.filter(s => s.id !== saleId),
      }));

      toast({
        title: "Payment Rejected",
        description: "Cash payment has been rejected",
      });
    } catch (error) {
      console.error('Error rejecting payment:', error);
      toast({
        title: "Error",
        description: "Failed to reject payment",
        variant: "destructive"
      });
    }
  };

  // Mark as no show
  const markNoShow = async (saleId: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(sale => 
          sale.id === saleId 
            ? { ...sale, paymentStatus: 'no_show' as PaymentStatus }
            : sale
        ),
        pendingCashPayments: prev.pendingCashPayments.filter(s => s.id !== saleId),
      }));

      toast({
        title: "Marked as No-Show",
        description: "Client marked as no-show",
      });
    } catch (error) {
      console.error('Error marking no-show:', error);
      toast({
        title: "Error",
        description: "Failed to mark as no-show",
        variant: "destructive"
      });
    }
  };

  // Update invoice status
  const updateInvoiceStatus = async (saleId: string, status: InvoiceStatus, url?: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(sale => 
          sale.id === saleId 
            ? { 
                ...sale, 
                invoiceStatus: status,
                invoiceUrl: url || sale.invoiceUrl,
                invoiceSentAt: status === 'sent_to_client' ? new Date().toISOString() : sale.invoiceSentAt
              }
            : sale
        ),
      }));

      const messages: Record<InvoiceStatus, string> = {
        none: 'Invoice status cleared',
        draft: 'Invoice marked as draft',
        sent_to_client: 'Invoice sent to client',
      };

      toast({
        title: "Invoice Updated",
        description: messages[status],
      });
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to update invoice",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchProgramSales();
  }, [effectiveTrainerId]);

  return {
    ...salesData,
    confirmCashPayment,
    rejectCashPayment,
    markNoShow,
    updateInvoiceStatus,
    refetch: fetchProgramSales,
  };
}
