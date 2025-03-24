
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ExerciseForm } from "./ExerciseForm";
import { WorkoutDay } from "./types";

interface WorkoutDayPanelProps {
  day: WorkoutDay;
  activeDay: string;
  onAddExercise: (dayId: string) => void;
  onUpdateExercise: (dayId: string, exerciseId: string, field: string, value: any) => void;
  onRemoveExercise: (dayId: string, exerciseId: string) => void;
}

export function WorkoutDayPanel({ 
  day, 
  activeDay, 
  onAddExercise, 
  onUpdateExercise, 
  onRemoveExercise 
}: WorkoutDayPanelProps) {
  if (activeDay !== day.id) return null;

  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{day.day}'s Workout</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddExercise(day.id)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
      </div>

      {day.exercises.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No exercises added for this day yet.
        </div>
      ) : (
        <div className="space-y-4">
          {day.exercises.map((exercise) => (
            <ExerciseForm
              key={exercise.id}
              exercise={exercise}
              dayId={day.id}
              onUpdate={onUpdateExercise}
              onRemove={onRemoveExercise}
            />
          ))}
        </div>
      )}
    </div>
  );
}
