
import { SessionCard } from "./SessionCard";
import { SessionItem } from "@/types/sessions";

interface MySessionsTabProps {
  upcomingSessions: SessionItem[];
  featuredSession: SessionItem;
  onViewDetails: (session: SessionItem) => void;
  onRegister: (session: SessionItem) => void;
  onAddToCalendar: (session: SessionItem) => void;
  onCancel: (session: SessionItem) => void;
}

export function MySessionsTab({
  upcomingSessions,
  featuredSession,
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

      {/* Featured session that can be joined */}
      <SessionCard
        session={featuredSession}
        onViewDetails={onViewDetails}
        variant="featured"
      />
    </div>
  );
}
