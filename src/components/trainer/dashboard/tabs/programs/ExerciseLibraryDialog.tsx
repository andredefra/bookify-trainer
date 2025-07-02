import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ExerciseData, exerciseDatabase, getExerciseById } from '@/data/exercises/exerciseDatabase';
import { ExerciseLibraryList } from './ExerciseLibraryList';
import { CreateExerciseDialog } from './CreateExerciseDialog';
import { EditExerciseDialog } from './EditExerciseDialog';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks/useDebounce';
import { ExerciseLibraryStatus } from './ExerciseLibraryStatus';

interface ExerciseLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExerciseLibraryDialog({ open, onOpenChange }: ExerciseLibraryDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');
  const [muscleGroupFilter, setMuscleGroupFilter] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseData | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [exercises, setExercises] = useState<ExerciseData[]>(exerciseDatabase);

  const handleCreateExercise = (newExercise: ExerciseData) => {
    setExercises(prevExercises => [...prevExercises, newExercise]);
    toast.success('Exercise created successfully!');
  };

  const handleEditExercise = (exercise: ExerciseData) => {
    setExerciseToEdit(exercise);
    setShowEditForm(true);
  };

  const handleSaveExercise = (id: string, updates: Partial<ExerciseData>) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === id ? { ...exercise, ...updates, isModified: true } : exercise
      )
    );
  };

  const handleResetExercise = (id: string) => {
    const originalExercise = getExerciseById(id);
    if (originalExercise) {
      setExercises(prevExercises =>
        prevExercises.map(exercise =>
          exercise.id === id ? { ...originalExercise } : exercise
        )
      );
    }
  };

  const handleDeleteExercise = (id: string) => {
    setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== id));
    toast.success('Exercise deleted successfully!');
  };

  const filteredExercises = exercises.filter(exercise => {
    const searchTermMatch =
      exercise.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      exercise.notes.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    const categoryMatch = categoryFilter === '' || exercise.category.toLowerCase() === categoryFilter.toLowerCase();
    const difficultyMatch = difficultyFilter === '' || exercise.difficulty === difficultyFilter;
    
    const equipmentMatch = equipmentFilter === '' || exercise.equipment.some(eq =>
      eq.toLowerCase().includes(equipmentFilter.toLowerCase())
    );

    const muscleGroupMatch = muscleGroupFilter === '' || exercise.muscleGroup.some(muscle =>
      muscle.toLowerCase().includes(muscleGroupFilter.toLowerCase())
    );

    return searchTermMatch && categoryMatch && difficultyMatch && equipmentMatch && muscleGroupMatch;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Exercise Library</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Status Overview */}
          <ExerciseLibraryStatus exercises={filteredExercises} />
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
            <Input
              type="search"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px]"
            />

            <Label className="text-sm font-medium">Category:</Label>
            <select
              className="rounded px-2 py-1 bg-white border border-gray-300 text-sm"
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
            </select>

            <Label className="text-sm font-medium">Difficulty:</Label>
            <select
              className="rounded px-2 py-1 bg-white border border-gray-300 text-sm"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <Label className="text-sm font-medium">Equipment:</Label>
            <Input
              type="text"
              placeholder="Filter by equipment..."
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-40 text-sm"
            />

            <Label className="text-sm font-medium">Muscle Group:</Label>
            <Input
              type="text"
              placeholder="Filter by muscle group..."
              value={muscleGroupFilter}
              onChange={(e) => setMuscleGroupFilter(e.target.value)}
              className="w-40 text-sm"
            />
          </div>

          {/* Exercise List */}
          <div className="flex-1 overflow-hidden">
            <ExerciseLibraryList
              exercises={filteredExercises}
              onEdit={handleEditExercise}
              onDelete={handleDeleteExercise}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>

      <CreateExerciseDialog
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        onSave={handleCreateExercise}
      />

      {exerciseToEdit && (
        <EditExerciseDialog
          open={showEditForm}
          onOpenChange={setShowEditForm}
          exercise={exerciseToEdit}
          onSave={handleSaveExercise}
          onReset={handleResetExercise}
        />
      )}
    </Dialog>
  );
}
