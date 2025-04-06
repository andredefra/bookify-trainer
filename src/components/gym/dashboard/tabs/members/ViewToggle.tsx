
import { ArrowUpDown, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViewMode } from "./types";

interface ViewToggleProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  memberCount: number;
}

export function ViewToggle({ viewMode, setViewMode, memberCount }: ViewToggleProps) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center gap-2">
        <p className="font-medium">All Members</p>
        <Badge variant="outline">{memberCount}</Badge>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant={viewMode === "table" ? "default" : "outline"} 
          size="sm"
          onClick={() => setViewMode("table")}
          className="py-1 h-8"
        >
          <ArrowUpDown className="mr-1 h-4 w-4" />
          Table
        </Button>
        <Button 
          variant={viewMode === "cards" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("cards")}
          className="py-1 h-8"
        >
          <Calendar className="mr-1 h-4 w-4" />
          Cards
        </Button>
      </div>
    </div>
  );
}
