import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Circuit, Exercise } from "@/data/training/types";
import { GripVertical, Trash2, Plus, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircuitContainerProps {
  circuit: Circuit;
  index: number;
  onCircuitChange: (circuit: Circuit) => void;
  onRemoveCircuit: () => void;
}

const createEmptyExercise = (): Exercise => ({
  id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  sets: 1, // In circuits, typically 1 set per round
  reps: "10",
  repsUnit: "reps",
});

export function CircuitContainer({
  circuit,
  index,
  onCircuitChange,
  onRemoveCircuit,
}: CircuitContainerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleNameChange = (name: string) => {
    onCircuitChange({ ...circuit, name });
  };

  const handleRoundsChange = (rounds: number) => {
    onCircuitChange({ ...circuit, rounds: Math.max(1, rounds) });
  };

  const handleRestChange = (restBetweenRounds: number) => {
    onCircuitChange({ ...circuit, restBetweenRounds: Math.max(0, restBetweenRounds) });
  };

  const handleAddExercise = () => {
    onCircuitChange({
      ...circuit,
      exercises: [...circuit.exercises, createEmptyExercise()],
    });
  };

  const handleRemoveExercise = (exerciseId: string) => {
    onCircuitChange({
      ...circuit,
      exercises: circuit.exercises.filter((ex) => ex.id !== exerciseId),
    });
  };

  const handleExerciseChange = (exerciseId: string, field: keyof Exercise, value: any) => {
    onCircuitChange({
      ...circuit,
      exercises: circuit.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      ),
    });
  };

  return (
    <div className="border-2 border-dashed border-primary/40 rounded-lg bg-primary/5 overflow-hidden">
      {/* Circuit Header */}
      <div className="flex items-center gap-2 p-3 bg-primary/10 border-b border-primary/20">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
        <div className="flex items-center gap-1.5">
          <RotateCcw className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            Circuit
          </span>
        </div>
        <div className="flex-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={onRemoveCircuit}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Circuit Settings */}
      <div className="p-3 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[150px]">
            <Label className="text-xs text-muted-foreground mb-1 block">Name</Label>
            <Input
              placeholder="e.g., EMOM Circuit"
              value={circuit.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground mb-1 block">Rounds</Label>
            <Input
              type="number"
              min="1"
              value={circuit.rounds}
              onChange={(e) => handleRoundsChange(parseInt(e.target.value) || 1)}
              className="h-8 text-sm text-center"
            />
          </div>
          <div className="w-28">
            <Label className="text-xs text-muted-foreground mb-1 block">Rest (sec)</Label>
            <Input
              type="number"
              min="0"
              step="5"
              value={circuit.restBetweenRounds}
              onChange={(e) => handleRestChange(parseInt(e.target.value) || 0)}
              className="h-8 text-sm text-center"
            />
          </div>
        </div>

        {/* Exercises in Circuit */}
        <div className="space-y-2">
          {circuit.exercises.length > 0 ? (
            circuit.exercises.map((exercise, exIndex) => (
              <div
                key={exercise.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md bg-background border",
                  "border-primary/20"
                )}
              >
                <span className="text-xs text-muted-foreground w-5">{exIndex + 1}.</span>
                <Input
                  placeholder="Exercise name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(exercise.id, "name", e.target.value)}
                  className="flex-1 h-8 text-sm"
                />
                <span className="text-xs text-muted-foreground">×</span>
                <Input
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(exercise.id, "reps", e.target.value)}
                  className="w-16 h-8 text-sm text-center"
                />
                <select
                  className="h-8 px-2 rounded-md border text-xs bg-background"
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
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveExercise(exercise.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-3 text-muted-foreground text-xs border border-dashed rounded-md">
              No exercises in circuit. Add exercises below.
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full h-7 text-xs"
          onClick={handleAddExercise}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Exercise to Circuit
        </Button>
      </div>
    </div>
  );
}
