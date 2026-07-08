
import { ProgressItem, BodyMeasurements } from "./types";
import { AddGoalDialog } from "./AddGoalDialog";
import { UpdateGoalDialog } from "./UpdateGoalDialog";
import { LogActivityDialog } from "./LogActivityDialog";
import { LogWeightDialog } from "./LogWeightDialog";
import { DeleteGoalDialog } from "./DeleteGoalDialog";
import { BodyMeasurementsDialog } from "./BodyMeasurementsDialog";
import { ManageActivityTypesDialog } from "./ManageActivityTypesDialog";
import { WeightHistoryDialog } from "./WeightHistoryDialog";
import { BodyMeasurementsHistoryDialog } from "./BodyMeasurementsHistoryDialog";
import type { WeightLog } from "./hooks/useWeightLogs";

interface FitnessDialogsProps {
  progressData?: ProgressItem[];
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  openUpdateDialog: boolean;
  setOpenUpdateDialog: (open: boolean) => void;
  openLogDialog: boolean;
  setOpenLogDialog: (open: boolean) => void;
  openWeightDialog: boolean;
  setOpenWeightDialog: (open: boolean) => void;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
  openMeasurementsDialog: boolean;
  setOpenMeasurementsDialog: (open: boolean) => void;
  openManageActivityTypesDialog: boolean;
  setOpenManageActivityTypesDialog: (open: boolean) => void;
  openWeightHistoryDialog?: boolean;
  setOpenWeightHistoryDialog?: (open: boolean) => void;
  openMeasurementsHistoryDialog?: boolean;
  setOpenMeasurementsHistoryDialog?: (open: boolean) => void;
  selectedGoal: ProgressItem | null;
  weightLogs?: WeightLog[];
  bodyMeasurements?: BodyMeasurements[];
  onSubmit: (data: any) => void;
  onUpdateSubmit: (data: any) => void;
  onLogSubmit: (data: any) => void;
  onWeightSubmit: (data: any) => void;
  onMeasurementsSubmit: (data: any) => void;
  onDeleteGoal: () => void;
  onDeleteWeightLog?: (id: string) => void;
  onDeleteBodyMeasurement?: (id: string) => void;
  onViewWeightHistory?: () => void;
  onViewMeasurementsHistory?: () => void;
  onBackToWeightLog?: () => void;
  onBackToMeasurementsLog?: () => void;
  onManageGoalTypes?: () => void;
}

export function FitnessDialogs({
  progressData,
  openDialog, setOpenDialog, openUpdateDialog, setOpenUpdateDialog, openLogDialog, setOpenLogDialog,
  openWeightDialog, setOpenWeightDialog, openDeleteDialog, setOpenDeleteDialog, openMeasurementsDialog,
  setOpenMeasurementsDialog, openManageActivityTypesDialog, setOpenManageActivityTypesDialog,
  openWeightHistoryDialog, setOpenWeightHistoryDialog,
  openMeasurementsHistoryDialog, setOpenMeasurementsHistoryDialog,
  selectedGoal, weightLogs, bodyMeasurements,
  onSubmit, onUpdateSubmit, onLogSubmit, onWeightSubmit, onMeasurementsSubmit,
  onDeleteGoal, onDeleteWeightLog, onDeleteBodyMeasurement,
  onViewWeightHistory, onViewMeasurementsHistory,
  onBackToWeightLog, onBackToMeasurementsLog,
  onManageGoalTypes
}: FitnessDialogsProps) {
  return (
    <>
      <AddGoalDialog open={openDialog} onOpenChange={setOpenDialog} onSubmit={onSubmit} onManageGoalTypes={onManageGoalTypes} />
      <UpdateGoalDialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} onSubmit={onUpdateSubmit} selectedGoal={selectedGoal} />
      <LogActivityDialog open={openLogDialog} onOpenChange={setOpenLogDialog} onSubmit={onLogSubmit} onManageActivityTypes={() => { setOpenLogDialog(false); setOpenManageActivityTypesDialog(true); }} goals={progressData} />
      <LogWeightDialog open={openWeightDialog} onOpenChange={setOpenWeightDialog} onSubmit={onWeightSubmit} onViewHistory={onViewWeightHistory} />
      <BodyMeasurementsDialog open={openMeasurementsDialog} onOpenChange={setOpenMeasurementsDialog} onSubmit={onMeasurementsSubmit} onViewHistory={onViewMeasurementsHistory} />
      <WeightHistoryDialog open={openWeightHistoryDialog} onOpenChange={setOpenWeightHistoryDialog} logs={weightLogs} onDelete={onDeleteWeightLog} onBack={onBackToWeightLog} />
      <BodyMeasurementsHistoryDialog open={openMeasurementsHistoryDialog} onOpenChange={setOpenMeasurementsHistoryDialog} logs={bodyMeasurements} onDelete={onDeleteBodyMeasurement} onBack={onBackToMeasurementsLog} />
      <DeleteGoalDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog} onDelete={onDeleteGoal} selectedGoal={selectedGoal} />
      <ManageActivityTypesDialog open={openManageActivityTypesDialog} onOpenChange={setOpenManageActivityTypesDialog} />
    </>
  );
}
