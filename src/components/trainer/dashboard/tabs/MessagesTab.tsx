
import { MessageSquare } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communication with clients and inquiries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <MessageSquare className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-yellow-800 font-medium">AI Assistant Functionality</p>
                <p className="text-yellow-700 mt-1">
                  In the full version, your AI assistant can handle client inquiries when you're unavailable or in a session.
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
                <Button size="sm">Reply</Button>
                <Button variant="outline" size="sm">Mark as Read</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
