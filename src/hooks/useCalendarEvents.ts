
import { useState, useEffect } from 'react';
import { CalendarEvent } from './calendar/types';
import { createMockEvents } from './calendar/mockEvents';
import { 
  fetchEventsFromDatabase, 
  formatDatabaseEvent, 
  createEventInDatabase, 
  updateEventInDatabase, 
  deleteEventFromDatabase 
} from './calendar/calendarOperations';

export { CalendarEvent } from './calendar/types';

export function useCalendarEvents(trainerId: string) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from database first
        const dbEvents = await fetchEventsFromDatabase(trainerId);

        if (dbEvents && dbEvents.length > 0) {
          // Convert database events to our format
          const formattedEvents: CalendarEvent[] = dbEvents.map(formatDatabaseEvent);
          setEvents(formattedEvents);
        } else {
          // No events in database, use mock events
          const mockEvents = createMockEvents(trainerId);
          setEvents(mockEvents);
        }
      } catch (err) {
        console.error('Error in fetchEvents:', err);
        setError('Failed to load calendar events');
        // Fall back to mock events
        const mockEvents = createMockEvents(trainerId);
        setEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    if (trainerId) {
      fetchEvents();
    }
  }, [trainerId]);

  const createEvent = async (eventData: Omit<CalendarEvent, 'id' | 'trainer_id'>) => {
    try {
      const data = await createEventInDatabase(trainerId, eventData);

      const newEvent: CalendarEvent = {
        id: data.id,
        ...eventData,
        trainer_id: trainerId
      };

      setEvents(prev => [...prev, newEvent]);
      return { success: true, event: newEvent };
    } catch (err) {
      console.error('Error creating event:', err);
      return { success: false, error: 'Failed to create event' };
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
    try {
      await updateEventInDatabase(eventId, trainerId, updates);

      setEvents(prev => prev.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      ));
      return { success: true };
    } catch (err) {
      console.error('Error updating event:', err);
      return { success: false, error: 'Failed to update event' };
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await deleteEventFromDatabase(eventId, trainerId);

      setEvents(prev => prev.filter(event => event.id !== eventId));
      return { success: true };
    } catch (err) {
      console.error('Error deleting event:', err);
      return { success: false, error: 'Failed to delete event' };
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent
  };
}
