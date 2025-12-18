import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

export type PaymentMethod = 'cash' | 'card' | 'paypal' | 'klarna';
export type PaymentStatus = 'pending' | 'paid' | 'rejected' | 'no_show';
export type InvoiceStatus = 'none' | 'draft' | 'sent_to_client';

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
  // New payment fields
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  invoiceStatus: InvoiceStatus;
  invoiceUrl?: string;
  invoiceSentAt?: string;
}

export interface SessionParticipant {
  id: string;
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
  participantName: string;
  participantEmail: string;
  participantPhone?: string;
  isExistingClient: boolean;
  clientId?: string;
  source: 'gym' | 'marketplace' | 'public_session';
  checkInTime?: string;
  addedToCRM: boolean;
}

export interface SessionRequest {
  id: string;
  requesterType: 'existing_client' | 'prospect';
  clientId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  previousSessionsCount?: number;
  sessionTitle: string;
  sessionType: 'video' | 'in-person';
  requestedDate: string;
  requestedTime: string;
  duration: number;
  message: string;
  price: number;
  paymentStatus: 'pending' | 'confirmed';
  paymentMethod?: 'cash' | 'card' | 'online';
  status: 'pending' | 'approved' | 'declined';
  requestDate: string;
}

export interface SessionSalesData {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  allSales: SessionSale[];
  pendingCashPayments: SessionSale[];
  sessionRequests: SessionRequest[];
  sessionParticipants: SessionParticipant[];
  totalSalesCount: number;
  loading: boolean;
}

// Mock session requests data
const getMockSessionRequests = (): SessionRequest[] => [
  {
    id: 'request-1',
    requesterType: 'prospect',
    clientName: 'Maria Rossi',
    clientEmail: 'maria.rossi@example.com',
    clientPhone: '+39 333 1234567',
    sessionTitle: 'Personal Training - First Session',
    sessionType: 'video',
    requestedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    requestedTime: '10:00',
    duration: 60,
    message: 'Hi! I\'m interested in starting a fitness journey and would love to schedule an introductory session. I\'m available mornings and prefer video sessions for now.',
    price: 45.00,
    paymentStatus: 'pending',
    status: 'pending',
    requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'request-2',
    requesterType: 'existing_client',
    clientId: 'client-existing-1',
    clientName: 'John Smith',
    clientEmail: 'john.smith@example.com',
    clientPhone: '+39 345 9876543',
    previousSessionsCount: 8,
    sessionTitle: 'Advanced Strength Training',
    sessionType: 'in-person',
    requestedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    requestedTime: '15:30',
    duration: 90,
    message: 'Would like to schedule another session focusing on powerlifting techniques. My schedule is flexible this week.',
    price: 50.00,
    paymentStatus: 'pending',
    status: 'pending',
    requestDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock participants for pipeline view
const getMockSessionParticipants = (): SessionParticipant[] => [
  {
    id: 'part-1',
    sessionId: 'group-sess-1',
    sessionTitle: 'HIIT Group Class',
    sessionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    participantName: 'Marco Verdi',
    participantEmail: 'marco.verdi@email.com',
    participantPhone: '+39 333 5551234',
    isExistingClient: false,
    source: 'gym',
    checkInTime: '09:45',
    addedToCRM: false,
  },
  {
    id: 'part-2',
    sessionId: 'group-sess-1',
    sessionTitle: 'HIIT Group Class',
    sessionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    participantName: 'Lisa Garcia',
    participantEmail: 'lisa@example.com',
    isExistingClient: true,
    clientId: 'client-3',
    source: 'gym',
    checkInTime: '09:50',
    addedToCRM: true,
  },
  {
    id: 'part-3',
    sessionId: 'group-sess-2',
    sessionTitle: 'Yoga Morning',
    sessionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    participantName: 'Anna Bianchi',
    participantEmail: 'anna.b@email.com',
    participantPhone: '+39 347 9876543',
    isExistingClient: false,
    source: 'marketplace',
    checkInTime: '07:00',
    addedToCRM: false,
  },
  {
    id: 'part-4',
    sessionId: 'group-sess-3',
    sessionTitle: 'CrossFit Open',
    sessionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    participantName: 'Roberto Neri',
    participantEmail: 'roberto.n@email.com',
    isExistingClient: false,
    source: 'public_session',
    addedToCRM: true,
  },
];

// Mock data for demo mode with payment fields
const getMockSales = (): SessionSale[] => {
  const now = new Date();
  
  return [
    // Pending cash payments (recent)
    {
      id: 'mock-sale-sess-1',
      clientId: 'client-1',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      sessionId: 'sess-1',
      sessionTitle: 'Personal Training Session',
      sessionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 45.00,
      purchaseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      invoiceStatus: 'none',
    },
    {
      id: 'mock-sale-sess-2',
      clientId: 'client-2',
      clientName: 'Mike Peterson',
      clientEmail: 'mike@example.com',
      sessionId: 'sess-2',
      sessionTitle: 'HIIT Training',
      sessionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'video',
      price: 35.00,
      purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      invoiceStatus: 'none',
    },
    // Paid sessions with various payment methods
    {
      id: 'mock-sale-sess-3',
      clientId: 'client-3',
      clientName: 'Lisa Garcia',
      clientEmail: 'lisa@example.com',
      sessionId: 'sess-3',
      sessionTitle: 'Strength Training',
      sessionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 50.00,
      purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: 'https://storage.example.com/invoices/inv-001.pdf',
      invoiceSentAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mock-sale-sess-4',
      clientId: 'client-4',
      clientName: 'David Kim',
      clientEmail: 'david@example.com',
      sessionId: 'sess-4',
      sessionTitle: 'Yoga Session',
      sessionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'video',
      price: 40.00,
      purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'paypal',
      paymentStatus: 'paid',
      invoiceStatus: 'draft',
    },
    {
      id: 'mock-sale-sess-5',
      clientId: 'client-5',
      clientName: 'Emma Wilson',
      clientEmail: 'emma@example.com',
      sessionId: 'sess-5',
      sessionTitle: 'Cardio Session',
      sessionDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 45.00,
      purchaseDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      invoiceStatus: 'none',
    },
    {
      id: 'mock-sale-sess-6',
      clientId: 'client-6',
      clientName: 'John Martinez',
      clientEmail: 'john.m@example.com',
      sessionId: 'sess-6',
      sessionTitle: 'Boxing Training',
      sessionDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'in-person',
      price: 60.00,
      purchaseDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'klarna',
      paymentStatus: 'paid',
      invoiceStatus: 'none',
    },
    {
      id: 'mock-sale-sess-7',
      clientId: 'client-7',
      clientName: 'Sophie Chen',
      clientEmail: 'sophie@example.com',
      sessionId: 'sess-7',
      sessionTitle: 'Pilates Session',
      sessionDate: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
      sessionType: 'video',
      price: 38.00,
      purchaseDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
      invoiceUrl: 'https://storage.example.com/invoices/inv-002.pdf',
      invoiceSentAt: new Date(Date.now() - 39 * 24 * 60 * 60 * 1000).toISOString(),
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
      paymentMethod: 'card',
      paymentStatus: 'paid',
      invoiceStatus: 'sent_to_client',
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
      paymentMethod: 'paypal',
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

export function useSessionSales(trainerId?: string) {
  const effectiveTrainerId = trainerId || getCurrentDemoUserId();
  const [salesData, setSalesData] = useState<SessionSalesData>({
    weeklyRevenue: 0,
    previousWeekRevenue: 0,
    monthlyRevenue: 0,
    previousMonthRevenue: 0,
    quarterlyRevenue: 0,
    previousQuarterRevenue: 0,
    allSales: [],
    pendingCashPayments: [],
    sessionRequests: [],
    sessionParticipants: [],
    totalSalesCount: 0,
    loading: true,
  });

  const fetchSessionSales = async () => {
    try {
      setSalesData(prev => ({ ...prev, loading: true }));

      const mockSales = getMockSales();
      const mockRequests = getMockSessionRequests();
      const mockParticipants = getMockSessionParticipants();
      
      const paidSales = mockSales.filter(s => s.paymentStatus === 'paid');
      const pendingCash = mockSales.filter(s => s.paymentMethod === 'cash' && s.paymentStatus === 'pending');
      
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
        pendingCashPayments: pendingCash,
        sessionRequests: mockRequests,
        sessionParticipants: mockParticipants,
        totalSalesCount: paidSales.length,
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

  // Cash payment actions
  const confirmCashPayment = async (saleId: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(s => 
          s.id === saleId ? { ...s, paymentStatus: 'paid' as PaymentStatus } : s
        ),
        pendingCashPayments: prev.pendingCashPayments.filter(s => s.id !== saleId),
      }));
      
      toast({
        title: "Payment Confirmed",
        description: "Cash payment has been confirmed",
      });
    } catch (error) {
      console.error('Error confirming payment:', error);
      toast({
        title: "Error",
        description: "Failed to confirm payment",
        variant: "destructive"
      });
    }
  };

  const rejectCashPayment = async (saleId: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(s => 
          s.id === saleId ? { ...s, paymentStatus: 'rejected' as PaymentStatus } : s
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

  const markNoShow = async (saleId: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(s => 
          s.id === saleId ? { ...s, paymentStatus: 'no_show' as PaymentStatus } : s
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

  // Invoice actions
  const updateInvoiceStatus = async (saleId: string, status: InvoiceStatus, url?: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        allSales: prev.allSales.map(s => 
          s.id === saleId ? { 
            ...s, 
            invoiceStatus: status,
            invoiceUrl: url || s.invoiceUrl,
            invoiceSentAt: status === 'sent_to_client' ? new Date().toISOString() : s.invoiceSentAt,
          } : s
        ),
      }));
      
      toast({
        title: "Invoice Updated",
        description: status === 'sent_to_client' ? "Invoice sent to client" : "Invoice status updated",
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

  // Session request actions
  const approveRequest = async (requestId: string, paymentMethod: 'cash' | 'online', isProTrainer: boolean = false) => {
    try {
      const message = paymentMethod === 'online' 
        ? 'Request approved! Payment link sent to client.'
        : 'Request approved! Session scheduled.';
      
      toast({
        title: "Request Approved",
        description: isProTrainer 
          ? `${message} Added to calendar and transactions.` 
          : message,
      });

      await fetchSessionSales();
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive"
      });
    }
  };

  const declineRequest = async (requestId: string, reason?: string) => {
    try {
      toast({
        title: "Request Declined",
        description: reason 
          ? `Request declined. Reason sent to client.`
          : "Request has been declined",
      });

      await fetchSessionSales();
    } catch (error) {
      console.error('Error declining request:', error);
      toast({
        title: "Error",
        description: "Failed to decline request",
        variant: "destructive"
      });
    }
  };

  // Participant pipeline actions
  const addParticipantToCRM = async (participantId: string) => {
    try {
      setSalesData(prev => ({
        ...prev,
        sessionParticipants: prev.sessionParticipants.map(p =>
          p.id === participantId ? { ...p, addedToCRM: true } : p
        ),
      }));
      
      toast({
        title: "Added to CRM",
        description: "Participant added as lead",
      });
    } catch (error) {
      console.error('Error adding to CRM:', error);
      toast({
        title: "Error",
        description: "Failed to add to CRM",
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
    confirmCashPayment,
    rejectCashPayment,
    markNoShow,
    updateInvoiceStatus,
    approveRequest,
    declineRequest,
    addParticipantToCRM,
    refreshSales: fetchSessionSales,
  };
}
