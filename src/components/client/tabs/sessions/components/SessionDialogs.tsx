
import { SessionItem } from "@/types/sessions";
import { BookingDialog } from "../dialogs/BookingDialog";
import { SessionDetailsDialog } from "../dialogs/SessionDetailsDialog";
import { PaymentDialog } from "../dialogs/PaymentDialog";
import { z } from "zod";
import { bookingSchema } from "@/components/trainer/BookingForm";

interface SessionDialogsProps {
  showBookingDialog: boolean;
  setShowBookingDialog: (show: boolean) => void;
  showPaymentDialog: boolean;
  setShowPaymentDialog: (show: boolean) => void;
  showSessionDetailsDialog: boolean;
  setShowSessionDetailsDialog: (show: boolean) => void;
  selectedTrainer: string;
  setSelectedTrainer: (trainer: string) => void;
  selectedSession: SessionItem | null;
  availableTrainers: any[];
  onBookingSubmit: (data: z.infer<typeof bookingSchema>) => void;
  onPaymentComplete: () => void;
  onRegister: (session: SessionItem) => void;
}

export function SessionDialogs({
  showBookingDialog,
  setShowBookingDialog,
  showPaymentDialog,
  setShowPaymentDialog,
  showSessionDetailsDialog,
  setShowSessionDetailsDialog,
  selectedTrainer,
  setSelectedTrainer,
  selectedSession,
  availableTrainers,
  onBookingSubmit,
  onPaymentComplete,
  onRegister
}: SessionDialogsProps) {
  return (
    <>
      <BookingDialog 
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        selectedTrainer={selectedTrainer}
        setSelectedTrainer={setSelectedTrainer}
        availableTrainers={availableTrainers}
        onSubmit={onBookingSubmit}
      />
      
      <SessionDetailsDialog
        open={showSessionDetailsDialog}
        onOpenChange={setShowSessionDetailsDialog}
        session={selectedSession}
        onRegister={onRegister}
      />
      
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        session={selectedSession}
        onPaymentComplete={onPaymentComplete}
      />
    </>
  );
}
