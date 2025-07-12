import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Clock, User, MapPin } from "lucide-react";

interface SessionBlockProps {
  event: {
    id: string;
    trainerId: string;
    trainerName: string;
    title: string;
    start: Date;
    end: Date;
    color: string;
    type: string;
  };
  isCompact?: boolean;
}

export function SessionBlock({ event, isCompact = false }: SessionBlockProps) {
  const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60); // minutes
  const startTime = format(event.start, 'HH:mm');
  const endTime = format(event.end, 'HH:mm');
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'session': return 'Sessione';
      case 'sales_activity': return 'Vendita';
      case 'program_milestone': return 'Milestone';
      case 'deadline': return 'Scadenza';
      case 'personal_task': return 'Task';
      case 'availability': return 'Disponibile';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'session': return 'bg-blue-500';
      case 'sales_activity': return 'bg-green-500';
      case 'program_milestone': return 'bg-purple-500';
      case 'deadline': return 'bg-red-500';
      case 'personal_task': return 'bg-orange-500';
      case 'availability': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              ${getTypeColor(event.type)} text-white rounded-md p-2 mb-1 
              cursor-pointer hover:opacity-90 transition-opacity
              ${isCompact ? 'text-xs py-1' : 'text-sm'}
            `}
            style={{
              minHeight: isCompact ? '24px' : Math.max(30, Math.min(duration, 120))
            }}
          >
            <div className="font-medium truncate">
              {isCompact ? event.trainerName : event.title}
            </div>
            {!isCompact && (
              <div className="text-xs opacity-90 flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                {startTime} - {endTime}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="font-semibold">{event.title}</div>
            
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>{event.trainerName}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{startTime} - {endTime} ({duration} min)</span>
              </div>
              
              <Badge variant="outline" className="text-xs">
                {getTypeLabel(event.type)}
              </Badge>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}