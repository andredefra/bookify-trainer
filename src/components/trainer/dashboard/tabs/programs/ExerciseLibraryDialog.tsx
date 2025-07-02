
import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Bug } from 'lucide-react';
import { ExerciseData, exerciseDatabase, getExerciseById } from '@/data/exercises/exerciseDatabase';
import { ExerciseLibraryList } from './ExerciseLibraryList';
import { CreateExerciseDialog } from './CreateExerciseDialog';
import { EditExerciseDialog } from './EditExerciseDialog';
import { ExerciseLibraryDiagnostics } from './ExerciseLibraryDiagnostics';
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
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseData | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [exercises, setExercises] = useState<ExerciseData[]>([]);

  const loadExercises = useCallback(() => {
    console.log('ExerciseLibraryDialog: Loading exercises');
    console.log('exerciseDatabase length:', exerciseDatabase.length);
    
    // Start with all database exercises
    let processedExercises = [...exerciseDatabase];
    
    // Load localStorage data
    const customExercises = localStorage.getItem('trainer_custom_exercises');
    const exerciseModifications = localStorage.getItem('trainer_exercise_modifications');
    const deletedExercises = localStorage.getItem('trainer_deleted_exercises');
    
    // Apply deleted exercises filter
    if (deletedExercises) {
      try {
        const deleted = JSON.parse(deletedExercises);
        console.log('Deleted exercises:', deleted.length);
        processedExercises = processedExercises.filter(ex => !deleted.includes(ex.id));
      } catch (error) {
        console.error('Error parsing deleted exercises:', error);
      }
    }
    
    // Apply modifications
    if (exerciseModifications) {
      try {
        const modifications = JSON.parse(exerciseModifications);
        console.log('Modifications:', Object.keys(modifications).length);
        processedExercises = processedExercises.map(exercise => {
          const mods = modifications[exercise.id];
          if (mods) {
            return { ...exercise, ...mods, isModified: true };
          }
          return exercise;
        });
      } catch (error) {
        console.error('Error parsing exercise modifications:', error);
      }
    }
    
    // Add custom exercises
    if (customExercises) {
      try {
        const custom = JSON.parse(customExercises);
        console.log('Custom exercises:', custom.length);
        processedExercises = [...processedExercises, ...custom];
      } catch (error) {
        console.error('Error parsing custom exercises:', error);
      }
    }
    
    console.log('Final processed exercises count:', processedExercises.length);
    setExercises(processedExercises);
  }, []);

  // Initialize exercises
  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

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
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Exercise Library ({exercises.length} exercises)</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              className="text-xs"
            >
              <Bug className="h-3 w-3 mr-1" />
              Debug
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {/* Diagnostics Panel */}
          {showDiagnostics && (
            <ExerciseLibraryDiagnostics onRefresh={loadExercises} />
          )}
          
          {/* Status Overview */}
          <ExerciseLibraryStatus exercises={filteredExercises} />
          
          {/* Filters - More Compact */}
          <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
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
              <option value="plyometric">Plyometric</option>
            </select>

            <Input
              type="text"
              placeholder="Equipment..."
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-32 text-sm h-9"
            />

            <Input
              type="text"
              placeholder="Muscle group..."
              value={muscleGroupFilter}
              onChange={(e) => setMuscleGroupFilter(e.target.value)}
              className="w-32 text-sm h-9"
            />
          </div>

          {/* Exercise List - Increased Height */}
          <div className="flex-1 overflow-hidden">
            <ExerciseLibraryList
              exercises={filteredExercises}
              onEdit={handleEditExercise}
              onDelete={handleDeleteExercise}
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
          <Button onClick={() => onOpenChange(false)} size="sm">Close</Button>
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
