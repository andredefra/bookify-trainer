
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

  const handleAddExercise = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onAddExercise(session.id);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Session {session.sessionNumber}: {session.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure the exercises for this training session
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddExercise}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Exercise
        </Button>
      </div>

      <div className="space-y-4">
        {session.exercises.map((exercise, index) => (
          <div key={exercise.id} className="border rounded-lg p-4 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm text-muted-foreground">
                Exercise {index + 1}
              </h4>
            </div>
            <ExerciseForm
              exercise={exercise}
              onUpdate={(field, value) => onUpdateExercise(session.id, exercise.id, field, value)}
              onRemove={() => onRemoveExercise(session.id, exercise.id)}
            />
          </div>
        ))}
        {session.exercises.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500 mb-4">No exercises added yet</p>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddExercise}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Your First Exercise
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
