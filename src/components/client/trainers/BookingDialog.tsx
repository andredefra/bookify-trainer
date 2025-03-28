
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTrainer: string;
  onSubmit: (data: z.infer<typeof bookingSchema>) => void;
  onCancel: () => void;
}

export function BookingDialog({ 
  open, 
  onOpenChange, 
  selectedTrainer, 
  onSubmit, 
  onCancel 
}: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Session with {selectedTrainer}</DialogTitle>
          <DialogDescription>
            Select a date and time for your session
          </DialogDescription>
        </DialogHeader>
        <BookingForm 
          trainerName={selectedTrainer}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
