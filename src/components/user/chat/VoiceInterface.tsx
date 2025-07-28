import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';

interface VoiceInterfaceProps {
  onSpeakingChange: (speaking: boolean) => void;
  onTranscript: (text: string, isComplete: boolean) => void;
}

export function VoiceInterface({ onSpeakingChange, onTranscript }: VoiceInterfaceProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const chatRef = useRef<RealtimeChat | null>(null);
  const { toast } = useToast();

  const handleMessage = (event: any) => {
    console.log('Voice event:', event.type);
    
    switch (event.type) {
      case 'response.audio.delta':
        setIsSpeaking(true);
        onSpeakingChange(true);
        break;
        
      case 'response.audio.done':
        setIsSpeaking(false);
        onSpeakingChange(false);
        break;
        
      case 'input_audio_buffer.speech_started':
        setIsListening(true);
        break;
        
      case 'input_audio_buffer.speech_stopped':
        setIsListening(false);
        break;
        
      case 'conversation.item.input_audio_transcription.completed':
        if (event.transcript) {
          onTranscript(event.transcript, true);
        }
        break;
        
      case 'conversation.item.input_audio_transcription.failed':
        console.error('Transcription failed:', event.error);
        break;
        
      case 'response.text.delta':
        if (event.delta) {
          onTranscript(event.delta, false);
        }
        break;
        
      case 'response.text.done':
        onTranscript('', true);
        break;
    }
  };

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
    if (!connected) {
      setIsSpeaking(false);
      setIsListening(false);
      onSpeakingChange(false);
    }
  };

  const startVoiceChat = async () => {
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      chatRef.current = new RealtimeChat(handleMessage, handleConnectionChange);
      await chatRef.current.connect();
      
      toast({
        title: 'Chat vocale attiva',
        description: 'Puoi iniziare a parlare con l\'AI trainer'
      });
    } catch (error) {
      console.error('Error starting voice chat:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile attivare la chat vocale. Controlla i permessi del microfono.',
        variant: 'destructive'
      });
    }
  };

  const stopVoiceChat = () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsSpeaking(false);
    setIsListening(false);
    onSpeakingChange(false);
    
    toast({
      title: 'Chat vocale disattivata',
      description: 'La connessione vocale è stata chiusa'
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement actual muting logic
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {!isConnected ? (
        <Button
          onClick={startVoiceChat}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Mic className="h-4 w-4" />
          Chat Vocale
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isListening ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
            isSpeaking ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          }`}>
            {isListening ? (
              <>
                <Mic className="h-3 w-3 animate-pulse" />
                In ascolto...
              </>
            ) : isSpeaking ? (
              <>
                <Volume2 className="h-3 w-3 animate-pulse" />
                AI sta parlando...
              </>
            ) : (
              <>
                <Mic className="h-3 w-3" />
                Connesso
              </>
            )}
          </div>
          
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          
          <Button
            onClick={stopVoiceChat}
            variant="outline"
            size="sm"
          >
            <MicOff className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}