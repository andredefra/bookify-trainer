
import { useState, useEffect } from "react";
import { EmptyState } from "./past-workouts/EmptyState";
import { WorkoutList } from "./past-workouts/WorkoutList";
import { WorkoutDetails } from "./past-workouts/WorkoutDetails";
import { WorkoutLog } from "./past-workouts/types";

export function PastWorkoutsLog() {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutLog | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from a database
    let logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
    
    // If no logs exist, add sample logs
    if (logs.length === 0) {
      const sampleLog = {
        id: "sample-1",
        date: new Date().toISOString(),
        name: "Upper Body Workout",
        duration: "45 min",
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
        duration: "50 min",
        exercises: [
          { id: "ex-4", name: "Squats", sets: 4, reps: 10, weight: 80 },
          { id: "ex-5", name: "Lunges", sets: 3, reps: 12, weight: 20 },
          { id: "ex-6", name: "Leg Press", sets: 3, reps: 15, weight: 100 }
        ]
      };
      
      const oldLog = {
        id: "sample-3",
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        name: "Full Body Workout",
        duration: "60 min",
        exercises: [
          { id: "ex-7", name: "Deadlift", sets: 4, reps: 6, weight: 100 },
          { id: "ex-8", name: "Push-ups", sets: 3, reps: 15, weight: 0 },
          { id: "ex-9", name: "Bent-over Rows", sets: 3, reps: 10, weight: 40 }
        ]
      };
      
      logs = [sampleLog, yesterdayLog, oldLog];
      localStorage.setItem("workoutLogs", JSON.stringify(logs));
    }
    
    // Sort by date, newest first
    logs.sort((a: WorkoutLog, b: WorkoutLog) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setWorkoutLogs(logs);
  }, []);

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
