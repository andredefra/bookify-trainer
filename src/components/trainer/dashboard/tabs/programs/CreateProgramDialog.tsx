
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProgramCreationForm } from "@/components/trainer/training/ProgramCreationForm";
import { toast } from "sonner";

interface CreateProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProgramDialog({ open, onOpenChange }: CreateProgramDialogProps) {
  const handleSendProgram = (program: any) => {
    toast.success("Program created successfully");
    onOpenChange(false);
    // Here you would typically save the program to the backend
    console.log("Program created:", program);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Training Program</DialogTitle>
        </DialogHeader>
        <ProgramCreationForm 
          clientId="new-program"
          clientName="New Program"
          onSend={handleSendProgram}
          isPremium={true}
        />
      </DialogContent>
    </Dialog>
  );
}
