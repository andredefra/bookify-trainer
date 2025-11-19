import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Video as VideoIcon, Image as ImageIcon } from "lucide-react";
import { MessageBubble } from "../messages/MessageBubble";
import { VideoUploader } from "../messages/VideoUploader";
import { FileUpload } from "@/components/user/chat/FileUpload";

const MOCK_TRAINERS = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
    status: "online" as const,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
    status: "away" as const,
  }
];

const MOCK_MESSAGES: Record<string, any[]> = {
  "550e8400-e29b-41d4-a716-446655440001": [
    {
      id: "msg-1",
      sender_type: "trainer",
      content: "Hi! How are you feeling after yesterday's workout?",
      message_type: "text",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read_at: new Date().toISOString(),
    },
    {
      id: "msg-2",
      sender_type: "client",
      content: "Great! A bit sore but feeling strong 💪",
      message_type: "text",
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      read_at: new Date().toISOString(),
    },
    {
      id: "msg-3",
      sender_type: "trainer",
      content: "Perfect! That's exactly what we want to hear. Ready for today's session?",
      message_type: "text",
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read_at: new Date().toISOString(),
    },
  ],
  "550e8400-e29b-41d4-a716-446655440002": [
    {
      id: "msg-4",
      sender_type: "trainer",
      content: "Hey! Just wanted to check in on your nutrition plan. How's it going?",
      message_type: "text",
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read_at: new Date().toISOString(),
    },
    {
      id: "msg-5",
      sender_type: "client",
      content: "Going well! Following the meal plan you sent last week.",
      message_type: "text",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read_at: new Date().toISOString(),
    },
  ]
};

export function MessagesTab() {
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(MOCK_TRAINERS[0].id);
  const [messages, setMessages] = useState(MOCK_MESSAGES[selectedTrainerId] || []);
  const [inputMessage, setInputMessage] = useState("");
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTrainerSelect = (trainerId: string) => {
    setSelectedTrainerId(trainerId);
    setMessages(MOCK_MESSAGES[trainerId] || []);
  };

  const handleSendText = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender_type: "client",
      content: inputMessage,
      message_type: "text",
      created_at: new Date().toISOString(),
      read_at: null,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    
    // Simulate trainer response after 2 seconds
    setTimeout(() => {
      const trainerResponse = {
        id: `msg-${Date.now()}-trainer`,
        sender_type: "trainer",
        content: "Thanks for the message! I'll get back to you soon.",
        message_type: "text",
        created_at: new Date().toISOString(),
        read_at: null,
      };
      setMessages(prev => [...prev, trainerResponse]);
    }, 2000);
  };

  const handleSendVideo = (url: string, thumbnail: string, duration: number, size: number) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender_type: "client",
      content: "",
      message_type: "video",
      media_url: url,
      media_thumbnail_url: thumbnail,
      media_duration: duration,
      media_size: size,
      created_at: new Date().toISOString(),
      read_at: null,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setShowVideoUpload(false);
    
    // Simulate trainer response
    setTimeout(() => {
      const trainerResponse = {
        id: `msg-${Date.now()}-trainer`,
        sender_type: "trainer",
        content: "Got your video! I'll review it and send feedback.",
        message_type: "text",
        created_at: new Date().toISOString(),
        read_at: null,
      };
      setMessages(prev => [...prev, trainerResponse]);
    }, 2000);
  };

  const handleFileSelect = (file: File, url: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender_type: "client",
      content: "",
      message_type: file.type.startsWith('image/') ? 'image' : 'file',
      media_url: url,
      file_name: file.name,
      media_size: file.size,
      created_at: new Date().toISOString(),
      read_at: null,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setShowImageUpload(false);
    
    // Simulate trainer response
    setTimeout(() => {
      const trainerResponse = {
        id: `msg-${Date.now()}-trainer`,
        sender_type: "trainer",
        content: "Thanks for sharing! I'll take a look.",
        message_type: "text",
        created_at: new Date().toISOString(),
        read_at: null,
      };
      setMessages(prev => [...prev, trainerResponse]);
    }, 2000);
  };

  const selectedTrainer = MOCK_TRAINERS.find(t => t.id === selectedTrainerId);

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {MOCK_TRAINERS.map(trainer => (
            <Button
              key={trainer.id}
              variant={selectedTrainerId === trainer.id ? "default" : "outline"}
              onClick={() => handleTrainerSelect(trainer.id)}
              className="shrink-0"
            >
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={trainer.avatar} />
                <AvatarFallback>{trainer.name[0]}</AvatarFallback>
              </Avatar>
              {trainer.name}
            </Button>
          ))}
        </div>
        {selectedTrainer && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={selectedTrainer.avatar} />
              <AvatarFallback>{selectedTrainer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{selectedTrainer.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{selectedTrainer.status}</p>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                sender={msg.sender_type}
                content={msg.content}
                messageType={msg.message_type}
                mediaUrl={msg.media_url}
                thumbnailUrl={msg.media_thumbnail_url}
                fileName={msg.file_name}
                duration={msg.media_duration}
                timestamp={msg.created_at}
                read={!!msg.read_at}
              />
            ))
          )}
        </ScrollArea>

        <div className="p-4 border-t space-y-2 bg-background">
          {showVideoUpload && (
            <div className="pb-2">
              <VideoUploader onVideoUploaded={handleSendVideo} />
            </div>
          )}
          
          {showImageUpload && (
            <div className="pb-2">
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setShowVideoUpload(!showVideoUpload);
                setShowImageUpload(false);
              }}
            >
              <VideoIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setShowImageUpload(!showImageUpload);
                setShowVideoUpload(false);
              }}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendText();
                }
              }}
              className="flex-1"
            />
            
            <Button onClick={handleSendText} disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
