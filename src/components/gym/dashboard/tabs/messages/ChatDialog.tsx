
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Image as ImageIcon, File } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: number;
  sender: "me" | "them";
  content: string;
  time: string;
  attachments?: { name: string; type: string; url?: string }[];
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipient: any;
  conversation: ChatMessage[];
  onSendMessage: () => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
}

export function ChatDialog({ 
  open, 
  onOpenChange, 
  recipient, 
  conversation,
  onSendMessage,
  newMessage,
  setNewMessage
}: ChatDialogProps) {
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, conversation]);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };
  
  const getOnlineStatus = () => {
    if (!recipient) return null;
    
    if ('status' in recipient) {
      if (recipient.status === 'online' || recipient.status === 'active') {
        return <Badge className="ml-2 bg-green-100 text-green-800">Online</Badge>;
      } else {
        return <Badge variant="outline" className="ml-2">Offline</Badge>;
      }
    }
    
    return null;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[80vh] max-h-[600px] flex flex-col p-0">
        <DialogHeader className="px-4 py-3 border-b">
          <div className="flex items-center">
            {recipient && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={recipient.image} alt={recipient.name} />
                <AvatarFallback>{recipient.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            )}
            <DialogTitle className="flex items-center">
              {recipient?.name || "Chat"}
              {getOnlineStatus()}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col space-y-4">
            {conversation.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[80%] p-3 rounded-lg 
                    ${msg.sender === 'me' 
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
                          className="p-2 rounded bg-background/10 flex items-center gap-2 text-xs"
                        >
                          {getFileIcon(file.type)}
                          <span className="truncate max-w-[180px]">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </ScrollArea>
        
        {attachments.length > 0 && (
          <div className="px-4 pt-2 border-t flex flex-wrap gap-2">
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
                  <span className="sr-only">Remove</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Input 
              placeholder="Scrivi un messaggio..." 
              className="flex-1"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendMessage();
                }
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileSelect}
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button onClick={onSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
