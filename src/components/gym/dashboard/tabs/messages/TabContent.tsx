
import { ConversationsList } from "./ConversationsList";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "./EmptyState";
import { Conversation, TrainerMessage } from "./types";

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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
      <ConversationsList 
        trainers={trainers}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        getStatusColor={getStatusColor}
      />
      
      <div className="md:col-span-2 border rounded-md flex flex-col">
        {activeConversation !== null ? (
          <>
            <ChatHeader trainer={activeTrainer} />
            <ChatMessages messages={activeMessages} />
            <ChatInput onSend={handleSendMessage} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
