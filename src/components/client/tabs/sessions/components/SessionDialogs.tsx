
import { SessionItem } from "@/types/sessions";
import { BookingDialog } from "../dialogs/BookingDialog";
import { PaymentDialog } from "../dialogs/PaymentDialog";
import { SessionDetailsDialog } from "../dialogs/SessionDetailsDialog";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";
import { useMediaQuery } from "@/hooks/use-mobile";

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
  availableTrainers: { id: number; name: string }[];
  onBookingSubmit: (data: z.infer<typeof bookingSchema>) => void;
  onSessionRequest: (data: z.infer<typeof bookingSchema>) => void;
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
  onSessionRequest,
  onPaymentComplete,
  onRegister
}: SessionDialogsProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  return (
    <>
      <BookingDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        selectedTrainer={selectedTrainer}
        setSelectedTrainer={setSelectedTrainer}
        availableTrainers={availableTrainers}
        onSubmit={onBookingSubmit}
        onRequest={onSessionRequest}
        isMobile={isMobile}
      />
      
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        session={selectedSession}
        onPaymentComplete={onPaymentComplete}
        isMobile={isMobile}
      />
      
      <SessionDetailsDialog
        open={showSessionDetailsDialog}
        onOpenChange={setShowSessionDetailsDialog}
        session={selectedSession}
        onRegister={onRegister}
        isMobile={isMobile}
      />
    </>
  );
}
