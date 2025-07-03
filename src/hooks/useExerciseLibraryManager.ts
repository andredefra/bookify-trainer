
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
  const isMobile = useIsMobile();
  
  // Increased items per page for mobile since cards are more compact now
  const itemsPerPage = isMobile ? 8 : 12;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  console.log('🔍 useExerciseLibraryManager - Mobile:', isMobile, 'Items per page:', itemsPerPage);

  const loadExercises = useCallback(() => {
    console.log('📚 Loading exercises - Database count:', exerciseDatabase.length);
    
    // Start with the complete database
    let processedExercises = [...exerciseDatabase];
    
    // Load localStorage data
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
      try {
        const deleted = JSON.parse(deletedExercises);
        const beforeCount = processedExercises.length;
        processedExercises = processedExercises.filter(ex => !deleted.includes(ex.id));
        console.log('🗑️ Filtered deleted exercises:', beforeCount, '->', processedExercises.length);
      } catch (error) {
        console.error('Error parsing deleted exercises:', error);
      }
    }
    
    // Apply modifications
    if (exerciseModifications) {
      try {
        const modifications = JSON.parse(exerciseModifications);
        processedExercises = processedExercises.map(exercise => {
          const mods = modifications[exercise.id];
          if (mods) {
            return { ...exercise, ...mods, isModified: true };
          }
          return exercise;
        });
        console.log('✏️ Applied modifications to exercises');
      } catch (error) {
        console.error('Error parsing exercise modifications:', error);
      }
    }
    
    // Add custom exercises
    if (customExercises) {
      try {
        const custom = JSON.parse(customExercises);
        processedExercises = [...processedExercises, ...custom];
        console.log('➕ Added custom exercises:', custom.length);
      } catch (error) {
        console.error('Error parsing custom exercises:', error);
      }
    }
    
    console.log('✅ Final exercise count:', processedExercises.length);
    console.log('🎯 Sample exercises with alternatives:', 
      processedExercises.filter(ex => ex.alternativeExercises && ex.alternativeExercises.length > 0).length
    );
    
    setExercises(processedExercises);
  }, []);

  // Initialize exercises
  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const handleCreateExercise = (newExercise: ExerciseData) => {
    console.log('➕ Creating new exercise:', newExercise.name);
    setExercises(prevExercises => [...prevExercises, newExercise]);
    toast.success('Exercise created successfully!');
  };

  const handleSaveExercise = (id: string, updates: Partial<ExerciseData>) => {
    console.log('💾 Saving exercise updates:', id, updates);
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === id ? { ...exercise, ...updates, isModified: true } : exercise
      )
    );
  };

  const handleResetExercise = (id: string) => {
    console.log('🔄 Resetting exercise:', id);
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
    console.log('🗑️ Deleting exercise:', id);
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

  console.log('📊 Pagination stats:', {
    totalExercises: exercises.length,
    filteredCount: filteredExercises.length,
    paginatedCount: paginatedExercises.length,
    currentPage,
    totalPages,
    itemsPerPage,
    searchTerm: debouncedSearchTerm,
    categoryFilter,
    difficultyFilter
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
