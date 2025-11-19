import { Image as ImageIcon, FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface MessageBubbleProps {
  sender: 'client' | 'trainer';
  content?: string;
  messageType: 'text' | 'image' | 'video' | 'file';
  mediaUrl?: string;
  thumbnailUrl?: string;
  fileName?: string;
  duration?: number;
  timestamp: string;
  read: boolean;
}

export function MessageBubble({
  sender,
  content,
  messageType,
  mediaUrl,
  thumbnailUrl,
  fileName,
  duration,
  timestamp,
  read
}: MessageBubbleProps) {
  const isClient = sender === 'client';

  const renderMedia = () => {
    switch (messageType) {
      case 'video':
        return (
          <div className="mt-2 rounded-lg overflow-hidden max-w-md">
            <video
              src={mediaUrl}
              poster={thumbnailUrl}
              controls
              className="w-full rounded-lg"
            />
            {duration && (
              <Badge variant="secondary" className="mt-1">
                {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
              </Badge>
            )}
          </div>
        );
      
      case 'image':
        return (
          <img
            src={mediaUrl}
            alt="Attachment"
            className="mt-2 rounded-lg max-w-md max-h-96 object-cover"
          />
        );
      
      case 'file':
        return (
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <a href={mediaUrl} download={fileName} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4 mr-2" />
              {fileName}
              <Download className="h-4 w-4 ml-2" />
            </a>
          </Button>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isClient ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isClient ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isClient
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          {content && <p className="text-sm whitespace-pre-wrap">{content}</p>}
          {renderMedia()}
        </div>
        <div className="flex items-center gap-2 mt-1 px-2">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </span>
          {isClient && (
            <span className="text-xs text-muted-foreground">
              {read ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
