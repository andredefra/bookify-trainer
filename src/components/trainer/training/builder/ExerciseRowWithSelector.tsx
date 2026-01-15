import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Exercise } from "@/data/training/types";
import { ExerciseData } from "@/data/exercises/types";
import { completeExerciseDatabase } from "@/data/exercises/exerciseDatabase";
import { GripVertical, Trash2, Dumbbell, Search, Plus, Check, Filter, Grid3X3, RotateCcw } from "lucide-react";
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
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [exerciseTypeFilter, setExerciseTypeFilter] = useState<string>("all");

  const categories = ["all", "chest", "back", "legs", "shoulders", "arms", "core", "cardio", "functional", "flexibility", "plyometric"];
  const equipmentOptions = ["all", "barbell", "dumbbell", "machine", "cable", "bodyweight", "kettlebell", "band"];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];
  const exerciseTypes = ["all", "compound", "isolation", "cardio"];

  // Find linked exercise from database
  const linkedExercise = exercise.exerciseDbId
    ? completeExerciseDatabase.find((e) => e.id === exercise.exerciseDbId)
    : null;

  const filteredExercises = completeExerciseDatabase.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscleGroup.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || ex.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || ex.difficulty === difficultyFilter;
    const matchesEquipment = equipmentFilter === "all" || ex.equipment.some(eq => eq.toLowerCase().includes(equipmentFilter.toLowerCase()));
    const matchesType = exerciseTypeFilter === "all" || 
      (exerciseTypeFilter === "compound" && ex.muscleGroup.length > 1) ||
      (exerciseTypeFilter === "isolation" && ex.muscleGroup.length === 1) ||
      (exerciseTypeFilter === "cardio" && ex.category === "cardio");
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment && matchesType;
  });

  const hasActiveFilters = categoryFilter !== "all" || difficultyFilter !== "all" || equipmentFilter !== "all" || exerciseTypeFilter !== "all";

  const resetFilters = () => {
    setCategoryFilter("all");
    setDifficultyFilter("all");
    setEquipmentFilter("all");
    setExerciseTypeFilter("all");
    setSearchQuery("");
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    };
    return colors[difficulty] || "bg-muted text-muted-foreground";
  };

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

      {/* Selector Dialog with Tabs */}
      <Dialog open={showSelector} onOpenChange={setShowSelector}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Exercise</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="search" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="browse" className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                Browse
              </TabsTrigger>
            </TabsList>

            {/* Search Tab */}
            <TabsContent value="search" className="flex-1 overflow-hidden flex flex-col mt-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
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
                  <ExerciseCardRow
                    key={ex.id}
                    ex={ex}
                    isSelected={exercise.exerciseDbId === ex.id}
                    onSelect={() => handleSelectExercise(ex)}
                    getCategoryColor={getCategoryColor}
                    getDifficultyColor={getDifficultyColor}
                  />
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
            </TabsContent>

            {/* Browse Tab with Advanced Filters */}
            <TabsContent value="browse" className="flex-1 overflow-hidden flex flex-col mt-4">
              {/* Advanced Filters Section */}
              <div className="space-y-3 mb-4 p-4 bg-muted/30 rounded-lg border">
                {/* Row 1: Muscle Group */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Muscle Group</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={categoryFilter === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategoryFilter(cat)}
                        className="text-xs h-7"
                      >
                        {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Row 2: Equipment Filter */}
                <div>
                  <span className="text-sm font-medium mb-2 block">Equipment</span>
                  <div className="flex flex-wrap gap-1">
                    {equipmentOptions.map((eq) => (
                      <Button
                        key={eq}
                        variant={equipmentFilter === eq ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEquipmentFilter(eq)}
                        className="text-xs h-7"
                      >
                        {eq === "all" ? "All" : eq.charAt(0).toUpperCase() + eq.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Row 3: Difficulty & Type */}
                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[180px]">
                    <span className="text-sm font-medium mb-2 block">Difficulty</span>
                    <div className="flex gap-1">
                      {difficulties.map((diff) => (
                        <Button
                          key={diff}
                          variant={difficultyFilter === diff ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDifficultyFilter(diff)}
                          className="flex-1 text-xs h-7"
                        >
                          {diff === "all" ? "All" : diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-[180px]">
                    <span className="text-sm font-medium mb-2 block">Type</span>
                    <div className="flex gap-1">
                      {exerciseTypes.map((type) => (
                        <Button
                          key={type}
                          variant={exerciseTypeFilter === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setExerciseTypeFilter(type)}
                          className="flex-1 text-xs h-7"
                        >
                          {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter Summary */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">
                    {filteredExercises.length} exercises found
                  </span>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-7">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredExercises.slice(0, 100).map((ex) => (
                  <ExerciseCardRow
                    key={ex.id}
                    ex={ex}
                    isSelected={exercise.exerciseDbId === ex.id}
                    onSelect={() => handleSelectExercise(ex)}
                    getCategoryColor={getCategoryColor}
                    getDifficultyColor={getDifficultyColor}
                  />
                ))}

                {filteredExercises.length === 0 && (
                  <div className="text-center py-8">
                    <Grid3X3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p className="text-muted-foreground mb-3">No exercises match your filters</p>
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
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

// Reusable Exercise Card Row component for dialog lists
function ExerciseCardRow({
  ex,
  isSelected,
  onSelect,
  getCategoryColor,
  getDifficultyColor,
}: {
  ex: ExerciseData;
  isSelected: boolean;
  onSelect: () => void;
  getCategoryColor: (category: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}) {
  const isCompound = ex.muscleGroup.length > 1;
  const isCardio = ex.category === "cardio";
  const exerciseType = isCardio ? "Cardio" : isCompound ? "Compound" : "Isolation";

  return (
    <div
      className={cn(
        "p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors",
        isSelected && "border-primary bg-primary/5"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{ex.name}</h4>
            {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
          </div>
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <Badge className={cn("text-xs", getCategoryColor(ex.category))}>
              {ex.category}
            </Badge>
            <Badge className={cn("text-xs", getDifficultyColor(ex.difficulty))}>
              {ex.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {exerciseType}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {ex.muscleGroup.slice(0, 3).join(", ")}
            {ex.muscleGroup.length > 3 && ` +${ex.muscleGroup.length - 3}`}
          </div>
        </div>
        <div className="text-right text-xs text-muted-foreground shrink-0 ml-2">
          {ex.equipment.slice(0, 2).join(", ")}
          {ex.equipment.length > 2 && ` +${ex.equipment.length - 2}`}
        </div>
      </div>
    </div>
  );
}
