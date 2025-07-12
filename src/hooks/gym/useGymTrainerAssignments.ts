import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useGymNotifications } from './useGymNotifications';

export interface GymTrainerAssignment {
  id: string;
  gym_id: string;
  trainer_id: string;
  client_id: string;
  assigned_at: string;
  status: 'active' | 'inactive' | 'pending';
  assignment_type: 'standard' | 'premium' | 'trial';
  notes?: string;
  trainer_name?: string;
  client_name?: string;
}

export interface TrainerOption {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'away' | 'offline';
  activeClients: number;
}

export interface ClientOption {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export function useGymTrainerAssignments() {
  const [assignments, setAssignments] = useState<GymTrainerAssignment[]>([]);
  const [availableTrainers, setAvailableTrainers] = useState<TrainerOption[]>([]);
  const [availableClients, setAvailableClients] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { createNotification } = useGymNotifications();

  useEffect(() => {
    fetchAssignments();
    fetchAvailableTrainers();
    fetchAvailableClients();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      
      // Mock data for demo - replace with real Supabase query
      const mockAssignments: GymTrainerAssignment[] = [
        {
          id: '1',
          gym_id: 'gym-1',
          trainer_id: '550e8400-e29b-41d4-a716-446655440001',
          client_id: 'client-1',
          assigned_at: '2024-01-15T10:00:00Z',
          status: 'active',
          assignment_type: 'premium',
          notes: 'Cliente premium assegnato per programma personalizzato',
          trainer_name: 'Alex Johnson',
          client_name: 'Marco Rossi'
        },
        {
          id: '2',
          gym_id: 'gym-1',
          trainer_id: '550e8400-e29b-41d4-a716-446655440002',
          client_id: 'client-2',
          assigned_at: '2024-01-20T14:30:00Z',
          status: 'active',
          assignment_type: 'standard',
          trainer_name: 'Emma Davis',
          client_name: 'Laura Bianchi'
        }
      ];

      setAssignments(mockAssignments);
      setError(null);
    } catch (err) {
      setError('Errore nel caricamento delle assegnazioni');
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTrainers = async () => {
    try {
      // Mock data - replace with real query
      const mockTrainers: TrainerOption[] = [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Alex Johnson',
          email: 'alex.johnson@email.com',
          status: 'online',
          activeClients: 15
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          name: 'Emma Davis',
          email: 'emma.davis@email.com',
          status: 'away',
          activeClients: 12
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          name: 'Marcus Thompson',
          email: 'marcus.thompson@email.com',
          status: 'offline',
          activeClients: 8
        }
      ];

      setAvailableTrainers(mockTrainers);
    } catch (err) {
      console.error('Error fetching trainers:', err);
    }
  };

  const fetchAvailableClients = async () => {
    try {
      // Mock data - replace with real query
      const mockClients: ClientOption[] = [
        {
          id: 'client-3',
          name: 'Giuseppe Verdi',
          email: 'giuseppe.verdi@email.com',
          status: 'active'
        },
        {
          id: 'client-4',
          name: 'Francesca Neri',
          email: 'francesca.neri@email.com',
          status: 'active'
        },
        {
          id: 'client-5',
          name: 'Roberto Blu',
          email: 'roberto.blu@email.com',
          status: 'inactive'
        }
      ];

      setAvailableClients(mockClients);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const createAssignment = async (
    trainerId: string,
    clientId: string,
    assignmentType: 'standard' | 'premium' | 'trial',
    notes?: string
  ): Promise<void> => {
    try {
      // For demo, simulate API call
      const newAssignment: GymTrainerAssignment = {
        id: Date.now().toString(),
        gym_id: 'gym-1',
        trainer_id: trainerId,
        client_id: clientId,
        assigned_at: new Date().toISOString(),
        status: 'active',
        assignment_type: assignmentType,
        notes,
        trainer_name: availableTrainers.find(t => t.id === trainerId)?.name,
        client_name: availableClients.find(c => c.id === clientId)?.name
      };

      setAssignments(prev => [...prev, newAssignment]);
      
      // Create notifications for trainer and client
      await createNotifications(trainerId, clientId, newAssignment.id);
      
      // Create gym notification using the notification system
      const trainer = availableTrainers.find(t => t.id === trainerId);
      const client = availableClients.find(c => c.id === clientId);
      
      if (trainer && client) {
        await createNotification(
          trainerId,
          'trainer',
          'trainer_assigned',
          'New Client Assignment',
          `You have been assigned to client ${client.name} (${assignmentType} plan)`,
          newAssignment.id
        );
      }
      
      toast.success('Trainer assegnato con successo');
    } catch (err) {
      toast.error('Errore nell\'assegnazione del trainer');
      throw err;
    }
  };

  const createNotifications = async (trainerId: string, clientId: string, assignmentId: string) => {
    try {
      // Mock notification creation - replace with real Supabase queries
      console.log('Creating notifications for assignment:', assignmentId);
      
      // Notification for trainer
      const trainerNotification = {
        gym_id: 'gym-1',
        recipient_id: trainerId,
        recipient_type: 'trainer',
        type: 'client_assigned',
        title: 'Nuovo Cliente Assegnato',
        message: 'Ti è stato assegnato un nuovo cliente dalla palestra',
        related_assignment_id: assignmentId
      };

      // Notification for client
      const clientNotification = {
        gym_id: 'gym-1',
        recipient_id: clientId,
        recipient_type: 'client',
        type: 'trainer_assigned',
        title: 'Personal Trainer Assegnato',
        message: 'La palestra ti ha assegnato un personal trainer',
        related_assignment_id: assignmentId
      };

      console.log('Notifications created:', { trainerNotification, clientNotification });
    } catch (err) {
      console.error('Error creating notifications:', err);
    }
  };

  const updateAssignmentStatus = async (assignmentId: string, status: 'active' | 'inactive' | 'pending') => {
    try {
      setAssignments(prev => 
        prev.map(assignment => 
          assignment.id === assignmentId 
            ? { ...assignment, status }
            : assignment
        )
      );
      
      toast.success('Status aggiornato');
    } catch (err) {
      toast.error('Errore nell\'aggiornamento dello status');
      throw err;
    }
  };

  return {
    assignments,
    availableTrainers,
    availableClients,
    loading,
    error,
    createAssignment,
    updateAssignmentStatus,
    refetch: fetchAssignments
  };
}