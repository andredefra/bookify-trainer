
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutSession } from "@/data/training/types";

interface SessionNavigatorProps {
  sessions: WorkoutSession[];
  activeSession: string;
  setActiveSession: (sessionId: string) => void;
}

export function SessionNavigator({ sessions, activeSession, setActiveSession }: SessionNavigatorProps) {
  const currentIndex = sessions.findIndex(session => session.id === activeSession);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < sessions.length - 1;

  const goToPrevious = () => {
    if (canGoPrevious) {
      setActiveSession(sessions[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setActiveSession(sessions[currentIndex + 1].id);
    }
  };

  const goToFirst = () => {
    if (sessions.length > 0) {
      setActiveSession(sessions[0].id);
    }
  };

  const goToLast = () => {
    if (sessions.length > 0) {
      setActiveSession(sessions[sessions.length - 1].id);
    }
  };

  if (sessions.length <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 border-t">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={goToFirst}
        disabled={currentIndex === 0}
        className="h-8 w-8 p-0"
        title="Prima sessione"
      >
        <SkipBack className="h-3 w-3" />
      </Button>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={goToPrevious}
        disabled={!canGoPrevious}
        className="h-8 w-8 p-0"
        title="Sessione precedente"
      >
        <ChevronLeft className="h-3 w-3" />
      </Button>

      <span className="text-sm text-gray-600 mx-3 min-w-[100px] text-center">
        {currentIndex + 1} di {sessions.length}
      </span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={goToNext}
        disabled={!canGoNext}
        className="h-8 w-8 p-0"
        title="Sessione successiva"
      >
        <ChevronRight className="h-3 w-3" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={goToLast}
        disabled={currentIndex === sessions.length - 1}
        className="h-8 w-8 p-0"
        title="Ultima sessione"
      >
        <SkipForward className="h-3 w-3" />
      </Button>
    </div>
  );
}
