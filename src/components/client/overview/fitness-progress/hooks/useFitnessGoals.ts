
import { useState } from "react";
import { toast } from "sonner";
import { ProgressItem } from "../types";
import { calculateProgress, getCurrentDate } from "../utils";

export function useFitnessGoals(initialProgressData: ProgressItem[]) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(initialProgressData);
  const [selectedGoal, setSelectedGoal] = useState<ProgressItem | null>(null);
  
  // Add a new goal
  const addGoal = (data: any) => {
    const newGoal: ProgressItem = {
      id: `goal-${Date.now()}`,
      goal: data.goal,
      current: Number(data.current),
      target: Number(data.target),
      unit: data.unit,
      progress: calculateProgress(Number(data.current), Number(data.target)),
      lastUpdated: getCurrentDate()
    };
    
    setProgressData([...progressData, newGoal]);
    toast.success("New fitness goal added!");
    return true;
  };

  // Update an existing goal
  const updateGoal = (data: any) => {
    if (!selectedGoal) return false;
    
    const updatedProgressData = progressData.map(item => {
      if (item.id === selectedGoal.id || (item.goal === selectedGoal.goal && !item.id)) {
        const updatedItem = {
          ...item,
          current: Number(data.current),
          progress: calculateProgress(Number(data.current), item.target),
          lastUpdated: getCurrentDate()
        };
        return updatedItem;
      }
      return item;
    });
    
    setProgressData(updatedProgressData);
    setSelectedGoal(null);
    toast.success("Goal progress updated!");
    return true;
  };

  // Log manual activity
  const logActivity = (data: any) => {
    // Find goals related to the logged activities and update them
    const updatedProgressData = progressData.map(item => {
      let updatedCurrent = item.current;
      
      // Update step count goal
      if (item.unit === "steps" && data.steps > 0) {
        updatedCurrent += Number(data.steps);
      }
      
      // Update calories goal
      if (item.unit === "kcal" && data.calories > 0) {
        updatedCurrent += Number(data.calories);
      }
      
      // Update workout minutes goal
      if (item.unit === "mins" && data.minutes > 0) {
        updatedCurrent += Number(data.minutes);
      }
      
      if (updatedCurrent !== item.current) {
        return {
          ...item,
          current: updatedCurrent,
          progress: calculateProgress(updatedCurrent, item.target),
          lastUpdated: getCurrentDate()
        };
      }
      
      return item;
    });
    
    setProgressData(updatedProgressData);
    toast.success("Activity logged successfully!");
    return true;
  };

  // Delete a goal
  const deleteGoal = () => {
    if (!selectedGoal) return false;
    
    // Filter out the specific goal that matches the selectedGoal's ID
    const filteredProgressData = progressData.filter(item => {
      // If the goal has an ID, compare IDs
      if (selectedGoal.id && item.id) {
        return item.id !== selectedGoal.id;
      }
      // If no ID (for backward compatibility), compare by goal name
      return item.goal !== selectedGoal.goal;
    });
    
    setProgressData(filteredProgressData);
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
    selectedGoal,
    addGoal,
    updateGoal,
    logActivity,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  };
}
