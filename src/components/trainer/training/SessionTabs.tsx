
import { WorkoutSession } from "@/data/training/types";

interface SessionTabsProps {
  sessions: WorkoutSession[];
  activeSession: string;
  setActiveSession: (sessionId: string) => void;
}

export function SessionTabs({ sessions, activeSession, setActiveSession }: SessionTabsProps) {
  return (
    <div className="flex border-b">
      {sessions.map((session) => (
        <button
          key={session.id}
          className={`px-4 py-2 text-sm font-medium border-r last:border-r-0 ${
            activeSession === session.id
              ? "bg-primary text-primary-foreground"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSession(session.id)}
        >
          Session {session.sessionNumber}
        </button>
      ))}
    </div>
  );
}
