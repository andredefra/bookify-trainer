
import { supabase } from '@/integrations/supabase/client';
import { CalendarEvent } from './types';

export const fetchEventsFromDatabase = async (trainerId: string) => {
  const { data: dbEvents, error: dbError } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('trainer_id', trainerId)
    .order('start_datetime', { ascending: true });

  if (dbError) {
    console.error('Error fetching calendar events:', dbError);
    throw dbError;
  }

  return dbEvents;
};

export const formatDatabaseEvent = (event: any): CalendarEvent => ({
  id: event.id,
  title: event.title,
  type: event.event_category as CalendarEvent['type'],
  start: new Date(event.start_datetime),
  end: new Date(event.end_datetime),
  client: event.client_id || undefined,
  location: event.location || undefined,
  color: event.color || 'bg-blue-500',
  status: 'scheduled',
  description: event.description || undefined,
  trainer_id: event.trainer_id
});

export const createEventInDatabase = async (trainerId: string, eventData: Omit<CalendarEvent, 'id' | 'trainer_id'>) => {
  const { data, error } = await supabase
    .from('calendar_events')
    .insert([{
      trainer_id: trainerId,
      title: eventData.title,
      event_category: eventData.type,
      start_datetime: eventData.start.toISOString(),
      end_datetime: eventData.end.toISOString(),
      description: eventData.description,
      location: eventData.location,
      color: eventData.color
    }])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateEventInDatabase = async (eventId: string, trainerId: string, updates: Partial<CalendarEvent>) => {
  const { error } = await supabase
    .from('calendar_events')
    .update({
      title: updates.title,
      event_category: updates.type,
      start_datetime: updates.start?.toISOString(),
      end_datetime: updates.end?.toISOString(),
      description: updates.description,
      location: updates.location,
      color: updates.color
    })
    .eq('id', eventId)
    .eq('trainer_id', trainerId);

  if (error) throw error;
};

export const deleteEventFromDatabase = async (eventId: string, trainerId: string) => {
  const { error } = await supabase
    .from('calendar_events')
    .delete()
    .eq('id', eventId)
    .eq('trainer_id', trainerId);

  if (error) throw error;
};
