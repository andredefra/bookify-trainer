
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
  return (
    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg items-center">
      <Input
        type="search"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 min-w-[200px] h-9"
      />

      <select
        className="rounded px-2 py-1 bg-white border border-gray-300 text-sm h-9"
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
        className="rounded px-2 py-1 bg-white border border-gray-300 text-sm h-9"
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
      >
        <option value="">All Difficulties</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <Button onClick={onCreateExercise} size="sm" className="ml-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Exercise
      </Button>
    </div>
  );
}
