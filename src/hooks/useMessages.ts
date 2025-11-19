import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: 'client' | 'trainer';
  content?: string;
  message_type: 'text' | 'image' | 'video' | 'file';
  media_url?: string;
  media_thumbnail_url?: string;
  media_duration?: number;
  file_name?: string;
  read_at?: string;
  created_at: string;
}

export function useMessages(trainerId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trainerId) {
      initializeConversation();
    }
  }, [trainerId]);

  useEffect(() => {
    if (conversationId) {
      subscribeToMessages();
    }
  }, [conversationId]);

  const initializeConversation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      let { data: conversation } = await supabase
        .from('conversations')
        .select('*')
        .eq('client_id', user.id)
        .eq('trainer_id', trainerId)
        .maybeSingle();

      if (!conversation) {
        const { data: newConv, error } = await supabase
          .from('conversations')
          .insert({
            client_id: user.id,
            trainer_id: trainerId
          })
          .select()
          .single();

        if (error) throw error;
        conversation = newConv;
      }

      setConversationId(conversation.id);

      const { data: msgs } = await supabase
        .from('trainer_client_messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      setMessages((msgs || []) as Message[]);
    } catch (error) {
      console.error('Error initializing conversation:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'trainer_client_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload: any) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (
    content: string,
    messageType: 'text' | 'video' | 'image' | 'file' = 'text',
    mediaUrl?: string,
    thumbnailUrl?: string,
    duration?: number,
    fileName?: string,
    mediaSize?: number
  ) => {
    if (!conversationId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('trainer_client_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          sender_type: 'client',
          content: content || null,
          message_type: messageType,
          media_url: mediaUrl,
          media_thumbnail_url: thumbnailUrl,
          media_duration: duration,
          file_name: fileName,
          media_size: mediaSize
        });

      if (error) throw error;

      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const markAsRead = async (messageId: string) => {
    await supabase
      .from('trainer_client_messages')
      .update({ read_at: new Date().toISOString() })
      .eq('id', messageId);
  };

  return {
    messages,
    loading,
    sendMessage,
    markAsRead
  };
}
