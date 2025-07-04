import { useState, useCallback } from 'react';
import { Exercise } from '@/data/training/types';
import { ExerciseData } from '@/data/exercises/types';

export function useExerciseManagement(
  exercise: Exercise,
  onUpdate: (field: string, value: any) => void
) {
  const [isExerciseSelected, setIsExerciseSelected] = useState(!!exercise.name);

  const handleExerciseSelect = useCallback((exerciseData: ExerciseData) => {
    // Update exercise name
    onUpdate("name", exerciseData.name);
    
    // Auto-fill notes if they're empty
    if (!exercise.notes || exercise.notes.trim() === '') {
      onUpdate("notes", exerciseData.notes || "");
    }
    
    // Mark as selected
    setIsExerciseSelected(true);
  }, [exercise.notes, onUpdate]);

  const handleFieldUpdate = useCallback((field: string, value: any) => {
    onUpdate(field, value);
  }, [onUpdate]);

  const resetExercise = useCallback(() => {
    onUpdate("name", "");
    onUpdate("notes", "");
    onUpdate("sets", 3);
    onUpdate("reps", "10");
    onUpdate("repsUnit", "reps");
    setIsExerciseSelected(false);
  }, [onUpdate]);

  return {
    isExerciseSelected,
    handleExerciseSelect,
    handleFieldUpdate,
    resetExercise
  };
}