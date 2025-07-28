import { createContext, useContext, useState } from "react";
import { WorkoutExercise, WorkoutSet } from "@/data/training/workoutTypes";

interface WorkoutFormContextType {
  date: Date;
  setDate: (date: Date) => void;
  workoutName: string;
  setWorkoutName: (name: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  exercises: WorkoutExercise[];
  setExercises: (exercises: WorkoutExercise[]) => void;
  notes: string;
  setNotes: (notes: string) => void;
  addExercise: () => void;
  removeExercise: (id: string) => void;
  updateExercise: (id: string, updates: Partial<WorkoutExercise>) => void;
  updateExerciseSet: (exerciseId: string, setNumber: number, updates: Partial<WorkoutSet>) => void;
  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string) => void;
}

const WorkoutFormContext = createContext<WorkoutFormContextType | undefined>(undefined);

export function WorkoutFormProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState<Date>(new Date());
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    {
      id: "1",
      name: "",
      setsData: []
    }
  ]);

  const addExercise = () => {
    const newExercise: WorkoutExercise = {
      id: Math.random().toString(36).substring(7),
      name: "",
      setsData: []
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };

  const updateExercise = (id: string, updates: Partial<WorkoutExercise>) => {
    console.log("updateExercise called with:", { id, updates, currentExercises: exercises });
    setExercises(exercises.map(ex => {
      if (ex.id === id) {
        console.log("Updating exercise:", ex, "with updates:", updates);
        return { ...ex, ...updates };
      }
      return ex;
    }));
  };

  const updateExerciseSet = (exerciseId: string, setNumber: number, updates: Partial<WorkoutSet>) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const updatedSets = ex.setsData.map(set => 
          set.setNumber === setNumber ? { ...set, ...updates } : set
        );
        return { ...ex, setsData: updatedSets };
      }
      return ex;
    }));
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const newSet: WorkoutSet = {
          setNumber: ex.setsData.length + 1,
          targetReps: "8-12",
          completed: false
        };
        return { ...ex, setsData: [...ex.setsData, newSet] };
      }
      return ex;
    }));
  };

  const removeSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId && ex.setsData.length > 1) {
        const updatedSets = ex.setsData.slice(0, -1).map((set, index) => ({
          ...set,
          setNumber: index + 1
        }));
        return { ...ex, setsData: updatedSets };
      }
      return ex;
    }));
  };

  return (
    <WorkoutFormContext.Provider
      value={{
        date,
        setDate,
        workoutName,
        setWorkoutName,
        duration,
        setDuration,
        exercises,
        setExercises,
        notes,
        setNotes,
        addExercise,
        removeExercise,
        updateExercise,
        updateExerciseSet,
        addSet,
        removeSet
      }}
    >
      {children}
    </WorkoutFormContext.Provider>
  );
}

export function useWorkoutForm() {
  const context = useContext(WorkoutFormContext);
  if (context === undefined) {
    throw new Error("useWorkoutForm must be used within a WorkoutFormProvider");
  }
  return context;
}