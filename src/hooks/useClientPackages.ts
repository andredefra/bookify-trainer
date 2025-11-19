import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DEMO_CLIENT_ID = '00000000-0000-0000-0000-000000000002';

export interface ClientPackage {
  id: string;
  title: string;
  description: string | null;
  package_type: 'sessions_only' | 'program_only' | 'hybrid' | 'service';
  sessions_count: number;
  price: number;
  validity_days: number;
  trainer_id: string;
  is_public: boolean;
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
  status: 'active' | 'expired' | 'completed' | 'cancelled' | 'proposed';
  package: ClientPackage;
  trainer_name?: string;
}

export interface AssignedPackage extends ClientPackage {
  assignmentId: string;
  assignedByTrainer: boolean;
}

// Type guards to ensure database values match our expected types
const isValidPackageType = (type: string): type is 'sessions_only' | 'program_only' | 'hybrid' | 'service' => {
  return ['sessions_only', 'program_only', 'hybrid', 'service'].includes(type);
};

const isValidStatus = (status: string): status is 'active' | 'expired' | 'completed' | 'cancelled' | 'proposed' => {
  return ['active', 'expired', 'completed', 'cancelled', 'proposed'].includes(status);
};

// Function to determine actual status based on expiry date
const getActualStatus = (dbStatus: string, expiryDate: string | null): 'active' | 'expired' | 'completed' | 'cancelled' | 'proposed' => {
  // Proposed packages don't have expiry date yet
  if (dbStatus === 'proposed') {
    return 'proposed';
  }
  
  if (!expiryDate) {
    return isValidStatus(dbStatus) ? dbStatus : 'active';
  }
  
  const today = new Date();
  const expiry = new Date(expiryDate);
  
  // If expiry date has passed, override status to expired
  if (expiry < today && dbStatus === 'active') {
    return 'expired';
  }
  
  return isValidStatus(dbStatus) ? dbStatus : 'active';
};

// Trainer name mapping
const getTrainerName = (trainerId: string): string => {
  const trainerNames: { [key: string]: string } = {
    '00000000-0000-0000-0000-000000000001': 'John Doe',
    '11111111-1111-1111-1111-111111111111': 'Sarah Johnson',
    '22222222-2222-2222-2222-222222222222': 'Alex Thompson'
  };
  
  return trainerNames[trainerId] || 'Unknown Trainer';
};

export function useClientPackages() {
  const [packages, setPackages] = useState<ClientPackageAssignment[]>([]);
  const [availablePackages, setAvailablePackages] = useState<ClientPackage[]>([]);
  const [assignedPackages, setAssignedPackages] = useState<AssignedPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      // For demo: force using the demo client ID so all mock data is visible
      const clientId = DEMO_CLIENT_ID;
      console.log('Using demo client ID for packages:', clientId);

      // First, fetch the client's trainers
      const { data: trainerRelationships } = await supabase
        .from('trainer_client_relationships')
        .select('trainer_id')
        .eq('client_id', clientId)
        .eq('status', 'active');

      const trainerIds = trainerRelationships?.map(r => r.trainer_id) || [];
      console.log('Client trainers:', trainerIds);

      // Fetch package assignments with package details (exclude proposed)
      const { data: assignments, error: assignmentsError } = await supabase
        .from('client_package_assignments')
        .select(`
          *,
          package:client_packages(*)
        `)
        .eq('client_id', clientId)
        .neq('status', 'proposed');

      if (assignmentsError) {
        console.error('Error fetching assignments:', assignmentsError);
        throw assignmentsError;
      }

      console.log('Raw assignments data:', assignments);

      // Transform the data to match our interface with proper type checking and status calculation
      const transformedAssignments: ClientPackageAssignment[] = assignments?.map(assignment => {
        const pkg = assignment.package;
        
        // Check if package exists
        if (!pkg) {
          console.warn(`Assignment ${assignment.id} has no associated package`);
          return null;
        }
        
        // Ensure package_type is valid
        if (!isValidPackageType(pkg.package_type)) {
          console.warn(`Invalid package_type: ${pkg.package_type}, defaulting to sessions_only`);
          pkg.package_type = 'sessions_only';
        }
        
        // Calculate actual status based on expiry date
        const actualStatus = getActualStatus(assignment.status, assignment.expiry_date);

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
          status: actualStatus,
          package: {
            id: pkg.id,
            title: pkg.title,
            description: pkg.description,
            package_type: pkg.package_type as 'sessions_only' | 'program_only' | 'hybrid' | 'service',
            sessions_count: pkg.sessions_count || 0,
            price: pkg.price,
            validity_days: pkg.validity_days || 90,
            trainer_id: pkg.trainer_id,
            is_public: pkg.is_public || false
          },
          trainer_name: getTrainerName(assignment.trainer_id)
        };
      }).filter(Boolean) as ClientPackageAssignment[] || [];

      console.log('Transformed assignments:', transformedAssignments);
      
      // Sort packages: active first, then by purchase date (newest first)
      const sortedPackages = transformedAssignments.sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status !== 'active' && b.status === 'active') return 1;
        return new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime();
      });
      
      setPackages(sortedPackages);

      // Fetch available public packages from client's trainers
      const { data: availablePackagesData, error: availableError } = await supabase
        .from('client_packages')
        .select('*')
        .eq('is_active', true)
        .eq('is_public', true)
        .in('trainer_id', trainerIds.length > 0 ? trainerIds : ['00000000-0000-0000-0000-000000000001'])
        .order('price', { ascending: true });

      if (availableError) {
        console.error('Error fetching available packages:', availableError);
      }

      // Transform the data to match our interface with proper type checking
      const transformedPackages: ClientPackage[] = availablePackagesData?.map(pkg => {
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
          validity_days: pkg.validity_days || 90,
          trainer_id: pkg.trainer_id,
          is_public: pkg.is_public || false
        };
      }) || [];

      console.log('Transformed available packages:', transformedPackages);
      setAvailablePackages(transformedPackages);

      // Fetch assigned packages (status 'proposed')
      const { data: proposedAssignments } = await supabase
        .from('client_package_assignments')
        .select(`
          *,
          package:client_packages(*)
        `)
        .eq('client_id', clientId)
        .eq('status', 'proposed');

      const transformedAssignedPackages: AssignedPackage[] = proposedAssignments?.map(assignment => {
        const pkg = assignment.package;
        if (!pkg) return null;

        return {
          id: pkg.id,
          title: pkg.title,
          description: pkg.description,
          package_type: pkg.package_type as 'sessions_only' | 'program_only' | 'hybrid' | 'service',
          sessions_count: pkg.sessions_count || 0,
          price: pkg.price,
          validity_days: pkg.validity_days || 90,
          trainer_id: pkg.trainer_id,
          is_public: false,
          assignmentId: assignment.id,
          assignedByTrainer: true
        };
      }).filter(Boolean) as AssignedPackage[] || [];

      console.log('Transformed assigned packages:', transformedAssignedPackages);
      setAssignedPackages(transformedAssignedPackages);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  return {
    packages,
    availablePackages,
    assignedPackages,
    loading,
    error,
    refetch: fetchPackages
  };
}
