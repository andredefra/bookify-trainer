
import { MessageSquare } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
