import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ReactMarkdown, { type Components } from "react-markdown";
import { Sparkles, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sb } from "../lib/sb";
import { toast } from "sonner";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const PAGES: Record<string, { name: string; questions: string[] }> = {
  "/admin": {
    name: "Dashboard",
    questions: [
      "Come leggo il bilanciamento persona?",
      "Quanti post sono programmati?",
      "Il mercato India è bilanciato?",
    ],
  },
  "/admin/branding": {
    name: "Branding",
    questions: [
      "Come carico un documento di brand?",
      "Quali documenti sono attivi?",
      "A cosa servono i documenti attivi?",
    ],
  },
  "/admin/content-plan": {
    name: "Piano Contenuti",
    questions: [
      "Come genero la copy di un post?",
      "Quanti post ci sono per stato?",
      "Come porto un post a Validated?",
    ],
  },
  "/admin/calendar": {
    name: "Calendario",
    questions: [
      "Come programmo i post di una fase?",
      "Quanti post sono programmati questo mese?",
      "Come confermo una pubblicazione?",
    ],
  },
  "/admin/crm": {
    name: "CRM",
    questions: [
      "Quante opportunità ci sono per fase?",
      "Come sposto un'opportunità di fase?",
      "Come promuovo un iscritto dalla waitlist?",
    ],
  },
  "/admin/waitlist": {
    name: "Waitlist",
    questions: [
      "Quanti clienti si sono iscritti questa settimana?",
      "Come importo un CSV da Google Forms?",
      "Come aggiungo un iscritto a mano?",
    ],
  },
  "/admin/settings": {
    name: "Impostazioni",
    questions: [
      "Come attivo l'AI?",
      "Cosa vuol dire \"Chiave mancante\"?",
      "Dove inserisco le chiavi API?",
    ],
  },
};

/**
 * Assistant replies are markdown: headings stay the same size as bold text so the
 * drawer keeps its look. Raw HTML is skipped (never rendered) for safety.
 */
const MD_COMPONENTS: Components = {
  h1: ({ children }) => <p className="font-semibold">{children}</p>,
  h2: ({ children }) => <p className="font-semibold">{children}</p>,
  h3: ({ children }) => <p className="font-semibold">{children}</p>,
  h4: ({ children }) => <p className="font-semibold">{children}</p>,
  h5: ({ children }) => <p className="font-semibold">{children}</p>,
  h6: ({ children }) => <p className="font-semibold">{children}</p>,
  p: ({ children }) => <p className="leading-relaxed [&:not(:first-child)]:mt-2">{children}</p>,
  ul: ({ children }) => <ul className="mt-1 list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="mt-1 list-decimal space-y-1 pl-5">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded bg-background px-1 py-0.5 font-mono text-[0.85em]">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="mt-2 overflow-x-auto rounded bg-background p-2 text-xs leading-relaxed">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-2 border-l-2 border-border pl-2 text-muted-foreground">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-2 border-border" />,
};

/** Read-only help assistant for the whole admin (never writes data). */
export default function AdminAIChatDrawer() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/admin";
  const page = PAGES[path] ?? { name: "Admin", questions: PAGES["/admin"].questions };

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Ciao! Sono l'assistente dell'admin. Chiedimi come usare una sezione o un dato della pagina — leggo i dati ma non modifico nulla.",
    },
  ]);

  const send = useMutation({
    mutationFn: async ({ prompt, history }: { prompt: string; history: Msg[] }) => {
      const { data, error } = await sb.functions.invoke("mkt-admin-assistant", {
        body: {
          message: prompt,
          path,
          history: history.slice(1).map((m) => ({ role: m.role, content: m.text })),
        },
      });
      if (data?.error) throw new Error(data.error);
      if (error) {
        let msg = error.message;
        try {
          const b = await (error as any).context?.json?.();
          if (b?.error) msg = b.error;
        } catch { /* ignore */ }
        throw new Error(msg);
      }
      return (data?.text ?? "") as string;
    },
    onSuccess: (text) => {
      setMessages((m) => [...m, { role: "assistant", text }]);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text || send.isPending) return;
    const history = messages;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    send.mutate({ prompt: text, history });
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
              <div>
                <p className="font-medium text-sm">Assistente AI</p>
                <p className="text-xs text-muted-foreground">Pagina: {page.name}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="rounded-lg p-3 text-sm whitespace-pre-wrap bg-primary text-primary-foreground ml-8"
                >
                  {m.text}
                </div>
              ) : (
                <div key={i} className="rounded-lg p-3 text-sm bg-muted mr-8">
                  <ReactMarkdown skipHtml components={MD_COMPONENTS}>
                    {m.text}
                  </ReactMarkdown>
                </div>
              )
            )}
            {send.isPending && <p className="text-xs text-muted-foreground">Sto pensando...</p>}
          </div>
          <div className="p-3 border-t space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {page.questions.map((q) => (
                <button
                  key={q}
                  onClick={() => ask(q)}
                  disabled={send.isPending}
                  className="text-xs rounded-full border px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chiedi come fare qualcosa o un dato della pagina..."
              rows={3}
            />
            <Button onClick={() => ask(input)} disabled={send.isPending} className="w-full" size="sm">
              <Send className="h-4 w-4" /> Invia
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
