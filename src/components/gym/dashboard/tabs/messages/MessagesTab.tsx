
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabContent } from "./TabContent";
import { TrainerMessage, Conversation } from "./types";
import { toast } from "sonner";

interface MessagesTabProps {
  onMessagesRead?: () => void;
}

export function MessagesTab({ onMessagesRead }: MessagesTabProps) {
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  
  // Mock data for trainers
  const trainers: TrainerMessage[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
      status: "online",
      unread: 2,
      lastMessage: "I'll check with the other trainers about the schedule.",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
      status: "offline",
      unread: 0,
      lastMessage: "The new fitness program is ready for review.",
      timestamp: "Yesterday"
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
      status: "away",
      unread: 1,
      lastMessage: "We need to discuss the new equipment delivery.",
      timestamp: "2 days ago"
    }
  ];
  
  // Mock messages for conversations
  const [conversations, setConversations] = useState<Conversation>({
    1: [
      { id: 1, sender: "trainer", text: "Good morning! I wanted to update you on our class attendance this week.", time: "10:15 AM" },
      { id: 2, sender: "you", text: "Great, how are the numbers looking?", time: "10:20 AM" },
      { id: 3, sender: "trainer", text: "We've seen a 15% increase in the HIIT classes and yoga sessions are fully booked.", time: "10:25 AM" },
      { id: 4, sender: "trainer", text: "I'll check with the other trainers about the schedule.", time: "10:30 AM" },
    ],
    2: [
      { id: 1, sender: "trainer", text: "I've completed the new fitness program outline as requested.", time: "3:45 PM" },
      { id: 2, sender: "you", text: "Thank you, I'll take a look at it.", time: "4:15 PM" },
      { id: 3, sender: "trainer", text: "The new fitness program is ready for review.", time: "5:30 PM" },
    ],
    3: [
      { id: 1, sender: "you", text: "Have we confirmed the delivery date for the new equipment?", time: "Monday" },
      { id: 2, sender: "trainer", text: "Yes, it's scheduled for next Thursday.", time: "Monday" },
      { id: 3, sender: "trainer", text: "We need to discuss the new equipment delivery.", time: "Tuesday" },
    ]
  });
  
  // Effect to mark messages as read when component mounts
  useEffect(() => {
    if (onMessagesRead) {
      onMessagesRead();
    }
  }, [onMessagesRead]);
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "away": return "bg-amber-500";
      default: return "bg-slate-400";
    }
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim() || activeConversation === null) return;
    
    // Here you would typically send a message to your backend
    console.log(`Sending message to trainer ${activeConversation}: ${message}`);
    
    // Update the conversation with the new message
    setConversations(prev => {
      const conversation = [...(prev[activeConversation] || [])];
      const newId = conversation.length > 0 
        ? Math.max(...conversation.map(m => m.id)) + 1 
        : 1;
        
      return {
        ...prev,
        [activeConversation]: [
          ...conversation,
          { 
            id: newId, 
            sender: "you", 
            text: message, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }
        ]
      };
    });
    
    toast.success("Message sent successfully");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Trainer Messages</h1>
        <p className="text-muted-foreground">Communicate with your gym's trainers</p>
      </div>
      
      <Card className="border-none shadow-none">
        <Tabs defaultValue="all" className="w-full">
          <div className="border-b pb-2 mb-4">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-sm">All Messages</TabsTrigger>
              <TabsTrigger value="unread" className="text-sm">Unread</TabsTrigger>
              <TabsTrigger value="archived" className="text-sm">Archived</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <TabContent 
              activeTab="all"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              trainers={trainers}
              conversations={conversations}
              getStatusColor={getStatusColor}
              handleSendMessage={handleSendMessage}
            />
          </TabsContent>
          
          <TabsContent value="unread" className="mt-0">
            <TabContent 
              activeTab="unread"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              trainers={trainers.filter(t => t.unread > 0)}
              conversations={conversations}
              getStatusColor={getStatusColor}
              handleSendMessage={handleSendMessage}
            />
          </TabsContent>
          
          <TabsContent value="archived" className="mt-0">
            <TabContent 
              activeTab="archived"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              trainers={[]}
              conversations={conversations}
              getStatusColor={getStatusColor}
              handleSendMessage={handleSendMessage}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
