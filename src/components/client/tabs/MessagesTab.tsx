import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Video as VideoIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { useMessages } from "@/hooks/useMessages";
import { MessageBubble } from "../messages/MessageBubble";
import { VideoUploader } from "../messages/VideoUploader";
import { FileUpload } from "@/components/user/chat/FileUpload";
import { supabase } from "@/integrations/supabase/client";

export function MessagesTab() {
  const [trainerId, setTrainerId] = useState<string>("");
  const [loadingTrainer, setLoadingTrainer] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, loading, sendMessage } = useMessages(trainerId);

  useEffect(() => {
    const fetchTrainerId = async () => {
      setLoadingTrainer(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoadingTrainer(false);
        return;
      }

      const { data: assignments } = await supabase
        .from('client_package_assignments')
        .select('trainer_id')
        .eq('client_id', user.id)
        .limit(1);

      if (assignments && assignments.length > 0) {
        setTrainerId(assignments[0].trainer_id);
      }
      setLoadingTrainer(false);
    };

    fetchTrainerId();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendText = () => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage, 'text');
    setInputMessage("");
  };

  const handleSendVideo = (url: string, thumbnail: string, duration: number, size: number) => {
    sendMessage("", 'video', url, thumbnail, duration, undefined, size);
    setShowVideoUpload(false);
  };

  const handleFileSelect = (file: File, url: string) => {
    if (file.type.startsWith('image/')) {
      sendMessage("", 'image', url);
    } else {
      sendMessage("", 'file', url, undefined, undefined, file.name, file.size);
    }
    setShowImageUpload(false);
  };

  if (loadingTrainer) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!trainerId) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>No trainer assigned yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle>Messages</CardTitle>
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
