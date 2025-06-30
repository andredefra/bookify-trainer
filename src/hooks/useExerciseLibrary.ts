
import { useState, useEffect } from 'react';
import { ExerciseData, exerciseDatabase, searchExercises } from '@/data/exercises/exerciseDatabase';

const CUSTOM_EXERCISES_KEY = 'trainer_custom_exercises';

export function useExerciseLibrary() {
  const [customExercises, setCustomExercises] = useState<ExerciseData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load custom exercises from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CUSTOM_EXERCISES_KEY);
    if (saved) {
      try {
        setCustomExercises(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading custom exercises:', error);
      }
    }
  }, []);

  // Save custom exercises to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(customExercises));
  }, [customExercises]);

  // Get all exercises (predefined + custom)
  const getAllExercises = () => {
    return [...exerciseDatabase, ...customExercises];
  };

  // Get filtered exercises based on search and category
  const getFilteredExercises = () => {
    let exercises = getAllExercises();

    // Apply search filter
    if (searchQuery) {
      exercises = searchExercises(searchQuery);
      // Also search in custom exercises
      const customFiltered = customExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        exercise.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      exercises = [...exercises, ...customFiltered];
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      exercises = exercises.filter(exercise => exercise.category === selectedCategory);
    }

    return exercises;
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
    deleteCustomExercise,
    getExerciseSuggestions,
    getExerciseByName,
  };
}
