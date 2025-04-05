
import { SessionCard } from "./SessionCard";
import { SessionItem } from "@/types/sessions";
import { toast } from "sonner";

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
  // Handler for joining a video session
  const handleJoinSession = (session: SessionItem) => {
    toast.success(`Joining ${session.name} session with ${session.trainer}`);
    
    // In a real app, this would launch the video session interface
    window.open(`/video-session/${session.id}`, '_blank');
  };
  
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
          onJoinSession={handleJoinSession}
        />
      ))}
    </div>
  );
}
