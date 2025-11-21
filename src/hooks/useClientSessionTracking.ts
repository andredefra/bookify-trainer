import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { SetData } from '@/data/training/types';

interface ExerciseProgressData {
  exercise_id: string;
  sets: SetData[];
  completed: boolean;
  completedDate?: string;
}

interface SessionProgressData {
  client_id: string;
  program_id: string;
  session_id: string;
  exercise_data: ExerciseProgressData[];
  session_completed: boolean;
  completed_by: 'client' | 'trainer';
}

export function useClientSessionTracking() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const saveClientSessionData = useCallback(async (
    clientId: string,
    programId: string,
    sessionId: string,
    exerciseData: ExerciseProgressData[],
    sessionCompleted: boolean = false
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('client_training_session_progress')
        .upsert({
          client_id: clientId,
          program_id: programId,
          session_id: sessionId,
          exercise_data: exerciseData as any,
          session_completed: sessionCompleted,
          completed_by: 'trainer',
        }, {
          onConflict: 'client_id,program_id,session_id'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Session data saved successfully",
      });

      return data;
    } catch (error) {
      console.error('Error saving session data:', error);
      toast({
        title: "Error",
        description: "Failed to save session data",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getClientSessionData = useCallback(async (
    clientId: string,
    programId: string,
    sessionId: string
  ): Promise<ExerciseProgressData[] | null> => {
    try {
      const { data, error } = await supabase
        .from('client_training_session_progress')
        .select('exercise_data, session_completed, completed_by, updated_at')
        .eq('client_id', clientId)
        .eq('program_id', programId)
        .eq('session_id', sessionId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      return (data?.exercise_data as unknown as ExerciseProgressData[]) || null;
    } catch (error) {
      console.error('Error fetching session data:', error);
      return null;
    }
  }, []);

  const getAllClientProgress = useCallback(async (
    clientId: string,
    programId: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('client_training_session_progress')
        .select('*')
        .eq('client_id', clientId)
        .eq('program_id', programId);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching all client progress:', error);
      return [];
    }
  }, []);

  return {
    saveClientSessionData,
    getClientSessionData,
    getAllClientProgress,
    loading,
  };
}
