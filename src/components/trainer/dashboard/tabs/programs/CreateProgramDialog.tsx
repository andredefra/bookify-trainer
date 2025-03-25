
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProgramCreationForm } from "@/components/trainer/training/ProgramCreationForm";
import { toast } from "sonner";

interface CreateProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProgramDialog({ open, onOpenChange }: CreateProgramDialogProps) {
  const handleSendProgram = (program: any) => {
    console.log("Program created:", program);
    
    // Customize the toast message based on whether the program is paid
    if (program.isPaid) {
      toast.success(`Program "${program.title}" created successfully - Price: €${program.price}`);
    } else {
      toast.success(`Program "${program.title}" created successfully - Free program`);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Training Program</DialogTitle>
          <DialogDescription>Create a new training program for your clients</DialogDescription>
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
