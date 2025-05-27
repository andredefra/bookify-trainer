
import { useState } from "react";
import { toast } from "sonner";
import { ProgressItem, GoalLog } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";

export function useGoalManagement(initialProgressData: ProgressItem[]) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(initialProgressData);
  const [selectedGoal, setSelectedGoal] = useState<ProgressItem | null>(null);

  // Add a new goal with creation timestamp
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
      logs: [{
        id: `log-${Date.now()}`,
        date: currentDate,
        value: Number(data.current),
        source: 'manual',
        note: 'Initial goal setup'
      }]
    };
    
    setProgressData(prev => [...prev, newGoal]);
    toast.success("New fitness goal added!");
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
        return {
          ...item,
          current: Number(data.current),
          progress: calculateProgress(Number(data.current), item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
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
