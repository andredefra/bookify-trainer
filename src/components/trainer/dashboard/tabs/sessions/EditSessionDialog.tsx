
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SessionForm } from "../../dialogs/session/SessionForm";
import { SessionFormValues } from "../../dialogs/session/SessionFormSchema";
import { TrainerSessionItem } from "@/types/sessions";

interface EditSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: TrainerSessionItem | null;
  onSubmit?: (data: SessionFormValues, sessionId: number) => void;
}

export function EditSessionDialog({ open, onOpenChange, session, onSubmit }: EditSessionDialogProps) {
  if (!session) return null;

  // Convert session data to form values format
  const sessionToFormValues = (session: TrainerSessionItem): SessionFormValues => {
    // Parse date from string to Date object
    let sessionDate: Date;
    try {
      // Try to parse MM/DD/YYYY format
      const [month, day, year] = session.date.split('/').map(Number);
      sessionDate = new Date(year, month - 1, day);
      
      // Check if valid date was created
      if (isNaN(sessionDate.getTime())) {
        // Fallback to trying to parse as a direct date string
        sessionDate = new Date(session.date);
        
        // If still invalid, fallback to current date
        if (isNaN(sessionDate.getTime())) {
          sessionDate = new Date();
        }
      }
    } catch (error) {
      // If parsing fails, use current date
      console.error("Error parsing date:", error);
      sessionDate = new Date();
    }
    
    return {
      name: session.name,
      date: sessionDate,
      time: session.time,
      duration: "60",
      maxParticipants: session.maxParticipants.toString(),
      description: session.description || "",
      // Set other defaults
      isFree: false,
      price: "50",
      isPrivate: false,
      paymentTime: "before",
      cancellationHours: "2"
    };
  };

  const handleSubmit = (data: SessionFormValues) => {
    if (onSubmit) {
      onSubmit(data, session.id);
    } else {
      // Default handling
      console.log("Updated session:", data);
      toast.success("Session updated successfully!");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Training Session</DialogTitle>
          <DialogDescription>
            Update the details of your training session.
          </DialogDescription>
        </DialogHeader>
        
        <SessionForm
          defaultValues={sessionToFormValues(session)}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
