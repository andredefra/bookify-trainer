
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  sender: "trainer" | "client";
  content: string;
  timestamp: string;
}

interface ClientChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: { id: number; name: string } | null;
}

export function ClientChatDialog({ open, onOpenChange, client }: ClientChatDialogProps) {
  const [message, setMessage] = useState<string>("");
  // Mock conversation history - in a real app this would come from a database
  const [conversation, setConversation] = useState<Message[]>([
    {
      id: 1,
      sender: "client",
      content: "Hi, I wanted to ask about my training schedule for next week.",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      sender: "trainer",
      content: "Hi there! I've scheduled you for Monday and Wednesday at 5pm. Does that work for you?",
      timestamp: "10:35 AM"
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // Add the new message to the conversation
    const newMessage: Message = {
      id: Date.now(),
      sender: "trainer",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation([...conversation, newMessage]);
    setMessage("");
    
    // In a real app, this would send the message to the backend
    toast.success("Message sent");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[80vh] max-h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>Chat with {client?.name || "Client"}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {conversation.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'trainer' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] p-3 rounded-lg 
                  ${msg.sender === 'trainer' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                  }
                `}
              >
                <div className="text-sm">{msg.content}</div>
                <div className={`text-xs mt-1 ${msg.sender === 'trainer' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-2 border-t mt-auto">
          <div className="flex gap-2">
            <Input 
              placeholder="Type your message..." 
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
