import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Layers } from "lucide-react";
import { RoutineCard } from "./RoutineCard";
import { CreateRoutineDialog } from "./CreateRoutineDialog";
import { useRoutines } from "./hooks/useRoutines";
import { Routine } from "@/data/training/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function RoutinesTab() {
  const { routines, addRoutine, updateRoutine, deleteRoutine } = useRoutines();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [deletingRoutineId, setDeletingRoutineId] = useState<string | null>(null);

  const handleSaveRoutine = (routineData: Omit<Routine, "id" | "createdAt" | "updatedAt">) => {
    if (editingRoutine) {
      updateRoutine(editingRoutine.id, routineData);
      toast.success("Routine updated successfully");
    } else {
      addRoutine(routineData);
      toast.success("Routine created successfully");
    }
    setEditingRoutine(null);
  };

  const handleEditRoutine = (routine: Routine) => {
    setEditingRoutine(routine);
    setShowCreateDialog(true);
  };

  const handleDeleteRoutine = () => {
    if (deletingRoutineId) {
      deleteRoutine(deletingRoutineId);
      toast.success("Routine deleted");
      setDeletingRoutineId(null);
    }
  };

  const handleCloseDialog = (open: boolean) => {
    setShowCreateDialog(open);
    if (!open) {
      setEditingRoutine(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">My Routines</h3>
          <p className="text-sm text-muted-foreground">
            Reusable exercise clusters you can import into your templates
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Routine
        </Button>
      </div>

      {routines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onEdit={handleEditRoutine}
              onDelete={setDeletingRoutineId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Layers className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h4 className="text-lg font-medium mb-2">No routines yet</h4>
          <p className="text-muted-foreground mb-4">
            Create reusable exercise clusters to speed up your template building
          </p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Your First Routine
          </Button>
        </div>
      )}

      <CreateRoutineDialog
        open={showCreateDialog}
        onOpenChange={handleCloseDialog}
        onSave={handleSaveRoutine}
        editingRoutine={editingRoutine}
      />

      <AlertDialog
        open={!!deletingRoutineId}
        onOpenChange={(open) => !open && setDeletingRoutineId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Routine?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Programs that already imported this routine
              will not be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRoutine}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
