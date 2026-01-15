import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Circuit, Exercise } from "@/data/training/types";
import { ExerciseData } from "@/data/exercises/types";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { GripVertical, Trash2, Plus, RotateCcw, X, Dumbbell, Search, Check } from "lucide-react";
import { QuickCreateExerciseModal } from "./QuickCreateExerciseModal";
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
  sets: 1,
  reps: "10",
  repsUnit: "reps",
});

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    chest: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    back: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    legs: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    shoulders: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    arms: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    core: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    cardio: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  };
  return colors[category] || "bg-muted text-muted-foreground";
};

export function CircuitContainer({
  circuit,
  index,
  onCircuitChange,
  onRemoveCircuit,
}: CircuitContainerProps) {
  const [showSelector, setShowSelector] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);

  const categories = ["all", "chest", "back", "legs", "shoulders", "arms", "core", "cardio"];

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
    const newExercise = createEmptyExercise();
    onCircuitChange({
      ...circuit,
      exercises: [...circuit.exercises, newExercise],
    });
    // Open selector for the new exercise
    setEditingExerciseId(newExercise.id);
    setShowSelector(true);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    onCircuitChange({
      ...circuit,
      exercises: circuit.exercises.filter((ex) => ex.id !== exerciseId),
    });
  };

  const handleExerciseChange = (exerciseId: string, updatedExercise: Partial<Exercise>) => {
    onCircuitChange({
      ...circuit,
      exercises: circuit.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, ...updatedExercise } : ex
      ),
    });
  };

  const filteredExercises = completeExerciseDatabase.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscleGroup.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || ex.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const hasExactMatch = filteredExercises.some(
    (ex) => ex.name.toLowerCase() === searchQuery.toLowerCase()
  );

  const handleSelectExercise = (dbExercise: ExerciseData) => {
    if (editingExerciseId) {
      handleExerciseChange(editingExerciseId, {
        name: dbExercise.name,
        exerciseDbId: dbExercise.id,
      });
    }
    setShowSelector(false);
    setSearchQuery("");
    setEditingExerciseId(null);
  };

  const handleCreateAndSelect = (dbExercise: ExerciseData) => {
    if (editingExerciseId) {
      handleExerciseChange(editingExerciseId, {
        name: dbExercise.name,
        exerciseDbId: dbExercise.id,
      });
    }
    setShowCreateModal(false);
    setShowSelector(false);
    setSearchQuery("");
    setEditingExerciseId(null);
  };

  const openSelectorForExercise = (exerciseId: string) => {
    setEditingExerciseId(exerciseId);
    setShowSelector(true);
  };

  const getLinkedExercise = (exercise: Exercise) => {
    return exercise.exerciseDbId
      ? completeExerciseDatabase.find((e) => e.id === exercise.exerciseDbId)
      : null;
  };

  return (
    <>
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
              circuit.exercises.map((exercise, exIndex) => {
                const linkedExercise = getLinkedExercise(exercise);
                const isLinked = !!exercise.exerciseDbId;

                return (
                  <div
                    key={exercise.id}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md bg-background border",
                      isLinked ? "border-primary/30" : "border-amber-500/50"
                    )}
                  >
                    <span className="text-xs text-muted-foreground w-5">{exIndex + 1}.</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex-1 h-8 justify-start text-left font-normal text-xs px-2",
                        isLinked && "border-primary/50",
                        !isLinked && exercise.name && "border-amber-500"
                      )}
                      onClick={() => openSelectorForExercise(exercise.id)}
                    >
                      <Dumbbell className="h-3 w-3 mr-1 shrink-0" />
                      <span className="truncate">
                        {exercise.name || "Select exercise"}
                      </span>
                      {linkedExercise && (
                        <Badge className={cn("ml-auto text-[10px] h-4 px-1", getCategoryColor(linkedExercise.category))}>
                          {linkedExercise.category}
                        </Badge>
                      )}
                      {!isLinked && exercise.name && (
                        <Badge variant="outline" className="ml-auto text-[10px] h-4 px-1 border-amber-500 text-amber-600">
                          Not linked
                        </Badge>
                      )}
                    </Button>
                    <span className="text-xs text-muted-foreground">×</span>
                    <Input
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(exercise.id, { reps: e.target.value })}
                      className="w-16 h-8 text-sm text-center"
                    />
                    <select
                      className="h-8 px-2 rounded-md border text-xs bg-background"
                      value={exercise.repsUnit || "reps"}
                      onChange={(e) =>
                        handleExerciseChange(exercise.id, { repsUnit: e.target.value as Exercise["repsUnit"] })
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
                );
              })
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

      {/* Exercise Selector Dialog */}
      <Dialog open={showSelector} onOpenChange={(open) => {
        setShowSelector(open);
        if (!open) setEditingExerciseId(null);
      }}>
        <DialogContent className="max-w-2xl max-h-[70vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select Exercise for Circuit</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm bg-background"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-[40vh] overflow-y-auto space-y-1">
              {/* Create New Option */}
              {searchQuery.trim() && !hasExactMatch && (
                <div
                  className="p-3 border-2 border-dashed border-primary/50 rounded-lg hover:bg-primary/10 cursor-pointer"
                  onClick={() => setShowCreateModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      Create exercise: "<strong>{searchQuery}</strong>"
                    </span>
                  </div>
                </div>
              )}

              {filteredExercises.slice(0, 50).map((ex) => {
                const currentExercise = editingExerciseId 
                  ? circuit.exercises.find(e => e.id === editingExerciseId)
                  : null;
                const isSelected = currentExercise?.exerciseDbId === ex.id;

                return (
                  <div
                    key={ex.id}
                    className={cn(
                      "p-2 border rounded-lg hover:bg-muted cursor-pointer flex items-center gap-2",
                      isSelected && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleSelectExercise(ex)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{ex.name}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Badge className={cn("text-[10px] h-4 px-1", getCategoryColor(ex.category))}>
                          {ex.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">
                          {ex.muscleGroup.slice(0, 2).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredExercises.length === 0 && !searchQuery && (
                <p className="text-center text-muted-foreground text-sm py-4">
                  Start typing to search exercises
                </p>
              )}

              {filteredExercises.length === 0 && searchQuery && (
                <p className="text-center text-muted-foreground text-sm py-4">
                  No exercises found
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <QuickCreateExerciseModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        initialName={searchQuery}
        onExerciseCreated={handleCreateAndSelect}
      />
    </>
  );
}
