import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Routine, Exercise } from "@/data/training/types";
import { Plus, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExerciseRowWithSelector } from "@/components/trainer/training/builder/ExerciseRowWithSelector";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CreateRoutineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (routine: Omit<Routine, "id" | "createdAt" | "updatedAt">) => void;
  editingRoutine?: Routine | null;
}

const emptyExercise = (): Exercise => ({
  id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  sets: 3,
  reps: "10",
  repsUnit: "reps",
  exerciseDbId: undefined,
});

export function CreateRoutineDialog({
  open,
  onOpenChange,
  onSave,
  editingRoutine,
}: CreateRoutineDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([emptyExercise()]);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (editingRoutine) {
      setTitle(editingRoutine.title);
      setDescription(editingRoutine.description || "");
      setExercises(editingRoutine.exercises.length > 0 ? editingRoutine.exercises : [emptyExercise()]);
    } else {
      setTitle("");
      setDescription("");
      setExercises([emptyExercise()]);
    }
    setValidationError(null);
  }, [editingRoutine, open]);

  const handleAddExercise = () => {
    setExercises([...exercises, emptyExercise()]);
    setValidationError(null);
  };

  const handleRemoveExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((ex) => ex.id !== id));
      setValidationError(null);
    }
  };

  const handleExerciseUpdate = (id: string, updatedExercise: Exercise) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? updatedExercise : ex))
    );
    setValidationError(null);
  };

  const validateExercises = (): string | null => {
    const exercisesWithNames = exercises.filter((ex) => ex.name.trim());
    
    if (exercisesWithNames.length === 0) {
      return "Please add at least one exercise.";
    }

    const unlinkedExercises = exercisesWithNames.filter((ex) => !ex.exerciseDbId);
    if (unlinkedExercises.length > 0) {
      return `${unlinkedExercises.length} exercise(s) are not linked to the database. Please select from the list or create new exercises.`;
    }

    return null;
  };

  const handleSave = () => {
    const error = validateExercises();
    if (error) {
      setValidationError(error);
      return;
    }

    const validExercises = exercises.filter((ex) => ex.name.trim() && ex.exerciseDbId);
    if (title.trim() && validExercises.length > 0) {
      onSave({
        title: title.trim(),
        description: description.trim() || undefined,
        exercises: validExercises,
      });
      onOpenChange(false);
    }
  };

  const hasLinkedExercises = exercises.some((ex) => ex.name.trim() && ex.exerciseDbId);
  const isValid = title.trim() && hasLinkedExercises;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {editingRoutine ? "Edit Routine" : "Create Routine"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          <div className="space-y-2">
            <Label htmlFor="routine-title">Routine Title</Label>
            <Input
              id="routine-title"
              placeholder="e.g., Leg Day Warmup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="routine-description">Description (optional)</Label>
            <Textarea
              id="routine-description"
              placeholder="Brief description of this routine"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Exercises</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddExercise}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Exercise
              </Button>
            </div>

            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-2">
                {exercises.map((exercise, index) => (
                  <ExerciseRowWithSelector
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                    onExerciseChange={(updatedExercise) => 
                      handleExerciseUpdate(exercise.id, updatedExercise)
                    }
                    onRemove={() => handleRemoveExercise(exercise.id)}
                    showDragHandle={true}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            {editingRoutine ? "Save Changes" : "Create Routine"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
