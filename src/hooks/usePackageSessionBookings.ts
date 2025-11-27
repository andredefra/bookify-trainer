import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PackageSessionBooking, SessionBookingStatus, SessionType } from '@/types/packageSessions';
import { toast } from 'sonner';

export const usePackageSessionBookings = (packageAssignmentId?: string) => {
  const [sessions, setSessions] = useState<PackageSessionBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPackageSessions = async (assignmentId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('package_session_bookings')
        .select('*')
        .eq('package_assignment_id', assignmentId)
        .order('session_number', { ascending: true });

      if (error) throw error;

      const transformedSessions: PackageSessionBooking[] = (data || []).map((session) => ({
        id: session.id,
        packageAssignmentId: session.package_assignment_id,
        trainerId: session.trainer_id,
        clientId: session.client_id,
        sessionNumber: session.session_number,
        status: session.status as SessionBookingStatus,
        proposedBy: session.proposed_by as 'trainer' | 'client' | undefined,
        proposedDatetime: session.proposed_datetime,
        confirmedDatetime: session.confirmed_datetime,
        completedDatetime: session.completed_datetime,
        calendarEventId: session.calendar_event_id,
        sessionType: session.session_type as SessionType,
        location: session.location,
        notes: session.notes,
        durationMinutes: session.duration_minutes,
        createdAt: session.created_at,
        updatedAt: session.updated_at,
      }));

      setSessions(transformedSessions);
    } catch (error) {
      console.error('Error fetching package sessions:', error);
      toast.error('Failed to load package sessions');
    } finally {
      setLoading(false);
    }
  };

  const initializePackageSessions = async (
    assignmentId: string,
    trainerId: string,
    clientId: string,
    totalSessions: number
  ) => {
    try {
      const sessionRecords = Array.from({ length: totalSessions }, (_, i) => ({
        package_assignment_id: assignmentId,
        trainer_id: trainerId,
        client_id: clientId,
        session_number: i + 1,
        status: 'available',
        duration_minutes: 60,
        session_type: 'in-person',
      }));

      const { error } = await supabase
        .from('package_session_bookings')
        .insert(sessionRecords);

      if (error) throw error;
      
      await fetchPackageSessions(assignmentId);
      toast.success('Package sessions initialized');
    } catch (error) {
      console.error('Error initializing sessions:', error);
      toast.error('Failed to initialize sessions');
    }
  };

  const proposeSession = async (
    bookingId: string,
    datetime: Date,
    sessionType: SessionType,
    location: string,
    notes: string,
    durationMinutes: number,
    proposedBy: 'trainer' | 'client' = 'trainer'
  ) => {
    try {
      const { error } = await supabase
        .from('package_session_bookings')
        .update({
          status: 'proposed',
          proposed_by: proposedBy,
          proposed_datetime: datetime.toISOString(),
          session_type: sessionType,
          location,
          notes,
          duration_minutes: durationMinutes,
        })
        .eq('id', bookingId);

      if (error) throw error;

      if (packageAssignmentId) {
        await fetchPackageSessions(packageAssignmentId);
      }
      
      toast.success('Session proposed successfully');
    } catch (error) {
      console.error('Error proposing session:', error);
      toast.error('Failed to propose session');
      throw error;
    }
  };

  const confirmSession = async (bookingId: string, createCalendarEvent: boolean = true) => {
    try {
      const session = sessions.find((s) => s.id === bookingId);
      if (!session || !session.proposedDatetime) {
        throw new Error('Session not found or missing proposed datetime');
      }

      let calendarEventId: string | null = null;

      if (createCalendarEvent) {
        const startDate = new Date(session.proposedDatetime);
        const endDate = new Date(startDate.getTime() + session.durationMinutes * 60000);

        const { data: calendarEvent, error: calendarError } = await supabase
          .from('calendar_events')
          .insert({
            trainer_id: session.trainerId,
            client_id: session.clientId,
            package_assignment_id: session.packageAssignmentId,
            title: `PT Session #${session.sessionNumber}`,
            start_datetime: startDate.toISOString(),
            end_datetime: endDate.toISOString(),
            event_category: 'session',
            location: session.location,
            description: session.notes,
          })
          .select()
          .single();

        if (calendarError) throw calendarError;
        calendarEventId = calendarEvent.id;
      }

      const { error } = await supabase
        .from('package_session_bookings')
        .update({
          status: 'confirmed',
          confirmed_datetime: new Date().toISOString(),
          calendar_event_id: calendarEventId,
        })
        .eq('id', bookingId);

      if (error) throw error;

      if (packageAssignmentId) {
        await fetchPackageSessions(packageAssignmentId);
      }
      
      toast.success('Session confirmed and added to calendar');
    } catch (error) {
      console.error('Error confirming session:', error);
      toast.error('Failed to confirm session');
      throw error;
    }
  };

  const completeSession = async (bookingId: string) => {
    try {
      const session = sessions.find((s) => s.id === bookingId);
      if (!session) throw new Error('Session not found');

      const { error: updateError } = await supabase
        .from('package_session_bookings')
        .update({
          status: 'completed',
          completed_datetime: new Date().toISOString(),
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      const { data: assignment, error: fetchError } = await supabase
        .from('client_package_assignments')
        .select('sessions_used')
        .eq('id', session.packageAssignmentId)
        .single();

      if (fetchError) throw fetchError;

      const { error: incrementError } = await supabase
        .from('client_package_assignments')
        .update({
          sessions_used: (assignment.sessions_used || 0) + 1,
        })
        .eq('id', session.packageAssignmentId);

      if (incrementError) throw incrementError;

      if (packageAssignmentId) {
        await fetchPackageSessions(packageAssignmentId);
      }
      
      toast.success('Session marked as completed');
    } catch (error) {
      console.error('Error completing session:', error);
      toast.error('Failed to complete session');
      throw error;
    }
  };

  const cancelSession = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('package_session_bookings')
        .update({
          status: 'cancelled',
        })
        .eq('id', bookingId);

      if (error) throw error;

      if (packageAssignmentId) {
        await fetchPackageSessions(packageAssignmentId);
      }
      
      toast.success('Session cancelled');
    } catch (error) {
      console.error('Error cancelling session:', error);
      toast.error('Failed to cancel session');
      throw error;
    }
  };

  const markNoShow = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('package_session_bookings')
        .update({
          status: 'no_show',
        })
        .eq('id', bookingId);

      if (error) throw error;

      if (packageAssignmentId) {
        await fetchPackageSessions(packageAssignmentId);
      }
      
      toast.success('Session marked as no-show');
    } catch (error) {
      console.error('Error marking no-show:', error);
      toast.error('Failed to mark no-show');
      throw error;
    }
  };

  useEffect(() => {
    if (packageAssignmentId) {
      fetchPackageSessions(packageAssignmentId);
    }
  }, [packageAssignmentId]);

  return {
    sessions,
    loading,
    fetchPackageSessions,
    initializePackageSessions,
    proposeSession,
    confirmSession,
    completeSession,
    cancelSession,
    markNoShow,
  };
};
