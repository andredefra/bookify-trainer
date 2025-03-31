
import { Button } from "@/components/ui/button";
import { CalendarDays, List } from "lucide-react";

interface ViewToggleProps {
  viewMode: 'list' | 'calendar';
  setViewMode: (mode: 'list' | 'calendar') => void;
  isMobile?: boolean;
}

export function ViewToggle({ viewMode, setViewMode, isMobile = false }: ViewToggleProps) {
  return (
    <div className={`${isMobile ? 'flex mt-4' : 'hidden sm:flex mr-2'} bg-muted rounded-md p-1 ${isMobile ? 'w-full' : ''}`}>
      <Button 
        variant={viewMode === 'list' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => setViewMode('list')}
        className={isMobile ? "flex-1" : "px-3"}
      >
        <List className="h-4 w-4 mr-1" /> {!isMobile && "List"}
      </Button>
      <Button 
        variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => setViewMode('calendar')}
        className={isMobile ? "flex-1" : "px-3"}
      >
        <CalendarDays className="h-4 w-4 mr-1" /> {!isMobile && "Calendar"}
      </Button>
    </div>
  );
}
