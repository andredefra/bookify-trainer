
import { WorkoutSession } from "@/data/training/types";

interface SessionTabsProps {
  sessions: WorkoutSession[];
  activeSession: string;
  setActiveSession: (sessionId: string) => void;
}

export function SessionTabs({ sessions, activeSession, setActiveSession }: SessionTabsProps) {
  const handleTabClick = (sessionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveSession(sessionId);
  };

  return (
    <div className="w-full border-b bg-white">
      <div className="flex overflow-x-auto overflow-y-hidden">
        {sessions.map((session) => (
          <button
            key={session.id}
            type="button"
            className={`flex-shrink-0 px-6 py-4 text-sm font-medium whitespace-nowrap border-r last:border-r-0 min-w-[140px] transition-colors ${
              activeSession === session.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
            }`}
            onClick={(e) => handleTabClick(session.id, e)}
          >
            Session {session.sessionNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
