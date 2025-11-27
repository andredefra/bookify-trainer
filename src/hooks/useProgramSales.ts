import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

export interface ProgramSale {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  packageId: string;
  packageTitle: string;
  price: number;
  purchaseDate: string;
  requestDate: string;
  status: 'active' | 'pending_confirmation' | 'rejected';
  packageType: string;
}

export interface ProgramSalesData {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  pendingRequests: ProgramSale[];
  confirmedSales: ProgramSale[];
  rejectedSales: ProgramSale[];
  allSales: ProgramSale[];
  totalSalesCount: number;
  loading: boolean;
}

// Mock data for demo mode
const getMockPendingRequests = (): ProgramSale[] => [
  {
    id: 'mock-pending-1',
    clientId: 'client-1',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    packageId: 'pkg-1',
    packageTitle: 'Strength & Conditioning',
    price: 69.99,
    purchaseDate: new Date().toISOString(),
    requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending_confirmation',
    packageType: 'program_only',
  },
  {
    id: 'mock-pending-2',
    clientId: 'client-2',
    clientName: 'Mike Peterson',
    clientEmail: 'mike@example.com',
    packageId: 'pkg-2',
    packageTitle: 'Weight Loss Program',
    price: 99.99,
    purchaseDate: new Date().toISOString(),
    requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending_confirmation',
    packageType: 'program_only',
  },
];

const getMockConfirmedSales = (): ProgramSale[] => [
  {
    id: 'mock-sale-1',
    clientId: 'client-3',
    clientName: 'Lisa Garcia',
    clientEmail: 'lisa@example.com',
    packageId: 'pkg-3',
    packageTitle: 'Flexibility Program',
    price: 49.99,
    purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'program_only',
  },
  {
    id: 'mock-sale-2',
    clientId: 'client-4',
    clientName: 'David Kim',
    clientEmail: 'david@example.com',
    packageId: 'pkg-4',
    packageTitle: 'Nutrition + Training Combo',
    price: 149.99,
    purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'hybrid',
  },
  {
    id: 'mock-sale-3',
    clientId: 'client-5',
    clientName: 'Emma Wilson',
    clientEmail: 'emma@example.com',
    packageId: 'pkg-5',
    packageTitle: 'Core Strength',
    price: 79.99,
    purchaseDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'program_only',
  },
  {
    id: 'mock-sale-4',
    clientId: 'client-6',
    clientName: 'John Martinez',
    clientEmail: 'john.m@example.com',
    packageId: 'pkg-6',
    packageTitle: 'Bodybuilding Program',
    price: 129.99,
    purchaseDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'program_only',
  },
  {
    id: 'mock-sale-5',
    clientId: 'client-7',
    clientName: 'Sophie Chen',
    clientEmail: 'sophie@example.com',
    packageId: 'pkg-7',
    packageTitle: 'HIIT Training',
    price: 89.99,
    purchaseDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 41 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'program_only',
  },
  {
    id: 'mock-sale-6',
    clientId: 'client-10',
    clientName: 'Rachel Green',
    clientEmail: 'rachel@example.com',
    packageId: 'pkg-10',
    packageTitle: 'Yoga Fundamentals',
    price: 59.99,
    purchaseDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'program_only',
  },
  {
    id: 'mock-sale-7',
    clientId: 'client-11',
    clientName: 'Tom Harris',
    clientEmail: 'tom@example.com',
    packageId: 'pkg-11',
    packageTitle: 'Athletic Performance',
    price: 179.99,
    purchaseDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'hybrid',
  },
];

const getMockRejectedSales = (): ProgramSale[] => [
  {
    id: 'mock-reject-1',
    clientId: 'client-8',
    clientName: 'Alex Brown',
    clientEmail: 'alex.b@example.com',
    packageId: 'pkg-8',
    packageTitle: 'Beginner Plan',
    price: 39.99,
    purchaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
    packageType: 'program_only',
  },
  {
    id: 'mock-reject-2',
    clientId: 'client-9',
    clientName: 'Maria Lopez',
    clientEmail: 'maria@example.com',
    packageId: 'pkg-9',
    packageTitle: 'Advanced Training',
    price: 199.99,
    purchaseDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 51 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
    packageType: 'hybrid',
  },
];

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
      end.setDate(now.getDate() - 7);
      start.setDate(now.getDate() - 14);
      break;
    case 'month':
      end.setMonth(now.getMonth() - 1);
      end.setDate(0); // Last day of previous month
      start.setMonth(now.getMonth() - 2);
      start.setDate(1); // First day of previous month
      break;
    case 'quarter':
      end.setMonth(now.getMonth() - 3);
      start.setMonth(now.getMonth() - 6);
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
    pendingRequests: [],
    confirmedSales: [],
    rejectedSales: [],
    allSales: [],
    totalSalesCount: 0,
    loading: true,
  });

  const fetchProgramSales = async () => {
    try {
      setSalesData(prev => ({ ...prev, loading: true }));

      // Fetch all package assignments with package details
      const { data: assignments, error } = await supabase
        .from('client_package_assignments')
        .select(`
          *,
          client_packages:package_id (
            id,
            title,
            price,
            package_type
          )
        `)
        .eq('trainer_id', effectiveTrainerId)
        .in('status', ['active', 'pending_confirmation', 'rejected']);

      if (error) throw error;

      // If no real data, use mock data for demo
      const useMockData = !assignments || assignments.length === 0;
      
      if (useMockData) {
        const mockPending = getMockPendingRequests();
        const mockConfirmed = getMockConfirmedSales();
        const mockRejected = getMockRejectedSales();
        const allMockSales = [...mockPending, ...mockConfirmed, ...mockRejected];
        
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
          pendingRequests: mockPending,
          confirmedSales: mockConfirmed,
          rejectedSales: mockRejected,
          allSales: allMockSales,
          totalSalesCount: mockConfirmed.length,
          loading: false,
        });
        return;
      }

      // Transform data
      const sales: ProgramSale[] = await Promise.all(
        (assignments || []).map(async (assignment) => {
          // Fetch client profile
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
            price: pkg?.price || 0,
            purchaseDate: assignment.purchase_date || assignment.created_at,
            requestDate: assignment.created_at,
            status: assignment.status as 'active' | 'pending_confirmation' | 'rejected',
            packageType: pkg?.package_type || 'unknown',
          };
        })
      );

      // Separate pending, confirmed, and rejected
      const pendingRequests = sales.filter(s => s.status === 'pending_confirmation');
      const confirmedSales = sales.filter(s => s.status === 'active');
      const rejectedSales = sales.filter(s => s.status === 'rejected');

      // Calculate revenue for different periods
      const weekRange = getDateRange('week');
      const monthRange = getDateRange('month');
      const quarterRange = getDateRange('quarter');

      const previousWeekRange = getPreviousDateRange('week');
      const previousMonthRange = getPreviousDateRange('month');
      const previousQuarterRange = getPreviousDateRange('quarter');

      const weeklyRevenue = confirmedSales
        .filter(s => s.purchaseDate >= weekRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousWeekRevenue = confirmedSales
        .filter(s => s.purchaseDate >= previousWeekRange.start && s.purchaseDate <= previousWeekRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      const monthlyRevenue = confirmedSales
        .filter(s => s.purchaseDate >= monthRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousMonthRevenue = confirmedSales
        .filter(s => s.purchaseDate >= previousMonthRange.start && s.purchaseDate <= previousMonthRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      const quarterlyRevenue = confirmedSales
        .filter(s => s.purchaseDate >= quarterRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const previousQuarterRevenue = confirmedSales
        .filter(s => s.purchaseDate >= previousQuarterRange.start && s.purchaseDate <= previousQuarterRange.end)
        .reduce((sum, s) => sum + s.price, 0);

      setSalesData({
        weeklyRevenue,
        previousWeekRevenue,
        monthlyRevenue,
        previousMonthRevenue,
        quarterlyRevenue,
        previousQuarterRevenue,
        pendingRequests,
        confirmedSales,
        rejectedSales,
        allSales: sales,
        totalSalesCount: confirmedSales.length,
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

  const confirmPurchase = async (assignmentId: string, isProTrainer: boolean = false) => {
    try {
      const { error } = await supabase
        .from('client_package_assignments')
        .update({ 
          status: 'active',
          purchase_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', assignmentId);

      if (error) throw error;

      toast({
        title: "Purchase Confirmed",
        description: isProTrainer 
          ? "Sale confirmed and added to Transactions" 
          : "Sale confirmed successfully",
      });

      // Refresh data
      await fetchProgramSales();
    } catch (error) {
      console.error('Error confirming purchase:', error);
      toast({
        title: "Error",
        description: "Failed to confirm purchase",
        variant: "destructive"
      });
    }
  };

  const rejectPurchase = async (assignmentId: string) => {
    try {
      const { error } = await supabase
        .from('client_package_assignments')
        .update({ status: 'rejected' })
        .eq('id', assignmentId);

      if (error) throw error;

      toast({
        title: "Purchase Rejected",
        description: "Request has been declined",
      });

      // Refresh data
      await fetchProgramSales();
    } catch (error) {
      console.error('Error rejecting purchase:', error);
      toast({
        title: "Error",
        description: "Failed to reject purchase",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchProgramSales();
  }, [effectiveTrainerId]);

  return {
    ...salesData,
    confirmPurchase,
    rejectPurchase,
    refetch: fetchProgramSales,
  };
}
