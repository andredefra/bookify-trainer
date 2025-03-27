
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { ProgramCreationForm } from "@/components/trainer/training/ProgramCreationForm";

interface CreateProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMode?: boolean;
  program?: {
    id: number;
    title: string;
    type: string;
    clientCount: number;
    lastUpdated: string;
    objective?: string;
    duration?: number;
    isPaid?: boolean;
    price?: number;
  } | null;
}

export function CreateProgramDialog({ 
  open, 
  onOpenChange, 
  editMode = false,
  program = null
}: CreateProgramDialogProps) {
  const handleSend = (programData: any) => {
    // Here you would handle saving the program data
    console.log('Program data:', programData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{editMode ? 'Edit Program' : 'Create New Program'}</DialogTitle>
          <DialogDescription>
            {editMode 
              ? 'Make changes to your existing program and save when done.' 
              : 'Create a new training program for your clients.'}
          </DialogDescription>
        </DialogHeader>
        <ProgramCreationForm 
          clientId="mock-client-id" 
          clientName={editMode && program ? `Edit: ${program.title}` : 'New Program'}
          onSend={handleSend}
          isPremium={true}
          initialData={program ? {
            id: String(program.id),
            title: program.title,
            weekStart: "",
            duration: program.duration || 4,
            objective: program.objective || "",
            description: "",
            isPaid: program.isPaid || false,
            price: program.price || 0,
          } : undefined}
        />
      </DialogContent>
    </Dialog>
  );
}
