
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AIChatDialog } from "@/components/trainer/AIChatDialog";

interface Message {
  sender: "client" | "ai";
  message: string;
  time: string;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainerName: string;
  conversation: Message[];
}

export const ChatDialog = ({ open, onOpenChange, trainerName, conversation }: ChatDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Chat with AI Assistant</span>
            <Badge variant="outline" className="ml-2 text-xs">Sarah is in session</Badge>
          </DialogTitle>
          <DialogDescription>
            Our AI assistant can help you with scheduling, basic questions, and more while Sarah is unavailable.
          </DialogDescription>
        </DialogHeader>
        
        <AIChatDialog 
          trainerName={trainerName}
          conversation={conversation}
        />
      </DialogContent>
    </Dialog>
  );
};
