
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrainerMessage } from "./types";

interface NewMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainers: TrainerMessage[];
  onSend: (trainerId: number, message: string) => void;
}

export function NewMessageDialog({ open, onOpenChange, trainers, onSend }: NewMessageDialogProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  const handleSubmit = () => {
    if (!selectedTrainer || !message.trim()) return;
    
    onSend(Number(selectedTrainer), message);
    
    // Reset form
    setSelectedTrainer("");
    setMessage("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="trainer">Trainer</Label>
            <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
              <SelectTrigger id="trainer" className="w-full">
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map(trainer => (
                  <SelectItem key={trainer.id} value={trainer.id.toString()}>
                    {trainer.name} ({trainer.status === "online" ? "Online" : trainer.status === "away" ? "Away" : "Offline"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!selectedTrainer || !message.trim()}
          >
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
