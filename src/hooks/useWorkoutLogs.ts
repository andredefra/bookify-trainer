import { useState, useEffect } from 'react';
import { WorkoutLog } from '@/data/training/workoutTypes';

export function useWorkoutLogs() {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    loadWorkoutLogs();
  }, []);

  const loadWorkoutLogs = () => {
    // Clear all existing data completely
    localStorage.clear();
    
    const logs: WorkoutLog[] = [
      {
        id: "new-log-1",
        date: new Date().toISOString(),
        name: "Morning Push Session",
        duration: "35 min",
        exercises: [
          {
            id: "exercise-1",
            name: "Dumbbell Chest Press",
            exerciseDbId: "dumbbell-chest-press",
            difficulty: "intermediate" as const,
            muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
            equipment: ["Dumbbells", "Bench"],
            setsData: [
              { setNumber: 1, targetReps: "8-10", actualReps: 10, weight: 22.5, completed: true },
              { setNumber: 2, targetReps: "8-10", actualReps: 9, weight: 25, completed: true },
              { setNumber: 3, targetReps: "8-10", actualReps: 8, weight: 25, completed: true }
            ]
          },
          {
            id: "exercise-2",
            name: "Overhead Press",
            exerciseDbId: "dumbbell-overhead-press",
            difficulty: "intermediate" as const,
            muscleGroups: ["Anterior Deltoids", "Medial Deltoids", "Triceps"],
            equipment: ["Dumbbells"],
            setsData: [
              { setNumber: 1, targetReps: "10-12", actualReps: 12, weight: 15, completed: true },
              { setNumber: 2, targetReps: "10-12", actualReps: 10, weight: 17.5, completed: true },
              { setNumber: 3, targetReps: "10-12", actualReps: 9, weight: 17.5, completed: true }
            ]
          }
        ]
      },
      {
        id: "new-log-2",
        date: new Date(Date.now() - 86400000).toISOString(),
        name: "Lower Body Power",
        duration: "40 min",
        exercises: [
          {
            id: "exercise-3",
            name: "Goblet Squats",
            exerciseDbId: "goblet-squat",
            difficulty: "beginner" as const,
            muscleGroups: ["Quadriceps", "Glutes", "Core"],
            equipment: ["Dumbbell"],
            setsData: [
              { setNumber: 1, targetReps: "12-15", actualReps: 15, weight: 20, completed: true },
              { setNumber: 2, targetReps: "12-15", actualReps: 14, weight: 22.5, completed: true },
              { setNumber: 3, targetReps: "12-15", actualReps: 13, weight: 22.5, completed: true },
              { setNumber: 4, targetReps: "12-15", actualReps: 12, weight: 25, completed: true }
            ]
          },
          {
            id: "exercise-4",
            name: "Walking Lunges",
            exerciseDbId: "walking-lunges",
            difficulty: "beginner" as const,
            muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
            equipment: ["Bodyweight"],
            setsData: [
              { setNumber: 1, targetReps: "20", actualReps: 20, weight: 0, completed: true },
              { setNumber: 2, targetReps: "20", actualReps: 18, weight: 0, completed: true },
              { setNumber: 3, targetReps: "20", actualReps: 16, weight: 0, completed: true }
            ]
          }
        ]
      },
      {
        id: "new-log-3",
        date: new Date(Date.now() - 172800000).toISOString(),
        name: "Back & Arms",
        duration: "45 min",
        exercises: [
          {
            id: "exercise-5",
            name: "Bent Over Rows",
            exerciseDbId: "bent-over-row",
            difficulty: "intermediate" as const,
            muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Biceps"],
            equipment: ["Dumbbells"],
            setsData: [
              { setNumber: 1, targetReps: "8-10", actualReps: 10, weight: 20, completed: true },
              { setNumber: 2, targetReps: "8-10", actualReps: 9, weight: 22.5, completed: true },
              { setNumber: 3, targetReps: "8-10", actualReps: 8, weight: 22.5, completed: true }
            ]
          },
          {
            id: "exercise-6",
            name: "Bicep Curls",
            exerciseDbId: "bicep-curls",
            difficulty: "beginner" as const,
            muscleGroups: ["Biceps"],
            equipment: ["Dumbbells"],
            setsData: [
              { setNumber: 1, targetReps: "12-15", actualReps: 15, weight: 10, completed: true },
              { setNumber: 2, targetReps: "12-15", actualReps: 14, weight: 12.5, completed: true },
              { setNumber: 3, targetReps: "12-15", actualReps: 12, weight: 12.5, completed: true }
            ]
          },
          {
            id: "exercise-7",
            name: "Tricep Dips",
            exerciseDbId: "tricep-dips",
            difficulty: "intermediate" as const,
            muscleGroups: ["Triceps", "Anterior Deltoids"],
            equipment: ["Bodyweight", "Chair"],
            setsData: [
              { setNumber: 1, targetReps: "10-12", actualReps: 12, weight: 0, completed: true },
              { setNumber: 2, targetReps: "10-12", actualReps: 10, weight: 0, completed: true },
              { setNumber: 3, targetReps: "10-12", actualReps: 8, weight: 0, completed: true }
            ]
          }
        ]
      }
    ];
    
    localStorage.setItem("workoutLogs", JSON.stringify(logs));
    
    // Sort by date, newest first
    logs.sort((a, b) => 
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