import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";

export interface GymCalendarEvent {
  id: string;
  title: string;
  start_datetime: string;
  end_datetime: string;
  event_category: 'session' | 'program_milestone' | 'sales_activity' | 'personal_task' | 'deadline' | 'availability';
  trainer_id: string;
  client_id?: string;
  session_id?: string;
  package_assignment_id?: string;
  description?: string;
  location?: string;
  color?: string;
  trainer_name?: string;
  client_name?: string;
}

export interface GymCalendarStats {
  todayAppointments: number;
  weeklyBookings: number;
  activeTrainers: number;
  utilizationRate: number;
}

export function useGymCalendar() {
  const [events, setEvents] = useState<GymCalendarEvent[]>([]);
  const [stats, setStats] = useState<GymCalendarStats>({
    todayAppointments: 0,
    weeklyBookings: 0,
    activeTrainers: 0,
    utilizationRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const gymId = getCurrentDemoUserId();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Fetch all calendar events for trainers associated with this gym
      const { data: gymEvents, error: eventsError } = await supabase
        .from('calendar_events')
        .select(`
          *,
          trainer:trainer_id (id),
          client:client_id (id)
        `)
        .gte('start_datetime', new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .lte('start_datetime', new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString())
        .order('start_datetime', { ascending: true });

      if (eventsError) {
        console.error('Error fetching gym calendar events:', eventsError);
        setError(eventsError.message);
        return;
      }

      // Transform events for gym view
      const transformedEvents: GymCalendarEvent[] = (gymEvents || []).map(event => ({
        id: event.id,
        title: event.title,
        start_datetime: event.start_datetime,
        end_datetime: event.end_datetime,
        event_category: event.event_category,
        trainer_id: event.trainer_id,
        client_id: event.client_id,
        session_id: event.session_id,
        package_assignment_id: event.package_assignment_id,
        description: event.description,
        location: event.location,
        color: event.color || '#3B82F6',
        trainer_name: `Trainer ${event.trainer_id.slice(-4)}`,
        client_name: event.client_id ? `Client ${event.client_id.slice(-4)}` : undefined
      }));

      setEvents(transformedEvents);
      calculateStats(transformedEvents);
      setError(null);
    } catch (err) {
      console.error('Error in fetchEvents:', err);
      setError('Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (events: GymCalendarEvent[]) => {
    const today = new Date();
    const startOfWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const endOfWeek = new Date(startOfWeek.getTime() + (7 * 24 * 60 * 60 * 1000));

    const todayEvents = events.filter(event => {
      const eventDate = new Date(event.start_datetime);
      return eventDate.toDateString() === today.toDateString();
    });

    const weekEvents = events.filter(event => {
      const eventDate = new Date(event.start_datetime);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });

    const uniqueTrainers = new Set(events.map(event => event.trainer_id));

    // Calculate utilization rate (mock calculation)
    const totalSlots = uniqueTrainers.size * 40; // 40 slots per trainer per week
    const bookedSlots = weekEvents.length;
    const utilizationRate = totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;

    setStats({
      todayAppointments: todayEvents.length,
      weeklyBookings: weekEvents.length,
      activeTrainers: uniqueTrainers.size,
      utilizationRate
    });
  };

  const createEvent = async (eventData: Partial<GymCalendarEvent>) => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert({
          title: eventData.title,
          start_datetime: eventData.start_datetime,
          end_datetime: eventData.end_datetime,
          event_category: eventData.event_category || 'personal_task',
          trainer_id: eventData.trainer_id,
          client_id: eventData.client_id,
          description: eventData.description,
          location: eventData.location,
          color: eventData.color || '#3B82F6'
        })
        .select()
        .single();

      if (error) throw error;

      await fetchEvents(); // Refresh events
      return { success: true, data };
    } catch (err) {
      console.error('Error creating event:', err);
      return { success: false, error: err };
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<GymCalendarEvent>) => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .update({
          title: updates.title,
          start_datetime: updates.start_datetime,
          end_datetime: updates.end_datetime,
          description: updates.description,
          location: updates.location,
          color: updates.color
        })
        .eq('id', eventId)
        .select()
        .single();

      if (error) throw error;

      await fetchEvents(); // Refresh events
      return { success: true, data };
    } catch (err) {
      console.error('Error updating event:', err);
      return { success: false, error: err };
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      await fetchEvents(); // Refresh events
      return { success: true };
    } catch (err) {
      console.error('Error deleting event:', err);
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    if (gymId) {
      fetchEvents();
    }
  }, [gymId]);

  return {
    events,
    stats,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshEvents: fetchEvents
  };
}