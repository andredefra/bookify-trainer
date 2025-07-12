import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GymGroupSession {
  id: string;
  gym_id: string;
  title: string;
  description?: string;
  max_participants: number;
  duration_minutes: number;
  price_per_participant: number;
  session_type: string;
  difficulty_level: string;
  requirements?: string;
  equipment_needed?: string;
  location?: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
  status: 'scheduled' | 'active' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface GymSessionSchedule {
  id: string;
  gym_group_session_id: string;
  start_datetime: string;
  end_datetime: string;
  assigned_trainer_id?: string;
  actual_participants: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SessionWithSchedules extends GymGroupSession {
  schedules: GymSessionSchedule[];
  upcoming_count: number;
  total_participants: number;
}

export function useGymGroupSessions() {
  const [sessions, setSessions] = useState<SessionWithSchedules[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use consistent demo gym ID
  const getCurrentGymId = () => '11111111-1111-1111-1111-111111111111';

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const gymId = getCurrentGymId();
      
      // Fetch group sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('gym_group_sessions')
        .select('*')
        .eq('gym_id', gymId)
        .order('created_at', { ascending: false });

      if (sessionsError) throw sessionsError;

      // Fetch schedules for each session
      const sessionsWithSchedules: SessionWithSchedules[] = [];
      
      for (const session of sessionsData || []) {
        const { data: schedulesData, error: schedulesError } = await supabase
          .from('gym_session_schedules')
          .select('*')
          .eq('gym_group_session_id', session.id)
          .order('start_datetime', { ascending: true });

        if (schedulesError) {
          console.error('Error fetching schedules:', schedulesError);
        }

        const schedules = (schedulesData || []) as GymSessionSchedule[];
        const upcomingCount = schedules.filter(s => 
          new Date(s.start_datetime) > new Date() && s.status === 'scheduled'
        ).length;
        
        const totalParticipants = schedules.reduce((sum, s) => sum + s.actual_participants, 0);

        sessionsWithSchedules.push({
          ...(session as GymGroupSession),
          schedules,
          upcoming_count: upcomingCount,
          total_participants: totalParticipants
        });
      }

      setSessions(sessionsWithSchedules);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError('Failed to fetch sessions');
      
      // Demo data fallback
      const mockSessions: SessionWithSchedules[] = [
        {
          id: '1',
          gym_id: getCurrentGymId(),
          title: 'Morning HIIT Blast',
          description: 'High-intensity interval training to start your day with energy',
          max_participants: 15,
          duration_minutes: 45,
          price_per_participant: 25.00,
          session_type: 'hiit',
          difficulty_level: 'intermediate',
          requirements: 'Basic fitness level required',
          equipment_needed: 'Kettlebells, resistance bands',
          location: 'Studio A',
          is_recurring: true,
          recurrence_pattern: 'weekly',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          schedules: [],
          upcoming_count: 5,
          total_participants: 42
        },
        {
          id: '2',
          gym_id: getCurrentGymId(),
          title: 'Yoga Flow',
          description: 'Relaxing yoga session focusing on flexibility and mindfulness',
          max_participants: 20,
          duration_minutes: 60,
          price_per_participant: 20.00,
          session_type: 'yoga',
          difficulty_level: 'beginner',
          requirements: 'No experience required',
          equipment_needed: 'Yoga mats, blocks',
          location: 'Studio B',
          is_recurring: true,
          recurrence_pattern: 'weekly',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          schedules: [],
          upcoming_count: 3,
          total_participants: 28
        }
      ];
      setSessions(mockSessions);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSession = useCallback(async (sessionData: Omit<GymGroupSession, 'id' | 'gym_id' | 'created_at' | 'updated_at'>) => {
    try {
      const gymId = getCurrentGymId();
      
      const { error } = await supabase
        .from('gym_group_sessions')
        .insert({
          ...sessionData,
          gym_id: gymId
        });

      if (error) throw error;
      
      await fetchSessions();
      toast.success('Group session created successfully!');
    } catch (err) {
      console.error('Error creating session:', err);
      toast.error('Failed to create session');
    }
  }, [fetchSessions]);

  const updateSession = useCallback(async (sessionId: string, updates: Partial<GymGroupSession>) => {
    try {
      const { error } = await supabase
        .from('gym_group_sessions')
        .update(updates)
        .eq('id', sessionId);

      if (error) throw error;
      
      await fetchSessions();
      toast.success('Session updated successfully!');
    } catch (err) {
      console.error('Error updating session:', err);
      toast.error('Failed to update session');
    }
  }, [fetchSessions]);

  const scheduleSession = useCallback(async (
    sessionId: string, 
    startDateTime: string, 
    endDateTime: string,
    trainerId?: string
  ) => {
    try {
      const { error } = await supabase
        .from('gym_session_schedules')
        .insert({
          gym_group_session_id: sessionId,
          start_datetime: startDateTime,
          end_datetime: endDateTime,
          assigned_trainer_id: trainerId
        });

      if (error) throw error;
      
      await fetchSessions();
      toast.success('Session scheduled successfully!');
    } catch (err) {
      console.error('Error scheduling session:', err);
      toast.error('Failed to schedule session');
    }
  }, [fetchSessions]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    loading,
    error,
    createSession,
    updateSession,
    scheduleSession,
    refetch: fetchSessions
  };
}