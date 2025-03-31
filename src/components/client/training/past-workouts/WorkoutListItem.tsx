
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, CalendarDays, Clock, ChevronRight } from "lucide-react";
import { WorkoutLog } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface WorkoutListItemProps {
  workout: WorkoutLog;
  onClick: () => void;
}

export function WorkoutListItem({ workout, onClick }: WorkoutListItemProps) {
  const isMobile = useIsMobile();
  
  return (
    <div 
      key={workout.id} 
      className="flex justify-between items-center p-3 border rounded-md hover:bg-accent/50 bg-card/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center min-w-0">
        <div className="mr-3 bg-primary/10 p-2 rounded-full flex-shrink-0">
          <Dumbbell className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h4 className="font-medium truncate-mobile">{workout.name}</h4>
          <div className="flex flex-wrap items-center mt-1 gap-2">
            <span className="text-xs text-muted-foreground flex items-center flex-shrink-0">
              <CalendarDays className="h-3 w-3 mr-1" />
              {isMobile ? format(parseISO(workout.date), "MMM d") : format(parseISO(workout.date), "PPP")}
            </span>
            {workout.duration && (
              <span className="text-xs text-muted-foreground flex items-center flex-shrink-0">
                <Clock className="h-3 w-3 mr-1" />
                {workout.duration}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center ml-2 flex-shrink-0">
        <Badge variant="outline" className={`${isMobile ? 'px-1.5 text-xs' : 'mr-2'} bg-primary/5`}>
          {workout.exercises.length} {isMobile ? 'ex' : workout.exercises.length !== 1 ? 'exercises' : 'exercise'}
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground ml-1" />
      </div>
    </div>
  );
}
