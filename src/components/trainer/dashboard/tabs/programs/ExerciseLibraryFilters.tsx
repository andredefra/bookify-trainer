
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Mechanics, ForceType } from '@/data/exercises/types';

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
    <div className="space-y-3 p-4 border-b">
      {/* Search and Create Button Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {!hideCreateButton && (
          <Button onClick={onCreateExercise} className="flex items-center gap-2 whitespace-nowrap">
            <Plus className="h-4 w-4" />
            Add Exercise
          </Button>
        )}
      </div>

      {/* Filters Row 1: Category, Difficulty, Equipment */}
      <div className="flex gap-2 flex-wrap">
        <Select value={categoryFilter || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[140px]">
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
          <SelectTrigger className="w-[130px]">
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

        {setEquipmentFilter && (
          <Select value={equipmentFilter || 'all'} onValueChange={handleEquipmentChange}>
            <SelectTrigger className="w-[140px]">
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
        )}
      </div>

      {/* Filters Row 2: Biomechanics Toggle Buttons */}
      {(setMechanicsFilter || setForceTypeFilter) && (
        <div className="flex flex-wrap gap-4">
          {/* Mechanics Filter */}
          {setMechanicsFilter && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Mechanics:</span>
              <div className="flex gap-1">
                {(['all', 'compound', 'isolation'] as const).map((value) => (
                  <Button
                    key={value}
                    size="sm"
                    variant={mechanicsFilter === value ? 'default' : 'outline'}
                    onClick={() => setMechanicsFilter(value)}
                    className="h-7 px-2 text-xs"
                  >
                    {value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Force Type Filter */}
          {setForceTypeFilter && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground mr-1">Force:</span>
              <div className="flex gap-1 flex-wrap">
                {(['all', 'push', 'pull', 'static', 'hinge', 'squat'] as const).map((value) => (
                  <Button
                    key={value}
                    size="sm"
                    variant={forceTypeFilter === value ? 'default' : 'outline'}
                    onClick={() => setForceTypeFilter(value)}
                    className="h-7 px-2 text-xs"
                  >
                    {value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
