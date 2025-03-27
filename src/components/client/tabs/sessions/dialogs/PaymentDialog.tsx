
import { SessionItem } from "@/types/sessions";
import { PaymentDialog as SharedPaymentDialog } from "@/components/shared/PaymentDialog";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onPaymentComplete: () => void;
}

export function PaymentDialog({ 
  open, 
  onOpenChange, 
  session, 
  onPaymentComplete 
}: PaymentDialogProps) {
  if (!session) return null;
  
  const paymentItem = {
    id: session.id,
    name: session.name,
    price: session.price || 50,
    date: session.date,
    time: session.time,
    trainer: session.trainer,
    attendees: session.attendees,
    maxAttendees: session.maxAttendees
  };
  
  return (
    <SharedPaymentDialog
      open={open}
      onOpenChange={onOpenChange}
      item={paymentItem}
      onPaymentComplete={onPaymentComplete}
      title="Complete Registration"
      description={`Register for ${session.name} with ${session.trainer}`}
    />
  );
}
