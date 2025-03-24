
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RegisterForm, registerSchema } from "@/components/trainer/RegisterForm";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";

interface SessionDialogsProps {
  trainerName: string;
  showRegister: boolean;
  showBookingForm: boolean;
  onRegisterSubmit: (data: z.infer<typeof registerSchema>) => void;
  onBookingSubmit: (data: z.infer<typeof bookingSchema>) => void;
  onRegisterCancel: () => void;
  onBookingCancel: () => void;
}

export const SessionDialogs = ({
  trainerName,
  showRegister,
  showBookingForm,
  onRegisterSubmit,
  onBookingSubmit,
  onRegisterCancel,
  onBookingCancel
}: SessionDialogsProps) => {
  return (
    <Dialog open={showRegister || showBookingForm} onOpenChange={(open) => {
      if (!open) {
        if (showRegister) onRegisterCancel();
        if (showBookingForm) onBookingCancel();
      }
    }}>
      <DialogContent>
        {showRegister && (
          <>
            <DialogHeader>
              <DialogTitle>Create an account to book a session</DialogTitle>
              <DialogDescription>
                Join Personal.ai to book sessions with {trainerName} and other trainers.
              </DialogDescription>
            </DialogHeader>
            
            <RegisterForm 
              onSubmit={onRegisterSubmit}
              onCancel={onRegisterCancel}
            />
          </>
        )}
        
        {showBookingForm && (
          <>
            <DialogHeader>
              <DialogTitle>Book a Session with {trainerName}</DialogTitle>
              <DialogDescription>
                Select a date and time for your session
              </DialogDescription>
            </DialogHeader>
            
            <BookingForm 
              trainerName={trainerName}
              onSubmit={onBookingSubmit}
              onCancel={onBookingCancel}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
