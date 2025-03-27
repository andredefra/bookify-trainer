
import { TrainingProgram } from "@/data/training/types";
import { PaymentDialog as SharedPaymentDialog } from "@/components/shared/PaymentDialog";

interface ProgramPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: TrainingProgram | null;
  onPaymentComplete: () => void;
}

export function ProgramPaymentDialog({ 
  open, 
  onOpenChange, 
  program, 
  onPaymentComplete 
}: ProgramPaymentDialogProps) {
  if (!program) return null;
  
  const paymentItem = {
    id: program.id,
    name: program.title,
    price: program.price || 0,
    description: program.description || `${program.week} training program by ${program.trainerName}`,
    date: program.weekStart
  };
  
  return (
    <SharedPaymentDialog
      open={open}
      onOpenChange={onOpenChange}
      item={paymentItem}
      onPaymentComplete={onPaymentComplete}
      title="Purchase Training Program"
      description={`Get access to ${program.title} by ${program.trainerName}`}
    />
  );
}
