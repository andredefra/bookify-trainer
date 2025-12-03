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
  requestDate: string;
  status: 'active' | 'pending_confirmation' | 'rejected';
  packageType: string;
  sessionsTotal?: number;
  sessionsUsed?: number;
}

export interface PackageSalesData {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  pendingRequests: PackageSale[];
  confirmedSales: PackageSale[];
  rejectedSales: PackageSale[];
  allSales: PackageSale[];
  totalSalesCount: number;
  loading: boolean;
}

// Mock data for demo mode
const getMockPendingRequests = (): PackageSale[] => [
  {
    id: 'pkg-pending-1',
    clientId: 'client-1',
    clientName: 'Emma Thompson',
    clientEmail: 'emma@example.com',
    packageId: 'pkg-template-1',
    packageTitle: 'Personal Training Package',
    price: 500,
    purchaseDate: new Date().toISOString(),
    requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending_confirmation',
    packageType: 'sessions_only',
    sessionsTotal: 10,
    sessionsUsed: 0,
  },
  {
    id: 'pkg-pending-2',
    clientId: 'client-2',
    clientName: 'David Kim',
    clientEmail: 'david@example.com',
    packageId: 'pkg-template-2',
    packageTitle: 'Complete Transformation',
    price: 750,
    purchaseDate: new Date().toISOString(),
    requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending_confirmation',
    packageType: 'hybrid',
    sessionsTotal: 8,
    sessionsUsed: 0,
  },
];

const getMockConfirmedSales = (): PackageSale[] => {
  const now = new Date();
  
  return [
    {
      id: 'pkg-sale-1',
      clientId: 'client-3',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      packageId: 'pkg-template-1',
      packageTitle: 'Personal Training Package',
      price: 500,
      purchaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'sessions_only',
      sessionsTotal: 10,
      sessionsUsed: 3,
    },
    {
      id: 'pkg-sale-2',
      clientId: 'client-4',
      clientName: 'Mike Peterson',
      clientEmail: 'mike@example.com',
      packageId: 'pkg-template-2',
      packageTitle: 'Complete Transformation',
      price: 750,
      purchaseDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'hybrid',
      sessionsTotal: 8,
      sessionsUsed: 2,
    },
    {
      id: 'pkg-sale-3',
      clientId: 'client-5',
      clientName: 'Lisa Garcia',
      clientEmail: 'lisa@example.com',
      packageId: 'pkg-template-3',
      packageTitle: "Beginner's Program",
      price: 200,
      purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'program_only',
      sessionsTotal: 0,
      sessionsUsed: 0,
    },
    {
      id: 'pkg-sale-4',
      clientId: 'client-6',
      clientName: 'John Martinez',
      clientEmail: 'john@example.com',
      packageId: 'pkg-template-4',
      packageTitle: 'Nutrition Consultation',
      price: 150,
      purchaseDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'service',
      sessionsTotal: 0,
      sessionsUsed: 0,
    },
    {
      id: 'pkg-sale-5',
      clientId: 'client-7',
      clientName: 'Sophie Chen',
      clientEmail: 'sophie@example.com',
      packageId: 'pkg-template-1',
      packageTitle: 'Personal Training Package',
      price: 500,
      purchaseDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      requestDate: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      packageType: 'sessions_only',
      sessionsTotal: 10,
      sessionsUsed: 8,
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
      requestDate: new Date(now.getFullYear(), now.getMonth() - 1, 11).toISOString(),
      status: 'active',
      packageType: 'hybrid',
      sessionsTotal: 8,
      sessionsUsed: 6,
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
      requestDate: new Date(now.getFullYear(), now.getMonth() - 1, 21).toISOString(),
      status: 'active',
      packageType: 'program_only',
      sessionsTotal: 0,
      sessionsUsed: 0,
    },
  ];
};

const getMockRejectedSales = (): PackageSale[] => [
  {
    id: 'pkg-reject-1',
    clientId: 'client-10',
    clientName: 'Alex Brown',
    clientEmail: 'alex@example.com',
    packageId: 'pkg-template-4',
    packageTitle: 'Nutrition Consultation',
    price: 150,
    purchaseDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 41 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
    packageType: 'service',
    sessionsTotal: 0,
    sessionsUsed: 0,
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
    pendingRequests: [],
    confirmedSales: [],
    rejectedSales: [],
    allSales: [],
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
            requestDate: assignment.created_at || '',
            status: assignment.status as 'active' | 'pending_confirmation' | 'rejected',
            packageType: pkg?.package_type || 'unknown',
            sessionsTotal: assignment.sessions_total || pkg?.sessions_count || 0,
            sessionsUsed: assignment.sessions_used || 0,
          };
        })
      );

      const pendingRequests = sales.filter(s => s.status === 'pending_confirmation');
      const confirmedSales = sales.filter(s => s.status === 'active');
      const rejectedSales = sales.filter(s => s.status === 'rejected');

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
      console.error('Error fetching package sales:', error);
      toast({
        title: "Error",
        description: "Failed to load package sales data",
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
          ? "Sale confirmed and synced to Transactions" 
          : "Sale confirmed successfully",
      });

      await fetchPackageSales();
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

      await fetchPackageSales();
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
    if (effectiveTrainerId) {
      fetchPackageSales();
    }
  }, [effectiveTrainerId]);

  return {
    ...salesData,
    confirmPurchase,
    rejectPurchase,
    refetch: fetchPackageSales,
  };
}
