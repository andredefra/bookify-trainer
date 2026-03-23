import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Dumbbell, X, User, GraduationCap } from "lucide-react";
import { ExerciseData, Mechanics, ForceType } from "@/data/exercises/types";
import { deriveMechanics, deriveForceType } from "@/data/exercises/biomechanicsMapping";
import { ExerciseVisualCard } from "@/components/trainer/dashboard/tabs/programs/ExerciseVisualCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useClientExerciseLibrary } from "@/hooks/useClientExerciseLibrary";

interface ExerciseSelectorProps {
  value: string;
  onSelect: (exercise: ExerciseData) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ExerciseSelector({ value, onSelect, placeholder = "Select an exercise", disabled }: ExerciseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");
  const [mechanicsFilter, setMechanicsFilter] = useState<'all' | Mechanics>('all');
  const [forceTypeFilter, setForceTypeFilter] = useState<'all' | ForceType>('all');
  const isMobile = useIsMobile();

  const { exercises: mergedExercises } = useClientExerciseLibrary();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'functional', label: 'Functional' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'plyometric', label: 'Plyometric' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const equipmentOptions = [
    { value: 'all', label: 'All Equipment' },
    { value: 'bodyweight', label: 'Bodyweight' },
    { value: 'barbell', label: 'Barbell' },
    { value: 'dumbbell', label: 'Dumbbells' },
    { value: 'cable', label: 'Cable Machine' },
    { value: 'machine', label: 'Machine' },
    { value: 'kettlebell', label: 'Kettlebell' },
    { value: 'resistance', label: 'Resistance Band' },
    { value: 'bench', label: 'Bench' },
  ];

  const filteredExercises = useMemo(() => mergedExercises.filter(exercise => {
    const matchesSearch = !searchQuery || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
    const matchesEquipment = equipmentFilter === "all" || 
      exercise.equipment.some(eq => eq.toLowerCase().includes(equipmentFilter.toLowerCase()));
    const matchesMechanics = mechanicsFilter === "all" || deriveMechanics(exercise) === mechanicsFilter;
    const matchesForceType = forceTypeFilter === "all" || deriveForceType(exercise) === forceTypeFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment && matchesMechanics && matchesForceType;
  }), [mergedExercises, searchQuery, categoryFilter, difficultyFilter, equipmentFilter, mechanicsFilter, forceTypeFilter]);

  const myExercises = useMemo(() => filteredExercises.filter(e => e.source === 'client' || !e.source), [filteredExercises]);
  const trainerExercises = useMemo(() => filteredExercises.filter(e => e.source === 'trainer'), [filteredExercises]);

  const handleExerciseSelect = (exercise: ExerciseData) => {
    onSelect(exercise);
    setOpen(false);
    setSearchQuery("");
  };

  const activeFiltersCount = [
    categoryFilter !== 'all',
    difficultyFilter !== 'all',
    equipmentFilter !== 'all',
    mechanicsFilter !== 'all',
    forceTypeFilter !== 'all',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setCategoryFilter('all');
    setDifficultyFilter('all');
    setEquipmentFilter('all');
    setMechanicsFilter('all');
    setForceTypeFilter('all');
    setSearchQuery('');
  };

  const renderExerciseGrid = (exercises: ExerciseData[], maxItems = 30) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-1">
      {exercises.slice(0, maxItems).map((exercise) => (
        <ExerciseVisualCard
          key={exercise.id}
          exercise={exercise}
          onSelect={handleExerciseSelect}
          selectionMode={true}
          compact={isMobile}
        />
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left font-normal"
          disabled={disabled}
        >
          <Dumbbell className="mr-2 h-4 w-4" />
          {value || placeholder}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Exercise ({filteredExercises.length} available)</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((diff) => (
                  <SelectItem key={diff.value} value={diff.value}>{diff.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipmentOptions.map((eq) => (
                  <SelectItem key={eq.value} value={eq.value}>{eq.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Biomechanics Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Mechanics:</span>
              <div className="flex gap-1">
                {(['all', 'compound', 'isolation'] as const).map((val) => (
                  <Button
                    key={val}
                    size="sm"
                    variant={mechanicsFilter === val ? 'default' : 'outline'}
                    onClick={() => setMechanicsFilter(val)}
                    className="h-7 px-2 text-xs"
                  >
                    {val === 'all' ? 'All' : val.charAt(0).toUpperCase() + val.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Force:</span>
              <div className="flex gap-1 flex-wrap">
                {(['all', 'push', 'pull', 'static', 'hinge', 'squat'] as const).map((val) => (
                  <Button
                    key={val}
                    size="sm"
                    variant={forceTypeFilter === val ? 'default' : 'outline'}
                    onClick={() => setForceTypeFilter(val)}
                    className="h-7 px-2 text-xs"
                  >
                    {val === 'all' ? 'All' : val.charAt(0).toUpperCase() + val.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
              </Badge>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground">
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}

          {/* Exercise Grid - Grouped by Source */}
          <div className="flex-1 overflow-y-auto min-h-0 space-y-6">
            {/* My Exercises Section */}
            {myExercises.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <User className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">My Exercises</h3>
                  <Badge variant="secondary" className="text-xs">{myExercises.length}</Badge>
                </div>
                {renderExerciseGrid(myExercises)}
              </div>
            )}

            {/* Trainer's Exercises Section */}
            {trainerExercises.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <GraduationCap className="h-4 w-4 text-accent-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Trainer's Exercises</h3>
                  <Badge variant="outline" className="text-xs">{trainerExercises.length}</Badge>
                </div>
                {renderExerciseGrid(trainerExercises)}
              </div>
            )}

            {filteredExercises.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">No exercises match your filters.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
