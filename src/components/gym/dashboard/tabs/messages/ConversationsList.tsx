
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type TrainerMessage } from "./types";

interface ConversationsListProps {
  trainers: TrainerMessage[];
  activeConversation: number | null;
  setActiveConversation: (id: number) => void;
  getStatusColor: (status: string) => string;
}

export function ConversationsList({
  trainers,
  activeConversation,
  setActiveConversation,
  getStatusColor
}: ConversationsListProps) {
  return (
    <div className="border rounded-md overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b bg-muted/30">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8 w-full"
          />
        </div>
      </div>
      
      <div className="overflow-auto flex-1 divide-y">
        {trainers.length === 0 && (
          <div className="py-8 px-3 text-center text-muted-foreground text-sm">
            No conversations yet
          </div>
        )}
        
        {trainers.map(trainer => (
          <div 
            key={trainer.id}
            className={`p-3 cursor-pointer hover:bg-muted/30 ${activeConversation === trainer.id ? 'bg-primary/10' : ''}`}
            onClick={() => setActiveConversation(trainer.id)}
          >
            <div className="flex gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={trainer.avatar} alt={trainer.name} />
                  <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 rounded-full w-3 h-3 border-2 border-white ${getStatusColor(trainer.status)}`}></span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium truncate">{trainer.name}</h4>
                  <span className="text-xs text-muted-foreground">{trainer.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{trainer.lastMessage}</p>
              </div>
              
              {trainer.unread > 0 && (
                <div className="flex-shrink-0">
                  <Badge variant="default" className="ml-2">
                    {trainer.unread}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
