
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
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

  // Calculate targetFrequency based on program type or use default
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-6xl h-[95vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {editMode ? 'Edit Program' : 'Create New Program'}
          </DialogTitle>
          <DialogDescription className="text-base">
            {editMode 
              ? 'Make changes to your existing program and save when done.' 
              : 'Create a new training program for your clients.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <ProgramCreationForm 
                clientId="mock-client-id" 
                clientName={editMode && program ? `Edit: ${program.title}` : 'New Program'}
                onSend={handleSend}
                isPremium={true}
                initialData={program ? {
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
                } : undefined}
              />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
