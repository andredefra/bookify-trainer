
import { useState } from "react";
import { ConversationsList } from "./ConversationsList";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "./EmptyState";
import { NewMessageDialog } from "./NewMessageDialog";
import { Conversation, TrainerMessage } from "./types";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";

interface TabContentProps {
  activeTab: string;
  activeConversation: number | null;
  setActiveConversation: (id: number) => void;
  trainers: TrainerMessage[];
  conversations: Conversation;
  getStatusColor: (status: string) => string;
  handleSendMessage: (message: string) => void;
}

export function TabContent({
  activeTab,
  activeConversation,
  setActiveConversation,
  trainers,
  conversations,
  getStatusColor,
  handleSendMessage
}: TabContentProps) {
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  
  if (activeTab === "unread") {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium">Unread Messages</h3>
        <p className="text-muted-foreground mt-1">
          You have {trainers.reduce((sum, t) => sum + t.unread, 0)} unread messages
        </p>
      </div>
    );
  }
  
  if (activeTab === "archived") {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium">Archived Messages</h3>
        <p className="text-muted-foreground mt-1">
          No archived messages
        </p>
      </div>
    );
  }

  const activeTrainer = trainers.find(t => t.id === activeConversation);
  const activeMessages = activeConversation !== null ? conversations[activeConversation] : undefined;
  
  const handleNewMessage = (trainerId: number, message: string) => {
    // Find the trainer in the list
    const trainer = trainers.find(t => t.id === trainerId);
    if (!trainer) return;
    
    // Set the active conversation to this trainer
    setActiveConversation(trainerId);
    
    // After a short delay to allow the UI to update, send the message
    setTimeout(() => {
      handleSendMessage(message);
      toast.success(`Message sent to ${trainer.name}`);
    }, 100);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
        <div>
          <div className="mb-2 flex justify-between items-center">
            <h3 className="text-sm font-medium">Conversations</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowNewMessageDialog(true)}
              className="h-8 px-2"
            >
              <MessageSquarePlus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <ConversationsList 
            trainers={trainers}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
            getStatusColor={getStatusColor}
          />
        </div>
        
        <div className="md:col-span-2 border rounded-md flex flex-col">
          {activeConversation !== null ? (
            <>
              <ChatHeader trainer={activeTrainer} />
              <ChatMessages messages={activeMessages} />
              <ChatInput onSend={handleSendMessage} />
            </>
          ) : (
            <EmptyState onNewMessage={() => setShowNewMessageDialog(true)} />
          )}
        </div>
      </div>
      
      <NewMessageDialog
        open={showNewMessageDialog}
        onOpenChange={setShowNewMessageDialog}
        onSend={handleNewMessage}
        trainers={trainers}
      />
    </>
  );
}
