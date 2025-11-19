import { useToast } from "@/hooks/use-toast";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { ExercisesList } from "./NewExercisesList";
import { WorkoutFormHeader } from "./NewWorkoutFormHeader";
import { WorkoutFormButtons } from "./NewWorkoutFormButtons";
import { WorkoutFormProvider, useWorkoutForm } from "./NewWorkoutFormContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NewWorkoutLogFormProps {
  onComplete: () => void;
  existingWorkout?: any;
}

function WorkoutLogFormContent({ onComplete, existingWorkout }: NewWorkoutLogFormProps) {
  const { toast } = useToast();
  const { addWorkoutLog, updateWorkoutLog } = useWorkoutLogs();
  const { 
    date, 
    workoutName, 
    duration, 
    notes, 
    setNotes, 
    exercises 
  } = useWorkoutForm();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out exercises without names
    const validExercises = exercises.filter(ex => ex.name.trim() !== "");
    
    if (validExercises.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one exercise",
        variant: "destructive"
      });
      return;
    }
    
    // Create or update workout log
    if (existingWorkout?.id) {
      updateWorkoutLog(existingWorkout.id, {
        date: date.toISOString(),
        name: workoutName || "Workout",
        exercises: validExercises,
        duration: duration || undefined,
        notes: notes || undefined
      });
      
      toast({
        title: "Workout updated successfully",
        description: `Your ${workoutName || "workout"} has been updated`
      });
    } else {
      addWorkoutLog({
        date: date.toISOString(),
        name: workoutName || "Workout",
        exercises: validExercises,
        duration: duration || undefined,
        notes: notes || undefined
      });
      
      toast({
        title: "Workout logged successfully",
        description: `Your ${workoutName || "workout"} has been saved`
      });
    }
    
    onComplete();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <WorkoutFormHeader />
      
      <ExercisesList />
      
      {/* Workout Notes */}
      <div className="space-y-2">
        <Label htmlFor="workout-notes">Workout Notes</Label>
        <Textarea
          id="workout-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add general notes about this workout..."
          className="min-h-[80px]"
        />
      </div>
      
      <WorkoutFormButtons onCancel={onComplete} />
    </form>
  );
}

export function NewWorkoutLogForm(props: NewWorkoutLogFormProps) {
  return (
    <WorkoutFormProvider initialWorkout={props.existingWorkout}>
      <WorkoutLogFormContent {...props} />
    </WorkoutFormProvider>
  );
}