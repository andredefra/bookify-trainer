import { useState, useEffect } from 'react';
import { WorkoutLog } from '@/data/training/workoutTypes';
import { demoWorkoutLogs } from '@/data/training/demoWorkoutLogs';

export function useWorkoutLogs() {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    loadWorkoutLogs();
  }, []);

  const loadWorkoutLogs = () => {
    let logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
    
    // If no logs exist, initialize with demo data
    if (logs.length === 0) {
      logs = demoWorkoutLogs;
      localStorage.setItem("workoutLogs", JSON.stringify(logs));
    }
    
    // Sort by date, newest first
    logs.sort((a: WorkoutLog, b: WorkoutLog) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setWorkoutLogs(logs);
  };

  const addWorkoutLog = (workout: Omit<WorkoutLog, 'id'>) => {
    const newWorkout: WorkoutLog = {
      ...workout,
      id: Date.now().toString()
    };
    
    const updatedLogs = [newWorkout, ...workoutLogs];
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("workoutLogs", JSON.stringify(updatedLogs));
    
    return newWorkout;
  };

  const deleteWorkoutLog = (id: string) => {
    const updatedLogs = workoutLogs.filter(log => log.id !== id);
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("workoutLogs", JSON.stringify(updatedLogs));
  };

  return {
    workoutLogs,
    addWorkoutLog,
    deleteWorkoutLog,
    refreshLogs: loadWorkoutLogs
  };
}