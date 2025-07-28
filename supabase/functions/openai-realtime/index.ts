import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    socket.close(1000, "OpenAI API key not configured");
    return response;
  }

  let openAISocket: WebSocket | null = null;

  socket.onopen = () => {
    console.log("Client connected to relay");
    
    // Connect to OpenAI Realtime API
    openAISocket = new WebSocket(
      `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01`,
      [],
      {
        headers: {
          "Authorization": `Bearer ${openAIApiKey}`,
          "OpenAI-Beta": "realtime=v1"
        }
      }
    );

    openAISocket.onopen = () => {
      console.log("Connected to OpenAI Realtime API");
      
      // Send session configuration
      openAISocket?.send(JSON.stringify({
        type: "session.update",
        session: {
          modalities: ["text", "audio"],
          instructions: "Sei un assistente AI per fitness e allenamento. Rispondi sempre in italiano in modo amichevole e professionale. Mantieni le risposte concise ma utili.",
          voice: "alloy",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          input_audio_transcription: {
            model: "whisper-1"
          },
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 1000
          },
          temperature: 0.7,
          max_response_output_tokens: 1000
        }
      }));
    };

    openAISocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("OpenAI -> Client:", data.type);
      
      // Forward all messages to client
      socket.send(event.data);
    };

    openAISocket.onerror = (error) => {
      console.error("OpenAI WebSocket error:", error);
      socket.send(JSON.stringify({
        type: "error",
        error: "OpenAI connection error"
      }));
    };

    openAISocket.onclose = () => {
      console.log("OpenAI connection closed");
      socket.close();
    };
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Client -> OpenAI:", data.type);
    
    // Forward client messages to OpenAI
    if (openAISocket?.readyState === WebSocket.OPEN) {
      openAISocket.send(event.data);
    }
  };

  socket.onclose = () => {
    console.log("Client disconnected");
    openAISocket?.close();
  };

  socket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
    openAISocket?.close();
  };

  return response;
});