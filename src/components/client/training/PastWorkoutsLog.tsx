
import { useState } from "react";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { EmptyState } from "./past-workouts/EmptyState";
import { WorkoutList } from "./past-workouts/WorkoutList";
import { WorkoutDetails } from "./past-workouts/WorkoutDetails";
import { WorkoutLog } from "@/data/training/workoutTypes";

export function PastWorkoutsLog() {
  const { workoutLogs } = useWorkoutLogs();
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutLog | null>(null);


  if (workoutLogs.length === 0) {
    return <EmptyState />;
  }

  if (selectedWorkout) {
    return (
      <WorkoutDetails 
        workout={selectedWorkout} 
        onBack={() => setSelectedWorkout(null)} 
      />
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-3">Recent Workouts</h3>
      <WorkoutList 
        workouts={workoutLogs} 
        onSelectWorkout={setSelectedWorkout} 
      />
    </div>
  );
}
