import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { Bot, User, Download, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  message: {
    id: string;
    sender: 'user' | 'ai';
    content?: string;
    message_type: 'text' | 'image' | 'video' | 'file' | 'audio';
    media_url?: string;
    file_name?: string;
    created_at: string;
  };
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const time = formatDistanceToNow(new Date(message.created_at), { 
    addSuffix: true, 
    locale: it 
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const renderMedia = () => {
    if (!message.media_url) return null;

    switch (message.message_type) {
      case 'image':
        return (
          <div className="mt-2">
            <img 
              src={message.media_url} 
              alt="Shared image"
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(message.media_url, '_blank')}
            />
          </div>
        );
      
      case 'video':
        return (
          <div className="mt-2">
            <video 
              src={message.media_url}
              controls
              className="max-w-xs rounded-lg"
              preload="metadata"
            />
          </div>
        );
      
      case 'audio':
        return (
          <div className="mt-2">
            <audio 
              src={message.media_url}
              controls
              className="max-w-xs"
            />
          </div>
        );
      
      case 'file':
        return (
          <div className="mt-2 p-3 border rounded-lg bg-muted/50 max-w-xs">
            <div className="flex items-center gap-2">
              {getFileIcon(message.message_type)}
              <span className="text-sm font-medium truncate">
                {message.file_name || 'File'}
              </span>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => window.open(message.media_url, '_blank')}
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-foreground'
        }`}>
          {message.content && (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}
          {renderMedia()}
        </div>
        
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {time}
        </span>
      </div>
    </div>
  );
}