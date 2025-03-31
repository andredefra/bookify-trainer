
import { useToast } from "@/hooks/use-toast";
import { ExercisesList } from "./ExercisesList";
import { WorkoutFormHeader } from "./WorkoutFormHeader";
import { WorkoutFormButtons } from "./WorkoutFormButtons";
import { WorkoutLogFormProvider, useWorkoutLogForm } from "./WorkoutLogFormContext";

interface WorkoutLogFormProps {
  onComplete: () => void;
}

function WorkoutLogFormContent({ onComplete }: WorkoutLogFormProps) {
  const { toast } = useToast();
  const { date, workoutName, exercises, duration } = useWorkoutLogForm();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    // For now we'll just save to localStorage
    const workoutLogs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
    const newWorkout = {
      id: Date.now().toString(),
      date: date.toISOString(),
      name: workoutName || "Workout",
      exercises: exercises.filter(ex => ex.name.trim() !== ""),
      duration: duration || undefined
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
        <WorkoutFormHeader />
        <ExercisesList />
      </div>
      
      <WorkoutFormButtons onCancel={onComplete} />
    </form>
  );
}

export function WorkoutLogForm(props: WorkoutLogFormProps) {
  return (
    <WorkoutLogFormProvider>
      <WorkoutLogFormContent {...props} />
    </WorkoutLogFormProvider>
  );
}
