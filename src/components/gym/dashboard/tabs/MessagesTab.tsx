
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Search, Circle } from "lucide-react";

export function MessagesTab() {
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  
  // Mock data for trainers
  const trainers = [
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
      unread: 0,
      lastMessage: "We need to discuss the new equipment delivery.",
      timestamp: "2 days ago"
    }
  ];
  
  // Mock messages for a conversation
  const conversations = {
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
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "away": return "bg-amber-500";
      default: return "bg-slate-400";
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || activeConversation === null) return;
    
    // Here you would typically send a message to your backend
    console.log(`Sending message to trainer ${activeConversation}: ${newMessage}`);
    
    // Clear the input field
    setNewMessage("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
              <div className="border rounded-md overflow-hidden">
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
                
                <div className="overflow-auto h-[540px] divide-y">
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
              
              <div className="md:col-span-2 border rounded-md flex flex-col">
                {activeConversation !== null ? (
                  <>
                    <div className="p-3 border-b bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage 
                            src={trainers.find(t => t.id === activeConversation)?.avatar} 
                            alt={trainers.find(t => t.id === activeConversation)?.name} 
                          />
                          <AvatarFallback>
                            {trainers.find(t => t.id === activeConversation)?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">
                            {trainers.find(t => t.id === activeConversation)?.name}
                          </h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Circle className="h-2 w-2 mr-1 fill-current" />
                            <span>
                              {trainers.find(t => t.id === activeConversation)?.status === "online" 
                                ? "Online" 
                                : trainers.find(t => t.id === activeConversation)?.status === "away"
                                  ? "Away"
                                  : "Offline"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-auto p-4 space-y-4">
                      {conversations[activeConversation as keyof typeof conversations].map(message => (
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
                    
                    <div className="p-3 border-t bg-muted/30">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center flex-col p-6">
                    <div className="bg-muted/30 p-4 rounded-full mb-4">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-center">No Conversation Selected</h3>
                    <p className="text-muted-foreground text-center mt-1">
                      Choose a trainer from the list to start messaging
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="unread" className="mt-0">
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium">Unread Messages</h3>
              <p className="text-muted-foreground mt-1">
                You have {trainers.reduce((sum, t) => sum + t.unread, 0)} unread messages
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="archived" className="mt-0">
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium">Archived Messages</h3>
              <p className="text-muted-foreground mt-1">
                No archived messages
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
