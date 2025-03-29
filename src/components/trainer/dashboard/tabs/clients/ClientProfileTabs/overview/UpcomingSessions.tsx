
interface UpcomingSessionsProps {
  sessions: string[];
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  return (
    <>
      <h3 className="text-sm font-medium mt-2">Upcoming Sessions</h3>
      {sessions.map((session, i) => (
        <div key={i} className="text-sm p-2 bg-primary/5 rounded">
          {session}
        </div>
      ))}
    </>
  );
}
