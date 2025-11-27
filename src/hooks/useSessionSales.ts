import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

export interface SessionSale {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
  sessionType: 'video' | 'in-person';
  price: number;
  purchaseDate: string;
  requestDate: string;
  status: 'paid' | 'pending' | 'unpaid';
}

export interface SessionSalesData {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  pendingPayments: SessionSale[];
  confirmedSales: SessionSale[];
  allSales: SessionSale[];
  totalSalesCount: number;
  loading: boolean;
}

// Mock data for demo mode
const getMockPendingPayments = (): SessionSale[] => [
  {
    id: 'mock-pending-sess-1',
    clientId: 'client-1',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    sessionId: 'sess-1',
    sessionTitle: 'Personal Training Session',
    sessionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    sessionType: 'in-person',
    price: 45.00,
    purchaseDate: new Date().toISOString(),
    requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'mock-pending-sess-2',
    clientId: 'client-2',
    clientName: 'Mike Peterson',
    clientEmail: 'mike@example.com',
    sessionId: 'sess-2',
    sessionTitle: 'HIIT Training',
    sessionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    sessionType: 'video',
    price: 35.00,
    purchaseDate: new Date().toISOString(),
    requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
];

const getMockConfirmedSales = (): SessionSale[] => {
  const now = new Date();
  
  return [
    {
      id: 'mock-sale-sess-1',
      clientId: 'client-3',
      clientName: 'Lisa Garcia',
      clientEmail: 'lisa@example.com',
      sessionId: 'sess-3',
      sessionTitle: 'Strength Training',
      sessionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 50.00,
      purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
    },
    {
      id: 'mock-sale-sess-2',
      clientId: 'client-4',
      clientName: 'David Kim',
      clientEmail: 'david@example.com',
      sessionId: 'sess-4',
      sessionTitle: 'Yoga Session',
      sessionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'video',
      price: 40.00,
      purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
    },
    {
      id: 'mock-sale-sess-3',
      clientId: 'client-5',
      clientName: 'Emma Wilson',
      clientEmail: 'emma@example.com',
      sessionId: 'sess-5',
      sessionTitle: 'Cardio Session',
      sessionDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 45.00,
      purchaseDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
    },
    {
      id: 'mock-sale-sess-4',
      clientId: 'client-6',
      clientName: 'John Martinez',
      clientEmail: 'john.m@example.com',
      sessionId: 'sess-6',
      sessionTitle: 'Boxing Training',
      sessionDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 60.00,
      purchaseDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
    },
    {
      id: 'mock-sale-sess-5',
      clientId: 'client-7',
      clientName: 'Sophie Chen',
      clientEmail: 'sophie@example.com',
      sessionId: 'sess-7',
      sessionTitle: 'Pilates Session',
      sessionDate: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'video',
      price: 38.00,
      purchaseDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 41 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
    },
    {
      id: 'mock-sale-sess-6',
      clientId: 'client-10',
      clientName: 'Rachel Green',
      clientEmail: 'rachel@example.com',
      sessionId: 'sess-10',
      sessionTitle: 'Functional Training',
      sessionDate: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 55.00,
      purchaseDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
    },
    {
      id: 'mock-sale-sess-7',
      clientId: 'client-11',
      clientName: 'Tom Harris',
      clientEmail: 'tom@example.com',
      sessionId: 'sess-11',
      sessionTitle: 'Athletic Performance',
      sessionDate: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 70.00,
      purchaseDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'paid',
    },
    // Last month sales
    {
      id: 'mock-sale-lastmonth-sess-1',
      clientId: 'client-12',
      clientName: 'Anna Rossi',
      clientEmail: 'anna.r@example.com',
      sessionId: 'sess-12',
      sessionTitle: 'CrossFit Session',
      sessionDate: new Date(now.getFullYear(), now.getMonth() - 1, 12).toISOString(),
      sessionType: 'in-person',
      price: 52.00,
      purchaseDate: new Date(now.getFullYear(), now.getMonth() - 1, 10).toISOString(),
      requestDate: new Date(now.getFullYear(), now.getMonth() - 1, 9).toISOString(),
      status: 'paid',
    },
    {
      id: 'mock-sale-lastmonth-sess-2',
      clientId: 'client-13',
      clientName: 'Marco Bianchi',
      clientEmail: 'marco.b@example.com',
      sessionId: 'sess-13',
      sessionTitle: 'Spinning Class',
      sessionDate: new Date(now.getFullYear(), now.getMonth() - 1, 22).toISOString(),
      sessionType: 'video',
      price: 42.00,
      purchaseDate: new Date(now.getFullYear(), now.getMonth() - 1, 20).toISOString(),
      requestDate: new Date(now.getFullYear(), now.getMonth() - 1, 19).toISOString(),
      status: 'paid',
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

export function useSessionSales(trainerId?: string) {
  const effectiveTrainerId = trainerId || getCurrentDemoUserId();
  const [salesData, setSalesData] = useState<SessionSalesData>({
    weeklyRevenue: 0,
    previousWeekRevenue: 0,
    monthlyRevenue: 0,
    previousMonthRevenue: 0,
    quarterlyRevenue: 0,
    previousQuarterRevenue: 0,
    pendingPayments: [],
    confirmedSales: [],
    allSales: [],
    totalSalesCount: 0,
    loading: true,
  });

  const fetchSessionSales = async () => {
    try {
      setSalesData(prev => ({ ...prev, loading: true }));

      // For now, we'll use mock data since there's no session sales table yet
      // In the future, you would query a session_sales or session_bookings table
      const mockPending = getMockPendingPayments();
      const mockConfirmed = getMockConfirmedSales();
      const allMockSales = [...mockPending, ...mockConfirmed];
      
      // Calculate revenue from mock data
      const weekRange = getDateRange('week');
      const monthRange = getDateRange('month');
      const quarterRange = getDateRange('quarter');

      const previousWeekRange = getPreviousDateRange('week');
      const previousMonthRange = getPreviousDateRange('month');
      const previousQuarterRange = getPreviousDateRange('quarter');

      const weeklyRevenue = mockConfirmed
        .filter(s => s.purchaseDate >= weekRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousWeekRevenue = mockConfirmed
        .filter(s => s.purchaseDate >= previousWeekRange.start && s.purchaseDate <= previousWeekRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      const monthlyRevenue = mockConfirmed
        .filter(s => s.purchaseDate >= monthRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousMonthRevenue = mockConfirmed
        .filter(s => s.purchaseDate >= previousMonthRange.start && s.purchaseDate <= previousMonthRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      const quarterlyRevenue = mockConfirmed
        .filter(s => s.purchaseDate >= quarterRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousQuarterRevenue = mockConfirmed
        .filter(s => s.purchaseDate >= previousQuarterRange.start && s.purchaseDate <= previousQuarterRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      setSalesData({
        weeklyRevenue,
        previousWeekRevenue,
        monthlyRevenue,
        previousMonthRevenue,
        quarterlyRevenue,
        previousQuarterRevenue,
        pendingPayments: mockPending,
        confirmedSales: mockConfirmed,
        allSales: allMockSales,
        totalSalesCount: mockConfirmed.length,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching session sales:', error);
      toast({
        title: "Error",
        description: "Failed to load sales data",
        variant: "destructive"
      });
      setSalesData(prev => ({ ...prev, loading: false }));
    }
  };

  const confirmPayment = async (saleId: string, isProTrainer: boolean = false) => {
    try {
      // Mock implementation - in real app would update database
      toast({
        title: "Payment Confirmed",
        description: isProTrainer 
          ? "Payment confirmed and added to Transactions" 
          : "Payment confirmed successfully",
      });

      // Refresh data
      await fetchSessionSales();
    } catch (error) {
      console.error('Error confirming payment:', error);
      toast({
        title: "Error",
        description: "Failed to confirm payment",
        variant: "destructive"
      });
    }
  };

  const rejectPayment = async (saleId: string) => {
    try {
      // Mock implementation - in real app would update database
      toast({
        title: "Payment Rejected",
        description: "Payment request has been declined",
      });

      // Refresh data
      await fetchSessionSales();
    } catch (error) {
      console.error('Error rejecting payment:', error);
      toast({
        title: "Error",
        description: "Failed to reject payment",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (effectiveTrainerId) {
      fetchSessionSales();
    }
  }, [effectiveTrainerId]);

  return {
    ...salesData,
    confirmPayment,
    rejectPayment,
    refreshSales: fetchSessionSales,
  };
}
