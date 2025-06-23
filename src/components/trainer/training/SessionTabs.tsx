
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WorkoutSession } from "@/data/training/types";

interface SessionTabsProps {
  sessions: WorkoutSession[];
  activeSession: string;
  setActiveSession: (sessionId: string) => void;
}

export function SessionTabs({ sessions, activeSession, setActiveSession }: SessionTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleTabClick = (sessionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveSession(sessionId);
  };

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const scrollToActiveSession = () => {
    if (!scrollContainerRef.current) return;
    
    const activeButton = scrollContainerRef.current.querySelector(`[data-session-id="${activeSession}"]`) as HTMLElement;
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [sessions]);

  useEffect(() => {
    scrollToActiveSession();
  }, [activeSession]);

  const activeIndex = sessions.findIndex(session => session.id === activeSession);
  const totalSessions = sessions.length;

  return (
    <div className="w-full border-b bg-white">
      <div className="flex items-center">
        {/* Left scroll button */}
        {canScrollLeft && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-shrink-0 h-12 px-2 border-r"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Scrollable tabs container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="flex">
            {sessions.map((session) => (
              <button
                key={session.id}
                type="button"
                data-session-id={session.id}
                className={`flex-shrink-0 px-4 py-4 text-sm font-medium whitespace-nowrap border-r last:border-r-0 min-w-[120px] transition-all duration-200 ${
                  activeSession === session.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200 hover:shadow-sm"
                }`}
                onClick={(e) => handleTabClick(session.id, e)}
              >
                Session {session.sessionNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-shrink-0 h-12 px-2 border-l"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Session counter */}
      {totalSessions > 6 && (
        <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t flex justify-center">
          Sessione {activeIndex + 1} di {totalSessions}
        </div>
      )}
    </div>
  );
}
