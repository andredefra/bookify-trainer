import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Exercise, Routine } from "@/data/training/types";
import { Plus, Trash2, GripVertical, Layers } from "lucide-react";
import { ImportRoutineDialog } from "./ImportRoutineDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PatternDayPanelProps {
  dayNumber: number;
  title: string;
  exercises: Exercise[];
  onTitleChange: (title: string) => void;
  onExercisesChange: (exercises: Exercise[]) => void;
  routines: Routine[];
  sessionsPerWeek: number;
}

const createEmptyExercise = (): Exercise => ({
  id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  sets: 3,
  reps: "10",
  repsUnit: "reps",
});

export function PatternDayPanel({
  dayNumber,
  title,
  exercises,
  onTitleChange,
  onExercisesChange,
  routines,
  sessionsPerWeek,
}: PatternDayPanelProps) {
  const [showImportDialog, setShowImportDialog] = useState(false);

  const handleAddExercise = () => {
    onExercisesChange([...exercises, createEmptyExercise()]);
  };

  const handleRemoveExercise = (id: string) => {
    onExercisesChange(exercises.filter((ex) => ex.id !== id));
  };

  const handleExerciseChange = (id: string, field: keyof Exercise, value: any) => {
    onExercisesChange(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const handleImportRoutine = (routine: Routine) => {
    // Copy exercises from routine with new IDs
    const importedExercises = routine.exercises.map((ex) => ({
      ...ex,
      id: `${ex.id}-import-${Date.now()}`,
    }));
    onExercisesChange([...exercises, ...importedExercises]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder={`Day ${dayNumber} - e.g., Leg Day`}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="max-w-xs font-medium"
        />
        <span className="text-xs text-muted-foreground">
          Repeats for Week 1-N, Day {dayNumber}
        </span>
      </div>

      <ScrollArea className="h-[280px]">
        <div className="space-y-2 pr-4">
          {exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="flex items-center gap-2 p-2 border rounded-md bg-background"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <span className="text-xs text-muted-foreground w-5">{index + 1}.</span>
                <Input
                  placeholder="Exercise name"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, "name", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="1"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(
                      exercise.id,
                      "sets",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="w-16 text-center"
                />
                <span className="text-muted-foreground">×</span>
                <Input
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, "reps", e.target.value)
                  }
                  className="w-20"
                />
                <select
                  className="h-9 px-2 rounded-md border text-sm bg-background"
                  value={exercise.repsUnit || "reps"}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, "repsUnit", e.target.value)
                  }
                >
                  <option value="reps">reps</option>
                  <option value="sec">sec</option>
                  <option value="min">min</option>
                </select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveExercise(exercise.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
              <p className="text-sm">No exercises yet</p>
              <p className="text-xs">Add exercises or import a routine</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-2 border-t">
        <Button type="button" variant="outline" size="sm" onClick={handleAddExercise}>
          <Plus className="h-4 w-4 mr-1" />
          Add Exercise
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowImportDialog(true)}
        >
          <Layers className="h-4 w-4 mr-1" />
          Import Routine
        </Button>
      </div>

      <ImportRoutineDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        routines={routines}
        onImport={handleImportRoutine}
      />
    </div>
  );
}
