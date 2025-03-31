
import { SessionItem } from "@/types/sessions";
import { PaymentDialog as SharedPaymentDialog } from "@/components/shared/PaymentDialog";

interface SessionPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onPaymentSubmit: () => void;
}

export function SessionPaymentDialog({ 
  open, 
  onOpenChange, 
  session, 
  onPaymentSubmit 
}: SessionPaymentDialogProps) {
  if (!session) return null;
  
  // Format date to string if it's a Date object
  const formattedDate = session.date instanceof Date 
    ? session.date.toLocaleDateString() 
    : session.date;
  
  const paymentItem = {
    id: session.id,
    name: session.name,
    price: session.price || 50,
    date: formattedDate,
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
      onPaymentComplete={onPaymentSubmit}
      title="Complete Registration"
      description={`Register for ${session.name} with ${session.trainer}`}
    />
  );
}
