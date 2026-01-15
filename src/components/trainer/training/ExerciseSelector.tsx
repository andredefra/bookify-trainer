import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Dumbbell, Grid3X3, Filter, RotateCcw, LayoutGrid, List } from "lucide-react";
import { useExerciseLibrary } from "@/hooks/useExerciseLibrary";
import { ExerciseData } from "@/data/exercises/types";
import { VisualExerciseCard } from "./VisualExerciseCard";
import { deriveMechanics, deriveForceType, getMechanicsColor, getForceTypeColor } from "@/data/exercises/biomechanicsMapping";

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

const mechanicsOptions = [
  { value: 'all', label: 'All' },
  { value: 'compound', label: '🔗 Compound' },
  { value: 'isolation', label: '🎯 Isolation' },
];

const forceTypeOptions = [
  { value: 'all', label: 'All' },
  { value: 'push', label: '⬆️ Push' },
  { value: 'pull', label: '⬇️ Pull' },
  { value: 'static', label: '⏸️ Static' },
  { value: 'hinge', label: '↩️ Hinge' },
  { value: 'squat', label: '🦵 Squat' },
];

export function ExerciseSelector({ value, onSelect, placeholder = "Select an exercise" }: ExerciseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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
    mechanicsFilter,
    setMechanicsFilter,
    forceTypeFilter,
    setForceTypeFilter,
    hasActiveFilters,
    resetAllFilters,
  } = useExerciseLibrary();

  const searchSuggestions = localSearchQuery.length >= 2 ? getExerciseSuggestions(localSearchQuery, 20) : [];
  
  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'chest', label: '💪 Chest' },
    { value: 'back', label: '🔙 Back' },
    { value: 'legs', label: '🦵 Legs' },
    { value: 'shoulders', label: '🤸 Shoulders' },
    { value: 'arms', label: '💪 Arms' },
    { value: 'core', label: '🎯 Core' },
    { value: 'cardio', label: '🏃 Cardio' },
    { value: 'functional', label: '⚡ Functional' },
    { value: 'flexibility', label: '🧘 Flexibility' },
    { value: 'plyometric', label: '🔥 Plyometric' }
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
      
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Select Exercise
          </DialogTitle>
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
                placeholder="Search exercises by name, muscle, or equipment..."
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchSuggestions.map((exercise) => (
                    <VisualExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleSelectExercise(exercise)}
                      showSelectButton
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="browse" className="flex-1 overflow-hidden flex flex-col mt-4">
            {/* Advanced Filters Section */}
            <div className="space-y-3 mb-4 p-4 bg-muted/30 rounded-lg border">
              {/* Row 1: Muscle Group (Category) */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Muscle Group</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className="text-xs h-7"
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Row 2: Biomechanics & Force Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Biomechanics (Compound/Isolation) */}
                <div>
                  <span className="text-sm font-medium mb-2 block">Biomechanics</span>
                  <div className="flex gap-1">
                    {mechanicsOptions.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={mechanicsFilter === opt.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMechanicsFilter(opt.value as any)}
                        className="flex-1 text-xs h-7"
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Force Type (Push/Pull/etc) */}
                <div>
                  <span className="text-sm font-medium mb-2 block">Force Vector</span>
                  <div className="flex flex-wrap gap-1">
                    {forceTypeOptions.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={forceTypeFilter === opt.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setForceTypeFilter(opt.value as any)}
                        className="text-xs h-7"
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Equipment & Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Equipment Filter */}
                <div>
                  <span className="text-sm font-medium mb-2 block">Equipment</span>
                  <div className="flex flex-wrap gap-1">
                    {equipmentOptions.map((eq) => (
                      <Button
                        key={eq.value}
                        variant={equipmentFilter === eq.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEquipmentFilter(eq.value)}
                        className="text-xs h-7"
                      >
                        {eq.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Toggle */}
                <div>
                  <span className="text-sm font-medium mb-2 block">Difficulty</span>
                  <div className="flex gap-1">
                    {difficulties.map((diff) => (
                      <Button
                        key={diff.value}
                        variant={difficultyFilter === diff.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficultyFilter(diff.value)}
                        className="flex-1 text-xs h-7"
                      >
                        {diff.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters Summary & Reset */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredExercises.length} exercises found
                  </span>
                  {/* View Mode Toggle */}
                  <div className="flex gap-1 ml-4">
                    <Button 
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-xs h-7">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Clear filters
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
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExercises.map((exercise) => (
                    <VisualExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleSelectExercise(exercise)}
                      showSelectButton
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredExercises.map((exercise) => (
                    <VisualExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onClick={() => handleSelectExercise(exercise)}
                      showSelectButton
                      compact
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
