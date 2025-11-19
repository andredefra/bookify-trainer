import { useState, useEffect } from 'react';
import { WorkoutLog } from '@/data/training/workoutTypes';

export function useWorkoutLogs() {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    // Force clear everything and reload with fresh data
    localStorage.clear();
    loadWorkoutLogs();
  }, []);

  const loadWorkoutLogs = () => {
    // Clear all existing data completely
    localStorage.clear();
    
    const logs: WorkoutLog[] = [
      {
        id: "workout-fresh-1",
        date: new Date().toISOString(),
        name: "Upper Body Strength",
        duration: "52 min",
        exercises: [
          {
            id: "ex-1",
            name: "Bench Press",
            exerciseDbId: "bench-press",
            difficulty: "intermediate" as const,
            muscleGroups: ["Pectorals", "Triceps", "Anterior Deltoids"],
            equipment: ["Barbell", "Bench"],
            notes: "Focus on controlled movement",
            setsData: [
              { setNumber: 1, targetReps: "6-8", actualReps: 8, weight: 80, completed: true, notes: "Warm up set" },
              { setNumber: 2, targetReps: "6-8", actualReps: 7, weight: 90, completed: true },
              { setNumber: 3, targetReps: "6-8", actualReps: 6, weight: 95, completed: true },
              { setNumber: 4, targetReps: "6-8", actualReps: 5, weight: 100, completed: true, notes: "PR attempt" },
              { setNumber: 5, targetReps: "6-8", actualReps: 8, weight: 85, completed: true, notes: "Drop set" }
            ]
          },
          {
            id: "ex-2",
            name: "Pull-ups",
            exerciseDbId: "pull-ups",
            difficulty: "advanced" as const,
            muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Biceps"],
            equipment: ["Pull-up Bar"],
            setsData: [
              { setNumber: 1, targetReps: "8-12", actualReps: 12, weight: 0, completed: true },
              { setNumber: 2, targetReps: "8-12", actualReps: 10, weight: 5, completed: true, notes: "Added weight" },
              { setNumber: 3, targetReps: "8-12", actualReps: 8, weight: 10, completed: true },
              { setNumber: 4, targetReps: "8-12", actualReps: 6, weight: 10, completed: true }
            ]
          },
          {
            id: "ex-3",
            name: "Overhead Press",
            exerciseDbId: "overhead-press",
            difficulty: "intermediate" as const,
            muscleGroups: ["Anterior Deltoids", "Triceps"],
            equipment: ["Barbell"],
            setsData: [
              { setNumber: 1, targetReps: "8-10", actualReps: 10, weight: 45, completed: true },
              { setNumber: 2, targetReps: "8-10", actualReps: 9, weight: 55, completed: true },
              { setNumber: 3, targetReps: "8-10", actualReps: 8, weight: 60, completed: true },
              { setNumber: 4, targetReps: "8-10", actualReps: 7, weight: 65, completed: true }
            ]
          }
        ]
      },
      {
        id: "workout-fresh-2",
        date: new Date(Date.now() - 86400000).toISOString(),
        name: "Leg Day Intensity",
        duration: "65 min",
        exercises: [
          {
            id: "ex-4",
            name: "Squats",
            exerciseDbId: "squats",
            difficulty: "intermediate" as const,
            muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
            equipment: ["Barbell", "Squat Rack"],
            notes: "Focus on depth and form",
            setsData: [
              { setNumber: 1, targetReps: "6-8", actualReps: 8, weight: 100, completed: true, notes: "Warm up" },
              { setNumber: 2, targetReps: "6-8", actualReps: 7, weight: 120, completed: true },
              { setNumber: 3, targetReps: "6-8", actualReps: 6, weight: 140, completed: true },
              { setNumber: 4, targetReps: "6-8", actualReps: 6, weight: 145, completed: true, notes: "Good depth" },
              { setNumber: 5, targetReps: "6-8", actualReps: 8, weight: 125, completed: true, notes: "Back-off set" }
            ]
          },
          {
            id: "ex-5",
            name: "Romanian Deadlifts",
            exerciseDbId: "romanian-deadlifts",
            difficulty: "intermediate" as const,
            muscleGroups: ["Hamstrings", "Glutes", "Lower Back"],
            equipment: ["Barbell"],
            setsData: [
              { setNumber: 1, targetReps: "10-12", actualReps: 12, weight: 80, completed: true },
              { setNumber: 2, targetReps: "10-12", actualReps: 11, weight: 90, completed: true },
              { setNumber: 3, targetReps: "10-12", actualReps: 10, weight: 100, completed: true },
              { setNumber: 4, targetReps: "10-12", actualReps: 10, weight: 105, completed: true }
            ]
          },
          {
            id: "ex-6",
            name: "Leg Press",
            exerciseDbId: "leg-press",
            difficulty: "beginner" as const,
            muscleGroups: ["Quadriceps", "Glutes"],
            equipment: ["Leg Press Machine"],
            setsData: [
              { setNumber: 1, targetReps: "15-20", actualReps: 20, weight: 180, completed: true },
              { setNumber: 2, targetReps: "15-20", actualReps: 18, weight: 200, completed: true },
              { setNumber: 3, targetReps: "15-20", actualReps: 15, weight: 220, completed: true },
              { setNumber: 4, targetReps: "15-20", actualReps: 15, weight: 230, completed: true }
            ]
          },
          {
            id: "ex-7",
            name: "Calf Raises",
            exerciseDbId: "calf-raises",
            difficulty: "beginner" as const,
            muscleGroups: ["Calves"],
            equipment: ["Dumbbells"],
            setsData: [
              { setNumber: 1, targetReps: "15-20", actualReps: 20, weight: 30, completed: true },
              { setNumber: 2, targetReps: "15-20", actualReps: 18, weight: 35, completed: true },
              { setNumber: 3, targetReps: "15-20", actualReps: 16, weight: 40, completed: true }
            ]
          }
        ]
      },
      {
        id: "workout-fresh-3",
        date: new Date(Date.now() - 172800000).toISOString(),
        name: "Full Body Circuit",
        duration: "48 min",
        exercises: [
          {
            id: "ex-8",
            name: "Deadlifts",
            exerciseDbId: "deadlifts",
            difficulty: "advanced" as const,
            muscleGroups: ["Hamstrings", "Glutes", "Lower Back", "Traps"],
            equipment: ["Barbell"],
            notes: "Focus on hip hinge pattern",
            setsData: [
              { setNumber: 1, targetReps: "5", actualReps: 5, weight: 120, completed: true, notes: "Warm up" },
              { setNumber: 2, targetReps: "5", actualReps: 5, weight: 150, completed: true },
              { setNumber: 3, targetReps: "5", actualReps: 5, weight: 170, completed: true },
              { setNumber: 4, targetReps: "5", actualReps: 4, weight: 180, completed: true, notes: "Almost failed" },
              { setNumber: 5, targetReps: "5", actualReps: 5, weight: 160, completed: true }
            ]
          },
          {
            id: "ex-9",
            name: "Push-ups",
            exerciseDbId: "push-ups",
            difficulty: "beginner" as const,
            muscleGroups: ["Pectorals", "Triceps", "Core"],
            equipment: ["Bodyweight"],
            setsData: [
              { setNumber: 1, targetReps: "15-20", actualReps: 20, weight: 0, completed: true },
              { setNumber: 2, targetReps: "15-20", actualReps: 18, weight: 0, completed: true },
              { setNumber: 3, targetReps: "15-20", actualReps: 15, weight: 0, completed: true },
              { setNumber: 4, targetReps: "15-20", actualReps: 12, weight: 0, completed: true, notes: "Fatigue" }
            ]
          },
          {
            id: "ex-10",
            name: "Plank",
            exerciseDbId: "plank",
            difficulty: "beginner" as const,
            muscleGroups: ["Core", "Shoulders"],
            equipment: ["Bodyweight"],
            setsData: [
              { setNumber: 1, targetReps: "60s", actualReps: 60, weight: 0, completed: true, notes: "Hold time in seconds" },
              { setNumber: 2, targetReps: "60s", actualReps: 45, weight: 0, completed: true },
              { setNumber: 3, targetReps: "60s", actualReps: 40, weight: 0, completed: true }
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

  const updateWorkoutLog = (id: string, workout: Omit<WorkoutLog, 'id'>) => {
    const updatedLogs = workoutLogs.map(log => 
      log.id === id ? { ...workout, id } : log
    );
    
    const sortedLogs = updatedLogs.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setWorkoutLogs(sortedLogs);
    localStorage.setItem('workoutLogs', JSON.stringify(sortedLogs));
    
    return { ...workout, id };
  };

  const deleteWorkoutLog = (id: string) => {
    const updatedLogs = workoutLogs.filter(log => log.id !== id);
    setWorkoutLogs(updatedLogs);
    localStorage.setItem("workoutLogs", JSON.stringify(updatedLogs));
  };

  return {
    workoutLogs,
    addWorkoutLog,
    updateWorkoutLog,
    deleteWorkoutLog,
    refreshLogs: loadWorkoutLogs
  };
}