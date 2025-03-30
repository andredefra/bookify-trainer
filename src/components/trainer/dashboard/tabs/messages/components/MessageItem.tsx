
import { Badge } from "@/components/ui/badge";
import { Image, FileText, Video } from "lucide-react";

export interface MessageAttachment {
  name: string;
  type: string;
  url?: string;
}

export interface MessageItemProps {
  content: string;
  sender: "trainer" | "client";
  timestamp: string;
  attachments?: MessageAttachment[];
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) return <Image className="h-4 w-4" />;
  if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
};

export function MessageItem({ content, sender, timestamp, attachments }: MessageItemProps) {
  return (
    <div className={`flex ${sender === 'trainer' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-[80%] p-3 rounded-lg 
          ${sender === 'trainer' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
          }
        `}
      >
        <div className="text-sm">{content}</div>
        
        {attachments && attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {attachments.map((file, index) => (
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
        
        <div className={`text-xs mt-1 ${sender === 'trainer' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {timestamp}
        </div>
      </div>
    </div>
  );
}
