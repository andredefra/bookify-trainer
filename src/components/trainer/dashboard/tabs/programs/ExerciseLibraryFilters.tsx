
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExerciseLibraryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  onCreateExercise: () => void;
}

export function ExerciseLibraryFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  difficultyFilter,
  setDifficultyFilter,
  onCreateExercise,
}: ExerciseLibraryFiltersProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'p-1' : 'p-2'} bg-gray-50 rounded-lg space-y-1`}>
      {/* Search Input - Compact */}
      <Input
        type="search"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full ${isMobile ? 'h-8 text-sm' : 'h-9'}`}
      />

      {/* Filters and Add Button - More compact layout */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-1`}>
        {/* Filter Selects */}
        <div className={`flex ${isMobile ? 'flex-row' : 'flex-row'} gap-1 ${isMobile ? 'w-full' : 'flex-1'}`}>
          <select
            className={`rounded px-2 py-1 bg-white border border-gray-300 text-sm 
              ${isMobile ? 'h-8 flex-1' : 'h-9 min-w-[120px]'}`}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
            <option value="cardio">Cardio</option>
            <option value="functional">Functional</option>
            <option value="flexibility">Flexibility</option>
            <option value="plyometric">Plyometric</option>
          </select>

          <select
            className={`rounded px-2 py-1 bg-white border border-gray-300 text-sm 
              ${isMobile ? 'h-8 flex-1' : 'h-9 min-w-[120px]'}`}
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Add Exercise Button - Inline on mobile for space efficiency */}
          <Button 
            onClick={onCreateExercise} 
            size="sm"
            className={`${isMobile ? 'h-8 px-2' : 'h-9 px-3'} flex items-center justify-center gap-1 flex-shrink-0`}
          >
            <Plus className="h-3 w-3" />
            {isMobile ? 'Add' : 'Add Exercise'}
          </Button>
        </div>
      </div>
    </div>
  );
}
