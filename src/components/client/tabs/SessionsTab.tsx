
import { SessionsTabContent } from "./sessions/SessionsTabContent";
import { SessionItem } from "@/types/sessions";

interface SessionsTabProps {
  upcomingSessions: SessionItem[];
}

export function SessionsTab({ upcomingSessions }: SessionsTabProps) {
  return <SessionsTabContent upcomingSessions={upcomingSessions} />;
}
