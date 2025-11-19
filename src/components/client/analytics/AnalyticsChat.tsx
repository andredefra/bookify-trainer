import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User, BarChart3, TrendingUp } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { AnalyticsStats } from './types';

interface AnalyticsChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AnalyticsChatProps {
  analyticsStats: AnalyticsStats | null;
  progressData: any[];
}

export function AnalyticsChat({ analyticsStats, progressData }: AnalyticsChatProps) {
  const [messages, setMessages] = useState<AnalyticsChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const conversationId = 'main-chat'; // Shared conversation ID

  const scrollToBottom = () => {
    // Scroll only the ScrollArea viewport, not the entire page
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

    // Fallback: use scrollIntoView with 'nearest' to avoid page scroll
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation history on mount
  useEffect(() => {
    loadConversationHistory();
  }, []);

  const loadConversationHistory = async () => {
    try {
      const { data } = await supabase
        .from('user_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (data && data.length > 0) {
        const loadedMessages = data.map(msg => ({
          id: msg.id,
          sender: msg.sender as 'user' | 'ai',
          content: msg.content || '',
          timestamp: new Date(msg.created_at)
        }));
        setMessages(loadedMessages);
      } else {
        // Show welcome message if no history
        const welcomeMessage = {
          id: '1',
          sender: 'ai' as const,
          content: "Hi! I'm your AI assistant. I can help you understand your fitness data, create training programs, and provide personalized insights. I remember our previous conversations, so feel free to ask anything!",
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !analyticsStats) return;

    const userMessage: AnalyticsChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare analytics context for AI
      const analyticsContext = {
        totalWorkouts: analyticsStats.totalWorkouts,
        weeklyAverage: analyticsStats.weeklyAverage,
        currentStreak: analyticsStats.currentStreak,
        longestStreak: analyticsStats.longestStreak,
        totalMinutes: analyticsStats.totalMinutes,
        totalCaloriesBurned: analyticsStats.totalCaloriesBurned,
        avgStepsPerDay: analyticsStats.avgStepsPerDay,
        avgCaloriesPerDay: analyticsStats.avgCaloriesPerDay,
        averageIntensity: analyticsStats.averageIntensity,
        recentWorkouts: progressData.slice(-10), // Last 10 workouts
        totalProgress: progressData.length
      };

      const response = await supabase.functions.invoke('openai-trainer-chat', {
        body: {
          message: content,
          conversation_id: conversationId,
          user_context: {
            analytics_data: analyticsContext,
            conversation_type: 'analytics_consultation',
            request_type: 'analytics_insight',
            progress_data: progressData
          }
        }
      });

      if (response.error) throw response.error;

      if (response.data?.message) {
        const aiMessage: AnalyticsChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          content: response.data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }

    } catch (error) {
      console.error('Error sending analytics message:', error);
      toast({
        title: 'Error',
        description: 'Unable to send message. Please try again.',
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

  const suggestedQuestions = [
    "Analyze my recent workout performance",
    "What trends do you see in my progress?",
    "How can I improve my consistency?",
    "Create a training program based on my analytics",
    "Modify my current training program"
  ];

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          Analytics AI Assistant
          <BarChart3 className="h-4 w-4 text-muted-foreground ml-auto" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {isLoadingHistory ? (
              <div className="flex justify-center py-8">
                <div className="text-muted-foreground">Loading conversation...</div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('en-US', {
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
              ))
            )}
            
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    Analyzing your data...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-1">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
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
            placeholder="Ask about your analytics data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || !analyticsStats}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim() || !analyticsStats}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}