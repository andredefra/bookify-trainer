
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { MessageItem, MessageAttachment } from "./components/MessageItem";
import { MessageInput } from "./components/MessageInput";

interface Message {
  id: number;
  sender: "trainer" | "client";
  content: string;
  timestamp: string;
  attachments?: MessageAttachment[];
}

interface ClientChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: { id: number; name: string } | null;
}

export function ClientChatDialog({ open, onOpenChange, client }: ClientChatDialogProps) {
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
    },
    {
      id: 3,
      sender: "client",
      content: "Check out my workout from today!",
      timestamp: "10:40 AM",
      attachments: [
        { 
          name: "workout.jpg", 
          type: "image/jpeg", 
          url: "/lovable-uploads/60b9f4d1-45d1-4edb-a115-9c2a83d8df7c.png" 
        }
      ]
    }
  ]);

  const handleSendMessage = (messageText: string, messageAttachments: File[]) => {
    // Create file attachment objects for the message
    const attachments = messageAttachments.length > 0 
      ? messageAttachments.map(file => ({
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file) // In a real app, this would be a server URL
        }))
      : undefined;

    // Add the new message to the conversation
    const newMessage: Message = {
      id: Date.now(),
      sender: "trainer",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments
    };

    setConversation([...conversation, newMessage]);
    
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
            <MessageItem
              key={msg.id}
              content={msg.content}
              sender={msg.sender}
              timestamp={msg.timestamp}
              attachments={msg.attachments}
            />
          ))}
        </div>
        
        <MessageInput onSendMessage={handleSendMessage} />
      </DialogContent>
    </Dialog>
  );
}
