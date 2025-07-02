import { useState, useEffect } from 'react';
import { ExerciseData, exerciseDatabase, searchExercises } from '@/data/exercises/exerciseDatabase';

const CUSTOM_EXERCISES_KEY = 'trainer_custom_exercises';
const EXERCISE_MODIFICATIONS_KEY = 'trainer_exercise_modifications';

export function useExerciseLibrary() {
  const [customExercises, setCustomExercises] = useState<ExerciseData[]>([]);
  const [exerciseModifications, setExerciseModifications] = useState<Record<string, Partial<ExerciseData>>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load custom exercises and modifications from localStorage on mount
  useEffect(() => {
    const savedCustom = localStorage.getItem(CUSTOM_EXERCISES_KEY);
    if (savedCustom) {
      try {
        setCustomExercises(JSON.parse(savedCustom));
      } catch (error) {
        console.error('Error loading custom exercises:', error);
      }
    }

    const savedModifications = localStorage.getItem(EXERCISE_MODIFICATIONS_KEY);
    if (savedModifications) {
      try {
        setExerciseModifications(JSON.parse(savedModifications));
      } catch (error) {
        console.error('Error loading exercise modifications:', error);
      }
    }
  }, []);

  // Save custom exercises to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(customExercises));
  }, [customExercises]);

  // Save exercise modifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(EXERCISE_MODIFICATIONS_KEY, JSON.stringify(exerciseModifications));
  }, [exerciseModifications]);

  // Get all exercises (predefined + custom) with modifications applied
  const getAllExercises = () => {
    const predefinedWithModifications = exerciseDatabase.map(exercise => {
      const modifications = exerciseModifications[exercise.id];
      if (modifications) {
        return {
          ...exercise,
          ...modifications,
          isModified: true
        };
      }
      return exercise;
    });

    return [...predefinedWithModifications, ...customExercises];
  };

  // Get filtered exercises based on search and category
  const getFilteredExercises = () => {
    let exercises = getAllExercises();

    // Apply search filter
    if (searchQuery) {
      exercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        exercise.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.equipment.some(eq => eq.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      exercises = exercises.filter(exercise => exercise.category === selectedCategory);
    }

    return exercises;
  };

  // Find exercises by equipment availability
  const findAlternativesByEquipment = (unavailableEquipment: string[], targetMuscleGroups: string[]) => {
    const allExercises = getAllExercises();
    
    return allExercises.filter(exercise => 
      // Exercise doesn't use the unavailable equipment
      !exercise.equipment.some(eq => unavailableEquipment.includes(eq)) &&
      // Exercise targets at least one of the same muscle groups
      exercise.muscleGroup.some(muscle => targetMuscleGroups.includes(muscle))
    );
  };

  // Get exercises by primary equipment
  const getExercisesByEquipment = (equipment: string) => {
    const allExercises = getAllExercises();
    return allExercises.filter(exercise => 
      exercise.primaryEquipment === equipment || 
      exercise.equipment.includes(equipment)
    );
  };

  // Add custom exercise
  const addCustomExercise = (exercise: Omit<ExerciseData, 'id' | 'isCustom'>) => {
    const newExercise: ExerciseData = {
      ...exercise,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isCustom: true
    };
    
    setCustomExercises(prev => [...prev, newExercise]);
    return newExercise;
  };

  // Update custom exercise
  const updateCustomExercise = (id: string, updates: Partial<ExerciseData>) => {
    setCustomExercises(prev =>
      prev.map(exercise =>
        exercise.id === id ? { ...exercise, ...updates } : exercise
      )
    );
  };

  // Update any exercise (custom or predefined)
  const updateExercise = (id: string, updates: Partial<ExerciseData>) => {
    // Check if it's a custom exercise
    const customExercise = customExercises.find(ex => ex.id === id);
    if (customExercise) {
      updateCustomExercise(id, updates);
    } else {
      // It's a predefined exercise, store modifications separately
      setExerciseModifications(prev => ({
        ...prev,
        [id]: { ...prev[id], ...updates }
      }));
    }
  };

  // Reset exercise to original (remove modifications)
  const resetExercise = (id: string) => {
    setExerciseModifications(prev => {
      const newModifications = { ...prev };
      delete newModifications[id];
      return newModifications;
    });
  };

  // Delete custom exercise
  const deleteCustomExercise = (id: string) => {
    setCustomExercises(prev => prev.filter(exercise => exercise.id !== id));
  };

  // Get exercise suggestions for autocomplete
  const getExerciseSuggestions = (query: string, limit: number = 5) => {
    if (!query) return [];
    
    const allExercises = getAllExercises();
    const filtered = allExercises
      .filter(exercise =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);
    
    return filtered;
  };

  // Get exercise by name (for auto-fill)
  const getExerciseByName = (name: string) => {
    const allExercises = getAllExercises();
    return allExercises.find(exercise => 
      exercise.name.toLowerCase() === name.toLowerCase()
    );
  };

  return {
    // Data
    allExercises: getAllExercises(),
    filteredExercises: getFilteredExercises(),
    customExercises,
    
    // Search and filter state
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    
    // Actions
    addCustomExercise,
    updateCustomExercise,
    updateExercise,
    resetExercise,
    deleteCustomExercise,
    getExerciseSuggestions,
    getExerciseByName,
    
    // New functions
    findAlternativesByEquipment,
    getExercisesByEquipment,
  };
}
