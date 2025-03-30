
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import { useState, useRef } from "react";
import { AttachmentPreview } from "./AttachmentPreview";
import { toast } from "sonner";

interface MessageInputProps {
  onSendMessage: (message: string, attachments: File[]) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) {
      toast.error("Please enter a message or add an attachment");
      return;
    }

    onSendMessage(message, attachments);
    setMessage("");
    setAttachments([]);
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

  return (
    <div className="pt-2 border-t mt-auto">
      <AttachmentPreview 
        attachments={attachments} 
        onRemoveAttachment={removeAttachment} 
      />
      
      <div className="flex gap-2 mt-2">
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
  );
}
