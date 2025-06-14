
import { WorkoutSession } from "@/data/training/types";

interface SessionTabsProps {
  sessions: WorkoutSession[];
  activeSession: string;
  setActiveSession: (sessionId: string) => void;
}

export function SessionTabs({ sessions, activeSession, setActiveSession }: SessionTabsProps) {
  return (
    <div className="w-full border-b bg-white">
      <div className="flex overflow-x-auto overflow-y-hidden">
        {sessions.map((session) => (
          <button
            key={session.id}
            className={`flex-shrink-0 px-6 py-3 text-sm font-medium whitespace-nowrap border-r last:border-r-0 min-w-[120px] transition-colors ${
              activeSession === session.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
            }`}
            onClick={() => setActiveSession(session.id)}
          >
            Session {session.sessionNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
