
import { useState, useEffect } from "react";
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
  const [openWeightDialog, setOpenWeightDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMeasurementsDialog, setOpenMeasurementsDialog] = useState(false);
  
  const {
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
  } = useFitnessGoals(initialProgressData);

  // Auto-sync from connected fitness apps
  useEffect(() => {
    if (connectedApps.googleFit || connectedApps.appleHealth) {
      const interval = setInterval(() => {
        syncFromFitnessApps(connectedApps);
      }, 300000); // Sync every 5 minutes
      
      return () => clearInterval(interval);
    }
  }, [connectedApps, syncFromFitnessApps]);

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

  const handleWeightSubmit = (data: any) => {
    if (logWeight(data)) {
      setOpenWeightDialog(false);
    }
  };

  const handleMeasurementsSubmit = (data: any) => {
    if (addBodyMeasurements(data)) {
      setOpenMeasurementsDialog(false);
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
              <CardDescription>Track your journey toward your goals with detailed logging</CardDescription>
            </div>
          </div>
          
          <CardActions 
            onAddGoal={() => setOpenDialog(true)}
            onLogActivity={() => setOpenLogDialog(true)}
            onLogWeight={() => setOpenWeightDialog(true)}
            onLogMeasurements={() => setOpenMeasurementsDialog(true)}
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
          
          {bodyMeasurements.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Latest Body Composition</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {bodyMeasurements[bodyMeasurements.length - 1].bodyFatPercentage && (
                  <div>Body Fat: {bodyMeasurements[bodyMeasurements.length - 1].bodyFatPercentage}%</div>
                )}
                {bodyMeasurements[bodyMeasurements.length - 1].leanMass && (
                  <div>Lean Mass: {bodyMeasurements[bodyMeasurements.length - 1].leanMass}kg</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <FitnessDialogs 
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        openUpdateDialog={openUpdateDialog}
        setOpenUpdateDialog={handleCloseUpdateDialog}
        openLogDialog={openLogDialog}
        setOpenLogDialog={setOpenLogDialog}
        openWeightDialog={openWeightDialog}
        setOpenWeightDialog={setOpenWeightDialog}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={handleCloseDeleteDialog}
        openMeasurementsDialog={openMeasurementsDialog}
        setOpenMeasurementsDialog={setOpenMeasurementsDialog}
        selectedGoal={selectedGoal}
        onSubmit={handleSubmit}
        onUpdateSubmit={handleUpdateSubmit}
        onLogSubmit={handleLogSubmit}
        onWeightSubmit={handleWeightSubmit}
        onMeasurementsSubmit={handleMeasurementsSubmit}
        onDeleteGoal={handleDeleteGoal}
      />
    </>
  );
}
