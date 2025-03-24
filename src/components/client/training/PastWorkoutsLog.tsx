
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

  useEffect(() => {
    // In a real app, this would fetch from a database
    const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{selectedWorkout.name}</h3>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(selectedWorkout.date), "PPP")}
            </p>
          </div>
          <Button variant="outline" onClick={() => setSelectedWorkout(null)}>
            Back to All Workouts
          </Button>
        </div>

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
            className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedWorkout(workout)}
          >
            <div>
              <h4 className="font-medium">{workout.name}</h4>
              <p className="text-sm text-muted-foreground">
                {format(parseISO(workout.date), "PPP")}
              </p>
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
