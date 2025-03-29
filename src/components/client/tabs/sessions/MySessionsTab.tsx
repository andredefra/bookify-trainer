
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
  // Determina quale sessione dovrebbe essere mostrata come featured (la prima con status 'registered')
  const featuredSessionIndex = upcomingSessions.findIndex(session => 
    session.status === 'registered' || session.status === 'confirmed'
  );

  return (
    <div className="space-y-4">
      {upcomingSessions.map((session, index) => (
        <SessionCard
          key={session.id}
          session={session}
          onViewDetails={onViewDetails}
          onRegister={onRegister}
          onAddToCalendar={onAddToCalendar}
          onCancel={onCancel}
          variant={index === featuredSessionIndex ? 'featured' : 'default'}
        />
      ))}
    </div>
  );
}
