
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Image, FileText, Video } from "lucide-react";
import { MessageAttachment } from "./MessageItem";

interface AttachmentPreviewProps {
  attachments: File[];
  onRemoveAttachment: (index: number) => void;
}

export function AttachmentPreview({ attachments, onRemoveAttachment }: AttachmentPreviewProps) {
  if (attachments.length === 0) return null;
  
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <Image className="h-4 w-4" />;
    if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="pt-2 border-t flex flex-wrap gap-2">
      {attachments.map((file, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 pl-2">
          {getFileIcon(file.type)}
          <span className="truncate max-w-[120px]">{file.name}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-5 w-5 p-0 rounded-full ml-1"
            onClick={() => onRemoveAttachment(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
}
