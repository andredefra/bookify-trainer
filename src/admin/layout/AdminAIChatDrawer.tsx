import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Sparkles, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sb } from "../lib/sb";
import { toast } from "sonner";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

/**
 * AI chat drawer. v1: read-only — generates copy suggestions only.
 * TODO(v3): agentic actions (rescheduling, replacing posts, etc.) hook here.
 */
export default function AdminAIChatDrawer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Ciao! Sono il tuo assistente copy. Chiedimi idee, hook o riscritture — in v1 non scrivo nel database.",
    },
  ]);

  const send = useMutation({
    mutationFn: async (prompt: string) => {
      const { data, error } = await sb.functions.invoke("mkt-generate-copy", {
        body: { mode: "chat", prompt },
      });
      if (error) throw new Error(error.message);
      return (data?.text ?? "") as string;
    },
    onSuccess: (text) => {
      setMessages((m) => [...m, { role: "assistant", text }]);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    send.mutate(text);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90"
        aria-label="AI assistant"
      >
        <Sparkles className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-background border-l shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="font-medium text-sm">Assistente AI</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-lg p-3 text-sm ${
                  m.role === "user" ? "bg-primary text-primary-foreground ml-8" : "bg-muted mr-8"
                }`}
              >
                {m.text}
              </div>
            ))}
            {send.isPending && <p className="text-xs text-muted-foreground">Sto pensando...</p>}
          </div>
          <div className="p-3 border-t space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chiedi un hook, una riscrittura, idee..."
              rows={3}
            />
            <Button onClick={submit} disabled={send.isPending} className="w-full" size="sm">
              <Send className="h-4 w-4" /> Invia
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
