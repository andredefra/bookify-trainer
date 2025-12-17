import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  Dumbbell, 
  Brain,
  Upload,
  Loader2,
  Plus,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { ProgramDocumentUploader } from "./ProgramDocumentUploader";
import { TrainerAIUpgradeDialog } from "@/components/trainer/TrainerAIUpgradeDialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  exercises?: Array<{ name: string; sets: number; reps: string; inDatabase: boolean }>;
}

interface ProgramAIAssistantProps {
  hasAIAccess: boolean;
  onAddExercises: (exercises: Array<{ name: string; sets: number; reps: string }>) => void;
  onClose: () => void;
}

const quickActions = [
  { label: "Consiglia warmup", prompt: "Consigliami 3-4 esercizi di warmup efficaci per una sessione di allenamento" },
  { label: "Esercizi petto", prompt: "Quali sono i migliori esercizi per il petto per un principiante?" },
  { label: "Progressione forza", prompt: "Come dovrei strutturare la progressione dei carichi per un programma di forza?" },
  { label: "Analizza volume", prompt: "Quanto volume settimanale è ottimale per l'ipertrofia muscolare?" },
];

export function ProgramAIAssistant({ hasAIAccess, onAddExercises, onClose }: ProgramAIAssistantProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "upload">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Ciao! Sono il tuo assistente AI per la creazione di programmi. Posso aiutarti con:\n\n• Raccomandazioni esercizi per gruppo muscolare\n• Suggerimenti su set/rep scheme\n• Analisi del volume di allenamento\n• Review di schede esistenti\n\nCome posso aiutarti?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!hasAIAccess) {
      setShowUpgradeDialog(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('openai-trainer-chat', {
        body: {
          message: input.trim(),
          conversationId: 'program-assistant',
          context: 'program_creation',
          systemPrompt: `Sei un esperto di scienze motorie, biomeccanica e fitness. Il tuo ruolo è aiutare i personal trainer a creare programmi di allenamento efficaci.

Competenze:
- Biomeccanica degli esercizi
- Periodizzazione dell'allenamento
- Fisiologia dell'esercizio
- Programmazione per diversi obiettivi (ipertrofia, forza, resistenza)
- Prevenzione infortuni

Quando suggerisci esercizi, formattali così:
ESERCIZIO: Nome Esercizio
SERIE: 3-4
RIPETIZIONI: 8-12

Rispondi sempre in italiano e sii conciso ma informativo.`
        }
      });

      if (response.error) throw response.error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.data?.response || "Mi dispiace, non sono riuscito a generare una risposta."
      };

      // Parse exercises from response if present
      const exerciseRegex = /ESERCIZIO:\s*(.+)\nSERIE:\s*(\d+(?:-\d+)?)\nRIPETIZIONI:\s*(.+)/gi;
      const exercises: Array<{ name: string; sets: number; reps: string; inDatabase: boolean }> = [];
      let match;
      while ((match = exerciseRegex.exec(response.data?.response || "")) !== null) {
        exercises.push({
          name: match[1].trim(),
          sets: parseInt(match[2].split('-')[0]),
          reps: match[3].trim(),
          inDatabase: true // For now, assume all are in database
        });
      }

      if (exercises.length > 0) {
        assistantMessage.exercises = exercises;
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Si è verificato un errore. Per favore riprova."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  const handleAddExercise = (exercise: { name: string; sets: number; reps: string }) => {
    onAddExercises([exercise]);
  };

  const handleDocumentParsed = (exercises: Array<{ name: string; sets: number; reps: string; inDatabase: boolean; similarExercise?: string }>) => {
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Ho analizzato il documento e trovato ${exercises.length} esercizi:`,
      exercises: exercises
    };
    setMessages(prev => [...prev, assistantMessage]);
    setActiveTab("chat");
  };

  if (!hasAIAccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-semibold text-lg mb-2">AI Program Assistant</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Sblocca l'assistente AI per ricevere raccomandazioni smart su esercizi, analisi di schede e molto altro.
        </p>
        <Badge variant="secondary" className="mb-4">AI Plus Required</Badge>
        <Button onClick={() => setShowUpgradeDialog(true)} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Upgrade to AI Plus
        </Button>
        <TrainerAIUpgradeDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-medium">AI Assistant</span>
          <Badge variant="secondary" className="text-xs">AI Plus</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "upload")} className="flex-1 flex flex-col min-h-0">
        <TabsList className="mx-4 mt-3 grid grid-cols-2">
          <TabsTrigger value="chat" className="gap-2 text-xs">
            <Brain className="h-3.5 w-3.5" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2 text-xs">
            <Upload className="h-3.5 w-3.5" />
            Import
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 m-0 p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <div className="py-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.role === "assistant" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">Tu</span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[85%] text-sm",
                      message.role === "assistant"
                        ? "bg-muted"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Exercise suggestions */}
                    {message.exercises && message.exercises.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium opacity-70">Esercizi suggeriti:</p>
                        {message.exercises.map((ex, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between bg-background/50 rounded p-2"
                          >
                            <div className="flex items-center gap-2">
                              {ex.inDatabase ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                              )}
                              <div>
                                <p className="font-medium text-xs">{ex.name}</p>
                                <p className="text-xs opacity-70">{ex.sets}x{ex.reps}</p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0"
                              onClick={() => handleAddExercise(ex)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="w-full mt-2 h-8 text-xs"
                          onClick={() => onAddExercises(message.exercises!.map(e => ({ name: e.name, sets: e.sets, reps: e.reps })))}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Aggiungi tutti
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <p className="text-sm text-muted-foreground">Sto pensando...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Chiedi un consiglio..."
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                disabled={isLoading}
                className="text-sm"
              />
              <Button 
                size="icon" 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="flex-1 m-0 p-4">
          <ProgramDocumentUploader onDocumentParsed={handleDocumentParsed} />
        </TabsContent>
      </Tabs>

      <TrainerAIUpgradeDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog} />
    </div>
  );
}