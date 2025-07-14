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
      // For now, use the actual gym_id from the demo data  
      const gymId = '11111111-1111-1111-1111-111111111111';
      
      

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
          gym_packages(
            title,
            package_type
          )
        `)
        .eq('gym_id', gymId)
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
        // Generate demo names based on client_id for missing profiles
        const generateDemoName = (clientId: string) => {
          const names = {
            '44444444-4444-4444-4444-444444444444': 'Marco Rossi',
            '55555555-5555-5555-5555-555555555555': 'Giulia Bianchi', 
            '66666666-6666-6666-6666-666666666666': 'Andrea Verdi',
            '00000000-0000-0000-0000-000000000002': 'Sara Ferrari'
          };
          return names[clientId] || 'Cliente Demo';
        };
        
        const generateDemoEmail = (clientId: string) => {
          const emails = {
            '44444444-4444-4444-4444-444444444444': 'marco.rossi@email.com',
            '55555555-5555-5555-5555-555555555555': 'giulia.bianchi@email.com',
            '66666666-6666-6666-6666-666666666666': 'andrea.verdi@email.com', 
            '00000000-0000-0000-0000-000000000002': 'sara.ferrari@email.com'
          };
          return emails[clientId] || 'cliente@email.com';
        };

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
          client_name: profile?.full_name || generateDemoName(assignment.client_id),
          client_email: profile?.email || generateDemoEmail(assignment.client_id)
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
      // For now, use the actual gym_id from the demo data
      const gymId = '11111111-1111-1111-1111-111111111111';
      
      const now = new Date();
      const todayStart = startOfDay(now);
      const todayEnd = endOfDay(now);
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);
      const lastMonthStart = startOfMonth(subMonths(now, 1));
      const lastMonthEnd = endOfMonth(subMonths(now, 1));

      const { data: assignments, error } = await supabase
        .from('gym_package_assignments')
        .select('*')
        .eq('gym_id', gymId);

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