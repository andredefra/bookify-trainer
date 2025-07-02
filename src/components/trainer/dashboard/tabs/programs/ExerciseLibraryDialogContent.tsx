
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { ExerciseLibraryList } from './ExerciseLibraryList';
import { CreateExerciseDialog } from './CreateExerciseDialog';
import { EditExerciseDialog } from './EditExerciseDialog';
import { ExerciseLibraryFilters } from './ExerciseLibraryFilters';

interface ExerciseLibraryDialogContentProps {
  exercises: ExerciseData[];
  filteredExercises: ExerciseData[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  equipmentFilter: string;
  setEquipmentFilter: (equipment: string) => void;
  muscleGroupFilter: string;
  setMuscleGroupFilter: (muscleGroup: string) => void;
  onCreateExercise: (exercise: ExerciseData) => void;
  onEditExercise: (id: string, updates: Partial<ExerciseData>) => void;
  onResetExercise: (id: string) => void;
  onDeleteExercise: (id: string) => void;
  onClose: () => void;
}

export function ExerciseLibraryDialogContent({
  exercises,
  filteredExercises,
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
  onCreateExercise,
  onEditExercise,
  onResetExercise,
  onDeleteExercise,
  onClose,
}: ExerciseLibraryDialogContentProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseData | null>(null);

  const handleEditExercise = (exercise: ExerciseData) => {
    setExerciseToEdit(exercise);
    setShowEditForm(true);
  };

  return (
    <>
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* Filters */}
        <ExerciseLibraryFilters
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
        />

        {/* Exercise List */}
        <div className="flex-1 overflow-hidden">
          <ExerciseLibraryList
            exercises={filteredExercises}
            onEdit={handleEditExercise}
            onDelete={onDeleteExercise}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center border-t pt-3">
        <Button variant="outline" onClick={() => setShowCreateForm(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Exercise
        </Button>
        <Badge variant="secondary" className="text-xs">
          Showing {filteredExercises.length} of {exercises.length} exercises
        </Badge>
        <Button onClick={onClose} size="sm">Close</Button>
      </div>

      <CreateExerciseDialog
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        onSave={onCreateExercise}
      />

      {exerciseToEdit && (
        <EditExerciseDialog
          open={showEditForm}
          onOpenChange={setShowEditForm}
          exercise={exerciseToEdit}
          onSave={onEditExercise}
          onReset={onResetExercise}
        />
      )}
    </>
  );
}
