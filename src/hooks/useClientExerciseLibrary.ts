import { useState, useEffect, useCallback, useMemo } from 'react';
import { ExerciseData, completeExerciseDatabase as exerciseDatabase } from '@/data/exercises/exerciseDatabase';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks/useDebounce';
import { useIsMobile } from '@/hooks/use-mobile';
import { deriveMechanics, deriveForceType } from '@/data/exercises/biomechanicsMapping';
import type { Mechanics, ForceType } from '@/data/exercises/types';

const CLIENT_CUSTOM_KEY = 'client_custom_exercises';
const CLIENT_MODIFICATIONS_KEY = 'client_exercise_modifications';
const CLIENT_DELETED_KEY = 'client_deleted_exercises';

export type SourceFilter = 'all' | 'client' | 'trainer';

export function useClientExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');
  const [mechanicsFilter, setMechanicsFilter] = useState<'all' | Mechanics>('all');
  const [forceTypeFilter, setForceTypeFilter] = useState<'all' | ForceType>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const itemsPerPage = isMobile ? 8 : 12;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const hasTrainerRelationship = useCallback(() => {
    // Check if client has an active trainer relationship
    // For now, check if trainer exercises exist in localStorage
    const trainerCustom = localStorage.getItem('trainer_custom_exercises');
    const trainerDeleted = localStorage.getItem('trainer_deleted_exercises');
    const trainerMods = localStorage.getItem('trainer_exercise_modifications');
    // If any trainer data exists OR we have the base database, trainer is active
    // Later this will be wired to Supabase
    return true; // For now, always show trainer exercises (base DB)
  }, []);

  const loadExercises = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);

      const allExercises: ExerciseData[] = [];

      // 1. Load trainer exercises (base DB + trainer customizations) — read-only
      if (hasTrainerRelationship()) {
        let trainerExercises = [...(exerciseDatabase || [])];

        try {
          const deletedExercises = localStorage.getItem('trainer_deleted_exercises');
          if (deletedExercises) {
            const deleted = JSON.parse(deletedExercises);
            trainerExercises = trainerExercises.filter(ex => !deleted.includes(ex.id));
          }

          const exerciseModifications = localStorage.getItem('trainer_exercise_modifications');
          if (exerciseModifications) {
            const modifications = JSON.parse(exerciseModifications);
            trainerExercises = trainerExercises.map(exercise => {
              const mods = modifications[exercise.id];
              return mods ? { ...exercise, ...mods, isModified: true } : exercise;
            });
          }

          const customExercises = localStorage.getItem('trainer_custom_exercises');
          if (customExercises) {
            const custom = JSON.parse(customExercises);
            trainerExercises = [...trainerExercises, ...custom];
          }
        } catch (e) {
          console.warn('Error loading trainer localStorage data:', e);
        }

        // Mark all trainer exercises as read-only
        trainerExercises.forEach(ex => {
          allExercises.push({ ...ex, source: 'trainer', readOnly: true });
        });
      }

      // 2. Load client's own exercises — fully editable
      try {
        const clientCustom = localStorage.getItem(CLIENT_CUSTOM_KEY);
        const clientDeleted = localStorage.getItem(CLIENT_DELETED_KEY);
        const clientMods = localStorage.getItem(CLIENT_MODIFICATIONS_KEY);

        let clientExercises: ExerciseData[] = [];

        if (clientCustom) {
          clientExercises = JSON.parse(clientCustom);
        }

        if (clientDeleted) {
          const deleted = JSON.parse(clientDeleted);
          clientExercises = clientExercises.filter(ex => !deleted.includes(ex.id));
        }

        if (clientMods) {
          const modifications = JSON.parse(clientMods);
          clientExercises = clientExercises.map(exercise => {
            const mods = modifications[exercise.id];
            return mods ? { ...exercise, ...mods, isModified: true } : exercise;
          });
        }

        clientExercises.forEach(ex => {
          allExercises.push({ ...ex, source: 'client', readOnly: false, isCustom: true, isDeletable: true });
        });
      } catch (e) {
        console.warn('Error loading client localStorage data:', e);
      }

      setExercises(allExercises);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading client exercise library:', err);
      setError(err instanceof Error ? err.message : 'Failed to load exercises');
      setIsLoading(false);
      setExercises([]);
      toast.error('Failed to load exercise library.');
    }
  }, [hasTrainerRelationship]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const handleCreateExercise = useCallback((newExercise: ExerciseData) => {
    const clientExercise: ExerciseData = {
      ...newExercise,
      source: 'client',
      readOnly: false,
      isCustom: true,
      isDeletable: true,
    };

    // Persist to localStorage
    try {
      const existing = localStorage.getItem(CLIENT_CUSTOM_KEY);
      const exercises = existing ? JSON.parse(existing) : [];
      exercises.push(newExercise);
      localStorage.setItem(CLIENT_CUSTOM_KEY, JSON.stringify(exercises));
    } catch (e) {
      console.warn('Error saving client exercise:', e);
    }

    setExercises(prev => [...prev, clientExercise]);
    toast.success('Exercise created successfully!');
  }, []);

  const handleSaveExercise = useCallback((id: string, updates: Partial<ExerciseData>) => {
    // Only allow editing client exercises
    setExercises(prev => {
      const exercise = prev.find(e => e.id === id);
      if (!exercise || exercise.readOnly) {
        toast.error("Cannot edit trainer's exercises");
        return prev;
      }
      return prev.map(e => e.id === id ? { ...e, ...updates, isModified: true } : e);
    });

    // Persist modifications
    try {
      const existing = localStorage.getItem(CLIENT_MODIFICATIONS_KEY);
      const mods = existing ? JSON.parse(existing) : {};
      mods[id] = { ...mods[id], ...updates };
      localStorage.setItem(CLIENT_MODIFICATIONS_KEY, JSON.stringify(mods));
    } catch (e) {
      console.warn('Error saving modification:', e);
    }
  }, []);

  const handleResetExercise = useCallback((id: string) => {
    // Remove modifications for this exercise
    try {
      const existing = localStorage.getItem(CLIENT_MODIFICATIONS_KEY);
      if (existing) {
        const mods = JSON.parse(existing);
        delete mods[id];
        localStorage.setItem(CLIENT_MODIFICATIONS_KEY, JSON.stringify(mods));
      }
    } catch (e) {
      console.warn('Error resetting exercise:', e);
    }
    loadExercises();
  }, [loadExercises]);

  const handleDeleteExercise = useCallback((id: string) => {
    setExercises(prev => {
      const exercise = prev.find(e => e.id === id);
      if (!exercise || exercise.readOnly) {
        toast.error("Cannot delete trainer's exercises");
        return prev;
      }
      return prev.filter(e => e.id !== id);
    });

    // Persist deletion
    try {
      const existing = localStorage.getItem(CLIENT_DELETED_KEY);
      const deleted = existing ? JSON.parse(existing) : [];
      deleted.push(id);
      localStorage.setItem(CLIENT_DELETED_KEY, JSON.stringify(deleted));
    } catch (e) {
      console.warn('Error saving deletion:', e);
    }

    toast.success('Exercise deleted successfully!');
  }, []);

  const filteredExercises = useMemo(() => {
    if (!exercises || exercises.length === 0) return [];

    return exercises.filter(exercise => {
      if (!exercise) return false;

      // Source filter
      if (sourceFilter !== 'all' && exercise.source !== sourceFilter) return false;

      const searchTermMatch = !debouncedSearchTerm ||
        exercise.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        exercise.notes?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const categoryMatch = !categoryFilter ||
        exercise.category?.toLowerCase() === categoryFilter.toLowerCase();

      const difficultyMatch = !difficultyFilter || exercise.difficulty === difficultyFilter;

      const equipmentMatch = !equipmentFilter ||
        exercise.equipment?.some(eq => eq.toLowerCase().includes(equipmentFilter.toLowerCase()));

      const exerciseMechanics = deriveMechanics(exercise);
      const mechanicsMatch = mechanicsFilter === 'all' || exerciseMechanics === mechanicsFilter;

      const exerciseForceType = deriveForceType(exercise);
      const forceTypeMatch = forceTypeFilter === 'all' || exerciseForceType === forceTypeFilter;

      return searchTermMatch && categoryMatch && difficultyMatch && equipmentMatch && mechanicsMatch && forceTypeMatch;
    });
  }, [exercises, debouncedSearchTerm, categoryFilter, difficultyFilter, equipmentFilter, mechanicsFilter, forceTypeFilter, sourceFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, categoryFilter, difficultyFilter, equipmentFilter, mechanicsFilter, forceTypeFilter, sourceFilter]);

  const totalPages = Math.max(1, Math.ceil((filteredExercises?.length || 0) / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExercises = filteredExercises?.slice(startIndex, startIndex + itemsPerPage) || [];

  const clientCount = exercises.filter(e => e.source === 'client').length;
  const trainerCount = exercises.filter(e => e.source === 'trainer').length;

  return {
    searchTerm, setSearchTerm,
    categoryFilter, setCategoryFilter,
    difficultyFilter, setDifficultyFilter,
    equipmentFilter, setEquipmentFilter,
    mechanicsFilter, setMechanicsFilter,
    forceTypeFilter, setForceTypeFilter,
    sourceFilter, setSourceFilter,
    exercises,
    filteredExercises: filteredExercises || [],
    paginatedExercises,
    isLoading, error,
    currentPage, setCurrentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredExercises?.length || 0,
    clientCount, trainerCount,
    handleCreateExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
    retry: loadExercises,
  };
}
