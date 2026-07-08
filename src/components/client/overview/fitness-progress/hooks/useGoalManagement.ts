
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { ProgressItem, GoalLog } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";
import { generateMilestones } from "../utils/progressCalculator";

const STORAGE_KEY = "fitness-progress-data";

export function useGoalManagement(initialProgressData: ProgressItem[]) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Failed to hydrate fitness-progress-data:", e);
    }
    return initialProgressData;
  });
  const [selectedGoal, setSelectedGoal] = useState<ProgressItem | null>(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    } catch (e) {
      console.warn("Failed to persist fitness-progress-data:", e);
    }
  }, [progressData]);

  // Add a new goal with creation timestamp and milestones
  const addGoal = (data: any) => {
    const currentDate = getCurrentDate();
    const newGoal: ProgressItem = {
      id: `goal-${Date.now()}`,
      goal: data.goal,
      current: Number(data.current),
      target: Number(data.target),
      unit: data.unit,
      progress: calculateProgress(Number(data.current), Number(data.target)),
      lastUpdated: currentDate,
      createdAt: currentDate,
      goalType: data.goalType,
      targetDate: data.targetDate,
      exerciseId: data.exerciseId,
      frequency: data.frequency,
      source: data.source || 'personal',
      trainerId: data.trainerId,
      trainerName: data.trainerName,
      logs: [{
        id: `log-${Date.now()}`,
        date: currentDate,
        value: Number(data.current),
        source: 'manual',
        note: 'Initial goal setup'
      }]
    };
    
    // Generate milestones for the goal
    newGoal.milestones = generateMilestones(newGoal).map((milestone, index) => ({
      id: `milestone-${Date.now()}-${index}`,
      targetValue: milestone.value,
      targetDate: milestone.date,
      achieved: milestone.value <= newGoal.current
    }));
    
    setProgressData(prev => [...prev, newGoal]);
    toast.success(`New ${data.goalType.replace('_', ' ')} goal added!`);
    return true;
  };

  // Update an existing goal with new log entry
  const updateGoal = (data: any) => {
    if (!selectedGoal) return false;
    
    const currentDate = getCurrentDate();
    const newLog: GoalLog = {
      id: `log-${Date.now()}`,
      date: data.date || currentDate,
      value: Number(data.current),
      source: 'manual',
      note: data.note
    };
    
    setProgressData(prev => prev.map(item => {
      if (item.id === selectedGoal.id || (item.goal === selectedGoal.goal && !item.id)) {
        const updatedLogs = [...(item.logs || []), newLog];
        const updatedItem = {
          ...item,
          current: Number(data.current),
          progress: calculateProgress(Number(data.current), item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
        
        // Update milestone achievements
        if (updatedItem.milestones) {
          updatedItem.milestones = updatedItem.milestones.map(milestone => ({
            ...milestone,
            achieved: milestone.targetValue <= updatedItem.current,
            achievedDate: milestone.targetValue <= updatedItem.current && !milestone.achieved ? currentDate : milestone.achievedDate
          }));
        }
        
        return updatedItem;
      }
      return item;
    }));
    
    setSelectedGoal(null);
    toast.success("Goal progress updated with new log entry!");
    return true;
  };

  // Delete a goal
  const deleteGoal = () => {
    if (!selectedGoal) return false;
    
    setProgressData(prev => prev.filter(item => {
      if (selectedGoal.id && item.id) {
        return item.id !== selectedGoal.id;
      }
      return item.goal !== selectedGoal.goal;
    }));
    
    setSelectedGoal(null);
    toast.success("Goal deleted successfully!");
    return true;
  };

  // Set up goal for editing or deletion
  const selectGoal = (goal: ProgressItem) => {
    setSelectedGoal(goal);
  };

  // Clear selected goal
  const clearSelectedGoal = () => {
    setSelectedGoal(null);
  };

  return {
    progressData,
    setProgressData,
    selectedGoal,
    addGoal,
    updateGoal,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  };
}
