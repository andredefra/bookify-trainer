import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useGymPackages } from './useGymPackages';

export interface SessionParticipant {
  id: string;
  session_schedule_id: string;
  participant_id: string;
  package_assignment_id?: string;
  payment_status: 'included' | 'paid' | 'pending';
  attendance_status: 'registered' | 'checked_in' | 'checked_out' | 'no_show';
  registered_at: string;
  notes?: string;
}

export interface BookingValidation {
  canBook: boolean;
  reason?: string;
  packagesAvailable: Array<{
    id: string;
    title: string;
    sessions_remaining: number;
    expires_at?: string;
  }>;
}

export function useSessionBooking() {
  const [loading, setLoading] = useState(false);
  const { assignments, fetchAssignments } = useGymPackages();

  // Validate if client can book a session
  const validateBooking = useCallback(async (
    clientId: string,
    sessionScheduleId: string
  ): Promise<BookingValidation> => {
    try {
      // Check if already registered
      const { data: existingBooking } = await supabase
        .from('gym_session_participants')
        .select('id')
        .eq('session_schedule_id', sessionScheduleId)
        .eq('participant_id', clientId)
        .single();

      if (existingBooking) {
        return {
          canBook: false,
          reason: 'Already registered for this session',
          packagesAvailable: []
        };
      }

      // Get active packages for client
      const activePackages = assignments.filter(assignment => 
        assignment.client_id === clientId &&
        assignment.status === 'active' &&
        (assignment.sessions_total === null || assignment.sessions_used < assignment.sessions_total) &&
        (!assignment.end_date || new Date(assignment.end_date) > new Date())
      );

      const packagesAvailable = activePackages.map(pkg => ({
        id: pkg.id,
        title: pkg.package?.title || 'Unknown Package',
        sessions_remaining: pkg.sessions_total ? pkg.sessions_total - pkg.sessions_used : Infinity,
        expires_at: pkg.end_date
      }));

      if (packagesAvailable.length === 0) {
        return {
          canBook: false,
          reason: 'No active packages with available sessions',
          packagesAvailable: []
        };
      }

      return {
        canBook: true,
        packagesAvailable
      };
    } catch (error) {
      console.error('Error validating booking:', error);
      return {
        canBook: false,
        reason: 'Error validating booking',
        packagesAvailable: []
      };
    }
  }, [assignments]);

  // Book a session for a client
  const bookSession = useCallback(async (
    clientId: string,
    sessionScheduleId: string,
    packageAssignmentId?: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      // Validate booking first
      const validation = await validateBooking(clientId, sessionScheduleId);
      if (!validation.canBook) {
        toast.error(validation.reason || 'Cannot book session');
        return false;
      }

      // If no package specified, use the first available
      const finalPackageId = packageAssignmentId || validation.packagesAvailable[0]?.id;

      // Create session participation record
      const { error: bookingError } = await supabase
        .from('gym_session_participants')
        .insert({
          session_schedule_id: sessionScheduleId,
          participant_id: clientId,
          package_assignment_id: finalPackageId,
          payment_status: 'included', // Since it's from a package
          attendance_status: 'registered'
        });

      if (bookingError) throw bookingError;

      // If using a limited session package, increment sessions_used
      if (finalPackageId) {
        const packageAssignment = assignments.find(a => a.id === finalPackageId);
        if (packageAssignment?.sessions_total) {
          const { error: updateError } = await supabase
            .from('gym_package_assignments')
            .update({
              sessions_used: packageAssignment.sessions_used + 1
            })
            .eq('id', finalPackageId);

          if (updateError) throw updateError;
        }
      }

      await fetchAssignments();
      toast.success('Session booked successfully!');
      return true;
    } catch (error) {
      console.error('Error booking session:', error);
      toast.error('Failed to book session');
      return false;
    } finally {
      setLoading(false);
    }
  }, [assignments, validateBooking, fetchAssignments]);

  // Cancel a booking
  const cancelBooking = useCallback(async (
    participantId: string,
    sessionScheduleId: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      // Get the participation record
      const { data: participation, error: fetchError } = await supabase
        .from('gym_session_participants')
        .select('*')
        .eq('participant_id', participantId)
        .eq('session_schedule_id', sessionScheduleId)
        .single();

      if (fetchError) throw fetchError;

      // Delete the participation record
      const { error: deleteError } = await supabase
        .from('gym_session_participants')
        .delete()
        .eq('id', participation.id);

      if (deleteError) throw deleteError;

      // If it was using a limited session package, decrement sessions_used
      if (participation.package_assignment_id) {
        const packageAssignment = assignments.find(a => a.id === participation.package_assignment_id);
        if (packageAssignment?.sessions_total && packageAssignment.sessions_used > 0) {
          const { error: updateError } = await supabase
            .from('gym_package_assignments')
            .update({
              sessions_used: packageAssignment.sessions_used - 1
            })
            .eq('id', participation.package_assignment_id);

          if (updateError) throw updateError;
        }
      }

      await fetchAssignments();
      toast.success('Booking cancelled successfully!');
      return true;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
      return false;
    } finally {
      setLoading(false);
    }
  }, [assignments, fetchAssignments]);

  // Check-in participant
  const checkIn = useCallback(async (
    participantId: string,
    sessionScheduleId: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('gym_session_participants')
        .update({
          attendance_status: 'checked_in'
        })
        .eq('participant_id', participantId)
        .eq('session_schedule_id', sessionScheduleId);

      if (error) throw error;

      toast.success('Participant checked in!');
      return true;
    } catch (error) {
      console.error('Error checking in:', error);
      toast.error('Failed to check in participant');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check-out participant
  const checkOut = useCallback(async (
    participantId: string,
    sessionScheduleId: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('gym_session_participants')
        .update({
          attendance_status: 'checked_out'
        })
        .eq('participant_id', participantId)
        .eq('session_schedule_id', sessionScheduleId);

      if (error) throw error;

      toast.success('Participant checked out!');
      return true;
    } catch (error) {
      console.error('Error checking out:', error);
      toast.error('Failed to check out participant');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get session participants
  const getSessionParticipants = useCallback(async (sessionScheduleId: string) => {
    try {
      const { data, error } = await supabase
        .from('gym_session_participants')
        .select(`
          *,
          package_assignment:gym_package_assignments(
            id,
            package:gym_packages(title),
            sessions_used,
            sessions_total
          )
        `)
        .eq('session_schedule_id', sessionScheduleId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching participants:', error);
      return [];
    }
  }, []);

  return {
    loading,
    validateBooking,
    bookSession,
    cancelBooking,
    checkIn,
    checkOut,
    getSessionParticipants
  };
}