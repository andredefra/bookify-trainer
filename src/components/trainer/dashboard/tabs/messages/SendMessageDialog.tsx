
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SendIcon } from "lucide-react";
import { toast } from "sonner";

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients?: { id: number; name: string }[];
}

export function SendMessageDialog({ open, onOpenChange, clients = [] }: SendMessageDialogProps) {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  const handleSend = () => {
    if (!selectedClient) {
      toast.error("Please select a client");
      return;
    }
    
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    // In a real app, this would send the message to the backend
    console.log("Sending message to client:", selectedClient, "Message:", message);
    
    // Show success toast
    toast.success("Message sent successfully");
    
    // Reset form and close dialog
    setSelectedClient("");
    setMessage("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
          <DialogDescription>
            Send a message to one of your clients
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="client">Select Client</Label>
            <Select
              value={selectedClient}
              onValueChange={setSelectedClient}
            >
              <SelectTrigger id="client">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            className="flex items-center gap-2"
            type="submit"
          >
            <SendIcon className="h-4 w-4" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
