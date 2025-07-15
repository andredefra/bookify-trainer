import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GymSession {
  id: string;
  title: string;
  description: string;
  session_type: string;
  difficulty_level: string;
  duration_minutes: number;
  max_participants: number;
  start_datetime: string;
  end_datetime: string;
  assigned_trainer_name?: string;
  location?: string;
  status: string;
  available_spots: number;
  is_booked: boolean;
}

export function useGymSessions(gymId?: string) {
  const [sessions, setSessions] = useState<GymSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gymId) {
      fetchGymSessions();
    } else {
      loadDemoSessions();
    }
  }, [gymId]);

  const loadDemoSessions = () => {
    const demoSessions: GymSession[] = [
      {
        id: 'demo-session-1',
        title: 'Morning Yoga',
        description: 'Start your day with energizing yoga flow',
        session_type: 'yoga',
        difficulty_level: 'beginner',
        duration_minutes: 60,
        max_participants: 15,
        start_datetime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        end_datetime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
        assigned_trainer_name: 'Elena Rossi',
        location: 'Studio A',
        status: 'scheduled',
        available_spots: 8,
        is_booked: false
      },
      {
        id: 'demo-session-2',
        title: 'HIIT Blast',
        description: 'High-intensity interval training for maximum results',
        session_type: 'hiit',
        difficulty_level: 'advanced',
        duration_minutes: 45,
        max_participants: 12,
        start_datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
        end_datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
        assigned_trainer_name: 'Marco Bianchi',
        location: 'Main Gym',
        status: 'scheduled',
        available_spots: 3,
        is_booked: false
      },
      {
        id: 'demo-session-3',
        title: 'Pilates Core',
        description: 'Strengthen your core with focused pilates exercises',
        session_type: 'pilates',
        difficulty_level: 'intermediate',
        duration_minutes: 50,
        max_participants: 10,
        start_datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        end_datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString(),
        assigned_trainer_name: 'Sofia Verdi',
        location: 'Studio B',
        status: 'scheduled',
        available_spots: 5,
        is_booked: true
      }
    ];

    setSessions(demoSessions);
    setLoading(false);
  };

  const fetchGymSessions = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        loadDemoSessions();
        return;
      }

      // Get upcoming scheduled sessions for the gym
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      const { data: sessionsData, error: sessionsError } = await supabase
        .from('gym_session_schedules')
        .select(`
          id,
          start_datetime,
          end_datetime,
          status,
          actual_participants,
          gym_group_sessions!inner(
            id,
            title,
            description,
            session_type,
            difficulty_level,
            duration_minutes,
            max_participants,
            location,
            gym_id
          )
        `)
        .eq('gym_group_sessions.gym_id', gymId)
        .eq('status', 'scheduled')
        .gte('start_datetime', tomorrow.toISOString())
        .lte('start_datetime', nextWeek.toISOString())
        .order('start_datetime', { ascending: true });

      if (sessionsError) {
        console.error('Error fetching sessions:', sessionsError);
        loadDemoSessions();
        return;
      }

      // Check which sessions the user has booked
      const { data: bookingsData } = await supabase
        .from('gym_session_bookings')
        .select('session_schedule_id')
        .eq('participant_id', user.id)
        .eq('booking_status', 'confirmed');

      const bookedSessionIds = new Set(bookingsData?.map(b => b.session_schedule_id) || []);

      const mappedSessions: GymSession[] = sessionsData?.map(session => ({
        id: session.id,
        title: session.gym_group_sessions.title,
        description: session.gym_group_sessions.description || '',
        session_type: session.gym_group_sessions.session_type,
        difficulty_level: session.gym_group_sessions.difficulty_level,
        duration_minutes: session.gym_group_sessions.duration_minutes,
        max_participants: session.gym_group_sessions.max_participants,
        start_datetime: session.start_datetime,
        end_datetime: session.end_datetime,
        location: session.gym_group_sessions.location,
        status: session.status,
        available_spots: Math.max(0, session.gym_group_sessions.max_participants - session.actual_participants),
        is_booked: bookedSessionIds.has(session.id)
      })) || [];

      setSessions(mappedSessions);
    } catch (err) {
      console.error('Error in fetchGymSessions:', err);
      setError(err instanceof Error ? err.message : 'Error fetching sessions');
      loadDemoSessions();
    } finally {
      setLoading(false);
    }
  };

  const bookSession = async (sessionId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('gym_session_bookings')
        .insert({
          session_schedule_id: sessionId,
          participant_id: user.id,
          booking_status: 'confirmed'
        });

      if (error) throw error;

      // Update local state
      setSessions(prev => prev.map(session => 
        session.id === sessionId 
          ? { ...session, is_booked: true, available_spots: Math.max(0, session.available_spots - 1) }
          : session
      ));

      return true;
    } catch (err) {
      console.error('Error booking session:', err);
      throw err;
    }
  };

  const cancelBooking = async (sessionId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('gym_session_bookings')
        .delete()
        .eq('session_schedule_id', sessionId)
        .eq('participant_id', user.id);

      if (error) throw error;

      // Update local state
      setSessions(prev => prev.map(session => 
        session.id === sessionId 
          ? { ...session, is_booked: false, available_spots: session.available_spots + 1 }
          : session
      ));

      return true;
    } catch (err) {
      console.error('Error canceling booking:', err);
      throw err;
    }
  };

  return {
    sessions,
    loading,
    error,
    bookSession,
    cancelBooking,
    refetch: fetchGymSessions
  };
}