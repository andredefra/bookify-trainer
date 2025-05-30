
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ProgramCreationForm } from "@/components/trainer/training/ProgramCreationForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Exercise, WorkoutSession } from "@/data/training/types";

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
    exercises?: Exercise[];
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

  // Create the exercises data structure for the program form
  const generateInitialSessionsWithExercises = (): WorkoutSession[] => {
    // If we have existing exercises, add them to session 1
    const sessions = Array.from({ length: 4 }, (_, i) => ({
      id: String(i + 1),
      sessionNumber: i + 1,
      title: `Session ${i + 1}`,
      exercises: i === 0 && program?.exercises ? [...program.exercises] : [],
      completed: false
    }));
    
    return sessions;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{editMode ? 'Edit Program' : 'Create New Program'}</DialogTitle>
          <DialogDescription>
            {editMode 
              ? 'Make changes to your existing program and save when done.' 
              : 'Create a new training program for your clients.'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(85vh-150px)]">
          <div className="px-1 py-2">
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
                sessions: generateInitialSessionsWithExercises()
              } : undefined}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
