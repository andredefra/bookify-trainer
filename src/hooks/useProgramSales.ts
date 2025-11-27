import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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

const DEMO_TRAINER_ID = '00000000-0000-0000-0000-000000000001';

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

export function useProgramSales(trainerId: string = DEMO_TRAINER_ID) {
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
        .eq('trainer_id', trainerId)
        .in('status', ['active', 'pending_confirmation', 'rejected']);

      if (error) throw error;

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
  }, [trainerId]);

  return {
    ...salesData,
    confirmPurchase,
    rejectPurchase,
    refetch: fetchProgramSales,
  };
}
