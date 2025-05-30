
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrainingProgramCard } from "@/components/client/training/TrainingProgramCard";
import { TrainingProgram } from "@/data/training";

interface ProgramDetailsDialogProps {
  program: TrainingProgram | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProgramDetailsDialog({ program, open, onOpenChange }: ProgramDetailsDialogProps) {
  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl p-4 md:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg md:text-xl">Program Details - {program.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <TrainingProgramCard program={program} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
