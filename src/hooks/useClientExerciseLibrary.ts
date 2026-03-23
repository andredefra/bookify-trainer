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
const CLIENT_SEEDED_KEY = 'client_exercises_seeded';

export type SourceFilter = 'all' | 'client' | 'trainer';

function generateDefaultClientExercises(): ExerciseData[] {
  return [
    // Chest
    { id: 'client-1', name: 'Push-Ups', category: 'chest', difficulty: 'beginner', muscleGroup: ['Chest', 'Triceps', 'Shoulders'], equipment: ['Bodyweight'], notes: 'Classic bodyweight chest exercise', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-2', name: 'Wide Push-Ups', category: 'chest', difficulty: 'beginner', muscleGroup: ['Chest', 'Shoulders'], equipment: ['Bodyweight'], notes: 'Wide grip variation targeting outer chest', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-3', name: 'Diamond Push-Ups', category: 'chest', difficulty: 'intermediate', muscleGroup: ['Chest', 'Triceps'], equipment: ['Bodyweight'], notes: 'Close grip for inner chest and triceps', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-4', name: 'Dumbbell Floor Press', category: 'chest', difficulty: 'beginner', muscleGroup: ['Chest', 'Triceps'], equipment: ['Dumbbells'], notes: 'Press from the floor with dumbbells', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-5', name: 'Chest Dips', category: 'chest', difficulty: 'intermediate', muscleGroup: ['Chest', 'Triceps', 'Shoulders'], equipment: ['Dip Station'], notes: 'Lean forward to target chest', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    // Back
    { id: 'client-6', name: 'Inverted Rows', category: 'back', difficulty: 'beginner', muscleGroup: ['Lats', 'Rhomboids', 'Biceps'], equipment: ['Bar', 'Bodyweight'], notes: 'Horizontal pulling exercise', mechanics: 'compound', forceType: 'pull', activityType: 'strength' },
    { id: 'client-7', name: 'Superman Hold', category: 'back', difficulty: 'beginner', muscleGroup: ['Lower Back', 'Glutes'], equipment: ['Bodyweight'], notes: 'Lie face down and raise arms and legs', mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
    { id: 'client-8', name: 'Resistance Band Rows', category: 'back', difficulty: 'beginner', muscleGroup: ['Lats', 'Rhomboids'], equipment: ['Resistance Band'], notes: 'Seated row with resistance band', mechanics: 'compound', forceType: 'pull', activityType: 'strength' },
    { id: 'client-9', name: 'Dumbbell Bent-Over Row', category: 'back', difficulty: 'intermediate', muscleGroup: ['Lats', 'Rhomboids', 'Biceps'], equipment: ['Dumbbells'], notes: 'Hinge at hips and row', mechanics: 'compound', forceType: 'pull', activityType: 'strength' },
    { id: 'client-10', name: 'Pull-Ups', category: 'back', difficulty: 'advanced', muscleGroup: ['Lats', 'Biceps', 'Forearms'], equipment: ['Pull-Up Bar'], notes: 'Classic vertical pull', mechanics: 'compound', forceType: 'pull', activityType: 'strength' },
    // Legs
    { id: 'client-11', name: 'Bodyweight Squats', category: 'legs', difficulty: 'beginner', muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'], equipment: ['Bodyweight'], notes: 'Fundamental lower body movement', mechanics: 'compound', forceType: 'squat', activityType: 'strength' },
    { id: 'client-12', name: 'Lunges', category: 'legs', difficulty: 'beginner', muscleGroup: ['Quadriceps', 'Glutes', 'Hamstrings'], equipment: ['Bodyweight'], notes: 'Step forward and lower', mechanics: 'compound', forceType: 'squat', activityType: 'strength' },
    { id: 'client-13', name: 'Goblet Squat', category: 'legs', difficulty: 'beginner', muscleGroup: ['Quadriceps', 'Glutes'], equipment: ['Dumbbell', 'Kettlebell'], notes: 'Hold weight at chest and squat', mechanics: 'compound', forceType: 'squat', activityType: 'strength' },
    { id: 'client-14', name: 'Bulgarian Split Squat', category: 'legs', difficulty: 'intermediate', muscleGroup: ['Quadriceps', 'Glutes'], equipment: ['Bench', 'Bodyweight'], notes: 'Rear foot elevated split squat', mechanics: 'compound', forceType: 'squat', activityType: 'strength' },
    { id: 'client-15', name: 'Glute Bridge', category: 'legs', difficulty: 'beginner', muscleGroup: ['Glutes', 'Hamstrings'], equipment: ['Bodyweight'], notes: 'Hip thrust from the floor', mechanics: 'isolation', forceType: 'hinge', activityType: 'strength' },
    { id: 'client-16', name: 'Wall Sit', category: 'legs', difficulty: 'beginner', muscleGroup: ['Quadriceps'], equipment: ['Bodyweight'], notes: 'Isometric hold against wall', mechanics: 'isolation', forceType: 'static', activityType: 'strength' },
    { id: 'client-17', name: 'Step-Ups', category: 'legs', difficulty: 'intermediate', muscleGroup: ['Quadriceps', 'Glutes'], equipment: ['Bench', 'Dumbbells'], notes: 'Step onto elevated surface', mechanics: 'compound', forceType: 'squat', activityType: 'strength' },
    // Shoulders
    { id: 'client-18', name: 'Pike Push-Ups', category: 'shoulders', difficulty: 'intermediate', muscleGroup: ['Anterior Deltoids', 'Triceps'], equipment: ['Bodyweight'], notes: 'Inverted push-up variation for shoulders', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-19', name: 'Lateral Raises', category: 'shoulders', difficulty: 'beginner', muscleGroup: ['Lateral Deltoids'], equipment: ['Dumbbells'], notes: 'Raise arms to the sides', mechanics: 'isolation', forceType: 'push', activityType: 'strength' },
    { id: 'client-20', name: 'Front Raises', category: 'shoulders', difficulty: 'beginner', muscleGroup: ['Anterior Deltoids'], equipment: ['Dumbbells'], notes: 'Raise arms to the front', mechanics: 'isolation', forceType: 'push', activityType: 'strength' },
    { id: 'client-21', name: 'Overhead Press', category: 'shoulders', difficulty: 'intermediate', muscleGroup: ['Deltoids', 'Triceps'], equipment: ['Dumbbells'], notes: 'Press weights overhead', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-22', name: 'Face Pulls', category: 'shoulders', difficulty: 'beginner', muscleGroup: ['Rear Deltoids', 'Rotator Cuff'], equipment: ['Resistance Band', 'Cable Machine'], notes: 'Pull towards face for rear delts', mechanics: 'compound', forceType: 'pull', activityType: 'strength' },
    // Arms
    { id: 'client-23', name: 'Bicep Curls', category: 'arms', difficulty: 'beginner', muscleGroup: ['Biceps'], equipment: ['Dumbbells'], notes: 'Classic bicep isolation', mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
    { id: 'client-24', name: 'Hammer Curls', category: 'arms', difficulty: 'beginner', muscleGroup: ['Biceps', 'Brachialis'], equipment: ['Dumbbells'], notes: 'Neutral grip curl', mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
    { id: 'client-25', name: 'Tricep Dips', category: 'arms', difficulty: 'beginner', muscleGroup: ['Triceps'], equipment: ['Bench', 'Bodyweight'], notes: 'Bench dips for triceps', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-26', name: 'Tricep Kickbacks', category: 'arms', difficulty: 'beginner', muscleGroup: ['Triceps'], equipment: ['Dumbbells'], notes: 'Extend arm behind you', mechanics: 'isolation', forceType: 'push', activityType: 'strength' },
    { id: 'client-27', name: 'Concentration Curls', category: 'arms', difficulty: 'intermediate', muscleGroup: ['Biceps'], equipment: ['Dumbbell'], notes: 'Seated single-arm curl', mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
    // Core
    { id: 'client-28', name: 'Plank', category: 'core', difficulty: 'beginner', muscleGroup: ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis'], equipment: ['Bodyweight'], notes: 'Isometric core hold', mechanics: 'isolation', forceType: 'static', activityType: 'strength' },
    { id: 'client-29', name: 'Crunches', category: 'core', difficulty: 'beginner', muscleGroup: ['Rectus Abdominis'], equipment: ['Bodyweight'], notes: 'Basic ab crunch', mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
    { id: 'client-30', name: 'Russian Twists', category: 'core', difficulty: 'intermediate', muscleGroup: ['Obliques', 'Rectus Abdominis'], equipment: ['Bodyweight', 'Dumbbell'], notes: 'Rotational core exercise', mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
    { id: 'client-31', name: 'Mountain Climbers', category: 'core', difficulty: 'beginner', muscleGroup: ['Core', 'Hip Flexors'], equipment: ['Bodyweight'], notes: 'Dynamic core and cardio', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-32', name: 'Leg Raises', category: 'core', difficulty: 'intermediate', muscleGroup: ['Lower Abs', 'Hip Flexors'], equipment: ['Bodyweight'], notes: 'Raise legs while lying down', mechanics: 'isolation', forceType: 'pull', activityType: 'strength' },
    { id: 'client-33', name: 'Dead Bug', category: 'core', difficulty: 'beginner', muscleGroup: ['Transverse Abdominis', 'Core'], equipment: ['Bodyweight'], notes: 'Anti-extension core exercise', mechanics: 'isolation', forceType: 'static', activityType: 'strength' },
    // Cardio
    { id: 'client-34', name: 'Jumping Jacks', category: 'cardio', difficulty: 'beginner', muscleGroup: ['Full Body'], equipment: ['Bodyweight'], notes: 'Classic cardio warm-up', mechanics: 'compound', forceType: 'push', activityType: 'cardio' },
    { id: 'client-35', name: 'High Knees', category: 'cardio', difficulty: 'beginner', muscleGroup: ['Hip Flexors', 'Core'], equipment: ['Bodyweight'], notes: 'Running in place with high knees', mechanics: 'compound', forceType: 'push', activityType: 'cardio' },
    { id: 'client-36', name: 'Burpees', category: 'cardio', difficulty: 'intermediate', muscleGroup: ['Full Body'], equipment: ['Bodyweight'], notes: 'Full body explosive cardio', mechanics: 'compound', forceType: 'push', activityType: 'cardio' },
    { id: 'client-37', name: 'Jump Rope', category: 'cardio', difficulty: 'beginner', muscleGroup: ['Calves', 'Full Body'], equipment: ['Jump Rope'], notes: 'Skipping rope cardio', mechanics: 'compound', forceType: 'push', activityType: 'cardio' },
    { id: 'client-38', name: 'Sprint Intervals', category: 'cardio', difficulty: 'advanced', muscleGroup: ['Full Body'], equipment: ['Bodyweight'], notes: 'Short bursts of max effort running', mechanics: 'compound', forceType: 'push', activityType: 'cardio' },
    // Functional
    { id: 'client-39', name: 'Kettlebell Swings', category: 'functional', difficulty: 'intermediate', muscleGroup: ['Glutes', 'Hamstrings', 'Core'], equipment: ['Kettlebell'], notes: 'Hip hinge explosive movement', mechanics: 'compound', forceType: 'hinge', activityType: 'strength' },
    { id: 'client-40', name: 'Farmer Walks', category: 'functional', difficulty: 'beginner', muscleGroup: ['Forearms', 'Traps', 'Core'], equipment: ['Dumbbells', 'Kettlebells'], notes: 'Carry heavy weights and walk', mechanics: 'compound', forceType: 'carry', activityType: 'strength' },
    { id: 'client-41', name: 'Turkish Get-Up', category: 'functional', difficulty: 'advanced', muscleGroup: ['Full Body'], equipment: ['Kettlebell'], notes: 'Complex full body movement', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    { id: 'client-42', name: 'Bear Crawl', category: 'functional', difficulty: 'intermediate', muscleGroup: ['Shoulders', 'Core', 'Quads'], equipment: ['Bodyweight'], notes: 'Crawl on hands and feet', mechanics: 'compound', forceType: 'push', activityType: 'strength' },
    // Flexibility
    { id: 'client-43', name: 'Standing Hamstring Stretch', category: 'flexibility', difficulty: 'beginner', muscleGroup: ['Hamstrings'], equipment: ['Bodyweight'], notes: 'Reach for toes while standing', mechanics: 'isolation', forceType: 'static', activityType: 'stretching' },
    { id: 'client-44', name: 'Hip Flexor Stretch', category: 'flexibility', difficulty: 'beginner', muscleGroup: ['Hip Flexors', 'Quads'], equipment: ['Bodyweight'], notes: 'Kneeling lunge stretch', mechanics: 'isolation', forceType: 'static', activityType: 'stretching' },
    { id: 'client-45', name: 'Cat-Cow Stretch', category: 'flexibility', difficulty: 'beginner', muscleGroup: ['Spine', 'Core'], equipment: ['Bodyweight'], notes: 'Spinal mobility on all fours', mechanics: 'isolation', forceType: 'static', activityType: 'mobility' },
    { id: 'client-46', name: 'Pigeon Pose', category: 'flexibility', difficulty: 'intermediate', muscleGroup: ['Glutes', 'Hip Flexors'], equipment: ['Bodyweight'], notes: 'Deep hip opener stretch', mechanics: 'isolation', forceType: 'static', activityType: 'stretching' },
    // Plyometric
    { id: 'client-47', name: 'Box Jumps', category: 'plyometric', difficulty: 'intermediate', muscleGroup: ['Quadriceps', 'Glutes', 'Calves'], equipment: ['Plyo Box'], notes: 'Jump onto elevated platform', mechanics: 'compound', forceType: 'squat', activityType: 'plyometric' },
    { id: 'client-48', name: 'Squat Jumps', category: 'plyometric', difficulty: 'intermediate', muscleGroup: ['Quadriceps', 'Glutes'], equipment: ['Bodyweight'], notes: 'Explosive squat with jump', mechanics: 'compound', forceType: 'squat', activityType: 'plyometric' },
    { id: 'client-49', name: 'Tuck Jumps', category: 'plyometric', difficulty: 'advanced', muscleGroup: ['Full Body'], equipment: ['Bodyweight'], notes: 'Jump and bring knees to chest', mechanics: 'compound', forceType: 'squat', activityType: 'plyometric' },
    { id: 'client-50', name: 'Lateral Bounds', category: 'plyometric', difficulty: 'intermediate', muscleGroup: ['Glutes', 'Quadriceps', 'Adductors'], equipment: ['Bodyweight'], notes: 'Side-to-side explosive jumps', mechanics: 'compound', forceType: 'squat', activityType: 'plyometric' },
  ];
}

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

  // Seed default client exercises on first use
  const seedDefaultExercises = useCallback(() => {
    const seeded = localStorage.getItem(CLIENT_SEEDED_KEY);
    if (!seeded) {
      const defaults = generateDefaultClientExercises();
      localStorage.setItem(CLIENT_CUSTOM_KEY, JSON.stringify(defaults));
      localStorage.setItem(CLIENT_SEEDED_KEY, 'true');
    }
  }, []);

  const hasTrainerRelationship = useCallback(() => {
    return true; // For now, always show trainer exercises (base DB)
  }, []);

  const loadExercises = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);

      seedDefaultExercises();

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
  }, [hasTrainerRelationship, seedDefaultExercises]);

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

  const handleCopyExercise = useCallback((exercise: ExerciseData) => {
    const copiedExercise: ExerciseData = {
      ...exercise,
      id: `client-copy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${exercise.name} (Copy)`,
      source: 'client',
      readOnly: false,
      isCustom: true,
      isDeletable: true,
    };

    try {
      const existing = localStorage.getItem(CLIENT_CUSTOM_KEY);
      const exercises = existing ? JSON.parse(existing) : [];
      exercises.push({ ...copiedExercise, source: undefined, readOnly: undefined });
      localStorage.setItem(CLIENT_CUSTOM_KEY, JSON.stringify(exercises));
    } catch (e) {
      console.warn('Error copying exercise:', e);
    }

    setExercises(prev => [...prev, copiedExercise]);
    toast.success(`"${exercise.name}" copied to your exercises!`);
  }, []);

  const handleSaveExercise = useCallback((id: string, updates: Partial<ExerciseData>) => {
    setExercises(prev => {
      const exercise = prev.find(e => e.id === id);
      if (!exercise || exercise.readOnly) {
        toast.error("Cannot edit trainer's exercises");
        return prev;
      }
      return prev.map(e => e.id === id ? { ...e, ...updates, isModified: true } : e);
    });

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
    handleCopyExercise,
    handleSaveExercise,
    handleResetExercise,
    handleDeleteExercise,
    retry: loadExercises,
  };
}
