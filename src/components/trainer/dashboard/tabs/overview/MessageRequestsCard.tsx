
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
}

interface MessageRequestsCardProps {
  messages: MessageItem[];
}

export function MessageRequestsCard({ messages }: MessageRequestsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Message Requests</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center justify-between">
              <div className="flex-1 min-w-0 mr-2">
                <div className="font-medium">{message.from}</div>
                <div className="text-xs text-muted-foreground truncate max-w-full">
                  {message.preview}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {message.time}
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                Reply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
