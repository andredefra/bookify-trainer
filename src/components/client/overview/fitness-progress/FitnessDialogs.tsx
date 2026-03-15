
import { ProgressItem } from "./types";
import { AddGoalDialog } from "./AddGoalDialog";
import { UpdateGoalDialog } from "./UpdateGoalDialog";
import { LogActivityDialog } from "./LogActivityDialog";
import { LogWeightDialog } from "./LogWeightDialog";
import { DeleteGoalDialog } from "./DeleteGoalDialog";
import { BodyMeasurementsDialog } from "./BodyMeasurementsDialog";
import { ManageActivityTypesDialog } from "./ManageActivityTypesDialog";

interface FitnessDialogsProps {
  progressData?: ProgressItem[];
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
  selectedGoal: ProgressItem | null;
  onSubmit: (data: any) => void;
  onUpdateSubmit: (data: any) => void;
  onLogSubmit: (data: any) => void;
  onWeightSubmit: (data: any) => void;
  onMeasurementsSubmit: (data: any) => void;
  onDeleteGoal: () => void;
  onManageGoalTypes?: () => void;
}

export function FitnessDialogs({
  progressData,
  openDialog, setOpenDialog, openUpdateDialog, setOpenUpdateDialog, openLogDialog, setOpenLogDialog,
  openWeightDialog, setOpenWeightDialog, openDeleteDialog, setOpenDeleteDialog, openMeasurementsDialog,
  setOpenMeasurementsDialog, openManageActivityTypesDialog, setOpenManageActivityTypesDialog,
  selectedGoal, onSubmit, onUpdateSubmit, onLogSubmit, onWeightSubmit, onMeasurementsSubmit,
  onDeleteGoal, onManageGoalTypes
}: FitnessDialogsProps) {
  return (
    <>
      <AddGoalDialog open={openDialog} onOpenChange={setOpenDialog} onSubmit={onSubmit} onManageGoalTypes={onManageGoalTypes} />
      <UpdateGoalDialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} onSubmit={onUpdateSubmit} selectedGoal={selectedGoal} />
      <LogActivityDialog open={openLogDialog} onOpenChange={setOpenLogDialog} onSubmit={onLogSubmit} onManageActivityTypes={() => { setOpenLogDialog(false); setOpenManageActivityTypesDialog(true); }} goals={progressData} />
      <LogWeightDialog open={openWeightDialog} onOpenChange={setOpenWeightDialog} onSubmit={onWeightSubmit} />
      <BodyMeasurementsDialog open={openMeasurementsDialog} onOpenChange={setOpenMeasurementsDialog} onSubmit={onMeasurementsSubmit} />
      <DeleteGoalDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog} onDelete={onDeleteGoal} selectedGoal={selectedGoal} />
      <ManageActivityTypesDialog open={openManageActivityTypesDialog} onOpenChange={setOpenManageActivityTypesDialog} />
    </>
  );
}
