import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, Loader2, Image as ImageIcon, Video } from "lucide-react";
import { useAIAccess } from "@/hooks/useAIAccess";
import { useClientSubscription } from "@/hooks/useClientSubscription";
import { ClientUpgradeDialog } from "../tabs/settings/ClientUpgradeDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  timestamp: Date;
}

interface WorkoutContext {
  program?: string;
  session?: any;
  exercises?: any[];
  workoutName?: string;
  isLogging?: boolean;
}

interface WorkoutAIAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workoutContext: WorkoutContext;
}

export function WorkoutAIAssistant({ open, onOpenChange, workoutContext }: WorkoutAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { checkAIAccess, trackAIUsage, isPro, monthlyUsage } = useAIAccess();
  const { upgradeToProViaMock } = useClientSubscription();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `chat-media/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('chat-media')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    // Check AI access
    const accessResult = await checkAIAccess('chat');
    if (!accessResult.hasAccess) {
      setShowUpgrade(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    if (selectedFile) {
      const fileUrl = await uploadFile(selectedFile);
      if (fileUrl) {
        if (selectedFile.type.startsWith('image/')) {
          userMessage.imageUrl = fileUrl;
        } else if (selectedFile.type.startsWith('video/')) {
          userMessage.videoUrl = fileUrl;
        }
      }
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('openai-trainer-chat', {
        body: {
          message: input,
          workoutContext,
          imageUrl: userMessage.imageUrl,
          videoUrl: userMessage.videoUrl
        }
      });

      if (error) {
        if (error.message?.includes('rate_limit')) {
          setShowUpgrade(true);
          return;
        }
        throw error;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'No response received',
        imageUrl: data.generatedImage,
        videoUrl: data.videoUrl,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      await trackAIUsage('chat', data.tokensUsed, data.costEstimate);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const maxRequests = isPro ? 100 : 5;
  const remainingRequests = maxRequests - monthlyUsage;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
          <SheetHeader className="p-4 pb-3 border-b">
            <SheetTitle>AI Workout Coach</SheetTitle>
            <SheetDescription>
              Get instant help with exercises, form, and tips
            </SheetDescription>
            {!isPro && (
              <Badge variant="secondary" className="w-fit mt-2">
                {remainingRequests}/{maxRequests} requests this month
              </Badge>
            )}
          </SheetHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p className="mb-2">👋 Hi! I'm your AI workout coach</p>
                  <p className="text-sm">Ask me anything about your exercises, form, or training!</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content && <p className="text-sm whitespace-pre-wrap">{message.content}</p>}
                    {message.imageUrl && (
                      <img src={message.imageUrl} alt="Uploaded" className="mt-2 rounded max-w-full" />
                    )}
                    {message.videoUrl && (
                      <div className="mt-2">
                        {message.videoUrl.includes('youtube.com') || message.videoUrl.includes('youtu.be') ? (
                          <div className="aspect-video">
                            <iframe
                              src={message.videoUrl.replace('watch?v=', 'embed/')}
                              className="w-full h-full rounded"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <a
                            href={message.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm underline"
                          >
                            <Video className="h-4 w-4" />
                            View Exercise Video
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t space-y-2">
            {selectedFile && (
              <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                {selectedFile.type.startsWith('image/') ? (
                  <ImageIcon className="h-4 w-4" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
                <span className="flex-1 truncate">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
            
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about form, technique, tips..."
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isLoading}
              />
              
              <Button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !selectedFile)}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ClientUpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} onUpgrade={upgradeToProViaMock} />
    </>
  );
}
