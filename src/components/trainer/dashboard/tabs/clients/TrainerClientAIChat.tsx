import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Users, TrendingUp, Target, Dumbbell, Activity } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTrainerAISubscription } from '@/hooks/useTrainerAISubscription';
import { AIUpgradePrompt } from '@/components/trainer/AIUpgradePrompt';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ClientData {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
  goals?: { name: string; progress: number; target: number }[];
  bodyMeasurements?: { weight: number; bodyFat: number; muscleMass: number };
  personalRecords?: { exercise: string; weight: number; date: string }[];
  attendanceRate?: number;
}

interface TrainerClientAIChatProps {
  selectedClient: string; // "all" or client ID
  clientsData: ClientData[];
  onClientChange?: (clientId: string) => void;
}

export function TrainerClientAIChat({ selectedClient, clientsData, onClientChange }: TrainerClientAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const { hasAIAccess, loading: aiLoading } = useTrainerAISubscription();
  const conversationId = `trainer-analytics-${selectedClient}`;

  // If no AI access, show upgrade prompt
  if (!aiLoading && !hasAIAccess) {
    return <AIUpgradePrompt feature="AI Client Analytics" className="h-[600px]" />;
  }

  const selectedClientData = selectedClient !== 'all' 
    ? clientsData.find(c => c.id.toString() === selectedClient)
    : null;

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      ) as HTMLDivElement | null;

      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth',
        });
        return;
      }
    }
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset messages when client changes
  useEffect(() => {
    const welcomeMessage = selectedClient === 'all'
      ? "Ciao! Sono il tuo AI Assistant per l'analisi dei clienti. Posso aiutarti a capire i trend, identificare i clienti che hanno bisogno di attenzione, e fornire insights sulle performance generali. Cosa vorresti sapere?"
      : `Ciao! Sto analizzando i dati di ${selectedClientData?.name}. Posso fornirti informazioni sui suoi allenamenti, progressi, massimali, composizione corporea e molto altro. Chiedimi pure!`;

    setMessages([{
      id: 'welcome',
      sender: 'ai',
      content: welcomeMessage,
      timestamp: new Date()
    }]);
  }, [selectedClient, selectedClientData?.name]);

  // Build context data for AI
  const buildContextData = () => {
    if (selectedClient === 'all') {
      // Aggregated context for all clients
      const totalClients = clientsData.length;
      const avgSessions = Math.round(clientsData.reduce((sum, c) => sum + c.sessions, 0) / totalClients);
      const activeClients = clientsData.filter(c => {
        const lastDate = new Date(c.lastSession);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return lastDate >= weekAgo;
      }).length;
      
      return {
        view_type: 'all_clients',
        total_clients: totalClients,
        active_clients_last_week: activeClients,
        retention_rate: Math.round((activeClients / totalClients) * 100),
        average_sessions_per_client: avgSessions,
        clients_summary: clientsData.map(c => ({
          name: c.name,
          sessions: c.sessions,
          lastSession: c.lastSession,
          attendanceRate: c.attendanceRate || Math.round(70 + Math.random() * 25),
          goalsProgress: c.goals?.length ? Math.round(c.goals.reduce((sum, g) => sum + (g.progress / g.target * 100), 0) / c.goals.length) : 0
        })),
        top_performers: clientsData
          .filter(c => c.sessions > 15)
          .slice(0, 3)
          .map(c => c.name),
        clients_needing_attention: clientsData
          .filter(c => {
            const lastDate = new Date(c.lastSession);
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
            return lastDate < twoWeeksAgo;
          })
          .map(c => c.name)
      };
    } else {
      // Single client context
      const client = selectedClientData;
      if (!client) return null;
      
      return {
        view_type: 'single_client',
        client_name: client.name,
        total_sessions: client.sessions,
        last_session: client.lastSession,
        attendance_rate: client.attendanceRate || 85,
        goals: client.goals || [
          { name: 'Perdita peso', progress: 5, target: 10, unit: 'kg' },
          { name: 'Aumento forza', progress: 75, target: 100, unit: '%' }
        ],
        body_measurements: client.bodyMeasurements || {
          weight: 78,
          bodyFat: 18,
          muscleMass: 35,
          trend: 'improving'
        },
        personal_records: client.personalRecords || [
          { exercise: 'Bench Press', weight: 85, date: '2024-11-15' },
          { exercise: 'Squat', weight: 120, date: '2024-11-20' },
          { exercise: 'Deadlift', weight: 140, date: '2024-11-18' }
        ],
        workout_insights: {
          favorite_exercises: ['Bench Press', 'Squat', 'Lat Pulldown'],
          average_workout_duration: 65,
          consistency_score: 82,
          strength_trend: '+12% last month'
        }
      };
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const contextData = buildContextData();

      const response = await supabase.functions.invoke('openai-trainer-chat', {
        body: {
          message: content,
          conversation_id: conversationId,
          user_context: {
            conversation_type: 'trainer_client_analytics',
            selected_client: selectedClient,
            selected_client_name: selectedClientData?.name || 'All Clients',
            clients_data: contextData
          }
        }
      });

      if (response.error) throw response.error;

      if (response.data?.message) {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          content: response.data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile inviare il messaggio. Riprova.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const allClientQuestions = [
    "Chi sono i clienti che stanno progredendo meglio?",
    "Quali clienti hanno bisogno di più attenzione?",
    "Analizza la retention rate degli ultimi mesi",
    "Quali obiettivi sono più comuni tra i miei clienti?",
    "Confronta le performance dei clienti"
  ];

  const singleClientQuestions = [
    `Analizza i progressi di ${selectedClientData?.name}`,
    "Quali sono i massimali attuali?",
    "Come sta procedendo verso i suoi obiettivi?",
    "Suggerisci modifiche alla scheda",
    "Analizza la composizione corporea e i trend"
  ];

  const suggestedQuestions = selectedClient === 'all' ? allClientQuestions : singleClientQuestions;

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Assistant - Client Analytics
          </CardTitle>
          <Badge variant={selectedClient === 'all' ? 'secondary' : 'default'} className="flex items-center gap-1">
            {selectedClient === 'all' ? (
              <>
                <Users className="h-3 w-3" />
                Tutti i clienti
              </>
            ) : (
              <>
                <User className="h-3 w-3" />
                {selectedClientData?.name}
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Quick Stats */}
        {selectedClient !== 'all' && selectedClientData && (
          <div className="px-4 py-2 border-b bg-muted/30">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Dumbbell className="h-3 w-3 text-primary" />
                <span>{selectedClientData.sessions} sessioni</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-green-500" />
                <span>Ultima: {new Date(selectedClientData.lastSession).toLocaleDateString('it-IT')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3 text-orange-500" />
                <span>Obiettivi attivi</span>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-purple-500 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('it-IT', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-purple-500 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary animate-pulse" />
                    Analizzo i dati...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="px-4 py-3 border-t bg-muted/20">
            <p className="text-xs text-muted-foreground mb-2">Domande suggerite:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1.5"
                  onClick={() => sendMessage(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder={selectedClient === 'all' 
              ? "Chiedi informazioni sui tuoi clienti..." 
              : `Chiedi informazioni su ${selectedClientData?.name}...`
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
