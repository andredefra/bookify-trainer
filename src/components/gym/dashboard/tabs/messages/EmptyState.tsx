
import { MessageSquare } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center flex-col p-6">
      <div className="bg-muted/30 p-4 rounded-full mb-4">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-center">No Conversation Selected</h3>
      <p className="text-muted-foreground text-center mt-1">
        Choose a trainer from the list to start messaging
      </p>
    </div>
  );
}
