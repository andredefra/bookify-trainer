import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExerciseItem } from "./ExerciseItem";
import { useWorkoutForm } from "./NewWorkoutFormContext";

export function ExercisesList() {
  const { 
    exercises, 
    addExercise, 
    removeExercise, 
    updateExercise,
    updateExerciseSet,
    addSet,
    removeSet
  } = useWorkoutForm();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Exercises</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addExercise}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Exercise
        </Button>
      </div>
      
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          onRemove={() => removeExercise(exercise.id)}
          onUpdate={(updates) => updateExercise(exercise.id, updates)}
          onUpdateSet={(setNumber, updates) => updateExerciseSet(exercise.id, setNumber, updates)}
          onAddSet={() => addSet(exercise.id)}
          onRemoveSet={() => removeSet(exercise.id)}
          isRemoveDisabled={exercises.length === 1}
        />
      ))}
    </div>
  );
}