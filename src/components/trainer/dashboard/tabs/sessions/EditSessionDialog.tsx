
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
      console.log("Parsing date:", session.date);
      
      // Handle both string and Date types properly
      if (typeof session.date === 'string') {
        // Try to parse MM/DD/YYYY format
        if (session.date.includes('/')) {
          const [month, day, year] = session.date.split('/').map(Number);
          sessionDate = new Date(year, month - 1, day);
        } else {
          // Try parsing as a direct date string
          sessionDate = new Date(session.date);
        }
      } else {
        // Already a Date object
        sessionDate = session.date;
      }
      
      // Check if valid date was created
      if (isNaN(sessionDate.getTime())) {
        console.log("Invalid date, using current date");
        sessionDate = new Date();
      } else {
        console.log("Parsed date successfully:", sessionDate);
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
      mode: session.mode || "in-person",
      // Set other defaults
      isFree: false,
      price: "50",
      isPrivate: false,
      paymentTime: "before" as const,
      cancellationHours: "2",
      // Location fields
      address: session.address || "",
      locationNotes: session.locationNotes || "",
      latitude: session.latitude,
      longitude: session.longitude
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
