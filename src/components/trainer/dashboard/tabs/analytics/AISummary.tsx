import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Send, 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  MessageCircle,
  Sparkles,
  BarChart3,
  Activity
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface TrainerInsight {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
  icon: React.ReactNode;
}

export function AISummary() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Ciao! Sono il tuo assistente AI per l'analisi dei dati. Posso aiutarti a capire le performance dei tuoi clienti, analizzare trend e darti suggerimenti personalizzati. Cosa vorresti sapere oggi?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const insights: TrainerInsight[] = [
    {
      title: 'Performance Clienti',
      value: '+12%',
      trend: 'up',
      description: 'Miglioramento medio nelle ultime 4 settimane',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: 'Tasso di Ritenzione',
      value: '94%',
      trend: 'up',
      description: 'Cliente attivi vs mese precedente',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Obiettivi Raggiunti',
      value: '78%',
      trend: 'stable',
      description: 'Media obiettivi completati questo mese',
      icon: <Target className="h-4 w-4" />
    },
    {
      title: 'Sessioni Completate',
      value: '156',
      trend: 'up',
      description: 'Sessioni totali questa settimana',
      icon: <Calendar className="h-4 w-4" />
    }
  ];

  const quickQuestions = [
    "Mostrami il progresso di Sarah Johnson",
    "Quali clienti hanno bisogno di più attenzione?",
    "Come stanno andando gli obiettivi di peso?",
    "Analizza le tendenze della settimana",
    "Suggerimenti per migliorare le performance"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('sarah') || lowerQuestion.includes('johnson')) {
      return "Sarah Johnson sta facendo ottimi progressi! Ha completato il 94% delle sue sessioni programmate e ha raggiunto il 73% del suo obiettivo di peso target. I suoi workout di forza sono migliorati del 15% nell'ultimo mese. Suggerisco di aumentare leggermente l'intensità cardio per accelerare i risultati.";
    }
    
    if (lowerQuestion.includes('attenzione') || lowerQuestion.includes('aiuto')) {
      return "Basandomi sui dati, Mike Peterson ha saltato 3 sessioni nelle ultime 2 settimane e il suo progresso verso l'obiettivo di peso si è rallentato. Lisa Garcia invece ha plateau nella forza - considera di variare il programma di allenamento. Ti consiglio di contattarli per un check-in motivazionale.";
    }
    
    if (lowerQuestion.includes('peso') || lowerQuestion.includes('obiettivi')) {
      return "Gli obiettivi di peso stanno procedendo bene! Il 78% dei clienti è on-track. Sarah e Elena stanno superando le aspettative, mentre Mike ha bisogno di più supporto nutrizionale. La media di perdita di peso è di 0.8kg/mese - perfettamente nella norma salutare.";
    }
    
    if (lowerQuestion.includes('settimana') || lowerQuestion.includes('tendenze')) {
      return "Questa settimana mostra trend positivi: +12% di aderenza alle sessioni, miglioramento del 8% nelle performance medie, e 3 nuovi personal record raggiunti. L'area che richiede attenzione è il cardio - considera di rendere gli allenamenti più dinamici e coinvolgenti.";
    }
    
    if (lowerQuestion.includes('suggerimenti') || lowerQuestion.includes('migliorare')) {
      return "Ecco i miei suggerimenti per questa settimana: 1) Organizza una sfida di gruppo per aumentare la motivazione, 2) Introduci esercizi funzionali per Mike, 3) Pianifica sessioni di recupero attivo, 4) Considera nutritionist referral per 2 clienti. Vuoi che approfondisca qualche punto?";
    }
    
    return "Ottima domanda! Sto analizzando i tuoi dati per fornirti insights personalizzati. Posso aiutarti con analisi dettagliate su performance clienti, trend di progresso, raccomandazioni sui programmi di allenamento e strategie di motivazione. Cosa ti interessa di più approfondire?";
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {insight.icon}
                    <span className="text-sm font-medium text-muted-foreground">
                      {insight.title}
                    </span>
                  </div>
                  <span className="text-lg">{getTrendIcon(insight.trend)}</span>
                </div>
                <div className="space-y-1">
                  <div className={`text-2xl font-bold ${getTrendColor(insight.trend)}`}>
                    {insight.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Assistant - Analisi Dati Personalizzata
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <ScrollArea className="h-80 w-full p-4 border rounded-lg bg-muted/30" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('it-IT', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background border shadow-sm p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                      <span className="text-sm text-muted-foreground">AI sta analizzando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Domande frequenti
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder="Chiedi qualsiasi cosa sui tuoi dati..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              Analisi Settimanale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sessioni Completate</span>
                <span className="font-semibold">156/160</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Nuovi PR (Personal Record)</span>
                <span className="font-semibold text-green-600">+3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Aderenza Media</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Soddisfazione Clienti</span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              Raccomandazioni AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-medium text-blue-800">Focus su Mike Peterson</p>
                <p className="text-xs text-blue-600">Aumenta il supporto motivazionale</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-medium text-green-800">Sarah in ottima forma</p>
                <p className="text-xs text-green-600">Considera obiettivi più sfidanti</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <p className="text-sm font-medium text-amber-800">Pianifica recupero attivo</p>
                <p className="text-xs text-amber-600">Per prevenire overtraining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}