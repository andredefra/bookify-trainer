
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Paperclip, X, Image, FileText, Video } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  sender: "trainer" | "client";
  content: string;
  timestamp: string;
  attachments?: { name: string; type: string; url?: string }[];
}

interface ClientChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: { id: number; name: string } | null;
}

export function ClientChatDialog({ open, onOpenChange, client }: ClientChatDialogProps) {
  const [message, setMessage] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
      content: "Check out my progress photo!",
      timestamp: "10:40 AM",
      attachments: [
        { 
          name: "progress.jpg", 
          type: "image/jpeg", 
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80" 
        }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) {
      toast.error("Please enter a message or add an attachment");
      return;
    }

    // Create file attachment objects for the message
    const messageAttachments = attachments.length > 0 
      ? attachments.map(file => ({
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file) // In a real app, this would be a server URL
        }))
      : undefined;

    // Add the new message to the conversation
    const newMessage: Message = {
      id: Date.now(),
      sender: "trainer",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: messageAttachments
    };

    setConversation([...conversation, newMessage]);
    setMessage("");
    setAttachments([]);
    
    // In a real app, this would send the message to the backend
    toast.success("Message sent");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length > 5) {
        toast.error("You can only attach up to 5 files per message");
        return;
      }
      setAttachments([...attachments, ...newFiles]);
      
      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <Image className="h-4 w-4" />;
    if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
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
                
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.attachments.map((file, index) => (
                      <div 
                        key={index} 
                        className={`
                          p-2 rounded 
                          ${file.type.startsWith('image/') ? 'bg-transparent' : 'bg-background/10 flex items-center gap-2 text-xs'}
                        `}
                      >
                        {file.type.startsWith('image/') ? (
                          <div className="mt-1 rounded overflow-hidden">
                            <img 
                              src={file.url || `https://placehold.co/300x200?text=${encodeURIComponent(file.name)}`} 
                              alt={file.name}
                              className="max-w-full rounded" 
                            />
                          </div>
                        ) : (
                          <>
                            {getFileIcon(file.type)}
                            <span className="truncate max-w-[180px]">{file.name}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className={`text-xs mt-1 ${msg.sender === 'trainer' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {attachments.length > 0 && (
          <div className="pt-2 border-t flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 pl-2">
                {getFileIcon(file.type)}
                <span className="truncate max-w-[120px]">{file.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 rounded-full ml-1"
                  onClick={() => removeAttachment(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        <div className="pt-2 border-t mt-auto">
          <div className="flex gap-2">
            <Input 
              placeholder="Type your message..." 
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileSelect}
              accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
