
import { useState, useEffect, useCallback } from 'react';
import { ExerciseData, completeExerciseDatabase as exerciseDatabase, getExerciseById } from '@/data/exercises/exerciseDatabase';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks/useDebounce';
import { useIsMobile } from '@/hooks/use-mobile';

export function useExerciseLibraryManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const itemsPerPage = isMobile ? 8 : 12;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  console.log('📊 useExerciseLibraryManager - Starting with:', {
    mobile: isMobile,
    itemsPerPage,
    databaseSize: exerciseDatabase?.length || 0
  });

  const loadExercises = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('🔄 Loading exercises - Start');
      
      // Verify database is available
      if (!exerciseDatabase || !Array.isArray(exerciseDatabase)) {
        throw new Error('Exercise database is not available or invalid');
      }

      console.log('✅ Database verified - Count:', exerciseDatabase.length);
      
      // Start with the complete database (limit for performance)
      let processedExercises = [...exerciseDatabase.slice(0, 200)]; // Limit to first 200 for performance
      
      // Load localStorage data safely
      try {
        const customExercises = localStorage.getItem('trainer_custom_exercises');
        const exerciseModifications = localStorage.getItem('trainer_exercise_modifications');
        const deletedExercises = localStorage.getItem('trainer_deleted_exercises');
        
        console.log('💾 LocalStorage state:', {
          customExercises: customExercises ? JSON.parse(customExercises).length : 0,
          modifications: exerciseModifications ? Object.keys(JSON.parse(exerciseModifications)).length : 0,
          deleted: deletedExercises ? JSON.parse(deletedExercises).length : 0
        });
        
        // Apply deleted exercises filter
        if (deletedExercises) {
          const deleted = JSON.parse(deletedExercises);
          const beforeCount = processedExercises.length;
          processedExercises = processedExercises.filter(ex => !deleted.includes(ex.id));
          console.log('🗑️ Filtered deleted exercises:', beforeCount, '->', processedExercises.length);
        }
        
        // Apply modifications
        if (exerciseModifications) {
          const modifications = JSON.parse(exerciseModifications);
          processedExercises = processedExercises.map(exercise => {
            const mods = modifications[exercise.id];
            if (mods) {
              return { ...exercise, ...mods, isModified: true };
            }
            return exercise;
          });
          console.log('✏️ Applied modifications to exercises');
        }
        
        // Add custom exercises
        if (customExercises) {
          const custom = JSON.parse(customExercises);
          processedExercises = [...processedExercises, ...custom];
          console.log('➕ Added custom exercises:', custom.length);
        }
      } catch (localStorageError) {
        console.warn('⚠️ Error loading localStorage data:', localStorageError);
        // Continue with base exercises if localStorage fails
      }
      
      console.log('✅ Final exercise count:', processedExercises.length);
      setExercises(processedExercises);
      setIsLoading(false);
      
    } catch (error) {
      console.error('❌ Error loading exercises:', error);
      setError(error instanceof Error ? error.message : 'Failed to load exercises');
      setIsLoading(false);
      
      // Fallback to empty array
      setExercises([]);
      toast.error('Failed to load exercise library. Please try refreshing the page.');
    }
  }, []);

  // Initialize exercises
  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const handleCreateExercise = useCallback((newExercise: ExerciseData) => {
    console.log('➕ Creating new exercise:', newExercise.name);
    setExercises(prevExercises => [...prevExercises, newExercise]);
    toast.success('Exercise created successfully!');
  }, []);

  const handleSaveExercise = useCallback((id: string, updates: Partial<ExerciseData>) => {
    console.log('💾 Saving exercise updates:', id, updates);
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === id ? { ...exercise, ...updates, isModified: true } : exercise
      )
    );
  }, []);

  const handleResetExercise = useCallback((id: string) => {
    console.log('🔄 Resetting exercise:', id);
    const originalExercise = getExerciseById(id);
    if (originalExercise) {
      setExercises(prevExercises =>
        prevExercises.map(exercise =>
          exercise.id === id ? { ...originalExercise } : exercise
        )
      );
    }
  }, []);

  const handleDeleteExercise = useCallback((id: string) => {
    console.log('🗑️ Deleting exercise:', id);
    setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== id));
    toast.success('Exercise deleted successfully!');
  }, []);

  // Filter exercises with error handling
  const filteredExercises = useState(() => {
    try {
      if (!exercises || exercises.length === 0) return [];
      
      return exercises.filter(exercise => {
        if (!exercise) return false;
        
        const searchTermMatch = !debouncedSearchTerm || 
          (exercise.name && exercise.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
          (exercise.notes && exercise.notes.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

        const categoryMatch = !categoryFilter || 
          (exercise.category && exercise.category.toLowerCase() === categoryFilter.toLowerCase());
          
        const difficultyMatch = !difficultyFilter || exercise.difficulty === difficultyFilter;

        return searchTermMatch && categoryMatch && difficultyMatch;
      });
    } catch (filterError) {
      console.error('❌ Error filtering exercises:', filterError);
      return [];
    }
  })[0];

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, categoryFilter, difficultyFilter]);

  // Calculate pagination safely
  const totalPages = Math.max(1, Math.ceil((filteredExercises?.length || 0) / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExercises = filteredExercises?.slice(startIndex, endIndex) || [];

  console.log('📊 Pagination stats:', {
    totalExercises: exercises.length,
    filteredCount: filteredExercises?.length || 0,
    paginatedCount: paginatedExercises.length,
    currentPage,
    totalPages,
    itemsPerPage,
    isLoading,
    error
  });

  return {
    // State
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    exercises,
    filteredExercises: filteredExercises || [],
    paginatedExercises,
    isLoading,
    error,
    
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredExercises?.length || 0,
    
    // Actions
    handleCreateExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
    
    // Utilities
    retry: loadExercises,
  };
}
