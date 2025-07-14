import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, endOfDay, startOfMonth, endOfMonth, subDays, subMonths } from "date-fns";

export interface GymTransaction {
  id: string;
  client_id: string;
  package_id: string;
  total_paid: number;
  purchase_date: string;
  payment_status: string;
  status: string;
  package_title: string;
  package_type: string;
  client_name: string;
  client_email: string;
}

export interface TransactionStats {
  todayRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  totalTransactions: number;
  revenueGrowth: number;
  paymentMethods: Record<string, number>;
}

export function useGymTransactions() {
  return useQuery({
    queryKey: ["gym-transactions"],
    queryFn: async () => {
      const user = JSON.parse(localStorage.getItem('demo-user') || '{}');
      if (!user.id) throw new Error('No gym user found');

      const { data: assignments, error } = await supabase
        .from('gym_package_assignments')
        .select(`
          id,
          client_id,
          package_id,
          total_paid,
          purchase_date,
          payment_status,
          status,
          gym_packages!inner(
            title,
            package_type
          )
        `)
        .eq('gym_id', user.id)
        .order('purchase_date', { ascending: false });

      if (error) throw error;

      // Get client profiles separately
      const clientIds = assignments?.map(a => a.client_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', clientIds);

      const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

      const transactions: GymTransaction[] = assignments?.map(assignment => {
        const profile = profilesMap.get(assignment.client_id);
        return {
          id: assignment.id,
          client_id: assignment.client_id,
          package_id: assignment.package_id,
          total_paid: assignment.total_paid,
          purchase_date: assignment.purchase_date,
          payment_status: assignment.payment_status || 'pending',
          status: assignment.status || 'active',
          package_title: assignment.gym_packages?.title || 'Unknown Package',
          package_type: assignment.gym_packages?.package_type || 'monthly',
          client_name: profile?.full_name || 'Unknown Client',
          client_email: profile?.email || 'unknown@email.com'
        };
      }) || [];

      return transactions;
    }
  });
}

export function useTransactionStats() {
  return useQuery({
    queryKey: ["transaction-stats"],
    queryFn: async () => {
      const user = JSON.parse(localStorage.getItem('demo-user') || '{}');
      if (!user.id) throw new Error('No gym user found');

      const now = new Date();
      const todayStart = startOfDay(now);
      const todayEnd = endOfDay(now);
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);
      const lastMonthStart = startOfMonth(subMonths(now, 1));
      const lastMonthEnd = endOfMonth(subMonths(now, 1));

      // Get all assignments for this gym
      const { data: assignments, error } = await supabase
        .from('gym_package_assignments')
        .select('*')
        .eq('gym_id', user.id);

      if (error) throw error;

      const paidAssignments = assignments?.filter(a => a.payment_status === 'paid') || [];
      const pendingAssignments = assignments?.filter(a => a.payment_status === 'pending') || [];

      // Today's revenue
      const todayRevenue = paidAssignments
        .filter(a => {
          const purchaseDate = new Date(a.purchase_date);
          return purchaseDate >= todayStart && purchaseDate <= todayEnd;
        })
        .reduce((sum, a) => sum + (a.total_paid || 0), 0);

      // Monthly revenue
      const monthlyRevenue = paidAssignments
        .filter(a => {
          const purchaseDate = new Date(a.purchase_date);
          return purchaseDate >= monthStart && purchaseDate <= monthEnd;
        })
        .reduce((sum, a) => sum + (a.total_paid || 0), 0);

      // Last month revenue for growth calculation
      const lastMonthRevenue = paidAssignments
        .filter(a => {
          const purchaseDate = new Date(a.purchase_date);
          return purchaseDate >= lastMonthStart && purchaseDate <= lastMonthEnd;
        })
        .reduce((sum, a) => sum + (a.total_paid || 0), 0);

      const revenueGrowth = lastMonthRevenue > 0 
        ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
        : 0;

      // Payment methods simulation (since we don't have this data yet)
      const paymentMethods = {
        'Card': Math.floor(paidAssignments.length * 0.7),
        'Cash': Math.floor(paidAssignments.length * 0.2),
        'Transfer': Math.floor(paidAssignments.length * 0.1)
      };

      const stats: TransactionStats = {
        todayRevenue,
        monthlyRevenue,
        pendingPayments: pendingAssignments.length,
        totalTransactions: assignments?.length || 0,
        revenueGrowth,
        paymentMethods
      };

      return stats;
    }
  });
}