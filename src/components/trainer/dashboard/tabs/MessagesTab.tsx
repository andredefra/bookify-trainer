
import { MessageSquare, Send, Reply, Settings } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { SendMessageDialog } from "./messages/SendMessageDialog";
import { ClientChatDialog } from "./messages/ClientChatDialog";
import { MessageAutomationTab } from "@/components/common/MessageAutomationTab";
import { useMediaQuery } from "@/hooks/use-mobile";

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
}

interface MessagesTabProps {
  messageRequests: MessageItem[];
}

export function MessagesTab({ messageRequests }: MessagesTabProps) {
  const [trainerStatus, setTrainerStatus] = useState<string>("online");
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{ id: number; name: string } | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Listen for status changes
  useEffect(() => {
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus) {
      setTrainerStatus(savedStatus);
    }
    
    // Listen for status change events
    const handleStatusChange = (event: CustomEvent) => {
      setTrainerStatus(event.detail);
    };
    
    window.addEventListener('trainer-status-change', handleStatusChange as EventListener);
    
    return () => {
      window.removeEventListener('trainer-status-change', handleStatusChange as EventListener);
    };
  }, []);
  
  // Extract client names from messages for the dialog
  const clients = messageRequests.map(msg => ({
    id: msg.id,
    name: msg.from
  }));
  
  const handleOpenChat = (client: { id: number; name: string }) => {
    setSelectedClient(client);
    setShowChatDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messaggi</TabsTrigger>
          <TabsTrigger value="unread">Non Letti</TabsTrigger>
          <TabsTrigger value="automation">Automazione</TabsTrigger>
          <TabsTrigger value="archived">Archiviati</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Tutti i Messaggi</CardTitle>
                  <CardDescription>Comunicazione con clienti e richieste</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedClient(null);
                    setShowSendDialog(true);
                  }}
                  size="sm"
                  className="flex items-center gap-1.5 self-start"
                >
                  <Send className="h-4 w-4" />
                  <span>Invia Messaggio</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <MessageSquare className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-yellow-800 font-medium">Stato Assistente AI</p>
                      <p className="text-yellow-700 mt-1">
                        {trainerStatus === "online" 
                          ? "Sei attualmente online. Quando imposti il tuo stato su 'In Sessione' o 'Offline', il tuo assistente AI gestirà automaticamente le richieste dei clienti sulla programmazione delle sessioni e domande sui programmi di allenamento utilizzando le conoscenze scientifiche di OpenAI."
                          : "Il tuo assistente AI sta gestendo attivamente le richieste dei clienti mentre non sei disponibile. Può programmare sessioni e rispondere a domande sui programmi basandosi sulle conoscenze scientifiche di OpenAI."}
                      </p>
                    </div>
                  </div>
                </div>
              
                {messageRequests.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{message.from}</h3>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm mb-3">{message.preview}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleOpenChat({ id: message.id, name: message.from })}
                        className="gap-1"
                      >
                        <Reply className="h-4 w-4" />
                        {!isMobile && <span>Rispondi</span>}
                      </Button>
                      <Button variant="outline" size="sm">Segna come Letto</Button>
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
              <CardDescription>Messaggi che richiedono la tua attenzione</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nessun messaggio non letto</h3>
                <p className="text-muted-foreground">Tutti i messaggi sono stati letti</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <MessageAutomationTab />
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messaggi Archiviati</CardTitle>
              <CardDescription>Conversazioni archiviate e completate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nessun messaggio archiviato</h3>
                <p className="text-muted-foreground">I messaggi archiviati appariranno qui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Send Message Dialog */}
      <SendMessageDialog 
        open={showSendDialog} 
        onOpenChange={setShowSendDialog}
        clients={clients}
        preselectedClient={selectedClient}
      />
      
      {/* Chat Dialog */}
      <ClientChatDialog
        open={showChatDialog}
        onOpenChange={setShowChatDialog}
        client={selectedClient}
      />
    </div>
  );
}
