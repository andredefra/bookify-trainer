import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Exercise, Routine, Circuit, SessionItem } from "@/data/training/types";
import { Plus, Trash2, GripVertical, Layers, ChevronDown, Dumbbell, RotateCcw } from "lucide-react";
import { ImportRoutineDialog } from "./ImportRoutineDialog";
import { CircuitContainer } from "./CircuitContainer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatternDayPanelProps {
  dayNumber: number;
  title: string;
  exercises: Exercise[];
  items?: SessionItem[];
  onTitleChange: (title: string) => void;
  onExercisesChange: (exercises: Exercise[]) => void;
  onItemsChange?: (items: SessionItem[]) => void;
  routines: Routine[];
  sessionsPerWeek: number;
  onCreateRoutine?: (routine: Routine) => void;
}

const createEmptyExercise = (): Exercise => ({
  id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  sets: 3,
  reps: "10",
  repsUnit: "reps",
});

const createEmptyCircuit = (): Circuit => ({
  id: `circuit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  rounds: 3,
  restBetweenRounds: 60,
  exercises: [],
});

export function PatternDayPanel({
  dayNumber,
  title,
  exercises,
  items = [],
  onTitleChange,
  onExercisesChange,
  onItemsChange,
  routines,
  sessionsPerWeek,
  onCreateRoutine,
}: PatternDayPanelProps) {
  const [showImportDialog, setShowImportDialog] = useState(false);

  // Use items if available, otherwise fall back to exercises-only mode
  const useItemsMode = onItemsChange !== undefined;

  const handleAddExercise = () => {
    const newExercise = createEmptyExercise();
    if (useItemsMode) {
      onItemsChange?.([...items, { type: 'exercise', data: newExercise }]);
    } else {
      onExercisesChange([...exercises, newExercise]);
    }
  };

  const handleAddCircuit = () => {
    if (useItemsMode) {
      const newCircuit = createEmptyCircuit();
      onItemsChange?.([...items, { type: 'circuit', data: newCircuit }]);
    }
  };

  const handleRemoveExercise = (id: string) => {
    onExercisesChange(exercises.filter((ex) => ex.id !== id));
  };

  const handleRemoveItem = (itemId: string) => {
    if (useItemsMode) {
      onItemsChange?.(items.filter((item) => item.data.id !== itemId));
    }
  };

  const handleExerciseChange = (id: string, field: keyof Exercise, value: any) => {
    onExercisesChange(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const handleItemExerciseChange = (itemIndex: number, field: keyof Exercise, value: any) => {
    if (!useItemsMode) return;
    const newItems = [...items];
    const item = newItems[itemIndex];
    if (item.type === 'exercise') {
      newItems[itemIndex] = {
        ...item,
        data: { ...item.data, [field]: value },
      };
      onItemsChange?.(newItems);
    }
  };

  const handleCircuitChange = (itemIndex: number, circuit: Circuit) => {
    if (!useItemsMode) return;
    const newItems = [...items];
    newItems[itemIndex] = { type: 'circuit', data: circuit };
    onItemsChange?.(newItems);
  };

  const handleImportRoutine = (routine: Routine) => {
    // Copy exercises from routine with new IDs
    const importedExercises = routine.exercises.map((ex) => ({
      ...ex,
      id: `${ex.id}-import-${Date.now()}`,
    }));
    
    if (useItemsMode) {
      const newItems: SessionItem[] = importedExercises.map((ex) => ({
        type: 'exercise',
        data: ex,
      }));
      onItemsChange?.([...items, ...newItems]);
    } else {
      onExercisesChange([...exercises, ...importedExercises]);
    }
  };

  // Get all exercises for "Create New Routine" feature
  const allExercises = useItemsMode
    ? items.flatMap((item) =>
        item.type === 'exercise'
          ? [item.data]
          : item.data.exercises
      )
    : exercises;

  const renderExerciseRow = (exercise: Exercise, index: number, isItemMode: boolean, itemIndex?: number) => (
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
          isItemMode && itemIndex !== undefined
            ? handleItemExerciseChange(itemIndex, "name", e.target.value)
            : handleExerciseChange(exercise.id, "name", e.target.value)
        }
        className="flex-1"
      />
      <Input
        type="number"
        min="1"
        value={exercise.sets}
        onChange={(e) =>
          isItemMode && itemIndex !== undefined
            ? handleItemExerciseChange(itemIndex, "sets", parseInt(e.target.value) || 1)
            : handleExerciseChange(exercise.id, "sets", parseInt(e.target.value) || 1)
        }
        className="w-16 text-center"
      />
      <span className="text-muted-foreground">×</span>
      <Input
        placeholder="Reps"
        value={exercise.reps}
        onChange={(e) =>
          isItemMode && itemIndex !== undefined
            ? handleItemExerciseChange(itemIndex, "reps", e.target.value)
            : handleExerciseChange(exercise.id, "reps", e.target.value)
        }
        className="w-20"
      />
      <select
        className="h-9 px-2 rounded-md border text-sm bg-background"
        value={exercise.repsUnit || "reps"}
        onChange={(e) =>
          isItemMode && itemIndex !== undefined
            ? handleItemExerciseChange(itemIndex, "repsUnit", e.target.value)
            : handleExerciseChange(exercise.id, "repsUnit", e.target.value)
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
        onClick={() =>
          isItemMode ? handleRemoveItem(exercise.id) : handleRemoveExercise(exercise.id)
        }
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

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
          {useItemsMode ? (
            items.length > 0 ? (
              items.map((item, index) => (
                item.type === 'exercise' ? (
                  renderExerciseRow(item.data, index, true, index)
                ) : (
                  <CircuitContainer
                    key={item.data.id}
                    circuit={item.data}
                    index={index}
                    onCircuitChange={(circuit) => handleCircuitChange(index, circuit)}
                    onRemoveCircuit={() => handleRemoveItem(item.data.id)}
                  />
                )
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <p className="text-sm">No exercises yet</p>
                <p className="text-xs">Add exercises, circuits, or import a routine</p>
              </div>
            )
          ) : (
            exercises.length > 0 ? (
              exercises.map((exercise, index) =>
                renderExerciseRow(exercise, index, false)
              )
            ) : (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <p className="text-sm">No exercises yet</p>
                <p className="text-xs">Add exercises or import a routine</p>
              </div>
            )
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-2 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleAddExercise}>
              <Dumbbell className="h-4 w-4 mr-2" />
              Add Exercise
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowImportDialog(true)}>
              <Layers className="h-4 w-4 mr-2" />
              Import Routine
            </DropdownMenuItem>
            {useItemsMode && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAddCircuit}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Add Circuit
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ImportRoutineDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        routines={routines}
        onImport={handleImportRoutine}
        onCreateRoutine={onCreateRoutine}
        currentExercises={allExercises}
      />
    </div>
  );
}
