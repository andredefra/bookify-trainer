import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { chatPost } from "../../lib/ai";
import type { MktContent, PostDiffProposal } from "../../types";
import { it } from "../../i18n/it";
import { Send, Sparkles, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  post: MktContent;
  onApplyProposal: (proposal: PostDiffProposal) => void;
  disabled?: boolean;
}

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  proposals?: PostDiffProposal[];
}

export default function PostAiChatPanel({ post, onApplyProposal, disabled }: Props) {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const send = useMutation({
    mutationFn: async (msg: string) => {
      const history = turns.map((t) => ({ role: t.role, content: t.content }));
      return chatPost(post.id, history, msg);
    },
    onSuccess: (res, msg) => {
      setTurns((t) => [
        ...t,
        { role: "user", content: msg },
        { role: "assistant", content: res.reply || "(nessuna risposta)", proposals: res.proposals },
      ]);
      setInput("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const submit = () => {
    const trimmed = input.trim();
    if (!trimmed || send.isPending) return;
    send.mutate(trimmed);
  };

  const proposalKey = (turnIdx: number, propIdx: number) => `${turnIdx}-${propIdx}`;

  return (
    <div className="border rounded-md flex flex-col h-[420px]">
      <div className="px-3 py-2 border-b flex items-center gap-2 bg-muted/30">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">{it.ai.chatTitle}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
        {turns.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Conversa con l'AI per modificare hook, copy, CTA, media prompt o note. Le proposte appaiono come card da approvare.
          </p>
        )}
        {turns.map((turn, ti) => (
          <div key={ti} className={turn.role === "user" ? "flex justify-end" : ""}>
            {turn.role === "user" ? (
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 max-w-[80%] text-sm">
                {turn.content}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-foreground whitespace-pre-wrap">{turn.content}</p>
                {turn.proposals && turn.proposals.length > 0 && (
                  <div className="space-y-2">
                    {turn.proposals.map((p, pi) => {
                      const key = proposalKey(ti, pi);
                      if (dismissed.has(key)) return null;
                      return (
                        <div key={key} className="border rounded-md p-2 bg-muted/30 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[10px] font-mono">{p.field}</Badge>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2"
                                disabled={disabled}
                                onClick={() => {
                                  onApplyProposal(p);
                                  setDismissed((d) => new Set(d).add(key));
                                  toast.success(`Applicato: ${p.field}`);
                                }}
                              >
                                <Check className="h-3 w-3" /> {it.ai.apply}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2"
                                onClick={() => setDismissed((d) => new Set(d).add(key))}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs whitespace-pre-wrap bg-background p-1.5 rounded border">{p.proposed_value}</p>
                          {p.rationale && <p className="text-[10px] text-muted-foreground italic">{p.rationale}</p>}
                        </div>
                      );
                    })}
                    {turn.proposals.filter((_, pi) => !dismissed.has(proposalKey(ti, pi))).length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7"
                        disabled={disabled}
                        onClick={() => {
                          turn.proposals!.forEach((p, pi) => {
                            const k = proposalKey(ti, pi);
                            if (!dismissed.has(k)) onApplyProposal(p);
                          });
                          setDismissed((d) => {
                            const n = new Set(d);
                            turn.proposals!.forEach((_, pi) => n.add(proposalKey(ti, pi)));
                            return n;
                          });
                          toast.success("Tutte le proposte applicate.");
                        }}
                      >
                        {it.ai.applyAll}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {send.isPending && <p className="text-xs text-muted-foreground italic">{it.ai.thinking}</p>}
      </div>

      <div className="border-t p-2 flex gap-2">
        <Textarea
          rows={2}
          placeholder={it.ai.chatPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          disabled={disabled || send.isPending}
          className="resize-none text-sm"
        />
        <Button size="icon" onClick={submit} disabled={disabled || send.isPending || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
