
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExerciseLog {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface WorkoutLogFormProps {
  onComplete: () => void;
}

export function WorkoutLogForm({ onComplete }: WorkoutLogFormProps) {
  const { toast } = useToast();
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
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Exercises</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddExercise}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Exercise
            </Button>
          </div>
          
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="grid grid-cols-12 gap-2 items-center border p-3 rounded-md">
              <div className="col-span-12 md:col-span-4">
                <Input
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(exercise.id, "name", e.target.value)}
                  placeholder="Exercise name"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(exercise.id, "sets", parseInt(e.target.value))}
                  placeholder="Sets"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(exercise.id, "reps", parseInt(e.target.value))}
                  placeholder="Reps"
                />
              </div>
              <div className="col-span-4 md:col-span-3">
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={exercise.weight}
                    onChange={(e) => handleExerciseChange(exercise.id, "weight", parseFloat(e.target.value))}
                    placeholder="Weight"
                  />
                  <span className="ml-2">kg</span>
                </div>
              </div>
              <div className="col-span-8 md:col-span-1 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExercise(exercise.id)}
                  disabled={exercises.length === 1}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
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
