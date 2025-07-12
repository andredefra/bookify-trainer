import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TrainerAvailabilityStatus {
  trainerId: string;
  status: 'available' | 'busy';
  currentSession?: {
    startTime: string;
    endTime: string;
  };
  nextAvailableTime?: string;
}

export function useTrainerRealTimeStatus() {
  const [statuses, setStatuses] = useState<Record<string, TrainerAvailabilityStatus>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentStatuses();
    subscribeToStatusChanges();
  }, []);

  const fetchCurrentStatuses = async () => {
    try {
      setLoading(true);
      
      // This would query calendar_events to determine current busy/available status
      // For now using mock data that shows real-time concept
      const now = new Date();
      const mockStatuses: Record<string, TrainerAvailabilityStatus> = {
        '1': {
          trainerId: '1',
          status: 'busy',
          currentSession: {
            startTime: '2025-01-12T14:00:00Z',
            endTime: '2025-01-12T15:00:00Z'
          },
          nextAvailableTime: '2025-01-12T15:00:00Z'
        },
        '2': {
          trainerId: '2', 
          status: 'available'
        },
        '3': {
          trainerId: '3',
          status: 'available'
        }
      };

      setStatuses(mockStatuses);
    } catch (error) {
      console.error('Error fetching trainer statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToStatusChanges = () => {
    // Real-time subscription to calendar_events changes
    const channel = supabase
      .channel('trainer-status-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'calendar_events'
        },
        () => {
          fetchCurrentStatuses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getTrainerStatus = (trainerId: string): TrainerAvailabilityStatus | null => {
    return statuses[trainerId] || null;
  };

  return {
    statuses,
    loading,
    getTrainerStatus,
    refetch: fetchCurrentStatuses
  };
}