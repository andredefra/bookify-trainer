import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Exercise } from "@/data/training/types";
import { ExerciseData } from "@/data/exercises/types";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { GripVertical, Trash2, Dumbbell, Search, Plus, Check } from "lucide-react";
import { QuickCreateExerciseModal } from "./QuickCreateExerciseModal";
import { cn } from "@/lib/utils";

interface ExerciseRowWithSelectorProps {
  exercise: Exercise;
  index: number;
  onExerciseChange: (exercise: Exercise) => void;
  onRemove: () => void;
  compact?: boolean;
  showDragHandle?: boolean;
}

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

export function ExerciseRowWithSelector({
  exercise,
  index,
  onExerciseChange,
  onRemove,
  compact = false,
  showDragHandle = true,
}: ExerciseRowWithSelectorProps) {
  const [showSelector, setShowSelector] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = ["all", "chest", "back", "legs", "shoulders", "arms", "core", "cardio"];

  // Find linked exercise from database
  const linkedExercise = exercise.exerciseDbId
    ? completeExerciseDatabase.find((e) => e.id === exercise.exerciseDbId)
    : null;

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
    onExerciseChange({
      ...exercise,
      name: dbExercise.name,
      exerciseDbId: dbExercise.id,
    });
    setShowSelector(false);
    setSearchQuery("");
  };

  const handleCreateAndSelect = (dbExercise: ExerciseData) => {
    onExerciseChange({
      ...exercise,
      name: dbExercise.name,
      exerciseDbId: dbExercise.id,
    });
    setShowCreateModal(false);
    setShowSelector(false);
    setSearchQuery("");
  };

  const handleSetsChange = (value: number) => {
    onExerciseChange({ ...exercise, sets: Math.max(1, value) });
  };

  const handleRepsChange = (value: string) => {
    onExerciseChange({ ...exercise, reps: value });
  };

  const handleRepsUnitChange = (value: string) => {
    onExerciseChange({ ...exercise, repsUnit: value as Exercise["repsUnit"] });
  };

  const isLinked = !!exercise.exerciseDbId;

  if (compact) {
    return (
      <>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground w-4">{index + 1}.</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 h-7 justify-start text-left font-normal text-xs px-2",
              isLinked && "border-primary/50"
            )}
            onClick={() => setShowSelector(true)}
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
          </Button>
          <Input
            type="number"
            value={exercise.sets}
            onChange={(e) => handleSetsChange(parseInt(e.target.value) || 1)}
            className="w-10 h-7 text-xs text-center"
          />
          <span>×</span>
          <Input
            value={exercise.reps}
            onChange={(e) => handleRepsChange(e.target.value)}
            className="w-12 h-7 text-xs"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onRemove}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {/* Selector Dialog */}
        <Dialog open={showSelector} onOpenChange={setShowSelector}>
          <DialogContent className="max-w-2xl max-h-[70vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Select Exercise</DialogTitle>
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

                {filteredExercises.slice(0, 50).map((ex) => (
                  <div
                    key={ex.id}
                    className={cn(
                      "p-2 border rounded-lg hover:bg-muted cursor-pointer flex items-center gap-2",
                      exercise.exerciseDbId === ex.id && "border-primary bg-primary/5"
                    )}
                    onClick={() => handleSelectExercise(ex)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{ex.name}</span>
                        {exercise.exerciseDbId === ex.id && (
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
                ))}

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

  // Full-size row
  return (
    <>
      <div className="flex items-center gap-2 p-2 border rounded-md bg-background">
        {showDragHandle && (
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
        )}
        <span className="text-xs text-muted-foreground w-5">{index + 1}.</span>
        
        {/* Exercise Selector Button */}
        <Button
          type="button"
          variant="outline"
          className={cn(
            "flex-1 justify-start text-left font-normal h-9 px-3",
            isLinked && "border-primary/50"
          )}
          onClick={() => setShowSelector(true)}
        >
          <Dumbbell className="h-4 w-4 mr-2 shrink-0" />
          <span className="truncate">
            {exercise.name || "Select exercise"}
          </span>
          {linkedExercise && (
            <Badge className={cn("ml-2 text-xs", getCategoryColor(linkedExercise.category))}>
              {linkedExercise.muscleGroup[0] || linkedExercise.category}
            </Badge>
          )}
        </Button>

        <Input
          type="number"
          min="1"
          value={exercise.sets}
          onChange={(e) => handleSetsChange(parseInt(e.target.value) || 1)}
          className="w-16 text-center"
        />
        <span className="text-muted-foreground">×</span>
        <Input
          placeholder="Reps"
          value={exercise.reps}
          onChange={(e) => handleRepsChange(e.target.value)}
          className="w-20"
        />
        <select
          className="h-9 px-2 rounded-md border text-sm bg-background"
          value={exercise.repsUnit || "reps"}
          onChange={(e) => handleRepsUnitChange(e.target.value)}
        >
          <option value="reps">reps</option>
          <option value="sec">sec</option>
          <option value="min">min</option>
        </select>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Selector Dialog */}
      <Dialog open={showSelector} onOpenChange={setShowSelector}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select Exercise</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
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
                className="px-3 py-2 border rounded-md bg-background"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-[50vh] overflow-y-auto space-y-2">
              {/* Create New Option */}
              {searchQuery.trim() && !hasExactMatch && (
                <div
                  className="p-3 border-2 border-dashed border-primary/50 rounded-lg hover:bg-primary/10 cursor-pointer"
                  onClick={() => setShowCreateModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-primary" />
                    <span>
                      Exercise not found? Create "<strong>{searchQuery}</strong>"
                    </span>
                  </div>
                </div>
              )}

              {filteredExercises.slice(0, 100).map((ex) => (
                <div
                  key={ex.id}
                  className={cn(
                    "p-3 border rounded-lg hover:bg-muted cursor-pointer",
                    exercise.exerciseDbId === ex.id && "border-primary bg-primary/5"
                  )}
                  onClick={() => handleSelectExercise(ex)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{ex.name}</h4>
                        {exercise.exerciseDbId === ex.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={cn("text-xs", getCategoryColor(ex.category))}>
                          {ex.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {ex.muscleGroup.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {ex.equipment.join(", ")}
                    </div>
                  </div>
                </div>
              ))}

              {filteredExercises.length === 0 && !searchQuery && (
                <p className="text-center text-muted-foreground py-8">
                  Start typing to search exercises
                </p>
              )}

              {filteredExercises.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">No exercises found</p>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create "{searchQuery}"
                  </Button>
                </div>
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
