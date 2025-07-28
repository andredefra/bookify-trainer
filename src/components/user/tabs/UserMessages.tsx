import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MessageBubble } from '../chat/MessageBubble';
import { VoiceInterface } from '../chat/VoiceInterface';
import { FileUpload } from '../chat/FileUpload';

interface Message {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai';
  content?: string;
  message_type: 'text' | 'image' | 'video' | 'file' | 'audio';
  media_url?: string;
  file_name?: string;
  created_at: string;
}

export function UserMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const conversationId = 'default-conversation';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    loadMessages();
    setupRealtimeSubscription();
  }, []);

  const loadMessages = async () => {
    try {
      // Start with empty messages for now, will load from database once types are updated
      setMessages([]);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('user-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (content: string, type: 'text' | 'image' | 'video' | 'file' | 'audio' = 'text', mediaUrl?: string, fileName?: string) => {
    if (!content.trim() && !mediaUrl) return;

    setIsLoading(true);
    try {
      const response = await supabase.functions.invoke('openai-chat', {
        body: {
          message: content,
          conversation_id: conversationId,
          message_type: type,
          media_url: mediaUrl,
          file_name: fileName
        }
      });

      if (response.error) throw response.error;

      setInput('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile inviare il messaggio',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleFileSelect = (file: File, url: string) => {
    const getMessageType = (file: File): 'image' | 'video' | 'audio' | 'file' => {
      if (file.type.startsWith('image/')) return 'image';
      if (file.type.startsWith('video/')) return 'video';
      if (file.type.startsWith('audio/')) return 'audio';
      return 'file';
    };

    const messageType = getMessageType(file);
    const content = messageType === 'image' ? 'Ha condiviso un\'immagine' :
                   messageType === 'video' ? 'Ha condiviso un video' :
                   messageType === 'audio' ? 'Ha condiviso un audio' :
                   `Ha condiviso il file: ${file.name}`;

    sendMessage(content, messageType, url, file.name);
  };

  const handleSpeakingChange = (speaking: boolean) => {
    setIsSpeaking(speaking);
  };

  const handleTranscript = (text: string, isComplete: boolean) => {
    if (isComplete) {
      if (text.trim()) {
        sendMessage(text);
      }
      setCurrentTranscript('');
    } else {
      setCurrentTranscript(text);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Messaggi</h1>
          <p className="text-muted-foreground">Chatta con il tuo AI trainer</p>
        </div>
        <VoiceInterface 
          onSpeakingChange={handleSpeakingChange}
          onTranscript={handleTranscript}
        />
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Trainer</span>
            {isSpeaking && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                Sta parlando...
              </div>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Ciao! Sono il tuo AI trainer. Come posso aiutarti oggi?</p>
                  <p className="text-sm mt-2">Puoi scrivere, inviare file o usare la chat vocale!</p>
                </div>
              )}
              
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <div className="bg-muted rounded-2xl px-4 py-2 max-w-xs">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentTranscript && (
                <div className="flex gap-3 flex-row-reverse">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="bg-primary/20 rounded-2xl px-4 py-2 max-w-xs border-2 border-dashed border-primary/40">
                      <p className="text-sm text-primary font-medium">{currentTranscript}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-2">Trascrizione in corso...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="border-t p-4 space-y-3">
            <FileUpload 
              onFileSelect={handleFileSelect}
              disabled={isLoading}
            />
            
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi un messaggio..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || (!input.trim())}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}