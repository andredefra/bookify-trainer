
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useExerciseLibraryManager } from '@/hooks/useExerciseLibraryManager';
import { ExerciseLibraryDialogContent } from './ExerciseLibraryDialogContent';
import { ExerciseData } from '@/data/exercises/types';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Clock } from 'lucide-react';

interface ExerciseLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectionMode?: boolean;
  onExerciseSelect?: (exercise: ExerciseData) => void;
}

export function ExerciseLibraryDialog({ 
  open, 
  onOpenChange, 
  selectionMode = false,
  onExerciseSelect 
}: ExerciseLibraryDialogProps) {
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    equipmentFilter,
    setEquipmentFilter,
    mechanicsFilter,
    setMechanicsFilter,
    forceTypeFilter,
    setForceTypeFilter,
    exercises,
    filteredExercises,
    paginatedExercises,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    isLoading,
    error,
    handleCreateExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
    retry,
  } = useExerciseLibraryManager();

  console.log('ExerciseLibraryDialog - State:', {
    open,
    exercisesLoaded: exercises.length,
    filtered: filteredExercises.length,
    paginated: paginatedExercises.length,
    selectionMode,
    isLoading,
    error
  });

  // Error state
  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Error Loading Exercises
            </DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">{error}</p>
              <div className="flex gap-2">
                <Button onClick={retry} variant="outline" className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Loading Exercise Library</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <p className="text-sm text-muted-foreground">Loading exercises...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-7xl h-[95vh] max-h-screen overflow-hidden flex flex-col p-3 sm:p-6">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg">
            {selectionMode ? 'Select Exercise' : 'Exercise Library'} ({exercises.length} exercises total)
          </DialogTitle>
        </DialogHeader>

        <ErrorBoundary fallback={
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
                <p className="text-sm text-muted-foreground">Failed to load exercise library content</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        }>
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
            equipmentFilter={equipmentFilter}
            setEquipmentFilter={setEquipmentFilter}
            mechanicsFilter={mechanicsFilter}
            setMechanicsFilter={setMechanicsFilter}
            forceTypeFilter={forceTypeFilter}
            setForceTypeFilter={setForceTypeFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onCreateExercise={handleCreateExercise}
            onEditExercise={handleSaveExercise}
            onResetExercise={handleResetExercise}
            onDeleteExercise={handleDeleteExercise}
            onClose={() => onOpenChange(false)}
            selectionMode={selectionMode}
            onExerciseSelect={onExerciseSelect}
          />
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
