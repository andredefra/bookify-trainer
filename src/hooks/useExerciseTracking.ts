import { useState, useEffect } from 'react';
import { Exercise, SetData, ExerciseHistory } from '@/data/training/types';

interface ExerciseTrackingState {
  [exerciseId: string]: {
    currentSets: SetData[];
    history: ExerciseHistory[];
    suggestedWeight: number;
  };
}

export function useExerciseTracking() {
  const [trackingData, setTrackingData] = useState<ExerciseTrackingState>({});

  // Load tracking data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('exerciseTracking');
    if (savedData) {
      try {
        setTrackingData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading exercise tracking data:', error);
      }
    }
  }, []);

  // Save tracking data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('exerciseTracking', JSON.stringify(trackingData));
  }, [trackingData]);

  const initializeExercise = (exercise: Exercise, sessionId: string) => {
    const exerciseId = `${exercise.id}-${sessionId}`;
    
    if (!trackingData[exerciseId]) {
      const initialSets: SetData[] = Array.from({ length: exercise.sets }, (_, index) => ({
        setNumber: index + 1,
        targetReps: exercise.reps,
        completed: false,
      }));

      const suggestedWeight = calculateSuggestedWeight(exercise.id, exercise.weight || 0);

      setTrackingData(prev => ({
        ...prev,
        [exerciseId]: {
          currentSets: initialSets,
          history: prev[exercise.id]?.history || [],
          suggestedWeight,
        }
      }));
    }
  };

  const updateSet = (exerciseId: string, setNumber: number, data: Partial<SetData>) => {
    setTrackingData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        currentSets: prev[exerciseId]?.currentSets.map(set => 
          set.setNumber === setNumber ? { ...set, ...data } : set
        ) || [],
      }
    }));
  };

  const completeExercise = (exerciseId: string, sessionId: string) => {
    const exerciseData = trackingData[exerciseId];
    if (!exerciseData) return;

    const completedSets = exerciseData.currentSets.filter(set => set.completed && set.weight && set.actualReps);
    
    if (completedSets.length > 0) {
      const totalVolume = completedSets.reduce((sum, set) => 
        sum + (set.weight || 0) * (set.actualReps || 0), 0
      );
      
      const averageWeight = completedSets.reduce((sum, set) => sum + (set.weight || 0), 0) / completedSets.length;
      const maxWeight = Math.max(...completedSets.map(set => set.weight || 0));

      const historyEntry: ExerciseHistory = {
        sessionId,
        date: new Date().toISOString(),
        sets: completedSets,
        totalVolume,
        averageWeight,
        maxWeight,
      };

      // Update history for the base exercise (without session suffix)
      const baseExerciseId = exerciseId.split('-')[0];
      
      setTrackingData(prev => ({
        ...prev,
        [baseExerciseId]: {
          ...prev[baseExerciseId],
          history: [...(prev[baseExerciseId]?.history || []), historyEntry],
        }
      }));
    }
  };

  const calculateSuggestedWeight = (exerciseId: string, defaultWeight: number): number => {
    const exerciseHistory = trackingData[exerciseId]?.history;
    if (!exerciseHistory || exerciseHistory.length === 0) {
      return defaultWeight;
    }

    // Get last 3 sessions for progressive overload calculation
    const recentSessions = exerciseHistory.slice(-3);
    const lastSession = recentSessions[recentSessions.length - 1];
    
    // Progressive overload: suggest 2.5-5% increase if last session was completed well
    const allSetsCompleted = lastSession.sets.every(set => set.completed);
    const suggestedIncrease = allSetsCompleted ? 0.025 : 0; // 2.5% increase
    
    return Math.round((lastSession.averageWeight * (1 + suggestedIncrease)) * 2) / 2; // Round to nearest 0.5kg
  };

  const getExerciseProgress = (exerciseId: string) => {
    const history = trackingData[exerciseId]?.history || [];
    if (history.length < 2) return null;

    const current = history[history.length - 1];
    const previous = history[history.length - 2];

    return {
      weightProgress: current.averageWeight - previous.averageWeight,
      volumeProgress: current.totalVolume - previous.totalVolume,
      improvementPercentage: ((current.averageWeight - previous.averageWeight) / previous.averageWeight) * 100,
    };
  };

  return {
    trackingData,
    initializeExercise,
    updateSet,
    completeExercise,
    getExerciseProgress,
    calculateSuggestedWeight,
  };
}