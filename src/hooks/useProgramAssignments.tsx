
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProgramAssignment {
  id: string;
  client_id: string;
  trainer_id: string;
  program_id: string;
  start_date: string;
  estimated_end_date: string;
  actual_end_date?: string;
  target_frequency: number;
  total_sessions_planned: number;
  sessions_completed: number;
  created_at: string;
  updated_at: string;
}

export interface ProgramProgress {
  id: string;
  clientName: string;
  programTitle: string;
  completionPercentage: number;
  daysUntilExpiry: number;
  status: 'on_track' | 'behind_schedule' | 'ahead_of_schedule' | 'expired';
  sessionsCompleted: number;
  totalSessions: number;
  estimatedEndDate: string;
}

export function useProgramAssignments() {
  const [assignments, setAssignments] = useState<ProgramAssignment[]>([]);
  const [programProgress, setProgramProgress] = useState<ProgramProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateProgress = (assignment: ProgramAssignment): ProgramProgress => {
    const completionPercentage = Math.round(
      (assignment.sessions_completed / assignment.total_sessions_planned) * 100
    );
    
    const today = new Date();
    const endDate = new Date(assignment.estimated_end_date);
    const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate expected completion based on time elapsed
    const startDate = new Date(assignment.start_date);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const expectedCompletion = Math.round((daysElapsed / totalDays) * 100);
    
    let status: ProgramProgress['status'] = 'on_track';
    if (daysUntilExpiry < 0) {
      status = 'expired';
    } else if (completionPercentage < expectedCompletion - 10) {
      status = 'behind_schedule';
    } else if (completionPercentage > expectedCompletion + 10) {
      status = 'ahead_of_schedule';
    }

    return {
      id: assignment.id,
      clientName: `Client ${assignment.client_id.slice(0, 8)}`, // Mock client name
      programTitle: `Program ${assignment.program_id}`,
      completionPercentage,
      daysUntilExpiry,
      status,
      sessionsCompleted: assignment.sessions_completed,
      totalSessions: assignment.total_sessions_planned,
      estimatedEndDate: assignment.estimated_end_date
    };
  };

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('program_assignments')
        .select('*')
        .is('actual_end_date', null)
        .order('estimated_end_date', { ascending: true });

      if (error) throw error;

      setAssignments(data || []);
      
      const progress = (data || []).map(calculateProgress);
      setProgramProgress(progress);
    } catch (error) {
      console.error('Error fetching program assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSessionsCompleted = async (assignmentId: string, sessionsCompleted: number) => {
    try {
      const { error } = await supabase
        .from('program_assignments')
        .update({ sessions_completed: sessionsCompleted })
        .eq('id', assignmentId);

      if (error) throw error;

      await fetchAssignments(); // Refresh data
    } catch (error) {
      console.error('Error updating sessions:', error);
    }
  };

  const createAssignment = async (assignment: Omit<ProgramAssignment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('program_assignments')
        .insert([assignment]);

      if (error) throw error;

      await fetchAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return {
    assignments,
    programProgress,
    loading,
    updateSessionsCompleted,
    createAssignment,
    refetch: fetchAssignments
  };
}
