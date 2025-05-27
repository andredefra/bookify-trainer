
import { useState } from "react";
import { toast } from "sonner";
import { ProgressItem, GoalLog, BodyMeasurements } from "../types";
import { calculateProgress, getCurrentDate, calculateBodyComposition } from "../utils";

export function useFitnessGoals(initialProgressData: ProgressItem[]) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(initialProgressData);
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements[]>([]);
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
    
    setProgressData([...progressData, newGoal]);
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
    
    const updatedProgressData = progressData.map(item => {
      if (item.id === selectedGoal.id || (item.goal === selectedGoal.goal && !item.id)) {
        const updatedLogs = [...(item.logs || []), newLog];
        const updatedItem = {
          ...item,
          current: Number(data.current),
          progress: calculateProgress(Number(data.current), item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
        return updatedItem;
      }
      return item;
    });
    
    setProgressData(updatedProgressData);
    setSelectedGoal(null);
    toast.success("Goal progress updated with new log entry!");
    return true;
  };

  // Log manual activity with detailed tracking per goal
  const logActivity = (data: any) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    const updatedProgressData = progressData.map(item => {
      let shouldUpdate = false;
      let newValue = item.current;
      let activityType = '';
      
      // Map activity to specific goals (excluding weight)
      if (item.unit === "steps" && data.steps > 0) {
        newValue += Number(data.steps);
        activityType = 'steps';
        shouldUpdate = true;
      } else if (item.unit === "kcal" && data.calories > 0) {
        newValue += Number(data.calories);
        activityType = 'calories burned';
        shouldUpdate = true;
      } else if (item.unit === "mins" && data.minutes > 0) {
        newValue += Number(data.minutes);
        activityType = 'workout minutes';
        shouldUpdate = true;
      }
      
      if (shouldUpdate) {
        updatedGoals++;
        const newLog: GoalLog = {
          id: `log-${Date.now()}-${item.id}`,
          date: currentDate,
          value: shouldUpdate ? Number(data[activityType.split(' ')[0]]) : newValue,
          source: 'manual',
          note: `Logged ${activityType}${data.note ? ` - ${data.note}` : ''}`
        };
        
        const updatedLogs = [...(item.logs || []), newLog];
        
        return {
          ...item,
          current: newValue,
          progress: calculateProgress(newValue, item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
      }
      
      return item;
    });
    
    setProgressData(updatedProgressData);
    toast.success(`Activity logged successfully! Updated ${updatedGoals} goals.`);
    return true;
  };

  // Log weight separately
  const logWeight = (data: any) => {
    const currentDate = data.date || getCurrentDate();
    let updatedGoals = 0;
    
    const updatedProgressData = progressData.map(item => {
      if (item.unit === "kg" && data.weight > 0) {
        updatedGoals++;
        const newLog: GoalLog = {
          id: `log-${Date.now()}-${item.id}`,
          date: currentDate,
          value: Number(data.weight),
          source: 'manual',
          note: `Weight measurement${data.note ? ` - ${data.note}` : ''}`
        };
        
        const updatedLogs = [...(item.logs || []), newLog];
        
        return {
          ...item,
          current: Number(data.weight),
          progress: calculateProgress(Number(data.weight), item.target),
          lastUpdated: currentDate,
          logs: updatedLogs
        };
      }
      
      return item;
    });
    
    setProgressData(updatedProgressData);
    toast.success(`Weight logged successfully! Updated ${updatedGoals} weight goals.`);
    return true;
  };

  // Add body measurements
  const addBodyMeasurements = (data: BodyMeasurements) => {
    const measurementWithCalculations = {
      ...data,
      ...calculateBodyComposition(data)
    };
    
    setBodyMeasurements(prev => [...prev, measurementWithCalculations]);
    toast.success("Body measurements logged successfully!");
    return true;
  };

  // Auto-sync from fitness apps (simulated)
  const syncFromFitnessApps = (connectedApps: any) => {
    if (!connectedApps.googleFit && !connectedApps.appleHealth) return;
    
    // Simulate automatic data sync
    const currentDate = getCurrentDate();
    let syncedData = false;
    
    const updatedProgressData = progressData.map(item => {
      // Simulate automatic step tracking
      if (item.unit === "steps" && connectedApps.googleFit) {
        const dailySteps = Math.floor(Math.random() * 3000) + 7000; // Simulate 7000-10000 steps
        const newLog: GoalLog = {
          id: `sync-${Date.now()}-${item.id}`,
          date: currentDate,
          value: dailySteps,
          source: 'googleFit',
          note: 'Auto-synced from Google Fit'
        };
        
        syncedData = true;
        return {
          ...item,
          current: item.current + dailySteps,
          progress: calculateProgress(item.current + dailySteps, item.target),
          lastUpdated: currentDate,
          logs: [...(item.logs || []), newLog]
        };
      }
      return item;
    });
    
    if (syncedData) {
      setProgressData(updatedProgressData);
      toast.success("Data synced from fitness apps!");
    }
  };

  // Delete a goal
  const deleteGoal = () => {
    if (!selectedGoal) return false;
    
    const filteredProgressData = progressData.filter(item => {
      if (selectedGoal.id && item.id) {
        return item.id !== selectedGoal.id;
      }
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
    bodyMeasurements,
    selectedGoal,
    addGoal,
    updateGoal,
    logActivity,
    logWeight,
    addBodyMeasurements,
    syncFromFitnessApps,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  };
}
