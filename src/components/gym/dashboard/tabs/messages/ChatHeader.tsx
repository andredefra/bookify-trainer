
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { StatusType, TrainerMessage } from "./types";

interface ChatHeaderProps {
  trainer: TrainerMessage | undefined;
}

export function ChatHeader({ trainer }: ChatHeaderProps) {
  if (!trainer) return null;
  
  const getStatusText = (status: string): string => {
    switch(status) {
      case "online": return "Online";
      case "away": return "Away";
      default: return "Offline";
    }
  };
  
  return (
    <div className="p-3 border-b bg-muted/30">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={trainer.avatar} alt={trainer.name} />
          <AvatarFallback>{trainer.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{trainer.name}</h4>
          <div className="flex items-center text-xs text-muted-foreground">
            <Circle className="h-2 w-2 mr-1 fill-current" />
            <span>{getStatusText(trainer.status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
