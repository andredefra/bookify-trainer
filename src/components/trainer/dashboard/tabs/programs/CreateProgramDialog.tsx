import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { CreateProgramWizard } from "@/components/trainer/training/wizard/CreateProgramWizard";
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

  const handleSave = (programData: any) => {
    console.log('Program saved:', programData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const generateInitialSessionsWithExercises = (targetFrequency: number, duration: number): WorkoutSession[] => {
    const totalSessions = duration * targetFrequency;
    
    const sessions = Array.from({ length: totalSessions }, (_, i) => ({
      id: String(i + 1),
      sessionNumber: i + 1,
      title: `Session ${i + 1}`,
      exercises: i === 0 && program?.exercises ? [...program.exercises] : [],
      completed: false
    }));
    
    return sessions;
  };

  const getTargetFrequency = (programType?: string) => {
    switch (programType) {
      case 'strength': return 4;
      case 'cardio': return 5;
      case 'mobility': return 3;
      default: return 3;
    }
  };

  const targetFrequency = program ? getTargetFrequency(program.type) : 3;
  const duration = program?.duration || 4;

  // Convert program to wizard format
  const editingProgram = program ? {
    id: String(program.id),
    title: program.title,
    weekStart: "",
    duration: duration,
    targetFrequency: targetFrequency,
    objective: program.objective || "",
    description: "",
    isPaid: program.isPaid || false,
    price: program.price || 0,
    sessions: generateInitialSessionsWithExercises(targetFrequency, duration)
  } : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {editMode ? 'Edit Training Template' : 'Create Training Template'}
          </DialogTitle>
          <DialogDescription>
            {editMode 
              ? 'Make changes to your existing training template.' 
              : 'Create a new training template for your clients.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <CreateProgramWizard
            editingProgram={editingProgram}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
