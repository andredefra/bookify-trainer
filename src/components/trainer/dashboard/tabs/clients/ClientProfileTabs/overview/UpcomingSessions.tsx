
import { HighlightText } from "../shared/HighlightText";

interface UpcomingSessionsProps {
  sessions: string[];
  searchQuery?: string;
}

export function UpcomingSessions({ sessions, searchQuery = "" }: UpcomingSessionsProps) {
  return (
    <>
      <h3 className="text-sm font-medium mt-2">Upcoming Sessions</h3>
      {sessions.map((session, i) => (
        <div key={i} className="text-sm p-2 bg-primary/5 rounded">
          <HighlightText text={session} highlight={searchQuery} />
        </div>
      ))}
    </>
  );
}
