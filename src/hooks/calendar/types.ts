
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'session' | 'sales_activity' | 'program_milestone' | 'deadline' | 'personal_task' | 'availability';
  start: Date;
  end: Date;
  client?: string;
  location?: string;
  color: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending' | 'alert';
  description?: string;
  trainer_id: string;
}
