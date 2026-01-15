import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Routine, Exercise } from '@/data/training/types';

interface RoutinesContextType {
  routines: Routine[];
  addRoutine: (routine: Omit<Routine, 'id' | 'createdAt' | 'updatedAt'>) => Routine;
  updateRoutine: (id: string, updates: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  getRoutineById: (id: string) => Routine | undefined;
  importRoutineExercises: (routineId: string) => Exercise[];
}

const RoutinesContext = createContext<RoutinesContextType | undefined>(undefined);

const initialRoutines: Routine[] = [
  {
    id: 'routine-1',
    title: 'Leg Day Warmup',
    description: 'Dynamic warmup routine for lower body training',
    exercises: [
      { id: 'ex-1', name: 'Leg Swings', sets: 2, reps: '15', muscleGroups: ['legs'] },
      { id: 'ex-2', name: 'Hip Circles', sets: 2, reps: '10', muscleGroups: ['legs'] },
      { id: 'ex-3', name: 'Bodyweight Squats', sets: 2, reps: '12', muscleGroups: ['legs'] },
      { id: 'ex-4', name: 'Walking Lunges', sets: 2, reps: '10', muscleGroups: ['legs'] },
      { id: 'ex-5', name: 'Calf Raises', sets: 2, reps: '15', muscleGroups: ['legs'] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'routine-2',
    title: 'Core Circuit',
    description: 'High-intensity core strengthening circuit',
    exercises: [
      { id: 'ex-6', name: 'Plank', sets: 3, reps: '30', repsUnit: 'sec', muscleGroups: ['core'], notes: '30 seconds hold' },
      { id: 'ex-7', name: 'Russian Twists', sets: 3, reps: '20', muscleGroups: ['core'] },
      { id: 'ex-8', name: 'Mountain Climbers', sets: 3, reps: '20', muscleGroups: ['core'] },
      { id: 'ex-9', name: 'Dead Bug', sets: 3, reps: '12', muscleGroups: ['core'] },
      { id: 'ex-10', name: 'Bicycle Crunches', sets: 3, reps: '20', muscleGroups: ['core'] },
      { id: 'ex-11', name: 'Leg Raises', sets: 3, reps: '12', muscleGroups: ['core'] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'routine-3',
    title: 'Upper Body Push',
    description: 'Chest, shoulders and triceps focused routine',
    exercises: [
      { id: 'ex-12', name: 'Bench Press', sets: 4, reps: '10', muscleGroups: ['chest'], weight: 60 },
      { id: 'ex-13', name: 'Overhead Press', sets: 4, reps: '10', muscleGroups: ['shoulders'], weight: 40 },
      { id: 'ex-14', name: 'Incline Dumbbell Press', sets: 3, reps: '12', muscleGroups: ['chest'], weight: 20 },
      { id: 'ex-15', name: 'Tricep Dips', sets: 3, reps: '12', muscleGroups: ['arms'] },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface RoutinesProviderProps {
  children: ReactNode;
  trainerId: string;
}

export function RoutinesProvider({ children, trainerId }: RoutinesProviderProps) {
  const storageKey = `trainer_routines:${trainerId}`;
  
  const [routines, setRoutines] = useState<Routine[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load routines from localStorage:', e);
    }
    return initialRoutines;
  });

  // Persist to localStorage whenever routines change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(routines));
    } catch (e) {
      console.error('Failed to save routines to localStorage:', e);
    }
  }, [routines, storageKey]);

  const addRoutine = useCallback((routineData: Omit<Routine, 'id' | 'createdAt' | 'updatedAt'>): Routine => {
    const newRoutine: Routine = {
      ...routineData,
      id: `routine-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRoutines(prev => [...prev, newRoutine]);
    return newRoutine;
  }, []);

  const updateRoutine = useCallback((id: string, updates: Partial<Routine>) => {
    setRoutines(prev => prev.map(routine => 
      routine.id === id 
        ? { ...routine, ...updates, updatedAt: new Date().toISOString() }
        : routine
    ));
  }, []);

  const deleteRoutine = useCallback((id: string) => {
    setRoutines(prev => prev.filter(routine => routine.id !== id));
  }, []);

  const getRoutineById = useCallback((id: string): Routine | undefined => {
    return routines.find(routine => routine.id === id);
  }, [routines]);

  const importRoutineExercises = useCallback((routineId: string): Exercise[] => {
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return [];
    
    // Create copies of exercises with new IDs to avoid reference issues
    return routine.exercises.map(exercise => ({
      ...exercise,
      id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));
  }, [routines]);

  return (
    <RoutinesContext.Provider value={{
      routines,
      addRoutine,
      updateRoutine,
      deleteRoutine,
      getRoutineById,
      importRoutineExercises,
    }}>
      {children}
    </RoutinesContext.Provider>
  );
}

export function useRoutinesContext() {
  const context = useContext(RoutinesContext);
  if (context === undefined) {
    throw new Error('useRoutinesContext must be used within a RoutinesProvider');
  }
  return context;
}
