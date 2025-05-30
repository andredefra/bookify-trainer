
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutSession } from "@/data/training/types";
import { ExerciseForm } from "./ExerciseForm";

interface WorkoutSessionPanelProps {
  session: WorkoutSession;
  activeSession: string;
  onAddExercise: (sessionId: string) => void;
  onUpdateExercise: (sessionId: string, exerciseId: string, field: string, value: any) => void;
  onRemoveExercise: (sessionId: string, exerciseId: string) => void;
}

export function WorkoutSessionPanel({
  session,
  activeSession,
  onAddExercise,
  onUpdateExercise,
  onRemoveExercise
}: WorkoutSessionPanelProps) {
  if (activeSession !== session.id) return null;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Session {session.sessionNumber}: {session.title}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddExercise(session.id)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
      </div>

      <div className="space-y-4">
        {session.exercises.map((exercise) => (
          <ExerciseForm
            key={exercise.id}
            exercise={exercise}
            onUpdate={(field, value) => onUpdateExercise(session.id, exercise.id, field, value)}
            onRemove={() => onRemoveExercise(session.id, exercise.id)}
          />
        ))}
        {session.exercises.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No exercises added yet. Click "Add Exercise" to get started.
          </p>
        )}
      </div>
    </div>
  );
}
