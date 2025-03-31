
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { DateSelector } from "./DateSelector";
import { ExercisesList } from "./ExercisesList";
import { ExerciseLog } from "./types";

interface WorkoutLogFormProps {
  onComplete: () => void;
}

export function WorkoutLogForm({ onComplete }: WorkoutLogFormProps) {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [workoutName, setWorkoutName] = useState("");
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    // For now we'll just save to localStorage
    const workoutLogs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
    const newWorkout = {
      id: Date.now().toString(),
      date: date.toISOString(),
      name: workoutName || "Workout",
      exercises: exercises.filter(ex => ex.name.trim() !== "")
    };
    
    workoutLogs.push(newWorkout);
    localStorage.setItem("workoutLogs", JSON.stringify(workoutLogs));
    
    toast({
      title: "Workout logged successfully",
      description: `Your ${workoutName || "workout"} has been saved`
    });
    
    onComplete();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Workout Name</label>
            <Input
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g., Leg Day, Upper Body, etc."
              className="w-full"
            />
          </div>
          
          <DateSelector date={date} onDateChange={setDate} />
        </div>

        <ExercisesList 
          exercises={exercises}
          onAddExercise={handleAddExercise}
          onRemoveExercise={handleRemoveExercise}
          onExerciseChange={handleExerciseChange}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button type="submit">
          Save Workout
        </Button>
      </div>
    </form>
  );
}
