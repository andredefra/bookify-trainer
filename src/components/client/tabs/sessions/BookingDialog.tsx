
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";

interface TrainerProfile {
  id: number;
  name: string;
  speciality: string;
}

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTrainer: string;
  setSelectedTrainer: (trainer: string) => void;
  availableTrainers: TrainerProfile[];
  onSubmit: (data: z.infer<typeof bookingSchema>) => void;
}

export function BookingDialog({
  open,
  onOpenChange,
  selectedTrainer,
  setSelectedTrainer,
  availableTrainers,
  onSubmit
}: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Private Session</DialogTitle>
          <DialogDescription>
            Select a trainer, date and time for your session
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Trainer</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableTrainers.map(trainer => (
              <Button 
                key={trainer.id}
                variant={selectedTrainer === trainer.name ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() => setSelectedTrainer(trainer.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                    {trainer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{trainer.name}</div>
                    <div className="text-xs text-muted-foreground">{trainer.speciality}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
        
        <BookingForm 
          trainerName={selectedTrainer}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
