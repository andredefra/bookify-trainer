
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
    <div className={`${isMobile ? 'p-2' : 'p-3'} bg-gray-50 rounded-lg space-y-2`}>
      {/* Search Input - Full width on mobile */}
      <Input
        type="search"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full ${isMobile ? 'h-10 text-sm' : 'h-9'}`}
      />

      {/* Filters and Add Button */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
        {/* Filter Selects */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 ${isMobile ? 'w-full' : 'flex-1'}`}>
          <select
            className={`rounded px-3 py-2 bg-white border border-gray-300 text-sm 
              ${isMobile ? 'h-10 w-full' : 'h-9 min-w-[120px]'}`}
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
            className={`rounded px-3 py-2 bg-white border border-gray-300 text-sm 
              ${isMobile ? 'h-10 w-full' : 'h-9 min-w-[120px]'}`}
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Add Exercise Button */}
        <Button 
          onClick={onCreateExercise} 
          size={isMobile ? "default" : "sm"}
          className={`${isMobile ? 'h-10 w-full' : 'h-9'} flex items-center justify-center gap-2`}
        >
          <Plus className="h-4 w-4" />
          {isMobile ? 'Add New Exercise' : 'Add Exercise'}
        </Button>
      </div>
    </div>
  );
}
