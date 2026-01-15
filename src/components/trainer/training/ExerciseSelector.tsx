import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Dumbbell, Grid3X3, Filter, X, RotateCcw } from "lucide-react";
import { useExerciseLibrary } from "@/hooks/useExerciseLibrary";
import { ExerciseData } from "@/data/exercises/types";

interface ExerciseSelectorProps {
  value: string;
  onSelect: (exercise: ExerciseData) => void;
  placeholder?: string;
}

// Filter options
const equipmentOptions = [
  { value: 'all', label: 'All' },
  { value: 'barbell', label: 'Barbell' },
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'machine', label: 'Machine' },
  { value: 'cable', label: 'Cable' },
  { value: 'bodyweight', label: 'Bodyweight' },
  { value: 'kettlebell', label: 'Kettlebell' },
  { value: 'band', label: 'Bands' },
];

const difficulties = [
  { value: 'all', label: 'All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const exerciseTypes = [
  { value: 'all', label: 'All' },
  { value: 'compound', label: 'Compound' },
  { value: 'isolation', label: 'Isolation' },
  { value: 'cardio', label: 'Cardio' },
];

export function ExerciseSelector({ value, onSelect, placeholder = "Select an exercise" }: ExerciseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  
  const { 
    getExerciseSuggestions, 
    filteredExercises, 
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    difficultyFilter,
    setDifficultyFilter,
    equipmentFilter,
    setEquipmentFilter,
    exerciseTypeFilter,
    setExerciseTypeFilter,
    hasActiveFilters,
    resetAllFilters,
  } = useExerciseLibrary();

  const searchSuggestions = localSearchQuery.length >= 2 ? getExerciseSuggestions(localSearchQuery, 20) : [];
  
  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'functional', label: 'Functional' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'plyometric', label: 'Plyometric' }
  ];

  const handleSelectExercise = (exercise: ExerciseData) => {
    onSelect(exercise);
    setOpen(false);
    setLocalSearchQuery("");
    setSearchQuery("");
  };

  const handleResetFilters = () => {
    resetAllFilters();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      back: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      legs: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      shoulders: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      arms: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      core: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      cardio: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      functional: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
      flexibility: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
      plyometric: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          onClick={() => setOpen(true)}
        >
          {value ? (
            <span>{value}</span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              {placeholder}
            </span>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Exercise</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
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

          <TabsContent value="search" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Search exercises..."
                className="pl-10"
                autoFocus
              />
            </div>
            
            {localSearchQuery.length < 2 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">Search for exercises</p>
                <p className="text-sm">Type at least 2 characters to find exercises</p>
              </div>
            )}
            
            {localSearchQuery.length >= 2 && searchSuggestions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No exercises found</p>
                <p className="text-sm">Try a different search term or browse categories</p>
              </div>
            )}
            
            {searchSuggestions.length > 0 && (
              <div className="flex-1 overflow-y-auto">
                <div className="grid gap-3">
                  {searchSuggestions.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleSelectExercise(exercise)}
                      getCategoryColor={getCategoryColor}
                      getDifficultyColor={getDifficultyColor}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="browse" className="flex-1 overflow-hidden flex flex-col mt-4">
            {/* Advanced Filters Section */}
            <div className="space-y-4 mb-4 p-4 bg-muted/30 rounded-lg border">
              {/* Row 1: Muscle Group (Category) */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Muscle Group</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className="text-xs"
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Row 2: Equipment Filter */}
              <div>
                <span className="text-sm font-medium mb-2 block">Equipment</span>
                <div className="flex flex-wrap gap-2">
                  {equipmentOptions.map((eq) => (
                    <Button
                      key={eq.value}
                      variant={equipmentFilter === eq.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEquipmentFilter(eq.value)}
                      className="text-xs"
                    >
                      {eq.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Row 3: Difficulty & Exercise Type */}
              <div className="flex gap-4 flex-wrap">
                {/* Difficulty Toggle */}
                <div className="flex-1 min-w-[200px]">
                  <span className="text-sm font-medium mb-2 block">Difficulty</span>
                  <div className="flex gap-1">
                    {difficulties.map((diff) => (
                      <Button
                        key={diff.value}
                        variant={difficultyFilter === diff.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficultyFilter(diff.value)}
                        className="flex-1 text-xs"
                      >
                        {diff.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Exercise Type Toggle */}
                <div className="flex-1 min-w-[200px]">
                  <span className="text-sm font-medium mb-2 block">Type</span>
                  <div className="flex gap-1">
                    {exerciseTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant={exerciseTypeFilter === type.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setExerciseTypeFilter(type.value)}
                        className="flex-1 text-xs"
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters Summary & Reset */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  {filteredExercises.length} exercises found
                </span>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-xs">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Exercise Results */}
            <div className="flex-1 overflow-y-auto">
              {filteredExercises.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Grid3X3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium mb-2">No exercises match your filters</p>
                  <p className="text-sm mb-4">Try adjusting your filter criteria</p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3">
                  {filteredExercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleSelectExercise(exercise)}
                      getCategoryColor={getCategoryColor}
                      getDifficultyColor={getDifficultyColor}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced Exercise Card component with additional badges
function ExerciseCard({ 
  exercise, 
  onClick,
  getCategoryColor,
  getDifficultyColor
}: { 
  exercise: ExerciseData; 
  onClick: () => void;
  getCategoryColor: (category: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}) {
  const isCompound = exercise.muscleGroup.length > 1;
  const isCardio = exercise.category === 'cardio';
  const exerciseType = isCardio ? 'Cardio' : isCompound ? 'Compound' : 'Isolation';

  return (
    <div
      className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium group-hover:text-primary transition-colors">{exercise.name}</h3>
        <div className="flex gap-1 flex-shrink-0 ml-2 flex-wrap justify-end">
          <Badge className={getCategoryColor(exercise.category)} variant="secondary">
            {exercise.category}
          </Badge>
          <Badge className={getDifficultyColor(exercise.difficulty)} variant="secondary">
            {exercise.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {exerciseType}
          </Badge>
          {exercise.isCustom && (
            <Badge variant="outline">Custom</Badge>
          )}
          {exercise.isModified && (
            <Badge variant="outline">Modified</Badge>
          )}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-1">
        <strong>Muscles:</strong> {exercise.muscleGroup.slice(0, 3).join(", ")}
        {exercise.muscleGroup.length > 3 && ` +${exercise.muscleGroup.length - 3} more`}
      </div>
      
      {exercise.equipment.length > 0 && (
        <div className="text-sm text-muted-foreground mb-1">
          <strong>Equipment:</strong> {exercise.equipment.slice(0, 3).join(", ")}
          {exercise.equipment.length > 3 && ` +${exercise.equipment.length - 3} more`}
        </div>
      )}
      
      {exercise.notes && (
        <div className="text-xs text-muted-foreground line-clamp-2 mt-2">
          {exercise.notes}
        </div>
      )}
    </div>
  );
}