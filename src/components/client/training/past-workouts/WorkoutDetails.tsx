
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChevronLeft, Dumbbell, CalendarDays, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WorkoutLog } from "./types";

interface WorkoutDetailsProps {
  workout: WorkoutLog;
  onBack: () => void;
}

export function WorkoutDetails({ workout, onBack }: WorkoutDetailsProps) {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="pl-0"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {format(parseISO(workout.date), "PPP")}
          </span>
          {workout.duration && (
            <>
              <Clock className="h-3.5 w-3.5 ml-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{workout.duration}</span>
            </>
          )}
        </div>
      </div>

      <h3 className="text-lg font-medium flex items-center">
        <Dumbbell className="h-4 w-4 mr-2 text-primary" />
        {workout.name}
      </h3>
      
      {isMobile ? (
        <div className="space-y-3 mt-4">
          {workout.exercises.map((exercise) => (
            <div key={exercise.id} className="border rounded-md p-3 bg-card hover:bg-accent/50 transition-colors">
              <div className="font-medium">{exercise.name}</div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                <div className="bg-muted/30 rounded px-2 py-1 text-center">
                  <span className="block text-xs text-muted-foreground">Sets</span>
                  <span className="font-medium">{exercise.setsData?.length || 0}</span>
                </div>
                <div className="bg-muted/30 rounded px-2 py-1 text-center">
                  <span className="block text-xs text-muted-foreground">Avg Reps</span>
                  <span className="font-medium">
                    {exercise.setsData?.length > 0 
                      ? Math.round(exercise.setsData.reduce((sum, set) => sum + (set.actualReps || 0), 0) / exercise.setsData.length)
                      : 0
                    }
                  </span>
                </div>
                <div className="bg-muted/30 rounded px-2 py-1 text-center">
                  <span className="block text-xs text-muted-foreground">Max Weight</span>
                  <span className="font-medium">
                    {exercise.setsData?.length > 0 
                      ? Math.max(...exercise.setsData.map(set => set.weight || 0))
                      : 0
                    } kg
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exercise</TableHead>
              <TableHead className="text-right">Sets</TableHead>
              <TableHead className="text-right">Avg Reps</TableHead>
              <TableHead className="text-right">Max Weight (kg)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workout.exercises.map((exercise) => (
              <TableRow key={exercise.id}>
                <TableCell>{exercise.name}</TableCell>
                <TableCell className="text-right">{exercise.setsData?.length || 0}</TableCell>
                <TableCell className="text-right">
                  {exercise.setsData?.length > 0 
                    ? Math.round(exercise.setsData.reduce((sum, set) => sum + (set.actualReps || 0), 0) / exercise.setsData.length)
                    : 0
                  }
                </TableCell>
                <TableCell className="text-right">
                  {exercise.setsData?.length > 0 
                    ? Math.max(...exercise.setsData.map(set => set.weight || 0))
                    : 0
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
