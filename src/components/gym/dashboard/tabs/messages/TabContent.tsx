
import { useState, useRef, useEffect } from "react";
import { TrainerMessage, Conversation } from "./types";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

interface TabContentProps {
  activeTab: string;
  activeConversation: number | null;
  setActiveConversation: (id: number | null) => void;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change or active conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation, conversations]);

  // No trainers to display
  if (trainers.length === 0) {
    return (
      <div className="text-center p-6 bg-muted/20 rounded-md">
        <p className="text-muted-foreground">No messages found in this category</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full md:flex-row md:h-[600px] border rounded-md overflow-hidden">
      {/* Trainers list */}
      <div className="w-full md:w-1/3 bg-muted/10 border-r">
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm">
            {activeTab === "all" ? "All Conversations" : 
             activeTab === "unread" ? "Unread Messages" : "Archived"}
          </h3>
        </div>
        <div className="divide-y">
          {trainers.map(trainer => (
            <div 
              key={trainer.id}
              onClick={() => setActiveConversation(trainer.id)}
              className={`p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted/20 ${
                activeConversation === trainer.id ? "bg-primary/5" : ""
              }`}
            >
              <div className="relative">
                <img 
                  src={trainer.avatar} 
                  alt={trainer.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${getStatusColor(trainer.status)}`}></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium text-sm truncate">{trainer.name}</p>
                  <span className="text-xs text-muted-foreground">{trainer.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{trainer.lastMessage}</p>
              </div>
              {trainer.unread > 0 && (
                <div className="bg-primary text-primary-foreground text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {trainer.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {activeConversation !== null ? (
          <>
            {/* Chat header */}
            <ChatHeader trainer={trainers.find(t => t.id === activeConversation)} />
            
            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {conversations[activeConversation]?.map(message => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    trainerName={trainers.find(t => t.id === activeConversation)?.name || ""}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Message input - using ChatInput component */}
            <ChatInput onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-muted-foreground">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
