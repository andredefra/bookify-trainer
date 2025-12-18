
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTrainer: string;
  setSelectedTrainer: (trainer: string) => void;
  availableTrainers: { id: number; name: string }[];
  onSubmit: (data: z.infer<typeof bookingSchema>) => void;
  onRequest?: (data: z.infer<typeof bookingSchema>) => void;
  isMobile?: boolean;
}

export function BookingDialog({ 
  open, 
  onOpenChange, 
  selectedTrainer, 
  setSelectedTrainer, 
  availableTrainers, 
  onSubmit,
  onRequest,
  isMobile = false
}: BookingDialogProps) {
  // Set default trainer if none selected
  useEffect(() => {
    if (open && !selectedTrainer && availableTrainers.length > 0) {
      setSelectedTrainer(availableTrainers[0].name);
    }
  }, [open, selectedTrainer, availableTrainers, setSelectedTrainer]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "sm:max-w-[425px] p-4 sm:p-6" : "sm:max-w-[500px]"}>
        <DialogHeader>
          <DialogTitle>Book a Training Session</DialogTitle>
          <DialogDescription>
            Select a trainer and set up your private training session
          </DialogDescription>
        </DialogHeader>
        
        {/* Trainer selector */}
        <div className="mb-6">
          <Label htmlFor="trainer-select">Choose a Trainer</Label>
          <Select 
            value={selectedTrainer} 
            onValueChange={setSelectedTrainer}
            defaultValue={availableTrainers[0]?.name}
          >
            <SelectTrigger id="trainer-select" className="w-full">
              <SelectValue placeholder="Select a trainer" />
            </SelectTrigger>
            <SelectContent>
              {availableTrainers.map(trainer => (
                <SelectItem key={trainer.id} value={trainer.name}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Booking form */}
        {selectedTrainer && (
          <BookingForm 
            trainerName={selectedTrainer}
            onSubmit={onSubmit}
            onRequest={onRequest}
            onCancel={() => onOpenChange(false)}
            isMobile={isMobile}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
