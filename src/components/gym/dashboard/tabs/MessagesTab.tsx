
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Send, UsersRound, User, CheckCircle } from "lucide-react";
import { ChatDialog } from "./messages/ChatDialog";

interface MessagesTabProps {
  onMessageRead?: () => void;
}

export function MessagesTab({ onMessageRead }: MessagesTabProps) {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [activeConversation, setActiveConversation] = useState<any[]>([]);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Sample data for demo purposes
  const trainers = [
    { 
      id: 1, 
      name: "Laura Bianchi", 
      role: "Personal Trainer", 
      status: "online",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
    },
    { 
      id: 2, 
      name: "Marco Rossi", 
      role: "Fitness Coach", 
      status: "offline",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
    },
    { 
      id: 3, 
      name: "Giulia Marino", 
      role: "Yoga Instructor", 
      status: "online",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];
  
  const members = [
    { 
      id: 1, 
      name: "Sofia Ricci", 
      lastActive: "Today", 
      status: "active",
      unreadCount: 2,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
    },
    { 
      id: 2, 
      name: "Luca Marino", 
      lastActive: "Yesterday", 
      status: "active",
      unreadCount: 0,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
    },
    { 
      id: 3, 
      name: "Martina Russo", 
      lastActive: "Today", 
      status: "active",
      unreadCount: 1,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];
  
  // Mock conversation history for the demo
  const conversations = {
    "trainer-1": [
      { id: 1, sender: "them", content: "Ciao, sono disponibile lunedì alle 15:00 per la riunione sulle nuove attrezzature", time: "10:30" },
      { id: 2, sender: "me", content: "Perfetto! Ci vediamo lunedì. Grazie per la disponibilità.", time: "10:35" }
    ],
    "trainer-2": [
      { id: 1, sender: "them", content: "Ho bisogno di aggiornare il mio orario di lavoro per la prossima settimana", time: "Ieri" },
      { id: 2, sender: "me", content: "Certo, puoi inviarmi i nuovi orari e li inserisco nel sistema", time: "Ieri" }
    ],
    "member-1": [
      { id: 1, sender: "them", content: "Buongiorno, vorrei informazioni sui vostri corsi di pilates", time: "09:15" },
      { id: 2, sender: "me", content: "Buongiorno Sofia! Abbiamo corsi di pilates il martedì e giovedì alle 18:00. Vuoi prenotare?", time: "09:20" },
      { id: 3, sender: "them", content: "Sì, vorrei prenotare per giovedì. È possibile?", time: "09:25" }
    ]
  };
  
  const handleOpenChat = (type: string, id: number) => {
    const chatId = `${type}-${id}`;
    setActiveChat({ type, id, chatId });
    setActiveConversation(conversations[chatId as keyof typeof conversations] || []);
    setShowChatDialog(true);
    
    if (type === 'member' && onMessageRead) {
      onMessageRead();
    }
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: "me",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setActiveConversation([...activeConversation, newMsg]);
    setNewMessage("");
  };
  
  // Filter trainers and members based on search term
  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get total unread count
  const totalUnread = members.reduce((total, member) => total + member.unreadCount, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Messaggi</h1>
          <p className="text-muted-foreground">Comunica con i tuoi trainer e membri</p>
        </div>
        
        <Button className="sm:ml-auto flex gap-1.5">
          <Send className="h-4 w-4" />
          Nuovo Messaggio
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Conversazioni</CardTitle>
              <Badge variant="outline">{totalUnread} non letti</Badge>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca conversazioni..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="members">
              <div className="border-b px-4 pt-1">
                <TabsList className="w-full justify-start rounded-none border-b-0 p-0 h-auto">
                  <TabsTrigger 
                    value="members" 
                    className="data-[state=active]:border-b-primary data-[state=active]:border-b-2 data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 font-medium"
                  >
                    <UsersRound className="w-4 h-4 mr-2" />
                    Membri
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trainers" 
                    className="data-[state=active]:border-b-primary data-[state=active]:border-b-2 data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Trainer
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="members" className="m-0 py-2">
                {filteredMembers.length > 0 ? (
                  <div className="divide-y">
                    {filteredMembers.map(member => (
                      <div 
                        key={member.id}
                        className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleOpenChat("member", member.id)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {member.status === "active" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{member.name}</p>
                            <span className="text-xs text-muted-foreground">{member.lastActive}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            Ultimo messaggio nella chat...
                          </p>
                        </div>
                        {member.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {member.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">Nessun membro trovato</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="trainers" className="m-0 py-2">
                {filteredTrainers.length > 0 ? (
                  <div className="divide-y">
                    {filteredTrainers.map(trainer => (
                      <div 
                        key={trainer.id}
                        className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleOpenChat("trainer", trainer.id)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={trainer.image} alt={trainer.name} />
                            <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {trainer.status === "online" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{trainer.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {trainer.status === "online" ? "Online" : "Offline"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {trainer.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">Nessun trainer trovato</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Message Stats and Help */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Comunicazioni</CardTitle>
            <CardDescription>Gestisci le tue comunicazioni con membri e trainer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Messaggi recenti</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Hai {totalUnread} messaggi non letti da membri della palestra
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                      >
                        Vedi tutti
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Stato comunicazioni</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-sm text-green-700">
                          <span className="font-medium">Trainer:</span> 3/3 attivi
                        </div>
                        <div className="text-sm text-green-700">
                          <span className="font-medium">Membri:</span> 3/5 attivi
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg border space-y-4">
                <h3 className="font-medium">Suggerimenti</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span>Invia messaggi di benvenuto ai nuovi membri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span>Comunica regolarmente con i membri inattivi sulla piattaforma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span>Organizza briefing settimanali con i tuoi trainer</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">Guida alla comunicazione</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chat Dialog */}
      <ChatDialog
        open={showChatDialog}
        onOpenChange={setShowChatDialog}
        recipient={activeChat ? (
          activeChat.type === "trainer" 
            ? trainers.find(t => t.id === activeChat.id) 
            : members.find(m => m.id === activeChat.id)
        ) : null}
        conversation={activeConversation}
        onSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
}
