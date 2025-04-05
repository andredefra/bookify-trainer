
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { ProgressItem, FitnessProgressCardProps } from "./types";
import { GoalsList } from "./GoalsList";
import { CardActions } from "./CardActions";
import { ConnectionStatus } from "./ConnectionStatus";
import { FitnessDialogs } from "./FitnessDialogs";
import { calculateProgress, getCurrentDate } from "./utils";

export function FitnessProgressCard({ 
  progressData: initialProgressData, 
  connectedApps = { googleFit: false, appleHealth: false } 
}: FitnessProgressCardProps) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(initialProgressData);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openLogDialog, setOpenLogDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<ProgressItem | null>(null);
  
  // Add a new goal
  const onSubmit = (data: any) => {
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
    setOpenDialog(false);
    toast.success("New fitness goal added!");
  };

  // Update an existing goal
  const onUpdateSubmit = (data: any) => {
    if (!selectedGoal) return;
    
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
    setOpenUpdateDialog(false);
    setSelectedGoal(null);
    toast.success("Goal progress updated!");
  };

  // Manual activity logging
  const onLogSubmit = (data: any) => {
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
    setOpenLogDialog(false);
    toast.success("Activity logged successfully!");
  };

  // Delete a goal
  const handleDeleteGoal = () => {
    if (!selectedGoal) return;
    
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
    setOpenDeleteDialog(false);
    setSelectedGoal(null);
    toast.success("Goal deleted successfully!");
  };

  // Set up goal for editing
  const handleEditGoal = (goal: ProgressItem) => {
    setSelectedGoal(goal);
    setOpenUpdateDialog(true);
  };

  // Set up goal for deletion
  const handleDeletePrompt = (goal: ProgressItem) => {
    setSelectedGoal(goal);
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col space-y-2 pb-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fitness Progress</CardTitle>
              <CardDescription>Track your journey toward your goals</CardDescription>
            </div>
          </div>
          
          <CardActions 
            onAddGoal={() => setOpenDialog(true)}
            onLogActivity={() => setOpenLogDialog(true)}
          />
        </CardHeader>
        
        <CardContent>
          <GoalsList 
            progressData={progressData}
            onEditGoal={handleEditGoal}
            onDeletePrompt={handleDeletePrompt}
          />
          
          <ConnectionStatus 
            progressDataExists={progressData.length > 0}
            connectedApps={connectedApps}
          />
        </CardContent>
      </Card>

      <FitnessDialogs 
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        openUpdateDialog={openUpdateDialog}
        setOpenUpdateDialog={setOpenUpdateDialog}
        openLogDialog={openLogDialog}
        setOpenLogDialog={setOpenLogDialog}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        selectedGoal={selectedGoal}
        onSubmit={onSubmit}
        onUpdateSubmit={onUpdateSubmit}
        onLogSubmit={onLogSubmit}
        onDeleteGoal={handleDeleteGoal}
      />
    </>
  );
}
