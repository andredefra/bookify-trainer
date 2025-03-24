
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/data/trainerMockData";

interface AIChatDialogProps {
  trainerName: string;
  conversation: Message[];
}

export const AIChatDialog = ({ trainerName, conversation }: AIChatDialogProps) => {
  const { toast } = useToast();

  const handleSendMessage = () => {
    toast({
      description: "This is a demo conversation. In a real app, you would be able to send messages.",
    });
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
                <div className={`text-xs mt-1 ${message.sender === 'client' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-2 border-t mt-auto">
        <div className="flex gap-2">
          <Input 
            placeholder="Type your message..." 
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button size="sm" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
