import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Exercise, Routine } from "@/data/training/types";
import { ArrowLeft, Save, Dumbbell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface CreateRoutineInlineProps {
  currentExercises: Exercise[];
  onSave: (routine: Routine) => void;
  onBack: () => void;
}

export function CreateRoutineInline({
  currentExercises,
  onSave,
  onBack,
}: CreateRoutineInlineProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<Set<string>>(
    new Set(currentExercises.map((ex) => ex.id))
  );

  const handleToggleExercise = (exerciseId: string) => {
    const newSelected = new Set(selectedExerciseIds);
    if (newSelected.has(exerciseId)) {
      newSelected.delete(exerciseId);
    } else {
      newSelected.add(exerciseId);
    }
    setSelectedExerciseIds(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedExerciseIds(new Set(currentExercises.map((ex) => ex.id)));
  };

  const handleSelectNone = () => {
    setSelectedExerciseIds(new Set());
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please enter a routine name");
      return;
    }

    if (selectedExerciseIds.size === 0) {
      toast.error("Please select at least one exercise");
      return;
    }

    const selectedExercises = currentExercises.filter((ex) =>
      selectedExerciseIds.has(ex.id)
    );

    const newRoutine: Routine = {
      id: `routine-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || undefined,
      exercises: selectedExercises.map((ex) => ({
        ...ex,
        id: `${ex.id}-routine-${Date.now()}`,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newRoutine);
    toast.success(`Routine "${title}" saved to your library`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h3 className="font-semibold">Create New Routine</h3>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="routine-title" className="text-sm">
            Routine Name *
          </Label>
          <Input
            id="routine-title"
            placeholder="e.g., Leg Day Warmup"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="routine-description" className="text-sm">
            Description (optional)
          </Label>
          <Textarea
            id="routine-description"
            placeholder="Brief description of this routine"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 min-h-[60px]"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm">
            Select Exercises ({selectedExerciseIds.size} of {currentExercises.length})
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={handleSelectNone}
            >
              Clear
            </Button>
          </div>
        </div>

        {currentExercises.length > 0 ? (
          <ScrollArea className="h-[200px] border rounded-md p-2">
            <div className="space-y-2">
              {currentExercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50"
                >
                  <Checkbox
                    id={exercise.id}
                    checked={selectedExerciseIds.has(exercise.id)}
                    onCheckedChange={() => handleToggleExercise(exercise.id)}
                  />
                  <label
                    htmlFor={exercise.id}
                    className="flex-1 flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <span className="text-muted-foreground w-5">{index + 1}.</span>
                    <span className="flex-1">{exercise.name || "(Unnamed exercise)"}</span>
                    <span className="text-muted-foreground text-xs">
                      {exercise.sets}×{exercise.reps} {exercise.repsUnit || "reps"}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-muted-foreground border rounded-md">
            <Dumbbell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No exercises in current session</p>
            <p className="text-xs">Add exercises first to create a routine</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!title.trim() || selectedExerciseIds.size === 0}
        >
          <Save className="h-4 w-4 mr-1" />
          Save Routine
        </Button>
      </div>
    </div>
  );
}
