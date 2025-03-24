
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ProgramListItemProps {
  program: {
    id: number;
    title: string;
    type: string;
    clientCount: number;
    lastUpdated: string;
  };
  onAssign: () => void;
}

export function ProgramListItem({ program, onAssign }: ProgramListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium">{program.title}</h3>
        <div className="text-sm text-muted-foreground">
          Type: {program.type} • Assigned to {program.clientCount} clients • Last updated: {program.lastUpdated}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAssign}
        >
          Assign
        </Button>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
