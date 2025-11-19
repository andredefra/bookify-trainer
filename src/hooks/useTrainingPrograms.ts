import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TrainingProgram } from '@/data/training/types';

const DEMO_CLIENT_ID = '00000000-0000-0000-0000-000000000002';

interface ProgramAssignment {
  id: string;
  status: 'active' | 'expired' | 'completed' | 'cancelled' | 'proposed';
  purchase_date: string;
  expiry_date: string;
  package: {
    id: string;
    title: string;
    package_type: string;
    training_program_data: any;
  };
  trainer_name?: string;
}

export function useTrainingPrograms() {
  const [activePrograms, setActivePrograms] = useState<TrainingProgram[]>([]);
  const [previousPrograms, setPreviousPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch package assignments with training program data
      const { data: assignments, error: fetchError } = await supabase
        .from('client_package_assignments')
        .select(`
          id,
          status,
          purchase_date,
          expiry_date,
          package:client_packages(
            id,
            title,
            package_type,
            training_program_data
          )
        `)
        .eq('client_id', DEMO_CLIENT_ID)
        .in('status', ['active', 'expired', 'completed']);

      if (fetchError) {
        throw fetchError;
      }

      if (!assignments) {
        setActivePrograms([]);
        setPreviousPrograms([]);
        return;
      }

      // Filter and transform assignments with training programs
      const active: TrainingProgram[] = [];
      const previous: TrainingProgram[] = [];

      for (const assignment of assignments as any[]) {
        const pkg = assignment.package;
        
        // Only include packages with training_program_data
        if (!pkg?.training_program_data) continue;
        
        // Only include program_only or hybrid packages
        if (pkg.package_type !== 'program_only' && pkg.package_type !== 'hybrid') continue;

        const program: TrainingProgram = {
          ...pkg.training_program_data,
          id: `${assignment.id}-${pkg.id}`,
        };

        if (assignment.status === 'active') {
          active.push(program);
        } else {
          previous.push(program);
        }
      }

      setActivePrograms(active);
      setPreviousPrograms(previous);
    } catch (err) {
      console.error('Error fetching training programs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch programs');
    } finally {
      setLoading(false);
    }
  };

  return {
    activePrograms,
    previousPrograms,
    loading,
    error,
    refetch: fetchPrograms
  };
}
