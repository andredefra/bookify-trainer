
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/data/trainerMockData";
import { Paperclip, X, Image, FileText, Video } from "lucide-react";

interface AIChatDialogProps {
  trainerName: string;
  conversation: Message[];
}

export const AIChatDialog = ({ trainerName, conversation }: AIChatDialogProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) {
      toast({
        description: "Please enter a message or add an attachment.",
      });
      return;
    }
    
    toast({
      description: "This is a demo conversation. In a real app, you would be able to send messages and attachments.",
    });
    
    // Reset after sending
    setMessage("");
    setAttachments([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length > 5) {
        toast({
          description: "You can only attach up to 5 files per message.",
          variant: "destructive",
        });
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

  const getFileIcon = (file: File) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) return <Image className="h-4 w-4" />;
    if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto py-4 max-h-[400px]">
        <div className="space-y-4 px-1">
          {conversation.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] p-3 rounded-lg 
                  ${message.sender === 'client' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                  }
                `}
              >
                <div className="text-sm">{message.message}</div>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs p-1.5 bg-background/10 rounded">
                        {attachment.type.startsWith("image/") ? (
                          <Image className="h-3.5 w-3.5" />
                        ) : attachment.type.startsWith("video/") ? (
                          <Video className="h-3.5 w-3.5" />
                        ) : (
                          <FileText className="h-3.5 w-3.5" />
                        )}
                        <span className="truncate max-w-[180px]">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className={`text-xs mt-1 ${message.sender === 'client' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {attachments.length > 0 && (
        <div className="px-1 pt-2 border-t flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 pl-2">
              {getFileIcon(file)}
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
          <Button size="sm" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
