
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ClientPackage {
  id: string;
  title: string;
  description: string | null;
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

// Type guards to ensure database values match our expected types
const isValidPackageType = (type: string): type is 'sessions_only' | 'program_only' | 'hybrid' | 'service' => {
  return ['sessions_only', 'program_only', 'hybrid', 'service'].includes(type);
};

const isValidStatus = (status: string): status is 'active' | 'expired' | 'completed' | 'cancelled' => {
  return ['active', 'expired', 'completed', 'cancelled'].includes(status);
};

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

      // Transform the data to match our interface with proper type checking
      const transformedAssignments: ClientPackageAssignment[] = assignments?.map(assignment => {
        const pkg = assignment.package;
        
        // Ensure package_type is valid
        if (!isValidPackageType(pkg.package_type)) {
          console.warn(`Invalid package_type: ${pkg.package_type}, defaulting to sessions_only`);
          pkg.package_type = 'sessions_only';
        }
        
        // Ensure status is valid
        if (!isValidStatus(assignment.status)) {
          console.warn(`Invalid status: ${assignment.status}, defaulting to active`);
          assignment.status = 'active';
        }

        return {
          id: assignment.id,
          client_id: assignment.client_id,
          trainer_id: assignment.trainer_id,
          package_id: assignment.package_id,
          purchase_date: assignment.purchase_date || '',
          expiry_date: assignment.expiry_date || '',
          sessions_used: assignment.sessions_used || 0,
          sessions_total: assignment.sessions_total,
          total_paid: assignment.total_paid || 0,
          status: assignment.status as 'active' | 'expired' | 'completed' | 'cancelled',
          package: {
            id: pkg.id,
            title: pkg.title,
            description: pkg.description,
            package_type: pkg.package_type as 'sessions_only' | 'program_only' | 'hybrid' | 'service',
            sessions_count: pkg.sessions_count || 0,
            price: pkg.price,
            validity_days: pkg.validity_days || 90
          },
          trainer_name: "John Doe" // TODO: Add trainer name lookup
        };
      }) || [];

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

      // Transform the data to match our interface with proper type checking
      const transformedPackages: ClientPackage[] = data?.map(pkg => {
        // Ensure package_type is valid
        if (!isValidPackageType(pkg.package_type)) {
          console.warn(`Invalid package_type: ${pkg.package_type}, defaulting to sessions_only`);
          pkg.package_type = 'sessions_only';
        }

        return {
          id: pkg.id,
          title: pkg.title,
          description: pkg.description,
          package_type: pkg.package_type as 'sessions_only' | 'program_only' | 'hybrid' | 'service',
          sessions_count: pkg.sessions_count || 0,
          price: pkg.price,
          validity_days: pkg.validity_days || 90
        };
      }) || [];

      setAvailablePackages(transformedPackages);
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
