import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GymTrainerData {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'away' | 'offline';
  activeClients: number;
  totalSessions: number;
  rating: number;
  plan: 'freemium' | 'essential' | 'pro';
  joinDate: string;
}

export function useGymTrainersData() {
  const [trainers, setTrainers] = useState<GymTrainerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      
      // For now, using mock data but prepared for real database integration
      // This would query trainer_client_relationships, calendar_events, etc.
      const mockData: GymTrainerData[] = [
        {
          id: '1',
          name: 'Marco Rossi',
          email: 'marco.rossi@email.com',
          status: 'online',
          activeClients: 15,
          totalSessions: 120,
          rating: 4.9,
          plan: 'pro',
          joinDate: '2024-01-15'
        },
        {
          id: '2', 
          name: 'Laura Bianchi',
          email: 'laura.bianchi@email.com',
          status: 'away',
          activeClients: 12,
          totalSessions: 95,
          rating: 4.7,
          plan: 'essential',
          joinDate: '2024-02-20'
        },
        {
          id: '3',
          name: 'Giovanni Verdi',
          email: 'giovanni.verdi@email.com', 
          status: 'offline',
          activeClients: 8,
          totalSessions: 60,
          rating: 4.5,
          plan: 'freemium',
          joinDate: '2024-03-10'
        }
      ];

      setTrainers(mockData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch trainers data');
      console.error('Error fetching trainers:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    trainers,
    loading,
    error,
    refetch: fetchTrainers
  };
}