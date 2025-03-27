
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, DollarSign, Edit, UserPlus, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Exercise } from "@/data/training/types";

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
    exercises?: Exercise[];
  };
  onAssign: () => void;
  onEdit: () => void;
}

export function ProgramListItem({ program, onAssign, onEdit }: ProgramListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div>
        <h3 className="font-medium">{program.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>Last updated {program.lastUpdated}</span>
          
          <span className="mx-1">•</span>
          
          <Users className="h-3.5 w-3.5" />
          <span>{program.clientCount} client{program.clientCount !== 1 ? 's' : ''}</span>

          {program.exercises && program.exercises.length > 0 && (
            <>
              <span className="mx-1">•</span>
              <Dumbbell className="h-3.5 w-3.5" />
              <span>{program.exercises.length} exercise{program.exercises.length !== 1 ? 's' : ''}</span>
            </>
          )}
        </div>
        
        <div className="flex mt-2 gap-2 flex-wrap">
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

        {program.exercises && program.exercises.length > 0 && (
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium">Top exercises: </span>
            {program.exercises.slice(0, 2).map((ex, i) => (
              <span key={ex.id}>
                {ex.name}{i < Math.min(program.exercises?.length || 0, 2) - 1 ? ', ' : ''}
              </span>
            ))}
            {program.exercises.length > 2 && ` +${program.exercises.length - 2} more`}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onAssign} className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Assign</span>
        </Button>
        <Button variant="outline" size="sm" onClick={onEdit} className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </div>
    </div>
  );
}
