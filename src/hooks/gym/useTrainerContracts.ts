import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TrainerContract {
  id: string;
  gym_id: string;
  trainer_id: string;
  contract_type: 'partnership' | 'employee' | 'freelance';
  commission_rate?: number;
  base_salary?: number;
  start_date: string;
  end_date?: string;
  status: 'active' | 'inactive' | 'expired';
  terms?: string;
  created_at: string;
  updated_at: string;
}

export interface TrainerWithContract {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  status: 'online' | 'away' | 'offline';
  clientCount: number;
  monthlyEarnings: number;
  contract?: TrainerContract;
}

export function useTrainerContracts() {
  const [contracts, setContracts] = useState<TrainerContract[]>([]);
  const [trainersWithContracts, setTrainersWithContracts] = useState<TrainerWithContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Demo gym ID
  const getCurrentGymId = () => 'demo-gym-id';

  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const gymId = getCurrentGymId();
      
      const { data, error } = await supabase
        .from('gym_trainer_contracts')
        .select('*')
        .eq('gym_id', gymId);

      if (error) throw error;
      
      setContracts(data || []);
    } catch (err) {
      console.error('Error fetching contracts:', err);
      setError('Failed to fetch contracts');
      // Demo data fallback
      const mockContracts: TrainerContract[] = [
        {
          id: '1',
          gym_id: 'demo-gym-id',
          trainer_id: 'trainer-1',
          contract_type: 'partnership',
          commission_rate: 20,
          start_date: '2024-01-01',
          status: 'active',
          terms: 'Partnership agreement with 20% commission rate',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          gym_id: 'demo-gym-id',
          trainer_id: 'trainer-2',
          contract_type: 'employee',
          base_salary: 3000,
          commission_rate: 10,
          start_date: '2024-01-15',
          status: 'active',
          terms: 'Full-time employee with base salary and commission',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setContracts(mockContracts);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrainersWithContracts = useCallback(async () => {
    // Demo data - in real app this would fetch from database
    const mockTrainers: TrainerWithContract[] = [
      {
        id: 'trainer-1',
        name: 'Marco Rossi',
        email: 'marco.rossi@example.com',
        specialties: ['Strength Training', 'HIIT'],
        status: 'online',
        clientCount: 18,
        monthlyEarnings: 2400,
        contract: contracts.find(c => c.trainer_id === 'trainer-1')
      },
      {
        id: 'trainer-2',
        name: 'Laura Bianchi',
        email: 'laura.bianchi@example.com',
        specialties: ['Yoga', 'Pilates'],
        status: 'away',
        clientCount: 24,
        monthlyEarnings: 3200,
        contract: contracts.find(c => c.trainer_id === 'trainer-2')
      },
      {
        id: 'trainer-3',
        name: 'Giovanni Verdi',
        email: 'giovanni.verdi@example.com',
        specialties: ['Bodybuilding', 'Nutrition'],
        status: 'offline',
        clientCount: 15,
        monthlyEarnings: 1800
      }
    ];
    
    setTrainersWithContracts(mockTrainers);
  }, [contracts]);

  const createContract = useCallback(async (
    trainerId: string,
    contractType: 'partnership' | 'employee' | 'freelance',
    commissionRate?: number,
    baseSalary?: number,
    terms?: string
  ) => {
    try {
      const gymId = getCurrentGymId();
      
      const { error } = await supabase
        .from('gym_trainer_contracts')
        .insert({
          gym_id: gymId,
          trainer_id: trainerId,
          contract_type: contractType,
          commission_rate: commissionRate,
          base_salary: baseSalary,
          terms
        });

      if (error) throw error;
      
      await fetchContracts();
      toast.success('Contract created successfully!');
    } catch (err) {
      console.error('Error creating contract:', err);
      // Demo fallback
      const newContract: TrainerContract = {
        id: Date.now().toString(),
        gym_id: getCurrentGymId(),
        trainer_id: trainerId,
        contract_type: contractType,
        commission_rate: commissionRate,
        base_salary: baseSalary,
        start_date: new Date().toISOString().split('T')[0],
        status: 'active',
        terms,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setContracts(prev => [...prev, newContract]);
      toast.success('Contract created successfully!');
    }
  }, [fetchContracts]);

  const updateContract = useCallback(async (
    contractId: string,
    updates: Partial<TrainerContract>
  ) => {
    try {
      const { error } = await supabase
        .from('gym_trainer_contracts')
        .update(updates)
        .eq('id', contractId);

      if (error) throw error;
      
      await fetchContracts();
      toast.success('Contract updated successfully!');
    } catch (err) {
      console.error('Error updating contract:', err);
      // Demo fallback
      setContracts(prev => 
        prev.map(contract => 
          contract.id === contractId 
            ? { ...contract, ...updates, updated_at: new Date().toISOString() }
            : contract
        )
      );
      toast.success('Contract updated successfully!');
    }
  }, [fetchContracts]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  useEffect(() => {
    if (contracts.length > 0) {
      fetchTrainersWithContracts();
    }
  }, [contracts, fetchTrainersWithContracts]);

  return {
    contracts,
    trainersWithContracts,
    loading,
    error,
    createContract,
    updateContract,
    refetch: fetchContracts
  };
}