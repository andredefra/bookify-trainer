
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Reply, Users, TrendingUp, Clock } from "lucide-react";
import { MessageAutomationTab } from "@/components/common/MessageAutomationTab";

interface MessagesTabProps {
  onMessagesRead?: () => void;
}

export function MessagesTab({ onMessagesRead }: MessagesTabProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Mock data for gym messages
  const conversations = [
    {
      id: "1",
      clientName: "Marco Rossi",
      lastMessage: "Vorrei prenotare una sessione per domani",
      timestamp: "2h fa",
      unread: true,
      type: "booking"
    },
    {
      id: "2", 
      clientName: "Anna Bianchi",
      lastMessage: "Il mio pacchetto scade tra 3 giorni",
      timestamp: "1d fa",
      unread: false,
      type: "package"
    },
    {
      id: "3",
      clientName: "Luca Verdi", 
      lastMessage: "Posso cambiare trainer?",
      timestamp: "2d fa",
      unread: true,
      type: "support"
    }
  ];

  const stats = {
    totalMessages: 24,
    unreadMessages: 5,
    responseRate: 98,
    avgResponseTime: "2h"
  };

  return (
    <div className="space-y-6">
      {/* KPI Generali Messaggi */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Messaggi Totali</p>
                <p className="text-2xl font-bold">{stats.totalMessages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Non Letti</p>
                <p className="text-2xl font-bold">{stats.unreadMessages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Tasso Risposta</p>
                <p className="text-2xl font-bold">{stats.responseRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Tempo Medio</p>
                <p className="text-2xl font-bold">{stats.avgResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messaggi</TabsTrigger>
          <TabsTrigger value="unread">Non Letti</TabsTrigger>
          <TabsTrigger value="automation">Automazione</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tutte le Conversazioni</CardTitle>
                  <CardDescription>Gestisci le comunicazioni con membri e trainer</CardDescription>
                </div>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Nuovo Messaggio
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                      conversation.unread ? 'border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{conversation.clientName}</h3>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-secondary px-2 py-1 rounded capitalize">
                        {conversation.type}
                      </span>
                      <Button size="sm" variant="outline">
                        <Reply className="h-4 w-4 mr-1" />
                        Rispondi
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messaggi Non Letti</CardTitle>
              <CardDescription>Messaggi che richiedono attenzione</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.filter(c => c.unread).map((conversation) => (
                  <div key={conversation.id} className="border-l-4 border-l-blue-500 border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{conversation.clientName}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{conversation.lastMessage}</p>
                    <Button size="sm" onClick={onMessagesRead}>
                      <Reply className="h-4 w-4 mr-1" />
                      Rispondi
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <MessageAutomationTab />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Messaggi</CardTitle>
              <CardDescription>Statistiche e metriche delle comunicazioni</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Dettagliate</h3>
                <p className="text-muted-foreground">
                  Visualizzazioni dettagliate delle metriche di comunicazione saranno disponibili presto
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
