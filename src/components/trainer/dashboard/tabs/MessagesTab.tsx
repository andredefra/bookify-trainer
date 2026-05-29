
import { MessageSquare, Send, Reply, Settings, UserPlus, UserCheck } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const [activeMessagesTab, setActiveMessagesTab] = useState<string>("messages");

  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [activeContacts, setActiveContacts] = useState<ContactRequest[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Ensure there is always a pending marketplace prospect to demo the flow
  useEffect(() => {
    const raw = localStorage.getItem("trainer-contact-requests");
    const all: ContactRequest[] = raw ? JSON.parse(raw) : [];
    const hasPendingProspect = all.some(
      (r) => r.status === "pending" && r.relationship === "prospect",
    );
    if (!hasPendingProspect) {
      const seed: ContactRequest = {
        id: `seed-prospect-${Date.now()}`,
        trainerId: 0,
        trainerName: "",
        fromName: "Marco Bianchi",
        subject: "Interested in personal training",
        body: "Hi! I found your profile on the marketplace and I'd love to know more about your training approach and availability. Thanks!",
        status: "pending",
        relationship: "prospect",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "trainer-contact-requests",
        JSON.stringify([...all, seed]),
      );
      window.dispatchEvent(new Event("trainer-contact-requests-changed"));
    }
  }, []);


  // Load + watch incoming contact requests (from clients in the marketplace)
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("trainer-contact-requests");
        const all: ContactRequest[] = raw ? JSON.parse(raw) : [];
        setContactRequests(all.filter((r) => r.status === "pending"));
        setActiveContacts(
          all.filter(
            (r) =>
              r.status === "replied" &&
              (r.relationship === "prospect" || r.relationship === "crm"),
          ),
        );
      } catch {
        setContactRequests([]);
        setActiveContacts([]);
      }
    };
    load();
    window.addEventListener("trainer-contact-requests-changed", load);
    return () =>
      window.removeEventListener("trainer-contact-requests-changed", load);
  }, []);

  // Fire a one-time toast per newly-seen pending request
  useEffect(() => {
    if (contactRequests.length === 0) return;
    try {
      const shown: string[] = JSON.parse(
        sessionStorage.getItem("trainer-contact-toasts-shown") ?? "[]",
      );
      const fresh = contactRequests.filter((r) => !shown.includes(r.id));
      if (fresh.length === 0) return;
      fresh.forEach((r) =>
        toast.message(`New message request from ${r.fromName}`, {
          description: r.subject ?? "View it in the Unread tab",
        }),
      );
      sessionStorage.setItem(
        "trainer-contact-toasts-shown",
        JSON.stringify([...shown, ...fresh.map((r) => r.id)]),
      );
    } catch {
      // ignore
    }
  }, [contactRequests]);


  const updateContact = (
    id: string,
    patch: Partial<ContactRequest>,
  ) => {
    const raw = localStorage.getItem("trainer-contact-requests");
    const all: ContactRequest[] = raw ? JSON.parse(raw) : [];
    const updated = all.map((r) => (r.id === id ? { ...r, ...patch } : r));
    localStorage.setItem("trainer-contact-requests", JSON.stringify(updated));
    window.dispatchEvent(new Event("trainer-contact-requests-changed"));
  };

  const handleContactReply = (request: ContactRequest) => {
    updateContact(request.id, {
      status: "replied",
      relationship: request.relationship ?? "prospect",
    });
    setSelectedClient({
      id: Math.floor(Math.random() * 1_000_000),
      name: request.fromName,
    });
    setShowChatDialog(true);
  };

  const handleContactDeny = (request: ContactRequest) => {
    updateContact(request.id, { status: "denied" });
    toast.success(`Denied message from ${request.fromName}`);
  };

  const handleAddToCrm = (request: ContactRequest) => {
    updateContact(request.id, { relationship: "crm" });
    toast.success(`${request.fromName} added to CRM`);
  };

  const handleAddAsClient = (request: ContactRequest) => {
    updateContact(request.id, { relationship: "client" });
    toast.success(`${request.fromName} added as client`);
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
      <Tabs
        value={activeMessagesTab}
        onValueChange={setActiveMessagesTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="unread" className="relative gap-2">
            <span>Unread</span>
            {contactRequests.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                {contactRequests.length}
              </span>
            )}
          </TabsTrigger>
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

                {/* Compact summary banner — full requests live in the Unread tab */}
                {contactRequests.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveMessagesTab("unread")}
                    className="w-full flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-left hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative inline-flex">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive" />
                      </span>
                      <span className="text-sm font-medium">
                        You have {contactRequests.length} new{" "}
                        {contactRequests.length === 1 ? "request" : "requests"}
                      </span>
                    </div>
                    <span className="text-xs text-primary font-medium">
                      View in Unread →
                    </span>
                  </button>
                )}


                {/* Active conversations promoted from marketplace contacts */}
                {activeContacts.map((c) => (
                  <div key={c.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium">{c.fromName}</h3>
                        {c.relationship === "prospect" && (
                          <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                            Prospect
                          </Badge>
                        )}
                        {c.relationship === "crm" && (
                          <Badge className="text-[10px] uppercase tracking-wide">
                            CRM user
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {c.subject ?? "Conversation"}
                      </span>
                    </div>
                    <p className="text-sm mb-3 text-muted-foreground line-clamp-2">
                      {c.body}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedClient({ id: Math.floor(Math.random() * 1_000_000), name: c.fromName });
                          setShowChatDialog(true);
                        }}
                        className="gap-1"
                      >
                        <Reply className="h-4 w-4" />
                        {!isMobile && <span>Message</span>}
                      </Button>
                      {c.relationship === "prospect" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToCrm(c)}
                          className="gap-1"
                        >
                          <UserPlus className="h-4 w-4" />
                          {!isMobile && <span>Add to CRM</span>}
                        </Button>
                      )}
                      {c.relationship === "crm" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddAsClient(c)}
                          className="gap-1"
                        >
                          <UserCheck className="h-4 w-4" />
                          {!isMobile && <span>Add as Client</span>}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

              



              
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
              {contactRequests.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">Requests</h4>
                    <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                      {contactRequests.length}
                    </span>
                  </div>
                  {contactRequests.map((req) => (
                    <ContactRequestCard
                      key={req.id}
                      request={req}
                      onReply={handleContactReply}
                      onDeny={handleContactDeny}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No unread messages</h3>
                  <p className="text-muted-foreground">All messages have been read</p>
                </div>
              )}
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
