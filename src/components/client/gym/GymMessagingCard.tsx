import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Send, Building2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { GymCommunication } from "@/hooks/useGymConnection";

interface GymMessagingCardProps {
  gymId?: string;
  communications: GymCommunication[];
  onNewMessage?: () => void;
}

export function GymMessagingCard({ gymId, communications, onNewMessage }: GymMessagingCardProps) {
  console.log('🔍 GymMessagingCard START - gymId:', gymId, 'communications:', communications?.length || 0);
  
  const [isComposing, setIsComposing] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message",
        variant: "destructive",
      });
      return;
    }

    try {
      setSending(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('gym_client_communications')
        .insert({
          gym_id: gymId || '11111111-1111-1111-1111-111111111111',
          client_id: user.id,
          subject: subject.trim(),
          message: message.trim(),
          sender_type: 'client',
          message_type: 'general'
        });

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "Your message has been sent to the gym",
      });

      setSubject("");
      setMessage("");
      setIsComposing(false);
      
      if (onNewMessage) {
        onNewMessage();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to Send",
        description: "Unable to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Gym Communication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsComposing(!isComposing)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>

        {/* Compose Message */}
        {isComposing && (
          <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
            <Input
              placeholder="Message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleSendMessage}
                disabled={sending || !subject.trim() || !message.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                {sending ? 'Sending...' : 'Send'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setIsComposing(false);
                  setSubject("");
                  setMessage("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Recent Communications */}
        {communications.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Recent Messages</h4>
              {communications.slice(0, 5).map((comm) => (
                <div key={comm.id} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comm.subject}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comm.sent_at), 'dd MMM')}
                        </span>
                        {!comm.is_read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {comm.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          From: {comm.sender_type === 'gym' ? 'Gym' : 'You'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {communications.length === 0 && !isComposing && (
          <div className="text-center py-6 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No messages yet</p>
            <p className="text-xs">Start a conversation with your gym</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}