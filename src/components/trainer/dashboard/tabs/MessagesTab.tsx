import { MessageSquare, Send, Reply } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SendMessageDialog } from "./messages/SendMessageDialog";
import { ClientChatDialog } from "./messages/ClientChatDialog";
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
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communication with clients and inquiries</CardDescription>
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
                    ? "You're currently online. When you set your status to 'In Session' or 'Offline', your AI assistant will automatically handle client inquiries about scheduling sessions and training program questions using OpenAI's scientific knowledge."
                    : "Your AI assistant is actively handling client inquiries while you're unavailable. It can schedule sessions and answer program questions based on OpenAI's scientific knowledge."}
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
              <div className="flex space-x-2">
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
    </Card>
  );
}
