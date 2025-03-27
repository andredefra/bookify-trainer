
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgramListItemProps {
  program: {
    id: number;
    title: string;
    type: string;
    clientCount: number;
    lastUpdated: string;
    objective?: string;
    duration?: number;
    isPaid?: boolean;
    price?: number;
  };
  onAssign: () => void;
  onEdit: () => void;
}

export function ProgramListItem({ program, onAssign, onEdit }: ProgramListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium">{program.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>Last updated {program.lastUpdated}</span>
          
          <span className="mx-1">•</span>
          
          <Users className="h-3.5 w-3.5" />
          <span>{program.clientCount} client{program.clientCount !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex mt-2 gap-2">
          <Badge variant="outline">{program.type}</Badge>
          {program.objective && <Badge variant="outline">{program.objective}</Badge>}
          {program.duration && <Badge variant="outline">{program.duration} weeks</Badge>}
          {program.isPaid && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <DollarSign className="h-3 w-3 mr-1" />
              {program.price?.toFixed(2) || 0} €
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onAssign}>
          Assign
        </Button>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}
