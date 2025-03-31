
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ViewToggle } from "./ViewToggle";

interface SessionsHeaderProps {
  viewMode: 'list' | 'calendar';
  setViewMode: (mode: 'list' | 'calendar') => void;
  onBookSession: () => void;
}

export function SessionsHeader({ 
  viewMode, 
  setViewMode, 
  onBookSession 
}: SessionsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>Training Sessions</CardTitle>
        <CardDescription>Discover and register for live training sessions</CardDescription>
      </div>
      <div className="flex gap-2">
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        <Button 
          className="flex items-center"
          onClick={onBookSession}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Book Private Session
        </Button>
      </div>
    </div>
  );
}
