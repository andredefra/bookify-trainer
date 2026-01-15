import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, X, Filter, Zap, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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

      {/* Biomechanics Filters - Improved UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Mechanics Filter Card */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Mechanics</span>
          </div>
          <ToggleGroup 
            type="single" 
            value={mechanicsFilter} 
            onValueChange={handleMechanicsChange}
            className="justify-start gap-1"
          >
            <ToggleGroupItem 
              value="all" 
              size="sm"
              className={cn(
                "text-xs px-3",
                mechanicsFilter === 'all' && "bg-primary text-primary-foreground"
              )}
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="compound" 
              size="sm"
              className={cn(
                "text-xs px-3",
                mechanicsFilter === 'compound' && "bg-purple-600 text-white hover:bg-purple-700"
              )}
            >
              Compound
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="isolation" 
              size="sm"
              className={cn(
                "text-xs px-3",
                mechanicsFilter === 'isolation' && "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              Isolation
            </ToggleGroupItem>
          </ToggleGroup>
        </Card>

        {/* Force Type Filter Card */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Force Vector</span>
          </div>
          <ToggleGroup 
            type="single" 
            value={forceTypeFilter} 
            onValueChange={handleForceTypeChange}
            className="justify-start gap-1 flex-wrap"
          >
            <ToggleGroupItem 
              value="all" 
              size="sm"
              className={cn(
                "text-xs px-2",
                forceTypeFilter === 'all' && "bg-primary text-primary-foreground"
              )}
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="push" 
              size="sm"
              className={cn(
                "text-xs px-2",
                forceTypeFilter === 'push' && "bg-orange-600 text-white hover:bg-orange-700"
              )}
            >
              Push
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="pull" 
              size="sm"
              className={cn(
                "text-xs px-2",
                forceTypeFilter === 'pull' && "bg-teal-600 text-white hover:bg-teal-700"
              )}
            >
              Pull
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="squat" 
              size="sm"
              className={cn(
                "text-xs px-2",
                forceTypeFilter === 'squat' && "bg-green-600 text-white hover:bg-green-700"
              )}
            >
              Squat
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="hinge" 
              size="sm"
              className={cn(
                "text-xs px-2",
                forceTypeFilter === 'hinge' && "bg-amber-600 text-white hover:bg-amber-700"
              )}
            >
              Hinge
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="static" 
              size="sm"
              className={cn(
                "text-xs px-2",
                forceTypeFilter === 'static' && "bg-slate-600 text-white hover:bg-slate-700"
              )}
            >
              Static
            </ToggleGroupItem>
          </ToggleGroup>
        </Card>
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
