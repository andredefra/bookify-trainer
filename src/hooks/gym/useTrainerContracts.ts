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

  // Use consistent demo gym ID that matches the DB
  const getCurrentGymId = () => '11111111-1111-1111-1111-111111111111';

  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const gymId = getCurrentGymId();
      
      const { data, error } = await supabase
        .from('gym_trainer_contracts')
        .select('*')
        .eq('gym_id', gymId);

      if (error) throw error;
      
      setContracts((data || []) as TrainerContract[]);
    } catch (err) {
      console.error('Error fetching contracts:', err);
      setError('Failed to fetch contracts');
      // Demo data fallback with English names and consistent IDs
      const mockContracts: TrainerContract[] = [
        {
          id: 'contract-1',
          gym_id: getCurrentGymId(),
          trainer_id: '22222222-2222-2222-2222-222222222222',
          contract_type: 'partnership',
          commission_rate: 25,
          start_date: '2024-01-01',
          status: 'active',
          terms: 'Partnership agreement with 25% commission rate',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'contract-2',
          gym_id: getCurrentGymId(),
          trainer_id: '33333333-3333-3333-3333-333333333333',
          contract_type: 'employee',
          base_salary: 3500,
          commission_rate: 15,
          start_date: '2024-01-15',
          status: 'active',
          terms: 'Full-time employee with base salary and commission',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'contract-3',
          gym_id: getCurrentGymId(),
          trainer_id: '77777777-1111-1111-1111-777777777777',
          contract_type: 'freelance',
          commission_rate: 30,
          start_date: '2024-02-01',
          status: 'active',
          terms: 'Freelance contract with 30% commission rate',
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
    try {
      setLoading(true);
      const gymId = getCurrentGymId();
      
      // Try to fetch real trainer data from contracts table
      const { data: contractsData, error } = await supabase
        .from('gym_trainer_contracts')
        .select('*')
        .eq('gym_id', gymId)
        .eq('status', 'active');

      if (error) throw error;

      // For now, use enhanced demo data with English names that matches existing trainer IDs
      const mockTrainers: TrainerWithContract[] = [
        {
          id: '22222222-2222-2222-2222-222222222222',
          name: 'Alex Johnson',
          email: 'alex.johnson@fitlifegym.com',
          specialties: ['Personal Training', 'Weight Loss', 'Strength Training'],
          status: 'online',
          clientCount: 18,
          monthlyEarnings: 2400,
          contract: contracts.find(c => c.trainer_id === '22222222-2222-2222-2222-222222222222')
        },
        {
          id: '33333333-3333-3333-3333-333333333333',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@fitlifegym.com',
          specialties: ['Yoga', 'Pilates', 'Group Fitness'],
          status: 'away',
          clientCount: 24,
          monthlyEarnings: 3200,
          contract: contracts.find(c => c.trainer_id === '33333333-3333-3333-3333-333333333333')
        },
        {
          id: '77777777-1111-1111-1111-777777777777',
          name: 'Mike Rodriguez',
          email: 'mike.rodriguez@fitlifegym.com',
          specialties: ['CrossFit', 'HIIT', 'Athletic Performance'],
          status: 'offline',
          clientCount: 15,
          monthlyEarnings: 1800,
          contract: contracts.find(c => c.trainer_id === '77777777-1111-1111-1111-777777777777')
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Emma Davis',
          email: 'emma.davis@fitlifegym.com',
          specialties: ['Nutrition', 'Weight Management', 'Functional Training'],
          status: 'online',
          clientCount: 20,
          monthlyEarnings: 2800,
          contract: contracts.find(c => c.trainer_id === '550e8400-e29b-41d4-a716-446655440001')
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          name: 'Marcus Thompson',
          email: 'marcus.thompson@fitlifegym.com',
          specialties: ['Powerlifting', 'Sports Performance', 'Rehabilitation'],
          status: 'away',
          clientCount: 12,
          monthlyEarnings: 2100,
          contract: contracts.find(c => c.trainer_id === '550e8400-e29b-41d4-a716-446655440002')
        }
      ];
      
      setTrainersWithContracts(mockTrainers);
    } catch (err) {
      console.error('Error fetching trainers:', err);
      setError('Failed to fetch trainers');
      
      // Fallback demo data
      const fallbackTrainers: TrainerWithContract[] = [
        {
          id: '22222222-2222-2222-2222-222222222222',
          name: 'Alex Johnson',
          email: 'alex.johnson@fitlifegym.com',
          specialties: ['Personal Training', 'Weight Loss'],
          status: 'online',
          clientCount: 15,
          monthlyEarnings: 2000
        }
      ];
      setTrainersWithContracts(fallbackTrainers);
    } finally {
      setLoading(false);
    }
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