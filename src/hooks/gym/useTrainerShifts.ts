import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TrainerShift {
  id: string;
  gym_id: string;
  trainer_id: string;
  start_datetime: string;
  end_datetime: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  shift_type: 'regular' | 'overtime' | 'substitute';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TrainerAvailability {
  id: string;
  trainer_id: string;
  gym_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useTrainerShifts() {
  const [shifts, setShifts] = useState<TrainerShift[]>([]);
  const [availability, setAvailability] = useState<TrainerAvailability[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShifts = async () => {
    try {
      const { data, error } = await supabase
        .from('trainer_shifts')
        .select('*')
        .order('start_datetime', { ascending: true });

      if (error) throw error;
      setShifts((data as TrainerShift[]) || []);
    } catch (error) {
      console.error('Error fetching trainer shifts:', error);
      // Use demo data for development
      const demoShifts: TrainerShift[] = [
        {
          id: '1',
          gym_id: '11111111-1111-1111-1111-111111111111',
          trainer_id: '1',
          start_datetime: '2025-01-20T09:00:00Z',
          end_datetime: '2025-01-20T17:00:00Z',
          status: 'scheduled',
          shift_type: 'regular',
          notes: 'Morning to evening shift',
          created_at: '2025-01-14T00:00:00Z',
          updated_at: '2025-01-14T00:00:00Z'
        },
        {
          id: '2',
          gym_id: '11111111-1111-1111-1111-111111111111',
          trainer_id: '2',
          start_datetime: '2025-01-20T14:00:00Z',
          end_datetime: '2025-01-20T22:00:00Z',
          status: 'scheduled',
          shift_type: 'regular',
          notes: 'Afternoon to evening shift',
          created_at: '2025-01-14T00:00:00Z',
          updated_at: '2025-01-14T00:00:00Z'
        },
        {
          id: '3',
          gym_id: '11111111-1111-1111-1111-111111111111',
          trainer_id: '3',
          start_datetime: '2025-01-20T06:00:00Z',
          end_datetime: '2025-01-20T14:00:00Z',
          status: 'scheduled',
          shift_type: 'regular',
          notes: 'Early morning shift',
          created_at: '2025-01-14T00:00:00Z',
          updated_at: '2025-01-14T00:00:00Z'
        }
      ];
      setShifts(demoShifts);
    }
  };

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('trainer_availability')
        .select('*')
        .order('day_of_week', { ascending: true });

      if (error) throw error;
      setAvailability((data as TrainerAvailability[]) || []);
    } catch (error) {
      console.error('Error fetching trainer availability:', error);
      // Use demo data for development
      const demoAvailability: TrainerAvailability[] = [
        {
          id: '1',
          trainer_id: '1',
          gym_id: '11111111-1111-1111-1111-111111111111',
          day_of_week: 1, // Monday
          start_time: '09:00:00',
          end_time: '17:00:00',
          is_active: true,
          created_at: '2025-01-14T00:00:00Z',
          updated_at: '2025-01-14T00:00:00Z'
        },
        {
          id: '2',
          trainer_id: '2',
          gym_id: '11111111-1111-1111-1111-111111111111',
          day_of_week: 1, // Monday
          start_time: '14:00:00',
          end_time: '22:00:00',
          is_active: true,
          created_at: '2025-01-14T00:00:00Z',
          updated_at: '2025-01-14T00:00:00Z'
        }
      ];
      setAvailability(demoAvailability);
    }
  };

  const createShift = async (shift: Omit<TrainerShift, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('trainer_shifts')
        .insert([shift])
        .select()
        .single();

      if (error) throw error;
      await fetchShifts();
      return data;
    } catch (error) {
      console.error('Error creating shift:', error);
      throw error;
    }
  };

  const updateShift = async (id: string, updates: Partial<TrainerShift>) => {
    try {
      const { data, error } = await supabase
        .from('trainer_shifts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchShifts();
      return data;
    } catch (error) {
      console.error('Error updating shift:', error);
      throw error;
    }
  };

  const deleteShift = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainer_shifts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchShifts();
    } catch (error) {
      console.error('Error deleting shift:', error);
      throw error;
    }
  };

  const updateAvailability = async (trainerId: string, availabilityData: Omit<TrainerAvailability, 'id' | 'created_at' | 'updated_at'>[]) => {
    try {
      // First delete existing availability for the trainer
      await supabase
        .from('trainer_availability')
        .delete()
        .eq('trainer_id', trainerId);

      // Then insert new availability
      const { data, error } = await supabase
        .from('trainer_availability')
        .insert(availabilityData)
        .select();

      if (error) throw error;
      await fetchAvailability();
      return data;
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchShifts(), fetchAvailability()]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Real-time subscriptions
  useEffect(() => {
    const shiftsChannel = supabase
      .channel('trainer-shifts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trainer_shifts'
        },
        () => {
          fetchShifts();
        }
      )
      .subscribe();

    const availabilityChannel = supabase
      .channel('trainer-availability-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trainer_availability'
        },
        () => {
          fetchAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(shiftsChannel);
      supabase.removeChannel(availabilityChannel);
    };
  }, []);

  return {
    shifts,
    availability,
    loading,
    createShift,
    updateShift,
    deleteShift,
    updateAvailability,
    refetch: () => {
      fetchShifts();
      fetchAvailability();
    }
  };
}