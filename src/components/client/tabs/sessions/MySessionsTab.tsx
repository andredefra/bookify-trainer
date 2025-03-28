
import { SessionCard } from "./SessionCard";
import { SessionItem } from "@/types/sessions";

interface MySessionsTabProps {
  upcomingSessions: SessionItem[];
  onViewDetails: (session: SessionItem) => void;
  onRegister: (session: SessionItem) => void;
  onAddToCalendar: (session: SessionItem) => void;
  onCancel: (session: SessionItem) => void;
}

export function MySessionsTab({
  upcomingSessions,
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel
}: MySessionsTabProps) {
  return (
    <div className="space-y-4">
      {upcomingSessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onViewDetails={onViewDetails}
          onRegister={onRegister}
          onAddToCalendar={onAddToCalendar}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
