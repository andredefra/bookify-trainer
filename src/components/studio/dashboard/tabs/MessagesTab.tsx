import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send } from "lucide-react";
import { useState } from "react";

interface MessagesTabProps {
  onMessagesRead: () => void;
}

export function MessagesTab({ onMessagesRead }: MessagesTabProps) {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);

  const conversations = [
    { id: 1, name: "Sarah Johnson", lastMessage: "Thanks for the workout plan!", unread: true, time: "2m ago" },
    { id: 2, name: "Marco Rossi", lastMessage: "I'll be there tomorrow", unread: true, time: "1h ago" },
    { id: 3, name: "Michael Brown", lastMessage: "Can we reschedule?", unread: false, time: "3h ago" },
    { id: 4, name: "Laura Bianchi", lastMessage: "Session confirmed", unread: false, time: "1d ago" },
  ];

  const messages = [
    { id: 1, sender: "Sarah Johnson", content: "Hi! I loved today's session", time: "10:30 AM", isMe: false },
    { id: 2, sender: "You", content: "Great job! Keep up the good work", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Sarah Johnson", content: "Thanks for the workout plan!", time: "10:35 AM", isMe: false },
  ];

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                    selectedConversation === conv.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">{conv.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread && (
                      <div className="h-2 w-2 bg-primary rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">
              {conversations.find(c => c.id === selectedConversation)?.name || "Select a conversation"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.isMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
