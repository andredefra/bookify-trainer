import { BaseWidget } from "./BaseWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Send } from "lucide-react";
import { Message } from "./types";

export function MessagesWidget() {
  const messages: Message[] = [
    {
      id: "1",
      from: "Marco Rossi",
      preview: "Hi, can we reschedule tomorrow's session?",
      time: "10 min ago",
      isRead: false,
      isUrgent: true
    },
    {
      id: "2",
      from: "Anna Bianchi",
      preview: "Thanks for the new program! I'm excited to start.",
      time: "1h ago",
      isRead: false,
      isUrgent: false
    },
    {
      id: "3",
      from: "Luca Verdi",
      preview: "Quick question about the diet plan...",
      time: "3h ago",
      isRead: true,
      isUrgent: false
    }
  ];

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <BaseWidget
      title="Messages"
      icon={MessageSquare}
      className="col-span-full lg:col-span-1"
      action={
        <Badge variant="destructive">{unreadCount} new</Badge>
      }
    >
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg border transition-colors ${
              message.isRead 
                ? 'bg-card hover:bg-accent/50' 
                : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {message.from.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{message.from}</p>
                  {message.isUrgent && (
                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {message.preview}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Send className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-2">
          View All Messages
        </Button>
      </div>
    </BaseWidget>
  );
}
