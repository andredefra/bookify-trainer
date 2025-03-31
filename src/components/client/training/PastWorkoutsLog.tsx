
import { useState, useEffect } from "react";
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
import { ChevronLeft, Dumbbell, CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExerciseLog {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface WorkoutLog {
  id: string;
  date: string;
  name: string;
  exercises: ExerciseLog[];
}

export function PastWorkoutsLog() {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutLog | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // In a real app, this would fetch from a database
    let logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
    
    // If no logs exist, add a sample log
    if (logs.length === 0) {
      const sampleLog = {
        id: "sample-1",
        date: new Date().toISOString(),
        name: "Upper Body Workout",
        exercises: [
          { id: "ex-1", name: "Bench Press", sets: 4, reps: 8, weight: 60 },
          { id: "ex-2", name: "Pull-ups", sets: 3, reps: 10, weight: 0 },
          { id: "ex-3", name: "Shoulder Press", sets: 3, reps: 12, weight: 15 }
        ]
      };
      
      const yesterdayLog = {
        id: "sample-2",
        date: new Date(Date.now() - 86400000).toISOString(),
        name: "Leg Day",
        exercises: [
          { id: "ex-4", name: "Squats", sets: 4, reps: 10, weight: 80 },
          { id: "ex-5", name: "Lunges", sets: 3, reps: 12, weight: 20 },
          { id: "ex-6", name: "Leg Press", sets: 3, reps: 15, weight: 100 }
        ]
      };
      
      logs = [sampleLog, yesterdayLog];
      localStorage.setItem("workoutLogs", JSON.stringify(logs));
    }
    
    // Sort by date, newest first
    logs.sort((a: WorkoutLog, b: WorkoutLog) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setWorkoutLogs(logs);
  }, []);

  if (workoutLogs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-2">No workout logs found</p>
        <p className="text-sm text-muted-foreground">
          Click "Log Workout" to record your first workout
        </p>
      </div>
    );
  }

  if (selectedWorkout) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedWorkout(null)}
            className="pl-0"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <div className="text-sm text-muted-foreground">
            {format(parseISO(selectedWorkout.date), "PPP")}
          </div>
        </div>

        <h3 className="text-lg font-medium">{selectedWorkout.name}</h3>
        
        {isMobile ? (
          <div className="space-y-3 mt-4">
            {selectedWorkout.exercises.map((exercise) => (
              <div key={exercise.id} className="border rounded-md p-3">
                <div className="font-medium">{exercise.name}</div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Sets:</span> {exercise.sets}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reps:</span> {exercise.reps}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span> {exercise.weight} kg
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
                <TableHead className="text-right">Reps</TableHead>
                <TableHead className="text-right">Weight (kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedWorkout.exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell className="text-right">{exercise.sets}</TableCell>
                  <TableCell className="text-right">{exercise.reps}</TableCell>
                  <TableCell className="text-right">{exercise.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Recent Workouts</h3>
      <div className="space-y-2">
        {workoutLogs.map((workout) => (
          <div 
            key={workout.id} 
            className="flex justify-between items-center p-3 border rounded-md hover:bg-accent/50 cursor-pointer"
            onClick={() => setSelectedWorkout(workout)}
          >
            <div className="flex items-center">
              <div className="mr-3 bg-primary/10 p-2 rounded-full">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{workout.name}</h4>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {format(parseISO(workout.date), "PPP")}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
