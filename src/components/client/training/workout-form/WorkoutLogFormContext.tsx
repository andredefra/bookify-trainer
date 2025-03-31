
import { createContext, useContext, useState } from "react";
import { ExerciseLog } from "./types";

interface WorkoutLogFormContextType {
  date: Date;
  setDate: (date: Date) => void;
  workoutName: string;
  setWorkoutName: (name: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  exercises: ExerciseLog[];
  setExercises: (exercises: ExerciseLog[]) => void;
  handleAddExercise: () => void;
  handleRemoveExercise: (id: string) => void;
  handleExerciseChange: (id: string, field: keyof ExerciseLog, value: string | number) => void;
}

const WorkoutLogFormContext = createContext<WorkoutLogFormContextType | undefined>(undefined);

export function WorkoutLogFormProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState<Date>(new Date());
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [exercises, setExercises] = useState<ExerciseLog[]>([
    { id: "1", name: "", sets: 3, reps: 10, weight: 0 }
  ]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { 
        id: Math.random().toString(36).substring(7), 
        name: "", 
        sets: 3, 
        reps: 10, 
        weight: 0 
      }
    ]);
  };
  
  const handleRemoveExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };
  
  const handleExerciseChange = (id: string, field: keyof ExerciseLog, value: string | number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  return (
    <WorkoutLogFormContext.Provider
      value={{
        date,
        setDate,
        workoutName, 
        setWorkoutName,
        duration,
        setDuration,
        exercises,
        setExercises,
        handleAddExercise,
        handleRemoveExercise,
        handleExerciseChange
      }}
    >
      {children}
    </WorkoutLogFormContext.Provider>
  );
}

export function useWorkoutLogForm() {
  const context = useContext(WorkoutLogFormContext);
  if (context === undefined) {
    throw new Error("useWorkoutLogForm must be used within a WorkoutLogFormProvider");
  }
  return context;
}
