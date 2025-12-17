
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { ProgramCreationForm } from "@/components/trainer/training/ProgramCreationForm";
import { Exercise, WorkoutSession } from "@/data/training/types";
import { ProgramAIAssistant } from "./ProgramAIAssistant";
import { Button } from "@/components/ui/button";
import { Bot, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useTrainerAISubscription } from "@/hooks/useTrainerAISubscription";

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
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { hasAIAccess } = useTrainerAISubscription();
  
  const handleSend = (programData: any) => {
    console.log('Program data:', programData);
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

  const handleAddExercisesFromAI = (exercises: Array<{ name: string; sets: number; reps: string }>) => {
    // This will be implemented to pass exercises to the form
    console.log('AI suggested exercises:', exercises);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">
                {editMode ? 'Edit Program' : 'Create New Program'}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {editMode 
                  ? 'Make changes to your existing program.' 
                  : 'Create a new training program for your clients.'}
              </DialogDescription>
            </div>
            <Button
              variant={showAIAssistant ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="gap-2"
            >
              <Bot className="h-4 w-4" />
              AI Assistant
              {showAIAssistant ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Main Form Area */}
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ${showAIAssistant ? 'pr-0' : ''}`}>
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
          </div>

          {/* AI Assistant Sidebar */}
          {showAIAssistant && (
            <div className="w-[380px] border-l flex-shrink-0 bg-muted/30">
              <ProgramAIAssistant
                hasAIAccess={hasAIAccess}
                onAddExercises={handleAddExercisesFromAI}
                onClose={() => setShowAIAssistant(false)}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
