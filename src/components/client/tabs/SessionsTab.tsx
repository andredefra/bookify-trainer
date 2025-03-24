
import { SessionsTabContent } from "./sessions/SessionsTabContent";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
}

interface SessionsTabProps {
  upcomingSessions: SessionItem[];
}

export function SessionsTab({ upcomingSessions }: SessionsTabProps) {
  return <SessionsTabContent upcomingSessions={upcomingSessions} />;
}
