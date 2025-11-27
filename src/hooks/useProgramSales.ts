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
  monthlyRevenue: number;
  quarterlyRevenue: number;
  pendingRequests: ProgramSale[];
  confirmedSales: ProgramSale[];
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
    purchaseDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    requestDate: new Date(Date.now() - 46 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    packageType: 'program_only',
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

export function useProgramSales(trainerId?: string) {
  const effectiveTrainerId = trainerId || getCurrentDemoUserId();
  const [salesData, setSalesData] = useState<ProgramSalesData>({
    weeklyRevenue: 0,
    monthlyRevenue: 0,
    quarterlyRevenue: 0,
    pendingRequests: [],
    confirmedSales: [],
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
        
        // Calculate revenue from mock data
        const weekRange = getDateRange('week');
        const monthRange = getDateRange('month');
        const quarterRange = getDateRange('quarter');

        const weeklyRevenue = mockConfirmed
          .filter(s => s.purchaseDate >= weekRange.start)
          .reduce((sum, s) => sum + s.price, 0);

        const monthlyRevenue = mockConfirmed
          .filter(s => s.purchaseDate >= monthRange.start)
          .reduce((sum, s) => sum + s.price, 0);

        const quarterlyRevenue = mockConfirmed
          .filter(s => s.purchaseDate >= quarterRange.start)
          .reduce((sum, s) => sum + s.price, 0);

        setSalesData({
          weeklyRevenue,
          monthlyRevenue,
          quarterlyRevenue,
          pendingRequests: mockPending,
          confirmedSales: mockConfirmed,
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

      // Separate pending and confirmed
      const pendingRequests = sales.filter(s => s.status === 'pending_confirmation');
      const confirmedSales = sales.filter(s => s.status === 'active');

      // Calculate revenue for different periods
      const weekRange = getDateRange('week');
      const monthRange = getDateRange('month');
      const quarterRange = getDateRange('quarter');

      const weeklyRevenue = confirmedSales
        .filter(s => s.purchaseDate >= weekRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const monthlyRevenue = confirmedSales
        .filter(s => s.purchaseDate >= monthRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      const quarterlyRevenue = confirmedSales
        .filter(s => s.purchaseDate >= quarterRange.start)
        .reduce((sum, s) => sum + s.price, 0);

      setSalesData({
        weeklyRevenue,
        monthlyRevenue,
        quarterlyRevenue,
        pendingRequests,
        confirmedSales,
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
