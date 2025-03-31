
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

interface CancelSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionName: string;
  onConfirm: () => void;
}

export function CancelSessionDialog({
  open,
  onOpenChange,
  sessionName,
  onConfirm,
}: CancelSessionDialogProps) {
  // Log when the dialog is opened
  console.log("Cancel session dialog opened for:", sessionName);
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Session</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel <span className="font-medium">{sessionName}</span>? This action cannot be undone.
            All registered participants will be notified.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log("Confirming cancellation of session:", sessionName);
              onConfirm();
            }}
            className="bg-destructive hover:bg-destructive/90"
          >
            Cancel Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
