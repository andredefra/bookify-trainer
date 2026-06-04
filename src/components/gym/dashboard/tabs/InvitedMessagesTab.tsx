import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, ArrowLeft } from "lucide-react";
import { useTrainerContracts } from "@/hooks/gym/useTrainerContracts";
import { useMediaQuery } from "@/hooks/use-mobile";

interface InvitedMessagesTabProps {
  initialTrainerId?: string | null;
  onConsumeInitial?: () => void;
}

interface Msg {
  id: string;
  from: "gym" | "trainer";
  text: string;
  time: string;
}

export function InvitedMessagesTab({ initialTrainerId, onConsumeInitial }: InvitedMessagesTabProps) {
  const { trainersWithContracts, loading } = useTrainerContracts();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState<Record<string, Msg[]>>({});
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTrainerId) {
      setActiveId(initialTrainerId);
      onConsumeInitial?.();
    }
  }, [initialTrainerId, onConsumeInitial]);

  useEffect(() => {
    if (!activeId && !isMobile && trainersWithContracts.length > 0) {
      setActiveId(trainersWithContracts[0].id);
    }
  }, [activeId, isMobile, trainersWithContracts]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, threads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trainersWithContracts.filter(
      (t) => !q || t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q)
    );
  }, [trainersWithContracts, search]);

  const active = trainersWithContracts.find((t) => t.id === activeId);
  const messages = (activeId && threads[activeId]) || seedThread(active?.name);

  const statusColor = (s: string) =>
    s === "online" ? "bg-green-500" : s === "away" ? "bg-amber-500" : "bg-slate-400";

  const send = () => {
    if (!draft.trim() || !activeId) return;
    const msg: Msg = {
      id: `${Date.now()}`,
      from: "gym",
      text: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setThreads((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || seedThread(active?.name)), msg],
    }));
    setDraft("");
  };

  if (loading) {
    return <div className="flex justify-center p-8 text-muted-foreground">Loading messages...</div>;
  }

  const showList = !isMobile || !activeId;
  const showChat = !isMobile || !!activeId;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Chat directly with your trainers</p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-[320px_1fr] h-[calc(100vh-220px)] min-h-[480px]">
          {/* Conversation list */}
          {showList && (
            <div className="border-r border-border flex flex-col bg-muted/20">
              <div className="p-3 border-b border-border bg-background">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search trainers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                {filtered.length === 0 && (
                  <div className="p-6 text-center text-sm text-muted-foreground">No trainers found</div>
                )}
                {filtered.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    className={`w-full text-left px-3 py-3 flex gap-3 items-center border-b border-border hover:bg-accent/50 transition-colors ${
                      activeId === t.id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${statusColor(
                          t.status
                        )}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{t.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{t.email}</div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </div>
          )}

          {/* Chat area */}
          {showChat && (
            <div className="flex flex-col">
              {active ? (
                <>
                  <div className="p-3 border-b border-border flex items-center gap-3 bg-background">
                    {isMobile && (
                      <Button variant="ghost" size="icon" onClick={() => setActiveId(null)} className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="relative">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{active.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${statusColor(
                          active.status
                        )}`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{active.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{active.status}</div>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4 bg-muted/10">
                    <div className="space-y-3">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${m.from === "gym" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                              m.from === "gym"
                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                : "bg-card border border-border rounded-bl-sm"
                            }`}
                          >
                            <p>{m.text}</p>
                            <span
                              className={`text-[10px] mt-1 block text-right ${
                                m.from === "gym" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {m.time}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={endRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-3 border-t border-border bg-background flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }}
                    />
                    <Button onClick={send} disabled={!draft.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
                  Select a trainer to start chatting
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function seedThread(name?: string): Msg[] {
  if (!name) return [];
  return [
    {
      id: "seed-1",
      from: "trainer",
      text: `Hi! This is ${name}. Let me know if you need anything.`,
      time: "09:24",
    },
  ];
}
