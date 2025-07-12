import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface GymPackage {
  id: string;
  gym_id: string;
  title: string;
  description?: string;
  package_type: string;
  price: number;
  duration_days?: number;
  session_limit?: number;
  trainer_commission_percentage: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GymPackageAssignment {
  id: string;
  gym_id: string;
  package_id: string;
  client_id: string;
  trainer_id: string;
  purchase_date: string;
  start_date: string;
  end_date?: string;
  sessions_used: number;
  sessions_total?: number;
  total_paid: number;
  payment_status: string;
  status: string;
  created_at: string;
  updated_at: string;
  package?: GymPackage;
}

export interface CreateGymPackageData {
  title: string;
  description?: string;
  package_type: string;
  price: number;
  duration_days?: number;
  session_limit?: number;
  trainer_commission_percentage: number;
}

export function useGymPackages() {
  const [packages, setPackages] = useState<GymPackage[]>([]);
  const [assignments, setAssignments] = useState<GymPackageAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('gym_packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPackages((data || []) as GymPackage[]);
    } catch (err) {
      console.error('Error fetching gym packages:', err);
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from('gym_package_assignments')
        .select(`
          *,
          package:gym_packages(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setAssignments((data || []) as GymPackageAssignment[]);
    } catch (err) {
      console.error('Error fetching gym package assignments:', err);
      setError('Failed to fetch assignments');
    }
  };

  const createPackage = async (packageData: CreateGymPackageData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('gym_packages')
        .insert({
          ...packageData,
          gym_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Package Created",
        description: "Package has been created successfully",
      });

      await fetchPackages();
      return data;
    } catch (err) {
      console.error('Error creating package:', err);
      toast({
        title: "Error",
        description: "Failed to create package",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updatePackage = async (id: string, packageData: Partial<CreateGymPackageData>) => {
    try {
      const { data, error } = await supabase
        .from('gym_packages')
        .update(packageData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Package Updated",
        description: "Package has been updated successfully",
      });

      await fetchPackages();
      return data;
    } catch (err) {
      console.error('Error updating package:', err);
      toast({
        title: "Error",
        description: "Failed to update package",
        variant: "destructive",
      });
      throw err;
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gym_packages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Package Deleted",
        description: "Package has been deleted successfully",
      });

      await fetchPackages();
    } catch (err) {
      console.error('Error deleting package:', err);
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive",
      });
      throw err;
    }
  };

  const assignPackageToClient = async (
    packageId: string, 
    clientId: string, 
    trainerId: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const packageData = packages.find(p => p.id === packageId);
      if (!packageData) throw new Error('Package not found');

      const endDate = packageData.duration_days 
        ? new Date(Date.now() + packageData.duration_days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : null;

      const { data, error } = await supabase
        .from('gym_package_assignments')
        .insert({
          gym_id: user.id,
          package_id: packageId,
          client_id: clientId,
          trainer_id: trainerId,
          end_date: endDate,
          sessions_total: packageData.session_limit,
          total_paid: packageData.price,
          payment_status: 'pending',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Package Assigned",
        description: "Package has been assigned to client successfully",
      });

      await fetchAssignments();
      return data;
    } catch (err) {
      console.error('Error assigning package:', err);
      toast({
        title: "Error",
        description: "Failed to assign package",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Calculate revenue statistics
  const getRevenueStats = () => {
    const activeAssignments = assignments.filter(a => a.status === 'active');
    const totalRevenue = activeAssignments.reduce((sum, a) => sum + a.total_paid, 0);
    const monthlyRevenue = activeAssignments
      .filter(a => {
        const purchaseDate = new Date(a.purchase_date);
        const now = new Date();
        return purchaseDate.getMonth() === now.getMonth() && 
               purchaseDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, a) => sum + a.total_paid, 0);

    return {
      totalRevenue,
      monthlyRevenue,
      activeSubscriptions: activeAssignments.length,
      activePackages: packages.filter(p => p.is_active).length
    };
  };

  useEffect(() => {
    fetchPackages();
    fetchAssignments();
  }, []);

  return {
    packages,
    assignments,
    loading,
    error,
    createPackage,
    updatePackage,
    deletePackage,
    assignPackageToClient,
    fetchPackages,
    fetchAssignments,
    getRevenueStats
  };
}