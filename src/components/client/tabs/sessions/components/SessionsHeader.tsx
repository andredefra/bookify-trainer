
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ViewToggle } from "./ViewToggle";

interface SessionsHeaderProps {
  viewMode: 'list' | 'calendar';
  setViewMode: (mode: 'list' | 'calendar') => void;
  onBookSession: () => void;
  isMobile?: boolean;
}

export function SessionsHeader({ 
  viewMode, 
  setViewMode, 
  onBookSession,
  isMobile = false
}: SessionsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <CardTitle>Training Sessions</CardTitle>
        <CardDescription>Discover and register for live training sessions</CardDescription>
      </div>
      <div className="flex gap-2">
        {!isMobile && <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />}
        <Button 
          className="flex items-center w-full sm:w-auto"
          onClick={onBookSession}
          size={isMobile ? "sm" : "default"}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {isMobile ? "Book Session" : "Book Private Session"}
        </Button>
      </div>
      {isMobile && (
        <div className="mt-1">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} isMobile={true} />
        </div>
      )}
    </div>
  );
}
