
import { Calendar as CalendarIcon, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SessionHeaderProps {
  viewMode: "list" | "calendar";
  setViewMode: (mode: "list" | "calendar") => void;
  onCreateSession: () => void;
}

export function SessionHeader({ viewMode, setViewMode, onCreateSession }: SessionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold leading-none tracking-tight">Training Sessions</h2>
        <p className="text-sm text-muted-foreground">Create and manage your training sessions</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex border rounded-md overflow-hidden">
          <Button 
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm" 
            className="rounded-none px-2 sm:px-3"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">List</span>
          </Button>
          <Button 
            variant={viewMode === "calendar" ? "default" : "ghost"}
            size="sm" 
            className="rounded-none px-2 sm:px-3"
            onClick={() => setViewMode("calendar")}
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Calendar</span>
          </Button>
        </div>
        <Button className="flex items-center" onClick={onCreateSession}>
          <Plus className="sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Create Session</span>
        </Button>
      </div>
    </div>
  );
}
