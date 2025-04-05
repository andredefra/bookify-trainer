
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FitnessProgressCardProps } from "./types";
import { GoalsList } from "./GoalsList";
import { CardActions } from "./CardActions";
import { ConnectionStatus } from "./ConnectionStatus";
import { FitnessDialogs } from "./FitnessDialogs";
import { useFitnessGoals } from "./hooks/useFitnessGoals";

export function FitnessProgressCard({ 
  progressData: initialProgressData, 
  connectedApps = { googleFit: false, appleHealth: false } 
}: FitnessProgressCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openLogDialog, setOpenLogDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  const {
    progressData,
    selectedGoal,
    addGoal,
    updateGoal,
    logActivity,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  } = useFitnessGoals(initialProgressData);

  // Handle form submissions from dialogs
  const handleSubmit = (data: any) => {
    addGoal(data);
    setOpenDialog(false);
  };

  const handleUpdateSubmit = (data: any) => {
    if (updateGoal(data)) {
      setOpenUpdateDialog(false);
    }
  };

  const handleLogSubmit = (data: any) => {
    if (logActivity(data)) {
      setOpenLogDialog(false);
    }
  };

  const handleDeleteGoal = () => {
    if (deleteGoal()) {
      setOpenDeleteDialog(false);
    }
  };

  // UI event handlers
  const handleEditGoal = (goal: any) => {
    selectGoal(goal);
    setOpenUpdateDialog(true);
  };

  const handleDeletePrompt = (goal: any) => {
    selectGoal(goal);
    setOpenDeleteDialog(true);
  };

  // Dialog close handlers with goal selection cleanup
  const handleCloseUpdateDialog = (open: boolean) => {
    setOpenUpdateDialog(open);
    if (!open) clearSelectedGoal();
  };

  const handleCloseDeleteDialog = (open: boolean) => {
    setOpenDeleteDialog(open);
    if (!open) clearSelectedGoal();
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
        setOpenUpdateDialog={handleCloseUpdateDialog}
        openLogDialog={openLogDialog}
        setOpenLogDialog={setOpenLogDialog}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={handleCloseDeleteDialog}
        selectedGoal={selectedGoal}
        onSubmit={handleSubmit}
        onUpdateSubmit={handleUpdateSubmit}
        onLogSubmit={handleLogSubmit}
        onDeleteGoal={handleDeleteGoal}
      />
    </>
  );
}
