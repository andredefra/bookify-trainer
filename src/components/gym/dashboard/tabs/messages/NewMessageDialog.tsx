
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

interface Trainer {
  id: number;
  name: string;
  status: string;
}

interface NewMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (trainerId: number, message: string) => void;
  trainers: Trainer[];
}

export function NewMessageDialog({ 
  open, 
  onOpenChange, 
  onSend,
  trainers 
}: NewMessageDialogProps) {
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const handleSend = () => {
    if (!selectedTrainerId || !messageContent.trim()) {
      toast.error("Please select a trainer and write a message");
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending with a small delay
    setTimeout(() => {
      onSend(selectedTrainerId, messageContent);
      setIsSending(false);
      onOpenChange(false);
      
      // Reset form
      setSelectedTrainerId(null);
      setMessageContent("");
    }, 500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Send a message to one of your trainers
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="trainer">Recipient</Label>
            <Select 
              value={selectedTrainerId?.toString() || ""} 
              onValueChange={(value) => setSelectedTrainerId(parseInt(value))}
            >
              <SelectTrigger id="trainer">
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id.toString()}>
                    {trainer.name} {trainer.status === "online" ? "(Online)" : 
                      trainer.status === "away" ? "(Away)" : "(Offline)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!selectedTrainerId || !messageContent.trim() || isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
