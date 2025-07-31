import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Loader2, User, MessageSquare, Mic, Plus, Settings } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai' | 'trainer';
  content?: string;
  message_type: 'text' | 'image' | 'video' | 'file' | 'audio';
  media_url?: string;
  file_name?: string;
  created_at: string;
  trainer_name?: string;
  function_call?: any;
}

interface Conversation {
  id: string;
  type: 'ai' | 'trainer';
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  trainer_id?: string;
}

export function UserMessages() {
  const [conversations] = useState<Conversation[]>([
    {
      id: 'ai-trainer',
      type: 'ai',
      name: 'AI Trainer',
      status: 'online',
      last_message: 'Ciao! Come posso aiutarti oggi?',
      last_message_time: new Date().toISOString(),
      unread_count: 0
    }
  ]);
  
  const [activeConversation, setActiveConversation] = useState('ai-trainer');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadMessages(activeConversation);
  }, [activeConversation]);

  const loadMessages = async (conversationId: string) => {
    try {
      const { data } = await supabase
        .from('user_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (data) {
        // Type cast the data to match our Message interface
        const typedMessages: Message[] = data.map(msg => ({
          ...msg,
          sender: msg.sender as 'user' | 'ai' | 'trainer',
          message_type: msg.message_type as 'text' | 'image' | 'video' | 'file' | 'audio'
        }));
        setMessages(typedMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const activeConv = conversations.find(c => c.id === activeConversation);
    if (!activeConv) return;

    setIsLoading(true);
    setIsTyping(true);

    try {
      // Add user message to UI immediately
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        conversation_id: activeConversation,
        sender: 'user',
        content,
        message_type: 'text',
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, userMessage]);

      if (activeConv.type === 'ai') {
        // Send to AI trainer
        const response = await supabase.functions.invoke('openai-trainer-chat', {
          body: {
            message: content,
            conversation_id: activeConversation,
            user_context: {
              // Add user context for better responses
              has_active_program: true,
              fitness_level: 'intermediate',
              goals: ['weight_loss', 'strength_building']
            }
          }
        });

        if (response.error) throw response.error;

        // Add AI response to UI
        if (response.data?.message) {
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            conversation_id: activeConversation,
            sender: 'ai',
            content: response.data.message,
            message_type: 'text',
            created_at: new Date().toISOString(),
            function_call: response.data.function_call
          };
          setMessages(prev => [...prev.slice(0, -1), userMessage, aiMessage]); // Replace temp message with real ones

          // Show success toast for function calls
          if (response.data.function_call) {
            toast({
              title: '✅ Azione completata',
              description: response.data.function_call.result || 'Operazione eseguita con successo'
            });
          }
        }

      } else {
        // Send to human trainer (future implementation)
        toast({
          title: 'Funzionalità in arrivo',
          description: 'La chat con trainer umani sarà disponibile presto!'
        });
      }

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
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const getConversationIcon = (conversation: Conversation) => {
    if (conversation.type === 'ai') {
      return <Bot className="h-5 w-5" />;
    }
    return <User className="h-5 w-5" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <div key={message.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
        <Avatar className="h-8 w-8">
          {!isUser ? (
            message.sender === 'ai' ? (
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            ) : (
              <AvatarFallback>
                {message.trainer_name?.[0] || 'T'}
              </AvatarFallback>
            )
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground">
              U
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            
            {/* Function call results */}
            {message.function_call && (
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                  🔧 Azione: {message.function_call.name}
                </p>
                {message.function_call.result && (
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    {message.function_call.result}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <span className="text-xs text-muted-foreground mt-1 px-2">
            {new Date(message.created_at).toLocaleTimeString('it-IT', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Messaggi</h1>
          <p className="text-muted-foreground">Chatta con i tuoi trainer</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Nuovo Trainer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
        {/* Conversations Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversazioni</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-4">
                {conversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant={activeConversation === conversation.id ? "secondary" : "ghost"}
                    className="w-full justify-start p-3 h-auto"
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>
                            {getConversationIcon(conversation)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(conversation.status)}`} />
                      </div>
                      
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{conversation.name}</p>
                          {conversation.unread_count > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {conversation.unread_count}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.last_message}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {getConversationIcon(conversations.find(c => c.id === activeConversation)!)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {conversations.find(c => c.id === activeConversation)?.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {conversations.find(c => c.id === activeConversation)?.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={voiceMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVoiceMode(!voiceMode)}
                  className="gap-2"
                >
                  <Mic className="h-4 w-4" />
                  {voiceMode ? 'Voice ON' : 'Voice'}
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Inizia una conversazione!</p>
                    <p className="text-sm mt-2">Chiedi consigli su allenamento, nutrizione o i tuoi obiettivi.</p>
                  </div>
                )}
                
                {messages.map(renderMessage)}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="bg-muted rounded-2xl px-4 py-3 max-w-xs">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="border-t p-4">
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
    </div>
  );
}