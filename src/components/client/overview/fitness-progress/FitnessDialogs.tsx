
import { ProgressItem } from "./types";
import { AddGoalDialog } from "./AddGoalDialog";
import { UpdateGoalDialog } from "./UpdateGoalDialog";
import { LogActivityDialog } from "./LogActivityDialog";
import { DeleteGoalDialog } from "./DeleteGoalDialog";

interface FitnessDialogsProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  openUpdateDialog: boolean;
  setOpenUpdateDialog: (open: boolean) => void;
  openLogDialog: boolean;
  setOpenLogDialog: (open: boolean) => void;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
  selectedGoal: ProgressItem | null;
  onSubmit: (data: any) => void;
  onUpdateSubmit: (data: any) => void;
  onLogSubmit: (data: any) => void;
  onDeleteGoal: () => void;
}

export function FitnessDialogs({
  openDialog,
  setOpenDialog,
  openUpdateDialog,
  setOpenUpdateDialog,
  openLogDialog,
  setOpenLogDialog,
  openDeleteDialog,
  setOpenDeleteDialog,
  selectedGoal,
  onSubmit,
  onUpdateSubmit,
  onLogSubmit,
  onDeleteGoal
}: FitnessDialogsProps) {
  return (
    <>
      <AddGoalDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSubmit={onSubmit}
      />
      
      <UpdateGoalDialog 
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        onSubmit={onUpdateSubmit}
        selectedGoal={selectedGoal}
      />
      
      <LogActivityDialog 
        open={openLogDialog}
        onOpenChange={setOpenLogDialog}
        onSubmit={onLogSubmit}
      />
      
      <DeleteGoalDialog 
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDelete={onDeleteGoal}
        selectedGoal={selectedGoal}
      />
    </>
  );
}
