import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface ProgramExerciseEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programName: string;
  initialExercises?: Exercise[];
  onSave: (exercises: Exercise[]) => void;
}

const defaultExercises: Exercise[] = [
  { id: "1", name: "Barbell Squat", sets: 4, reps: "8-10", rest: "90s" },
  { id: "2", name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: "60s" },
];

export function ProgramExerciseEditor({
  open,
  onOpenChange,
  programName,
  initialExercises,
  onSave,
}: ProgramExerciseEditorProps) {
  const [exercises, setExercises] = useState<Exercise[]>(
    initialExercises || defaultExercises
  );

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Date.now().toString(),
        name: "",
        sets: 3,
        reps: "10",
        rest: "60s",
      },
    ]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string | number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const handleSave = () => {
    const validExercises = exercises.filter((ex) => ex.name.trim() !== "");
    onSave(validExercises);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Program Exercises</DialogTitle>
          <DialogDescription>
            Add and modify exercises for "{programName}"
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-2">
              <div className="col-span-1"></div>
              <div className="col-span-4">Exercise</div>
              <div className="col-span-2">Sets</div>
              <div className="col-span-2">Reps</div>
              <div className="col-span-2">Rest</div>
              <div className="col-span-1"></div>
            </div>

            {/* Exercise Rows */}
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="grid grid-cols-12 gap-2 items-center p-2 bg-muted/30 rounded-lg"
              >
                <div className="col-span-1 flex items-center justify-center">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                </div>
                <div className="col-span-4">
                  <Input
                    placeholder="Exercise name"
                    value={exercise.name}
                    onChange={(e) => updateExercise(exercise.id, "name", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={exercise.sets}
                    onChange={(e) =>
                      updateExercise(exercise.id, "sets", parseInt(e.target.value) || 1)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="8-10"
                    value={exercise.reps}
                    onChange={(e) => updateExercise(exercise.id, "reps", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="60s"
                    value={exercise.rest}
                    onChange={(e) => updateExercise(exercise.id, "rest", e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExercise(exercise.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Notes Section (optional per exercise) */}
            {exercises.length > 0 && (
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Click on an exercise to add notes (optional)
                </p>
              </div>
            )}

            {/* Add Exercise Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={addExercise}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Button>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Exercises ({exercises.filter((e) => e.name.trim()).length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
