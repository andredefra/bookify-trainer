
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";
import { useMediaQuery } from "@/hooks/use-mobile";

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
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "w-[calc(100%-2rem)] max-w-lg p-4" : undefined}>
        <DialogHeader>
          <DialogTitle>Book a Session with {selectedTrainer}</DialogTitle>
          <DialogDescription>
            Select a date and time for your session
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
