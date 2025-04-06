
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: {
    id: number;
    sender: string;
    text: string;
    time: string;
  };
  trainerName: string;
}

export function ChatMessage({ message, trainerName }: ChatMessageProps) {
  const isTrainer = message.sender === "trainer";
  
  return (
    <div className={`flex ${isTrainer ? "justify-start" : "justify-end"}`}>
      {isTrainer && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="" alt={trainerName} />
          <AvatarFallback>{trainerName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[75%] px-4 py-2 rounded-lg ${
        isTrainer 
        ? "bg-muted text-foreground" 
        : "bg-primary text-primary-foreground"
      }`}>
        <p className="text-sm">{message.text}</p>
        <span className={`text-xs mt-1 block text-right ${
          isTrainer 
          ? "text-muted-foreground" 
          : "text-primary-foreground/70"
        }`}>
          {message.time}
        </span>
      </div>
      
      {!isTrainer && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src="" alt="You" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
