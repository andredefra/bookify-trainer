
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
    equipmentFilter,
    setEquipmentFilter,
    muscleGroupFilter,
    setMuscleGroupFilter,
    exercises,
    filteredExercises,
    handleCreateExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
  } = useExerciseLibraryManager();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Exercise Library ({exercises.length} exercises)
          </DialogTitle>
        </DialogHeader>

        <ExerciseLibraryDialogContent
          exercises={exercises}
          filteredExercises={filteredExercises}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          equipmentFilter={equipmentFilter}
          setEquipmentFilter={setEquipmentFilter}
          muscleGroupFilter={muscleGroupFilter}
          setMuscleGroupFilter={setMuscleGroupFilter}
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
