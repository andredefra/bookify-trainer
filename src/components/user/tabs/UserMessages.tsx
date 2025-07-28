import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Bot } from "lucide-react";

export function UserMessages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Chat with your AI trainer</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>Trainer.ai</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-96 overflow-y-auto mb-4">
            <div className="flex space-x-2">
              <Bot className="h-6 w-6 text-primary mt-1" />
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">Hello! I'm your AI trainer. How can I help you today?</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Type your message..." />
            <Button>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}