
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExerciseLogItem } from "./ExerciseLogItem";
import { ExerciseLog } from "./types";

interface ExercisesListProps {
  exercises: ExerciseLog[];
  onAddExercise: () => void;
  onRemoveExercise: (id: string) => void;
  onExerciseChange: (id: string, field: keyof ExerciseLog, value: string | number) => void;
}

export function ExercisesList({ 
  exercises, 
  onAddExercise, 
  onRemoveExercise, 
  onExerciseChange 
}: ExercisesListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Exercises</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddExercise}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Exercise
        </Button>
      </div>
      
      {exercises.map((exercise) => (
        <ExerciseLogItem
          key={exercise.id}
          exercise={exercise}
          onRemove={onRemoveExercise}
          onChange={onExerciseChange}
          isRemoveDisabled={exercises.length === 1}
        />
      ))}
    </div>
  );
}
