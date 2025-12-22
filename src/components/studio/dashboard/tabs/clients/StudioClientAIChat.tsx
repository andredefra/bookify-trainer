import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Send, User, Users, TrendingUp, Target, Dumbbell, Activity, Building2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTrainerAISubscription } from '@/hooks/useTrainerAISubscription';
import { AIUpgradePrompt } from '@/components/trainer/AIUpgradePrompt';
import { StudioClient } from './StudioClientCard';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Trainer {
  id: string;
  name: string;
}

interface StudioClientAIChatProps {
  clients: StudioClient[];
  trainers: Trainer[];
}

export function StudioClientAIChat({ clients, trainers }: StudioClientAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const { hasAIAccess, loading: aiLoading } = useTrainerAISubscription();

  // If no AI access, show upgrade prompt
  if (!aiLoading && !hasAIAccess) {
    return <AIUpgradePrompt feature="AI Studio Analytics" className="h-[600px]" />;
  }

  // Filter clients by selected trainer
  const filteredClients = selectedTrainer === 'all' 
    ? clients 
    : clients.filter(c => c.trainerId === selectedTrainer);

  const selectedClientData = selectedClient !== 'all'
    ? clients.find(c => c.id === selectedClient)
    : null;

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      ) as HTMLDivElement | null;

      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
        return;
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset messages when selection changes
  useEffect(() => {
    let welcomeMessage = "";
    
    if (selectedClient === 'all' && selectedTrainer === 'all') {
      welcomeMessage = "Ciao! Sono il tuo AI Assistant per l'analisi dello studio. Posso aiutarti a capire le performance dei trainer, identificare trend tra i clienti, e fornire insights aggregati. Cosa vorresti sapere?";
    } else if (selectedClient === 'all') {
      const trainer = trainers.find(t => t.id === selectedTrainer);
      welcomeMessage = `Sto analizzando i clienti di ${trainer?.name}. Posso fornirti informazioni sulle loro performance, progressi e suggerimenti per migliorare i risultati.`;
    } else {
      welcomeMessage = `Sto analizzando i dati di ${selectedClientData?.name}. Posso fornirti informazioni sui suoi allenamenti, progressi, massimali e molto altro.`;
    }

    setMessages([{
      id: 'welcome',
      sender: 'ai',
      content: welcomeMessage,
      timestamp: new Date()
    }]);
  }, [selectedClient, selectedTrainer]);

  // Build context data for AI
  const buildContextData = () => {
    const trainerStats = trainers.map(t => {
      const trainerClients = clients.filter(c => c.trainerId === t.id);
      return {
        name: t.name,
        totalClients: trainerClients.length,
        activeClients: trainerClients.filter(c => c.status === 'active').length,
        avgSessions: Math.round(trainerClients.reduce((sum, c) => sum + c.sessions, 0) / trainerClients.length) || 0
      };
    });

    if (selectedClient !== 'all' && selectedClientData) {
      return {
        view_type: 'single_client',
        client_name: selectedClientData.name,
        trainer_name: selectedClientData.trainerName,
        total_sessions: selectedClientData.sessions,
        status: selectedClientData.status,
        active_goals: selectedClientData.activeGoals || 0,
        active_programs: selectedClientData.activePrograms || 0,
        active_packages: selectedClientData.activePackages || 0,
      };
    }

    if (selectedTrainer !== 'all') {
      const trainer = trainers.find(t => t.id === selectedTrainer);
      const trainerClients = clients.filter(c => c.trainerId === selectedTrainer);
      return {
        view_type: 'single_trainer',
        trainer_name: trainer?.name,
        total_clients: trainerClients.length,
        active_clients: trainerClients.filter(c => c.status === 'active').length,
        clients_summary: trainerClients.map(c => ({
          name: c.name,
          sessions: c.sessions,
          status: c.status,
          activeGoals: c.activeGoals || 0
        }))
      };
    }

    return {
      view_type: 'studio_overview',
      total_clients: clients.length,
      active_clients: clients.filter(c => c.status === 'active').length,
      total_trainers: trainers.length,
      trainer_stats: trainerStats,
      top_performers: clients.filter(c => c.sessions > 15).slice(0, 5).map(c => ({
        name: c.name,
        trainer: c.trainerName,
        sessions: c.sessions
      })),
      clients_needing_attention: clients.filter(c => c.status === 'inactive' || (c.sessionsLeft && c.sessionsLeft < 3)).map(c => ({
        name: c.name,
        trainer: c.trainerName,
        issue: c.status === 'inactive' ? 'Inactive' : 'Low sessions remaining'
      }))
    };
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
          conversation_id: `studio-analytics-${selectedTrainer}-${selectedClient}`,
          user_context: {
            conversation_type: 'studio_client_analytics',
            selected_client: selectedClient,
            selected_trainer: selectedTrainer,
            data: contextData
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

  // Suggested questions based on context
  const getSuggestedQuestions = () => {
    if (selectedClient !== 'all') {
      return [
        `Analizza i progressi di ${selectedClientData?.name}`,
        "Quali sono i massimali attuali?",
        "Come sta procedendo verso i suoi obiettivi?",
        "Suggerisci modifiche al programma",
      ];
    }
    
    if (selectedTrainer !== 'all') {
      const trainer = trainers.find(t => t.id === selectedTrainer);
      return [
        `Come stanno andando i clienti di ${trainer?.name}?`,
        "Quali clienti hanno bisogno di attenzione?",
        "Analizza la retention rate",
        "Confronta le performance dei clienti",
      ];
    }

    return [
      "Quali trainer hanno i migliori risultati?",
      "Analizza la retention rate per trainer",
      "Quali clienti hanno bisogno di riassegnazione?",
      "Confronta le performance tra trainer",
      "Chi sono i clienti più attivi?",
    ];
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Assistant - Studio Analytics
          </CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            Studio Mode
          </Badge>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 mt-3">
          <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Trainers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trainers</SelectItem>
              {trainers.map(t => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {filteredClients.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Quick Stats */}
        {selectedClient !== 'all' && selectedClientData && (
          <div className="px-4 py-2 border-b bg-muted/30">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Dumbbell className="h-3 w-3 text-primary" />
                <span>{selectedClientData.sessions} sessions</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-muted-foreground" />
                <span>Trainer: {selectedClientData.trainerName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3 text-orange-500" />
                <span>{selectedClientData.activeGoals || 0} goals</span>
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
              {getSuggestedQuestions().map((question, index) => (
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
            placeholder="Chiedi informazioni sui clienti dello studio..."
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
