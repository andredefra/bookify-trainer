
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";

interface BookSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTrainer: string;
  onSubmit: (data: z.infer<typeof bookingSchema>) => void;
}

export function BookSessionDialog({ 
  open, 
  onOpenChange, 
  selectedTrainer,
  onSubmit
}: BookSessionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
          <DialogDescription>
            Select a date and time for your session with {selectedTrainer}
          </DialogDescription>
        </DialogHeader>
        <BookingForm 
          trainerName={selectedTrainer}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
