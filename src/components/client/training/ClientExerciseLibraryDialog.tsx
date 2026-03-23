import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClientExerciseLibrary, SourceFilter } from '@/hooks/useClientExerciseLibrary';
import { ExerciseLibraryDialogContent } from '@/components/trainer/dashboard/tabs/programs/ExerciseLibraryDialogContent';
import { ExerciseData } from '@/data/exercises/types';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw, Clock } from 'lucide-react';

interface ClientExerciseLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientExerciseLibraryDialog({ open, onOpenChange }: ClientExerciseLibraryDialogProps) {
  const {
    searchTerm, setSearchTerm,
    categoryFilter, setCategoryFilter,
    difficultyFilter, setDifficultyFilter,
    equipmentFilter, setEquipmentFilter,
    mechanicsFilter, setMechanicsFilter,
    forceTypeFilter, setForceTypeFilter,
    sourceFilter, setSourceFilter,
    exercises,
    filteredExercises,
    paginatedExercises,
    currentPage, setCurrentPage,
    totalPages,
    totalItems,
    isLoading, error,
    clientCount, trainerCount,
    handleCreateExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
    handleCopyExercise,
    retry,
  } = useClientExerciseLibrary();

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
                  <Clock className="h-8 w-8 text-primary animate-pulse" />
                  <p className="text-sm text-muted-foreground">Loading exercises...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

  // Wrap edit/delete to block trainer exercises
  const safeEditExercise = (id: string, updates: Partial<ExerciseData>) => {
    const exercise = exercises.find(e => e.id === id);
    if (exercise?.readOnly) return;
    handleSaveExercise(id, updates);
  };

  const safeDeleteExercise = (id: string) => {
    const exercise = exercises.find(e => e.id === id);
    if (exercise?.readOnly) return;
    handleDeleteExercise(id);
  };

  const sourceFilters: { label: string; value: SourceFilter; count: number }[] = [
    { label: 'All', value: 'all', count: exercises.length },
    { label: 'My Exercises', value: 'client', count: clientCount },
    { label: "Trainer's", value: 'trainer', count: trainerCount },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-7xl h-[95vh] max-h-screen overflow-hidden flex flex-col p-3 sm:p-6">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg">
            My Exercise Library ({exercises.length} exercises)
          </DialogTitle>
        </DialogHeader>

        {/* Source filter tabs */}
        <div className="flex-shrink-0 flex gap-2 pb-2">
          {sourceFilters.map((f) => (
            <Button
              key={f.value}
              variant={sourceFilter === f.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSourceFilter(f.value)}
              className="text-xs"
            >
              {f.label}
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
                {f.count}
              </Badge>
            </Button>
          ))}
        </div>

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
            onEditExercise={safeEditExercise}
            onResetExercise={handleResetExercise}
            onDeleteExercise={safeDeleteExercise}
            onCopyExercise={handleCopyExercise}
            onClose={() => onOpenChange(false)}
            selectionMode={false}
          />
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
