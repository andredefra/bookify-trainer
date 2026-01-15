import { useState } from "react";
import { Routine, Exercise } from "@/data/training/types";

// Mock routines data
const initialRoutines: Routine[] = [
  {
    id: "routine-1",
    title: "Leg Day Warmup",
    description: "Complete lower body warmup to prepare for heavy lifting",
    exercises: [
      { id: "ex-1", name: "Leg Swings", sets: 2, reps: "15", repsUnit: "reps" },
      { id: "ex-2", name: "Hip Circles", sets: 2, reps: "10", repsUnit: "reps" },
      { id: "ex-3", name: "Bodyweight Squats", sets: 2, reps: "15", repsUnit: "reps" },
      { id: "ex-4", name: "Walking Lunges", sets: 2, reps: "10", repsUnit: "reps" },
      { id: "ex-5", name: "Calf Raises", sets: 2, reps: "20", repsUnit: "reps" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "routine-2",
    title: "Core Circuit",
    description: "High-intensity core workout for building stability",
    exercises: [
      { id: "ex-6", name: "Plank", sets: 3, reps: "45", repsUnit: "sec" },
      { id: "ex-7", name: "Russian Twists", sets: 3, reps: "20", repsUnit: "reps" },
      { id: "ex-8", name: "Mountain Climbers", sets: 3, reps: "30", repsUnit: "sec" },
      { id: "ex-9", name: "Dead Bug", sets: 3, reps: "12", repsUnit: "reps" },
      { id: "ex-10", name: "Bicycle Crunches", sets: 3, reps: "20", repsUnit: "reps" },
      { id: "ex-11", name: "Hollow Hold", sets: 3, reps: "30", repsUnit: "sec" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "routine-3",
    title: "Upper Body Push Warmup",
    description: "Shoulder and chest activation before pressing movements",
    exercises: [
      { id: "ex-12", name: "Arm Circles", sets: 2, reps: "15", repsUnit: "reps" },
      { id: "ex-13", name: "Band Pull-Aparts", sets: 2, reps: "15", repsUnit: "reps" },
      { id: "ex-14", name: "Push-Up Plus", sets: 2, reps: "10", repsUnit: "reps" },
      { id: "ex-15", name: "Wall Slides", sets: 2, reps: "10", repsUnit: "reps" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);

  const addRoutine = (routine: Omit<Routine, "id" | "createdAt" | "updatedAt">) => {
    const newRoutine: Routine = {
      ...routine,
      id: `routine-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRoutines((prev) => [...prev, newRoutine]);
    return newRoutine;
  };

  const updateRoutine = (id: string, updates: Partial<Routine>) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === id
          ? { ...routine, ...updates, updatedAt: new Date().toISOString() }
          : routine
      )
    );
  };

  const deleteRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((routine) => routine.id !== id));
  };

  const getRoutineById = (id: string) => {
    return routines.find((routine) => routine.id === id);
  };

  // Import routine exercises (creates copies, not references)
  const importRoutineExercises = (routineId: string): Exercise[] => {
    const routine = getRoutineById(routineId);
    if (!routine) return [];
    
    // Create new IDs for imported exercises
    return routine.exercises.map((exercise) => ({
      ...exercise,
      id: `${exercise.id}-copy-${Date.now()}`,
    }));
  };

  return {
    routines,
    addRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutineById,
    importRoutineExercises,
  };
}
