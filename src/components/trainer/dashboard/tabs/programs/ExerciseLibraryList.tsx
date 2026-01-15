import { memo } from 'react';
import { ExerciseData } from '@/data/exercises/types';
import { ExerciseVisualCard } from './ExerciseVisualCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExerciseLibraryListProps {
  exercises: ExerciseData[];
  onEdit: (exercise: ExerciseData) => void;
  onDelete: (id: string) => void;
  selectionMode?: boolean;
  onSelect?: (exercise: ExerciseData) => void;
}

export function ExerciseLibraryList({
  exercises,
  onEdit,
  onDelete,
  selectionMode = false,
  onSelect,
}: ExerciseLibraryListProps) {
  const isMobile = useIsMobile();
  
  console.log('ExerciseLibraryList - Rendering:', {
    exerciseCount: exercises?.length || 0,
    selectionMode
  });

  if (!exercises || exercises.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">No exercises found</p>
          <p className="text-sm text-muted-foreground">
            {selectionMode ? 'Try adjusting your search filters' : 'Create your first exercise to get started'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-2 sm:p-4">
      {/* Grid layout - responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {exercises.map((exercise) => (
          <ExerciseVisualCard
            key={exercise.id}
            exercise={exercise}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            selectionMode={selectionMode}
            compact={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
