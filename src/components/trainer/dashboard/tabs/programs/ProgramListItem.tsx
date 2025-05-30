
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, DollarSign, Edit, UserPlus, Dumbbell, Eye } from "lucide-react";
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
  onViewClients: () => void;
}

export function ProgramListItem({ program, onAssign, onEdit, onViewClients }: ProgramListItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4">
      <div className="overflow-hidden">
        <h3 className="font-medium truncate">{program.title}</h3>
        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            <span className="whitespace-nowrap">Last updated {program.lastUpdated}</span>
          </div>
          
          <span className="mx-1 hidden sm:inline">•</span>
          
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{program.clientCount} client{program.clientCount !== 1 ? 's' : ''}</span>
          </div>

          {program.exercises && program.exercises.length > 0 && (
            <>
              <span className="mx-1 hidden sm:inline">•</span>
              <div className="flex items-center">
                <Dumbbell className="h-3.5 w-3.5 mr-1" />
                <span>{program.exercises.length} exercise{program.exercises.length !== 1 ? 's' : ''}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex mt-2 gap-2 flex-wrap">
          <Badge variant="outline" className="whitespace-nowrap">{program.type}</Badge>
          {program.objective && <Badge variant="outline" className="whitespace-nowrap">{program.objective}</Badge>}
          {program.duration && <Badge variant="outline" className="whitespace-nowrap">{program.duration} weeks</Badge>}
          {program.isPaid && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 whitespace-nowrap">
              <DollarSign className="h-3 w-3 mr-1 shrink-0" />
              {program.price?.toFixed(2) || 0} €
            </Badge>
          )}
        </div>

        {program.exercises && program.exercises.length > 0 && (
          <div className="mt-2 text-sm text-muted-foreground truncate">
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

      <div className="flex items-center space-x-2 mt-3 sm:mt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onViewClients} 
          className="flex items-center gap-1 flex-1 sm:flex-auto justify-center"
        >
          <Eye className="h-4 w-4" />
          <span className="sm:hidden md:inline">Clients</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAssign} 
          className="flex items-center gap-1 flex-1 sm:flex-auto justify-center"
        >
          <UserPlus className="h-4 w-4" />
          <span className="sm:hidden md:inline">Assign</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEdit} 
          className="flex items-center gap-1 flex-1 sm:flex-auto justify-center"
        >
          <Edit className="h-4 w-4" />
          <span className="sm:hidden md:inline">Edit</span>
        </Button>
      </div>
    </div>
  );
}
