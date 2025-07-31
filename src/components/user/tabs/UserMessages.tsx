import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Loader2, User, MessageSquare, Mic, Plus, Settings, Image, Video, Paperclip, X } from "lucide-react";
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
      last_message: 'Hi! How can I help you today?',
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
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadMessages(activeConversation);
    // Add welcome message if no messages exist
    if (activeConversation === 'ai-trainer') {
      setMessages([{
        id: 'welcome-1',
        conversation_id: 'ai-trainer',
        sender: 'ai',
        content: 'Hi! How can I help you today? I can assist you with training programs, nutrition plans, and tracking your fitness goals.',
        message_type: 'text',
        created_at: new Date().toISOString()
      }]);
    }
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
               title: '✅ Action completed',
               description: response.data.function_call.result || 'Operation completed successfully'
             });
           }
        }

      } else {
        // Send to human trainer (future implementation)
        toast({
          title: 'Coming Soon',
          description: 'Human trainer chat will be available soon!'
        });
      }

      setInput('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Unable to send message',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadingMedia(true);
    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('user-media')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('user-media')
        .getPublicUrl(fileName);

      // Determine message type based on file type
      let messageType: 'image' | 'video' | 'file' = 'file';
      if (file.type.startsWith('image/')) messageType = 'image';
      else if (file.type.startsWith('video/')) messageType = 'video';

      // Create message with media
      const mediaMessage: Message = {
        id: `media-${Date.now()}`,
        conversation_id: activeConversation,
        sender: 'user',
        content: messageType === 'file' ? `Document: ${file.name}` : '',
        message_type: messageType,
        media_url: urlData.publicUrl,
        file_name: file.name,
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, mediaMessage]);
      
      // Save to database
      await supabase.from('user_messages').insert({
        conversation_id: activeConversation,
        sender: 'user',
        content: mediaMessage.content,
        message_type: messageType,
        media_url: urlData.publicUrl,
        file_name: file.name
      });

      toast({
        title: 'Media uploaded',
        description: 'File sent successfully!'
      });

    } catch (error) {
      console.error('Error uploading media:', error);
      toast({
        title: 'Error',
        description: 'Unable to upload file',
        variant: 'destructive'
      });
    } finally {
      setUploadingMedia(false);
      setSelectedFile(null);
      setShowMediaOptions(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Maximum allowed size: 10MB',
          variant: 'destructive'
        });
        return;
      }
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      handleFileUpload(selectedFile);
    } else {
      sendMessage(input);
    }
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
      <div key={message.id} className={`flex gap-2 lg:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
        <Avatar className="h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0">
          {!isUser ? (
            message.sender === 'ai' ? (
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Bot className="h-3 w-3 lg:h-4 lg:w-4" />
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
        
        <div className={`flex flex-col max-w-[85%] lg:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-3 py-2 lg:px-4 lg:py-3 ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}>
            {message.content && (
              <p className="text-sm lg:text-base whitespace-pre-wrap break-words">{message.content}</p>
            )}
            
            {/* Media content */}
            {message.media_url && (
              <div className="mt-2">
                {message.message_type === 'image' && (
                  <img 
                    src={message.media_url} 
                    alt="Shared image" 
                    className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(message.media_url, '_blank')}
                  />
                )}
                {message.message_type === 'video' && (
                  <video 
                    src={message.media_url} 
                    controls 
                    className="max-w-xs rounded-lg"
                  />
                )}
                {message.message_type === 'file' && (
                  <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
                    <Paperclip className="h-4 w-4" />
                    <a 
                      href={message.media_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      {message.file_name}
                    </a>
                  </div>
                )}
              </div>
            )}
            
            {/* Function call results */}
            {message.function_call && (
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                  🔧 Action: {message.function_call.name}
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
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Chat with your trainers</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          New Trainer
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Conversations Sidebar - Hidden on mobile when chat is active */}
        <Card className={`lg:w-80 flex-shrink-0 ${activeConversation && 'hidden lg:flex'} flex flex-col`}>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              {activeConversation && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setActiveConversation('')}
                >
                  Back
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <ScrollArea className="h-full">
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

        {/* Chat Area - Full width on mobile when active */}
        <Card className={`flex-1 flex flex-col ${!activeConversation && 'hidden lg:flex'}`}>
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden -ml-2"
                  onClick={() => setActiveConversation('')}
                >
                  ←
                </Button>
                <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                  <AvatarFallback>
                    {getConversationIcon(conversations.find(c => c.id === activeConversation)!)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base lg:text-lg">
                    {conversations.find(c => c.id === activeConversation)?.name}
                  </CardTitle>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {conversations.find(c => c.id === activeConversation)?.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 lg:gap-2">
                <Button
                  variant={voiceMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVoiceMode(!voiceMode)}
                  className="gap-1 lg:gap-2 text-xs lg:text-sm"
                >
                  <Mic className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">{voiceMode ? 'Voice ON' : 'Voice'}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-3 w-3 lg:h-4 lg:w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-3 lg:p-6">
              <div className="space-y-3 lg:space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageSquare className="h-10 w-10 lg:h-12 lg:w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm lg:text-base">Start a conversation!</p>
                    <p className="text-xs lg:text-sm mt-2">Ask for advice on training, nutrition or your goals.</p>
                  </div>
                )}
                
                {messages.map(renderMessage)}
                
                {isTyping && (
                  <div className="flex gap-2 lg:gap-3">
                    <Avatar className="h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <Bot className="h-3 w-3 lg:h-4 lg:w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="bg-muted rounded-2xl px-3 py-2 lg:px-4 lg:py-3 max-w-xs">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="border-t p-3 lg:p-4">
              {/* DEBUG: Always show current state */}
              <div className="text-xs text-gray-500 mb-2 text-center">
                Debug: isLoading={isLoading.toString()}, uploadingMedia={uploadingMedia.toString()}
              </div>

              {/* Media options */}
              {showMediaOptions && (
                <div className="mb-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowMediaOptions(false);
                    }}
                    className="gap-1"
                  >
                     <Image className="h-4 w-4" />
                     Photo
                   </Button>
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {
                       const input = document.createElement('input');
                       input.type = 'file';
                       input.accept = 'video/*';
                       input.onchange = (e) => handleFileSelect(e as any);
                       input.click();
                       setShowMediaOptions(false);
                     }}
                     className="gap-1"
                   >
                     <Video className="h-4 w-4" />
                     Video
                   </Button>
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {
                       const input = document.createElement('input');
                       input.type = 'file';
                       input.accept = '.pdf,.doc,.docx,.txt,.png,.jpg,.jpeg';
                       input.onchange = (e) => handleFileSelect(e as any);
                       input.click();
                       setShowMediaOptions(false);
                     }}
                     className="gap-1"
                   >
                     <Paperclip className="h-4 w-4" />
                     File
                   </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMediaOptions(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex space-x-2">
                <div className="flex items-center space-x-2 flex-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMediaOptions(!showMediaOptions)}
                    disabled={uploadingMedia || isLoading}
                    className="px-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write a message..."
                    disabled={isLoading || uploadingMedia}
                    className="flex-1 text-sm lg:text-base"
                  />
                </div>
                
                {/* Loading State - Non cliccabile */}
                {(isLoading || uploadingMedia) ? (
                  <div className="px-6 py-3 bg-red-500 border-4 border-red-700 rounded-lg text-white text-base flex items-center gap-3 font-bold animate-pulse">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                    {uploadingMedia ? '⚠️ UPLOADING FILE - PLEASE WAIT!' : '⚠️ AI IS PROCESSING - PLEASE WAIT!'}
                  </div>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={!input.trim()} 
                    size="sm" 
                    className="px-3 bg-green-500 hover:bg-green-600"
                  >
                    <Send className="h-3 w-3 lg:h-4 lg:w-4" />
                    SEND MESSAGE
                  </Button>
                )}
              </form>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}