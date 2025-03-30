
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { Circle, Paperclip } from "lucide-react";
import { getTrainerById } from "@/data/trainerMockData";
import { useState } from "react";
import { ChatDialog } from "@/components/trainer/ChatDialog";

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
  read: boolean;
  trainerId?: string; // Add trainerId to fetch status
  hasAttachments?: boolean;
}

interface MessagesTabProps {
  messages: MessageItem[];
}

export function MessagesTab({ messages }: MessagesTabProps) {
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");

  // Function to get trainer status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online":
        return "bg-emerald-500";
      case "in-session":
        return "bg-amber-500";
      default:
        return "bg-slate-500";
    }
  };

  // Function to get trainer status text
  const getStatusText = (status: string) => {
    switch(status) {
      case "online":
        return "Available";
      case "in-session":
        return "In Session";
      default:
        return "Offline";
    }
  };

  // Mock conversation for the AI chat dialog
  const mockConversation = [
    { 
      sender: "client" as const, 
      message: "Hi Sarah, is our session still scheduled for tomorrow?",
      time: "10:30 AM"
    },
    {
      sender: "ai" as const,
      message: "Hello! This is Sarah's AI assistant. Sarah is currently in a training session. Yes, your session is confirmed for tomorrow at 3:00 PM. Is there anything else I can help with?",
      time: "10:32 AM"
    }
  ];

  const handleOpenChat = (trainerName: string, trainerStatus: string) => {
    if (trainerStatus === "in-session") {
      setSelectedTrainer(trainerName);
      setShowChatDialog(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communicate with your trainers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => {
            // Get trainer status based on the name
            let trainerStatus = "offline";
            if (message.trainerId) {
              const trainerData = getTrainerById(message.trainerId);
              trainerStatus = trainerData?.status || "offline";
            } else {
              // Fallback to match by name for demo purposes
              if (message.from === "Sarah Johnson") {
                trainerStatus = "in-session";
              } else if (message.from === "Alex Thompson") {
                trainerStatus = "online";
              }
            }
            
            return (
              <div key={message.id} className={`border rounded-lg p-4 ${!message.read ? 'bg-primary/5 border-primary/20' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                      {message.from.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{message.from}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`flex items-center gap-1.5 px-2 py-0.5 mt-1 ${getStatusColor(trainerStatus)} text-white text-xs`}
                      >
                        <Circle className="h-2 w-2 fill-white text-white" />
                        <span className="text-xs font-medium">{getStatusText(trainerStatus)}</span>
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <p className="text-sm mb-3">
                  {message.preview}
                  {message.hasAttachments && (
                    <Badge variant="outline" className="ml-2 flex items-center gap-1 text-xs">
                      <Paperclip className="h-3 w-3" />
                      Attachments
                    </Badge>
                  )}
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleOpenChat(message.from, trainerStatus)}
                  >
                    {trainerStatus === "in-session" ? "Message AI Assistant" : "Reply"}
                  </Button>
                  {!message.read && (
                    <Button variant="outline" size="sm">Mark as Read</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* AI Chat Dialog */}
      <ChatDialog
        open={showChatDialog}
        onOpenChange={setShowChatDialog}
        trainerName={selectedTrainer}
        conversation={mockConversation}
      />
    </Card>
  );
}
