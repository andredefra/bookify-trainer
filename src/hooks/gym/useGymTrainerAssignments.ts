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
  client_email?: string;
}

export interface TrainerOption {
  id: string;
  name: string;
  email: string;
  specialties?: string[];
}

export interface ClientOption {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membership_status: string;
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
      setError(null);

      // Use consistent demo data with proper UUIDs
      const mockAssignments: GymTrainerAssignment[] = [
        {
          id: '00000000-0000-0000-0000-000000000004',
          gym_id: '11111111-1111-1111-1111-111111111111',
          trainer_id: '22222222-2222-2222-2222-222222222222',
          client_id: '44444444-4444-4444-4444-444444444444',
          assigned_at: '2025-01-01T10:00:00Z',
          status: 'active',
          assignment_type: 'premium',
          notes: 'Premium client with personal training focus',
          trainer_name: 'Alex Johnson',
          client_name: 'Maria Rodriguez',
          client_email: 'maria@example.com'
        },
        {
          id: '00000000-0000-0000-0000-000000000005',
          gym_id: '11111111-1111-1111-1111-111111111111',
          trainer_id: '22222222-2222-2222-2222-222222222222',
          client_id: '55555555-5555-5555-5555-555555555555',
          assigned_at: '2025-01-05T14:00:00Z',
          status: 'active',
          assignment_type: 'standard',
          notes: 'Regular personal training sessions',
          trainer_name: 'Alex Johnson',
          client_name: 'John Smith',
          client_email: 'john@example.com'
        },
        {
          id: '00000000-0000-0000-0000-000000000006',
          gym_id: '11111111-1111-1111-1111-111111111111',
          trainer_id: '33333333-3333-3333-3333-333333333333',
          client_id: '66666666-6666-6666-6666-666666666666',
          assigned_at: '2025-01-10T09:00:00Z',
          status: 'active',
          assignment_type: 'trial',
          notes: 'Trial period for new member',
          trainer_name: 'Sarah Wilson',
          client_name: 'Lisa Brown',
          client_email: 'lisa@example.com'
        }
      ];

      setAssignments(mockAssignments);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError('Failed to fetch trainer assignments');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTrainers = async () => {
    try {
      // Use consistent demo trainers
      const mockTrainers: TrainerOption[] = [
        {
          id: '22222222-2222-2222-2222-222222222222',
          name: 'Alex Johnson',
          email: 'alex@fitlifegym.com',
          specialties: ['Personal Training', 'Weight Loss', 'Strength Training']
        },
        {
          id: '33333333-3333-3333-3333-333333333333',
          name: 'Sarah Wilson',
          email: 'sarah@fitlifegym.com',
          specialties: ['Yoga', 'Pilates', 'Group Fitness']
        },
        {
          id: '77777777-1111-1111-1111-777777777777',
          name: 'Mike Rodriguez',
          email: 'mike@fitlifegym.com',
          specialties: ['CrossFit', 'HIIT', 'Athletic Performance']
        }
      ];

      setAvailableTrainers(mockTrainers);
    } catch (err) {
      console.error('Error fetching trainers:', err);
      setError('Failed to fetch available trainers');
    }
  };

  const fetchAvailableClients = async () => {
    try {
      // Use consistent demo clients
      const mockClients: ClientOption[] = [
        {
          id: '44444444-4444-4444-4444-444444444444',
          name: 'Maria Rodriguez',
          email: 'maria@example.com',
          phone: '+1 (555) 123-4567',
          membership_status: 'active'
        },
        {
          id: '55555555-5555-5555-5555-555555555555',
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+1 (555) 234-5678',
          membership_status: 'active'
        },
        {
          id: '66666666-6666-6666-6666-666666666666',
          name: 'Lisa Brown',
          email: 'lisa@example.com',
          phone: '+1 (555) 345-6789',
          membership_status: 'trial'
        },
        {
          id: '77777777-8888-8888-8888-777777777777',
          name: 'David Wilson',
          email: 'david@example.com',
          phone: '+1 (555) 456-7890',
          membership_status: 'pending'
        }
      ];

      setAvailableClients(mockClients);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to fetch available clients');
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
      
      toast.success('Trainer assigned successfully');
    } catch (err) {
      toast.error('Error assigning trainer');
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
        title: 'New Client Assigned',
        message: 'You have been assigned a new client by the gym',
        related_assignment_id: assignmentId
      };

      // Notification for client
      const clientNotification = {
        gym_id: 'gym-1',
        recipient_id: clientId,
        recipient_type: 'client',
        type: 'trainer_assigned',
        title: 'Personal Trainer Assigned',
        message: 'The gym has assigned you a personal trainer',
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
      
      toast.success('Status updated');
    } catch (err) {
      toast.error('Error updating status');
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