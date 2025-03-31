
import { TrainerSessionItem } from "@/types/sessions";
import { SessionsTabContent } from "./sessions/SessionsTabContent";

interface SessionsTabProps {
  upcomingSessions: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions }: SessionsTabProps) {
  return <SessionsTabContent upcomingSessions={upcomingSessions} />;
}
