
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
  read: boolean;
}

interface MessagesCardProps {
  messages: MessageItem[];
}

export function MessagesCard({ messages }: MessagesCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Messages</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{message.from}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[220px]">
                  {message.preview}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {message.time}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Reply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
