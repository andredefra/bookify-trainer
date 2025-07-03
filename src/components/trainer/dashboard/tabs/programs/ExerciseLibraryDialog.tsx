
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useExerciseLibraryManager } from '@/hooks/useExerciseLibraryManager';
import { ExerciseLibraryDialogContent } from './ExerciseLibraryDialogContent';

interface ExerciseLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExerciseLibraryDialog({ open, onOpenChange }: ExerciseLibraryDialogProps) {
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    exercises,
    filteredExercises,
    paginatedExercises,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    handleCreateExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
  } = useExerciseLibraryManager();

  console.log('ExerciseLibraryDialog - Exercises loaded:', exercises.length);
  console.log('ExerciseLibraryDialog - Filtered:', filteredExercises.length);
  console.log('ExerciseLibraryDialog - Paginated:', paginatedExercises.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-7xl h-[95vh] max-h-screen overflow-hidden flex flex-col p-3 sm:p-6">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg">
            Exercise Library ({exercises.length} exercises total)
          </DialogTitle>
        </DialogHeader>

        <ExerciseLibraryDialogContent
          exercises={exercises}
          filteredExercises={filteredExercises}
          paginatedExercises={paginatedExercises}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onCreateExercise={handleCreateExercise}
          onEditExercise={handleSaveExercise}
          onResetExercise={handleResetExercise}
          onDeleteExercise={handleDeleteExercise}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
