
import { MessageSquare, Send, Reply, Settings } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { SendMessageDialog } from "./messages/SendMessageDialog";
import { ClientChatDialog } from "./messages/ClientChatDialog";
import { MessageAutomationTab } from "@/components/common/MessageAutomationTab";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  ContactRequestCard,
  type ContactRequest,
} from "./messages/ContactRequestCard";
import { toast } from "sonner";

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
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Load + watch incoming contact requests (from clients in the marketplace)
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("trainer-contact-requests");
        const all: ContactRequest[] = raw ? JSON.parse(raw) : [];
        setContactRequests(all.filter((r) => r.status === "pending"));
      } catch {
        setContactRequests([]);
      }
    };
    load();
    window.addEventListener("trainer-contact-requests-changed", load);
    return () =>
      window.removeEventListener("trainer-contact-requests-changed", load);
  }, []);

  const updateContactStatus = (
    id: string,
    status: ContactRequest["status"],
  ) => {
    const raw = localStorage.getItem("trainer-contact-requests");
    const all: ContactRequest[] = raw ? JSON.parse(raw) : [];
    const updated = all.map((r) => (r.id === id ? { ...r, status } : r));
    localStorage.setItem("trainer-contact-requests", JSON.stringify(updated));
    window.dispatchEvent(new Event("trainer-contact-requests-changed"));
  };

  const handleContactReply = (request: ContactRequest) => {
    updateContactStatus(request.id, "replied");
    setSelectedClient({
      id: Math.floor(Math.random() * 1_000_000),
      name: request.fromName,
    });
    setShowChatDialog(true);
  };

  const handleContactDeny = (request: ContactRequest) => {
    updateContactStatus(request.id, "denied");
    toast.success(`Denied message from ${request.fromName}`);
  };

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
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>All Messages</CardTitle>
                  <CardDescription>Communication with clients and requests</CardDescription>
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
                  <span>Send Message</span>
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
                      <p className="text-yellow-800 font-medium">AI Assistant Status</p>
                      <p className="text-yellow-700 mt-1">
                        {trainerStatus === "online" 
                          ? "You are currently online. When you set your status to 'In Session' or 'Offline', your AI assistant will automatically handle client requests for session scheduling and training program questions using OpenAI's scientific knowledge."
                          : "Your AI assistant is actively handling client requests while you are unavailable. It can schedule sessions and answer program questions based on OpenAI's scientific knowledge."}
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
                        {!isMobile && <span>Reply</span>}
                      </Button>
                      <Button variant="outline" size="sm">Mark as Read</Button>
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
              <CardTitle>Unread Messages</CardTitle>
              <CardDescription>Messages requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No unread messages</h3>
                <p className="text-muted-foreground">All messages have been read</p>
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
              <CardTitle>Archived Messages</CardTitle>
              <CardDescription>Archived and completed conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No archived messages</h3>
                <p className="text-muted-foreground">Archived messages will appear here</p>
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
