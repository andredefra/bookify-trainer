
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SessionForm } from "./session/SessionForm";
import { SessionFormValues } from "./session/SessionFormSchema";

interface CreateSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: SessionFormValues) => void;
}

export function CreateSessionDialog({ 
  open, 
  onOpenChange, 
  onSubmit 
}: CreateSessionDialogProps) {

  const handleSubmit = (values: SessionFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      // Default handling if no onSubmit is provided
      console.log("Form values:", values);
      toast.success("Session created successfully!");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Training Session</DialogTitle>
          <DialogDescription>
            Set up a new training session for your clients.
          </DialogDescription>
        </DialogHeader>

        <SessionForm 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
