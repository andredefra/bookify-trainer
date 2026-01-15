import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Mechanics, ForceType } from '@/data/exercises/types';
import { cn } from '@/lib/utils';

interface ExerciseLibraryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  equipmentFilter?: string;
  setEquipmentFilter?: (equipment: string) => void;
  mechanicsFilter?: 'all' | Mechanics;
  setMechanicsFilter?: (mechanics: 'all' | Mechanics) => void;
  forceTypeFilter?: 'all' | ForceType;
  setForceTypeFilter?: (forceType: 'all' | ForceType) => void;
  onCreateExercise: () => void;
  hideCreateButton?: boolean;
}

export function ExerciseLibraryFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  difficultyFilter,
  setDifficultyFilter,
  equipmentFilter = '',
  setEquipmentFilter,
  mechanicsFilter = 'all',
  setMechanicsFilter,
  forceTypeFilter = 'all',
  setForceTypeFilter,
  onCreateExercise,
  hideCreateButton = false,
}: ExerciseLibraryFiltersProps) {
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

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value === 'all' ? '' : value);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficultyFilter(value === 'all' ? '' : value);
  };

  const handleEquipmentChange = (value: string) => {
    if (setEquipmentFilter) {
      setEquipmentFilter(value === 'all' ? '' : value);
    }
  };

  const handleMechanicsChange = (value: string) => {
    if (setMechanicsFilter && value) {
      setMechanicsFilter(value as 'all' | Mechanics);
    }
  };

  const handleForceTypeChange = (value: string) => {
    if (setForceTypeFilter && value) {
      setForceTypeFilter(value as 'all' | ForceType);
    }
  };

  // Count active filters
  const activeFiltersCount = [
    categoryFilter,
    difficultyFilter,
    equipmentFilter,
    mechanicsFilter !== 'all' ? mechanicsFilter : '',
    forceTypeFilter !== 'all' ? forceTypeFilter : '',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setCategoryFilter('');
    setDifficultyFilter('');
    setEquipmentFilter?.('');
    setMechanicsFilter?.('all');
    setForceTypeFilter?.('all');
    setSearchTerm('');
  };

  return (
    <div className="space-y-4 p-4 border-b bg-background">
      {/* Search and Create Button Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises by name or muscle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {!hideCreateButton && (
          <Button onClick={onCreateExercise} className="flex items-center gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Exercise</span>
          </Button>
        )}
      </div>

      {/* Quick Filters: Dropdowns Row */}
      <div className="flex gap-2 flex-wrap">
        <Select value={categoryFilter || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficultyFilter || 'all'} onValueChange={handleDifficultyChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={equipmentFilter || 'all'} onValueChange={handleEquipmentChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            {equipmentOptions.map((eq) => (
              <SelectItem key={eq.value} value={eq.value}>
                {eq.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Biomechanics Filters - Inline pills row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {/* Mechanics Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Mechanics:</span>
          <ToggleGroup 
            type="single" 
            value={mechanicsFilter} 
            onValueChange={handleMechanicsChange}
            className="gap-0.5"
          >
            <ToggleGroupItem 
              value="all" 
              size="sm"
              className={cn(
                "text-xs px-3 h-7 rounded-full border",
                mechanicsFilter === 'all' 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="compound" 
              size="sm"
              className={cn(
                "text-xs px-3 h-7 rounded-full border",
                mechanicsFilter === 'compound' 
                  ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              Compound
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="isolation" 
              size="sm"
              className={cn(
                "text-xs px-3 h-7 rounded-full border",
                mechanicsFilter === 'isolation' 
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              Isolation
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-border" />

        {/* Force Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Force:</span>
          <ToggleGroup 
            type="single" 
            value={forceTypeFilter} 
            onValueChange={handleForceTypeChange}
            className="gap-0.5 flex-wrap"
          >
            <ToggleGroupItem 
              value="all" 
              size="sm"
              className={cn(
                "text-xs px-2.5 h-7 rounded-full border",
                forceTypeFilter === 'all' 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="push" 
              size="sm"
              className={cn(
                "text-xs px-2.5 h-7 rounded-full border",
                forceTypeFilter === 'push' 
                  ? "bg-orange-600 text-white border-orange-600 hover:bg-orange-700" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              Push
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="pull" 
              size="sm"
              className={cn(
                "text-xs px-2.5 h-7 rounded-full border",
                forceTypeFilter === 'pull' 
                  ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              Pull
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="squat" 
              size="sm"
              className={cn(
                "text-xs px-2.5 h-7 rounded-full border",
                forceTypeFilter === 'squat' 
                  ? "bg-green-600 text-white border-green-600 hover:bg-green-700" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              Squat
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="hinge" 
              size="sm"
              className={cn(
                "text-xs px-2.5 h-7 rounded-full border",
                forceTypeFilter === 'hinge' 
                  ? "bg-amber-600 text-white border-amber-600 hover:bg-amber-700" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              Hinge
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="static" 
              size="sm"
              className={cn(
                "text-xs px-2.5 h-7 rounded-full border",
                forceTypeFilter === 'static' 
                  ? "bg-slate-600 text-white border-slate-600 hover:bg-slate-700" 
                  : "bg-background border-input hover:bg-accent"
              )}
            >
              Static
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
