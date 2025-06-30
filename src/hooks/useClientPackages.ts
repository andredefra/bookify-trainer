
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ClientPackage {
  id: string;
  title: string;
  description: string;
  package_type: 'sessions_only' | 'program_only' | 'hybrid' | 'service';
  sessions_count: number;
  price: number;
  validity_days: number;
}

export interface ClientPackageAssignment {
  id: string;
  client_id: string;
  trainer_id: string;
  package_id: string;
  purchase_date: string;
  expiry_date: string;
  sessions_used: number;
  sessions_total: number;
  total_paid: number;
  status: 'active' | 'expired' | 'completed' | 'cancelled';
  package: ClientPackage;
  trainer_name?: string;
}

export function useClientPackages() {
  const [packages, setPackages] = useState<ClientPackageAssignment[]>([]);
  const [availablePackages, setAvailablePackages] = useState<ClientPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      
      // Fetch user's package assignments with package details
      const { data: assignments, error: assignmentsError } = await supabase
        .from('client_package_assignments')
        .select(`
          *,
          package:client_packages(*)
        `)
        .order('created_at', { ascending: false });

      if (assignmentsError) throw assignmentsError;

      // Transform the data to match our interface
      const transformedAssignments = assignments?.map(assignment => ({
        ...assignment,
        package: assignment.package,
        trainer_name: "John Doe" // TODO: Add trainer name lookup
      })) || [];

      setPackages(transformedAssignments);
      
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablePackages = async () => {
    try {
      const { data, error } = await supabase
        .from('client_packages')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      setAvailablePackages(data || []);
    } catch (err) {
      console.error('Error fetching available packages:', err);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchAvailablePackages();
  }, []);

  return {
    packages,
    availablePackages,
    loading,
    error,
    refetch: fetchPackages
  };
}
