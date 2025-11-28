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
          total_paid,
          package:client_packages(
            id,
            title,
            package_type,
            price,
            training_program_data
          )
        `)
        .eq('client_id', DEMO_CLIENT_ID)
        .in('status', ['active', 'expired', 'completed']);

      console.log('📦 [useTrainingPrograms] Fetched assignments:', assignments);

      if (fetchError) {
        console.error('❌ [useTrainingPrograms] Fetch error:', fetchError);
        throw fetchError;
      }

      if (!assignments) {
        console.log('⚠️ [useTrainingPrograms] No assignments found');
        setActivePrograms([]);
        setPreviousPrograms([]);
        return;
      }

      // Filter and transform assignments with training programs
      const active: TrainingProgram[] = [];
      const previous: TrainingProgram[] = [];

      for (const assignment of assignments as any[]) {
        const pkg = assignment.package;
        
        console.log(`📋 [useTrainingPrograms] Processing assignment:`, {
          id: assignment.id,
          status: assignment.status,
          package: pkg?.title,
          has_program_data: !!pkg?.training_program_data,
          package_type: pkg?.package_type
        });
        
        // Only include packages with training_program_data
        if (!pkg?.training_program_data) {
          console.log(`⏭️ [useTrainingPrograms] Skipping: no training_program_data`);
          continue;
        }
        
        // Only include program_only or hybrid packages
        if (pkg.package_type !== 'program_only' && pkg.package_type !== 'hybrid') {
          console.log(`⏭️ [useTrainingPrograms] Skipping: package_type is ${pkg.package_type}`);
          continue;
        }

        // Calculate payment status
        const totalPaid = assignment.total_paid || 0;
        const totalPrice = pkg.price || 0;
        let paymentStatus: 'pending' | 'partial' | 'paid' = 'pending';
        if (totalPaid >= totalPrice) {
          paymentStatus = 'paid';
        } else if (totalPaid > 0) {
          paymentStatus = 'partial';
        }

        const program: TrainingProgram = {
          ...pkg.training_program_data,
          id: `${assignment.id}-${pkg.id}`,
          
          // Add payment fields from package assignment
          packageAssignmentId: assignment.id,
          isStandalone: false,
          totalPrice: pkg.price,
          amountPaid: assignment.total_paid || 0,
          paymentStatus,
          paymentMethod: totalPaid > 0 && totalPaid < totalPrice ? 'installments' : 'card',
        };

        const completedSessions = program.sessions?.filter(s => s.completed).length || 0;
        console.log(`✅ [useTrainingPrograms] Including program: ${program.title} (${completedSessions}/${program.totalSessions} sessions)`);

        if (assignment.status === 'active') {
          active.push(program);
        } else {
          previous.push(program);
        }
      }

      console.log('🎯 [useTrainingPrograms] Result:', {
        active: active.length,
        previous: previous.length,
        activePrograms: active.map(p => ({ title: p.title, progress: `${p.sessions?.filter(s => s.completed).length || 0}/${p.totalSessions}` }))
      });

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
