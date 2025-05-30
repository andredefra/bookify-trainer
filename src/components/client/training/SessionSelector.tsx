
import { CheckCircle, Clock, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface Session {
  id: string;
  sessionNumber: number;
  title: string;
  completed: boolean;
  completedDate?: string;
}

interface SessionSelectorProps {
  sessions: Session[];
  activeSession: string | null;
  onSessionSelect: (sessionId: string) => void;
  completedSessions: number;
  totalSessions: number;
}

export function SessionSelector({ 
  sessions, 
  activeSession, 
  onSessionSelect, 
  completedSessions, 
  totalSessions 
}: SessionSelectorProps) {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const getSessionStatus = (session: Session, index: number) => {
    if (session.completed) return 'completed';
    if (index === 0 || sessions[index - 1]?.completed) return 'available';
    return 'locked';
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 240 : 300; // Adjust based on session card width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="border-b">
      {/* Progress Header */}
      <div className={`${isMobile ? 'px-3 py-2' : 'px-4 py-3'} border-b bg-muted/20`}>
        <div className="flex justify-between items-center">
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground`}>
            Progress: {completedSessions}/{totalSessions} sessions
          </span>
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-primary font-medium`}>
            {Math.round((completedSessions / totalSessions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${(completedSessions / totalSessions) * 100}%` }}
          />
        </div>
      </div>

      {/* Sessions Grid with Navigation */}
      <div className="relative">
        {/* Left scroll button */}
        {canScrollLeft && !isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-white shadow-md"
            onClick={() => scrollToDirection('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Right scroll button */}
        {canScrollRight && !isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-white shadow-md"
            onClick={() => scrollToDirection('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        <ScrollArea className="w-full" orientation="horizontal">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sessions.map((session, index) => {
              const status = getSessionStatus(session, index);
              
              return (
                <button
                  key={session.id}
                  className={`${isMobile ? 'min-w-[80px] p-2' : 'min-w-[100px] p-3'} text-center border-r last:border-r-0 transition-colors flex-shrink-0 ${
                    activeSession === session.id ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
                  } ${status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => status !== 'locked' && onSessionSelect(session.id)}
                  disabled={status === 'locked'}
                  aria-label={`Select session ${session.sessionNumber}`}
                >
                  <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-1`}>
                    Session {session.sessionNumber}
                  </div>
                  <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground mb-2 truncate`}>
                    {session.title}
                  </div>
                  
                  {/* Status Icon */}
                  <div className="flex justify-center">
                    {session.completed && (
                      <CheckCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-emerald-600`} />
                    )}
                    {!session.completed && status === 'available' && (
                      <Clock className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-blue-500`} />
                    )}
                    {status === 'locked' && (
                      <AlertTriangle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-gray-400`} />
                    )}
                  </div>
                  
                  {/* Completion Date */}
                  {session.completed && session.completedDate && (
                    <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground mt-1`}>
                      {new Date(session.completedDate).toLocaleDateString()}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
