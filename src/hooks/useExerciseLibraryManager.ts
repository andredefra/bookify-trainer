
import { useState, useEffect, useCallback } from 'react';
import { ExerciseData, exerciseDatabase, getExerciseById } from '@/data/exercises/exerciseDatabase';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks/useDebounce';

export function useExerciseLibraryManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Show 24 exercises per page
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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

  // Filter exercises based on search and filters
  const filteredExercises = exercises.filter(exercise => {
    const searchTermMatch =
      exercise.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      exercise.notes.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    const categoryMatch = categoryFilter === '' || exercise.category.toLowerCase() === categoryFilter.toLowerCase();
    const difficultyMatch = difficultyFilter === '' || exercise.difficulty === difficultyFilter;

    return searchTermMatch && categoryMatch && difficultyMatch;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, categoryFilter, difficultyFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExercises = filteredExercises.slice(startIndex, endIndex);

  return {
    // State
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    exercises,
    filteredExercises,
    paginatedExercises,
    
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredExercises.length,
    
    // Actions
    handleCreateExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
  };
}
