
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExerciseLogItem } from "./ExerciseLogItem";
import { useWorkoutLogForm } from "./WorkoutLogFormContext";

export function ExercisesList() {
  const { 
    exercises, 
    handleAddExercise, 
    handleRemoveExercise, 
    handleExerciseChange 
  } = useWorkoutLogForm();

  return (
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
      
      {exercises.map((exercise) => (
        <ExerciseLogItem
          key={exercise.id}
          exercise={exercise}
          onRemove={handleRemoveExercise}
          onChange={handleExerciseChange}
          isRemoveDisabled={exercises.length === 1}
        />
      ))}
    </div>
  );
}
