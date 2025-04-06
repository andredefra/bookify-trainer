
import { Conversation } from "./types";

interface ChatMessagesProps {
  messages: Conversation[keyof Conversation] | undefined;
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  if (!messages || messages.length === 0) return null;
  
  return (
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
        >
          <div 
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender === "you" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted"
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <span className={`text-xs mt-1 block text-right ${
              message.sender === "you" 
                ? "text-primary-foreground/70" 
                : "text-muted-foreground"
            }`}>
              {message.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
