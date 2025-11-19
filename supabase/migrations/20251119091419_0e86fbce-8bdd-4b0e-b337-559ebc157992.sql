-- Create conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  last_message_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(client_id, trainer_id)
);

-- Create messages table
CREATE TABLE public.trainer_client_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'trainer')),
  content TEXT,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'video', 'file', 'audio')),
  
  -- Media fields
  media_url TEXT,
  media_thumbnail_url TEXT,
  media_size BIGINT,
  media_duration INTEGER,
  file_name TEXT,
  
  -- Metadata
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_conversations_client ON conversations(client_id);
CREATE INDEX idx_conversations_trainer ON conversations(trainer_id);
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at DESC);
CREATE INDEX idx_messages_conversation ON trainer_client_messages(conversation_id);
CREATE INDEX idx_messages_created_at ON trainer_client_messages(created_at);
CREATE INDEX idx_messages_unread ON trainer_client_messages(read_at) WHERE read_at IS NULL;
CREATE INDEX idx_messages_sender ON trainer_client_messages(sender_id);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_client_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Clients can view their conversations"
  ON conversations FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Trainers can view their conversations"
  ON conversations FOR SELECT
  USING (trainer_id = auth.uid());

CREATE POLICY "Clients can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Users can update their conversations"
  ON conversations FOR UPDATE
  USING (client_id = auth.uid() OR trainer_id = auth.uid());

-- RLS Policies for messages
CREATE POLICY "Clients can view their messages"
  ON trainer_client_messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Trainers can view their messages"
  ON trainer_client_messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE trainer_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages"
  ON trainer_client_messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE client_id = auth.uid() OR trainer_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own messages"
  ON trainer_client_messages FOR UPDATE
  USING (sender_id = auth.uid());

-- Enable realtime
ALTER TABLE conversations REPLICA IDENTITY FULL;
ALTER TABLE trainer_client_messages REPLICA IDENTITY FULL;

-- Add tables to realtime publication
DO $$
BEGIN
  -- Check if publication exists before adding tables
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
    ALTER PUBLICATION supabase_realtime ADD TABLE trainer_client_messages;
  END IF;
END $$;

-- Storage policies for video/media uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-media', 'chat-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload chat media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'chat-media' 
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can view chat media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'chat-media');

CREATE POLICY "Users can delete their chat media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'chat-media' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_conversations_updated_at();

CREATE OR REPLACE FUNCTION update_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON trainer_client_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_messages_updated_at();