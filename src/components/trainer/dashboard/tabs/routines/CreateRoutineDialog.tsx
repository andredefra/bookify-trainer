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
import { Plus, Trash2, GripVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  }, [editingRoutine, open]);

  const handleAddExercise = () => {
    setExercises([...exercises, emptyExercise()]);
  };

  const handleRemoveExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((ex) => ex.id !== id));
    }
  };

  const handleExerciseChange = (id: string, field: keyof Exercise, value: any) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const handleSave = () => {
    const validExercises = exercises.filter((ex) => ex.name.trim() !== "");
    if (title.trim() && validExercises.length > 0) {
      onSave({
        title: title.trim(),
        description: description.trim() || undefined,
        exercises: validExercises,
      });
      onOpenChange(false);
    }
  };

  const isValid = title.trim() && exercises.some((ex) => ex.name.trim());

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
              <div className="space-y-3">
                {exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="flex items-start gap-2 p-3 border rounded-lg bg-muted/30"
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-grab" />
                    
                    <div className="flex-1 grid grid-cols-12 gap-2">
                      <div className="col-span-5">
                        <Input
                          placeholder="Exercise name"
                          value={exercise.name}
                          onChange={(e) =>
                            handleExerciseChange(exercise.id, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="1"
                          placeholder="Sets"
                          value={exercise.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              exercise.id,
                              "sets",
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          placeholder="Reps"
                          value={exercise.reps}
                          onChange={(e) =>
                            handleExerciseChange(exercise.id, "reps", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <select
                          className="flex h-9 w-full rounded-md border border-input bg-background px-2 py-1 text-sm"
                          value={exercise.repsUnit || "reps"}
                          onChange={(e) =>
                            handleExerciseChange(exercise.id, "repsUnit", e.target.value)
                          }
                        >
                          <option value="reps">reps</option>
                          <option value="sec">sec</option>
                          <option value="min">min</option>
                        </select>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveExercise(exercise.id)}
                          disabled={exercises.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
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
