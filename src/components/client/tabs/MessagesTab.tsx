
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
  read: boolean;
}

interface MessagesTabProps {
  messages: MessageItem[];
}

export function MessagesTab({ messages }: MessagesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communicate with your trainers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`border rounded-lg p-4 ${!message.read ? 'bg-primary/5 border-primary/20' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                    {message.from.charAt(0)}
                  </div>
                  <h3 className="font-medium">{message.from}</h3>
                </div>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm mb-3">{message.preview}</p>
              <div className="flex space-x-2">
                <Button size="sm">Reply</Button>
                {!message.read && (
                  <Button variant="outline" size="sm">Mark as Read</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
