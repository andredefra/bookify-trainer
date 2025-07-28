-- Create user_messages table for AI chat
CREATE TABLE public.user_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  content TEXT,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'video', 'file', 'audio')),
  media_url TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own messages" 
ON public.user_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own messages" 
ON public.user_messages 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Create storage policies for media
CREATE POLICY "Media files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

CREATE POLICY "Users can upload media files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Users can update their media files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media');

-- Create index for better performance
CREATE INDEX idx_user_messages_conversation_id ON public.user_messages(conversation_id);
CREATE INDEX idx_user_messages_created_at ON public.user_messages(created_at);

-- Enable realtime for user_messages
ALTER TABLE public.user_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_messages;