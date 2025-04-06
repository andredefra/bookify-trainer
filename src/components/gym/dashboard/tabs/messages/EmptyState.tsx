
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

interface EmptyStateProps {
  onNewMessage?: () => void;
}

export function EmptyState({ onNewMessage }: EmptyStateProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="bg-muted/30 h-12 w-12 rounded-full flex items-center justify-center mb-4">
        <MessageSquarePlus className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No conversation selected</h3>
      <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
        Select a conversation from the list or start a new one
      </p>
      <Button onClick={onNewMessage}>
        <MessageSquarePlus className="mr-2 h-4 w-4" />
        New Message
      </Button>
    </div>
  );
}
