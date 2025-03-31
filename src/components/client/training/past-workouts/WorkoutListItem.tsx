
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, CalendarDays, Clock, ChevronRight } from "lucide-react";
import { WorkoutLog } from "./types";

interface WorkoutListItemProps {
  workout: WorkoutLog;
  onClick: () => void;
}

export function WorkoutListItem({ workout, onClick }: WorkoutListItemProps) {
  return (
    <div 
      key={workout.id} 
      className="flex justify-between items-center p-3 border rounded-md hover:bg-accent/50 bg-card/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-3 bg-primary/10 p-2 rounded-full">
          <Dumbbell className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium">{workout.name}</h4>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs text-muted-foreground flex items-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              {format(parseISO(workout.date), "PPP")}
            </span>
            {workout.duration && (
              <span className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {workout.duration}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Badge variant="outline" className="mr-2 bg-primary/5">
          {workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
