import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ActivePackage {
  id: string;
  clientId: string;
  clientName: string;
  packageTitle: string;
  sessionsTotal: number;
  sessionsUsed: number;
  status: string;
  paymentStatus?: string;
  purchaseDate: string;
  expiryDate?: string;
  totalPaid: number;
  packageId: string;
  trainerId: string;
}

export const useActivePackages = (trainerId?: string) => {
  const [packages, setPackages] = useState<ActivePackage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchActivePackages = async () => {
    if (!trainerId) return;
    
    try {
      setLoading(true);
      
      // Fetch package assignments with client profiles
      const { data: assignments, error } = await supabase
        .from('client_package_assignments')
        .select(`
          id,
          client_id,
          package_id,
          trainer_id,
          sessions_total,
          sessions_used,
          status,
          purchase_date,
          expiry_date,
          total_paid,
          client_packages!inner(title)
        `)
        .eq('trainer_id', trainerId)
        .eq('status', 'active')
        .order('purchase_date', { ascending: false });

      if (error) throw error;

      // Fetch client profiles for the assignments
      const clientIds = assignments?.map(a => a.client_id) || [];
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', clientIds);

      if (profileError) throw profileError;

      // Map profiles by id for quick lookup
      const profileMap = new Map(profiles?.map(p => [p.id, p.full_name]) || []);

      // Transform the data
      const transformedPackages: ActivePackage[] = (assignments || []).map((assignment) => ({
        id: assignment.id,
        clientId: assignment.client_id,
        clientName: profileMap.get(assignment.client_id) || 'Unknown Client',
        packageTitle: assignment.client_packages?.title || 'Unknown Package',
        sessionsTotal: assignment.sessions_total,
        sessionsUsed: assignment.sessions_used || 0,
        status: assignment.status || 'active',
        purchaseDate: assignment.purchase_date || new Date().toISOString(),
        expiryDate: assignment.expiry_date || undefined,
        totalPaid: assignment.total_paid || 0,
        packageId: assignment.package_id,
        trainerId: assignment.trainer_id,
      }));

      setPackages(transformedPackages);
    } catch (error) {
      console.error('Error fetching active packages:', error);
      toast.error('Failed to load active packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePackages();
  }, [trainerId]);

  return {
    packages,
    loading,
    refetch: fetchActivePackages,
  };
};
