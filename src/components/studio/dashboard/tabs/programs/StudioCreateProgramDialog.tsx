import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgramCreationForm } from "@/components/trainer/training/ProgramCreationForm";
import { ProgramAIAssistant } from "@/components/trainer/dashboard/tabs/programs/ProgramAIAssistant";
import { Button } from "@/components/ui/button";
import { Bot, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useTrainerAISubscription } from "@/hooks/useTrainerAISubscription";

interface Trainer {
  id: string;
  name: string;
}

interface StudioCreateProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainers: Trainer[];
  onProgramCreated?: (programData: any, trainerId: string) => void;
}

export function StudioCreateProgramDialog({ 
  open, 
  onOpenChange,
  trainers,
  onProgramCreated
}: StudioCreateProgramDialogProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");
  const { hasAIAccess } = useTrainerAISubscription();
  
  const handleSend = (programData: any) => {
    console.log('Program data:', programData, 'Trainer:', selectedTrainerId);
    onProgramCreated?.(programData, selectedTrainerId);
    onOpenChange(false);
    setSelectedTrainerId("");
  };

  const handleAddExercisesFromAI = (exercises: Array<{ name: string; sets: number; reps: string }>) => {
    console.log('AI suggested exercises:', exercises);
  };

  const selectedTrainer = trainers.find(t => t.id === selectedTrainerId);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) setSelectedTrainerId("");
    }}>
      <DialogContent className="w-full max-w-5xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold">
                Create New Program
              </DialogTitle>
              <DialogDescription className="text-sm">
                Create a training program and assign it to a trainer.
              </DialogDescription>
            </div>
            
            {/* Trainer Selection - Studio Specific */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="trainer-select" className="text-sm whitespace-nowrap">
                  Assign to:
                </Label>
                <Select value={selectedTrainerId} onValueChange={setSelectedTrainerId}>
                  <SelectTrigger id="trainer-select" className="w-[180px]">
                    <SelectValue placeholder="Select trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.id} value={trainer.id}>
                        {trainer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          </div>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Main Form Area - Reusing Trainer's ProgramCreationForm */}
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ${showAIAssistant ? 'pr-0' : ''}`}>
            <div className="p-6">
              <ProgramCreationForm 
                clientId="studio-program" 
                clientName={selectedTrainer ? `Trainer: ${selectedTrainer.name}` : 'New Program'}
                onSend={handleSend}
                isPremium={true}
              />
            </div>
          </div>

          {/* AI Assistant Sidebar - Same as Trainer */}
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
