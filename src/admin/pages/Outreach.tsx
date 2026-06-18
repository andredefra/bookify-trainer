import { useMemo, useRef, useState } from "react";
import { Plus, Upload, Trash2, Play, Pause, RefreshCw, Send, Settings as SettingsIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useMcpConnections, useUpsertMcpConnection, useDeleteMcpConnection, testMcpConnection,
  useOutreachLists, useCreateList, useDeleteList,
  useOutreachContacts, useBulkInsertContacts,
  useDmPresets, useUpsertPreset, useDeletePreset,
  useOutreachRuns, useCreateRun, useUpdateRunStatus,
  generateRunActions, tickRunActions, pollReplies,
  useRunActions, useReplies,
} from "../hooks/useOutreach";
import { parseOutreachCsv, OUTREACH_CSV_TEMPLATE } from "../lib/outreachCsv";
import type { MktDmPreset, MktOutreachRun } from "../types-outreach";

// ===================== SETTINGS (MCP) =====================
function McpSettingsTab() {
  const { data: conns = [] } = useMcpConnections();
  const upsert = useUpsertMcpConnection();
  const del = useDeleteMcpConnection();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [email, setEmail] = useState("andredefra64@gmail.com");
  const [mcpUrl, setMcpUrl] = useState("https://connect.composio.dev/mcp");
  const [apiKey, setApiKey] = useState("");

  const openNew = () => {
    setEditId(null); setEmail("andredefra64@gmail.com"); setMcpUrl("https://connect.composio.dev/mcp"); setApiKey(""); setOpen(true);
  };

  const save = () => {
    upsert.mutate({
      id: editId ?? undefined, provider: "composio", email, mcp_url: mcpUrl,
      oauth_tokens: apiKey ? { api_key: apiKey } : null,
    }, {
      onSuccess: () => { toast.success("Connessione salvata."); setOpen(false); },
      onError: (e: Error) => toast.error(e.message),
    });
  };

  const test = async (id: string) => {
    try {
      const r = await testMcpConnection(id);
      toast.success(`Trovati ${r.tools.length} tool MCP.`);
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Connessioni MCP</h2>
          <p className="text-sm text-muted-foreground">Composio MCP per Instagram (follow / DM / commenti).</p>
        </div>
        <Button onClick={openNew} size="sm"><Plus className="h-4 w-4" /> Nuova connessione</Button>
      </div>

      {conns.length === 0 && <p className="text-sm text-muted-foreground">Nessuna connessione. Aggiungi Composio per iniziare.</p>}
      <div className="grid md:grid-cols-2 gap-3">
        {conns.map((c) => (
          <Card key={c.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium capitalize">{c.provider}</p>
                <p className="text-xs text-muted-foreground">{c.email}</p>
              </div>
              <Badge variant={c.status === "ready" ? "default" : c.status === "failed" ? "destructive" : "secondary"}>{c.status}</Badge>
            </div>
            <p className="text-xs font-mono break-all text-muted-foreground">{c.mcp_url}</p>
            {c.last_error && <p className="text-xs text-destructive">{c.last_error.slice(0, 200)}</p>}
            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => test(c.id)}><RefreshCw className="h-3 w-3" /> Testa</Button>
              <Button size="sm" variant="outline" onClick={() => { setEditId(c.id); setEmail(c.email ?? ""); setMcpUrl(c.mcp_url); setApiKey(""); setOpen(true); }}>Modifica</Button>
              <Button size="sm" variant="ghost" onClick={() => del.mutate(c.id)}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Modifica" : "Nuova"} connessione Composio</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Email account</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>MCP URL</Label><Input value={mcpUrl} onChange={(e) => setMcpUrl(e.target.value)} placeholder="https://connect.composio.dev/mcp" /></div>
            <div>
              <Label>API key / Token (opzionale)</Label>
              <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Lascia vuoto se l'URL include già auth" type="password" />
              <p className="text-xs text-muted-foreground mt-1">Se Composio richiede un token Bearer, incollalo qui. Verrà cifrato a riposo.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annulla</Button>
            <Button onClick={save} disabled={upsert.isPending}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ===================== LISTS =====================
function ListsTab({ activeListId, setActiveListId }: { activeListId: string | null; setActiveListId: (id: string | null) => void }) {
  const { data: lists = [] } = useOutreachLists();
  const create = useCreateList();
  const del = useDeleteList();
  const bulk = useBulkInsertContacts();
  const { data: contacts = [] } = useOutreachContacts(activeListId);
  const [newOpen, setNewOpen] = useState(false);
  const [name, setName] = useState(""); const [page, setPage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const createList = () => {
    if (!name.trim()) return;
    create.mutate({ name: name.trim(), instagram_target_page: page.trim() || null }, {
      onSuccess: (l) => { toast.success("Lista creata."); setActiveListId(l.id); setNewOpen(false); setName(""); setPage(""); },
    });
  };

  const importCsv = async (file: File) => {
    if (!activeListId) { toast.error("Seleziona una lista prima."); return; }
    const text = await file.text();
    const rows = parseOutreachCsv(text);
    if (rows.length === 0) { toast.error("Nessuna riga valida nel CSV."); return; }
    bulk.mutate(rows.map((r) => ({ ...r, list_id: activeListId })), {
      onSuccess: (data) => toast.success(`${data?.length ?? rows.length} contatti importati.`),
      onError: (e: Error) => toast.error(e.message),
    });
  };

  const downloadTpl = () => {
    const blob = new Blob([OUTREACH_CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "outreach_contacts_template.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-12 md:col-span-4 p-4 space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Liste</h3>
          <Button size="sm" onClick={() => setNewOpen(true)}><Plus className="h-3 w-3" /></Button>
        </div>
        {lists.length === 0 && <p className="text-xs text-muted-foreground">Nessuna lista.</p>}
        {lists.map((l) => (
          <div key={l.id} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${activeListId === l.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`} onClick={() => setActiveListId(l.id)}>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{l.name}</p>
              {l.instagram_target_page && <p className="text-xs opacity-80 truncate">@{l.instagram_target_page}</p>}
            </div>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); del.mutate(l.id); }}><Trash2 className="h-3 w-3" /></Button>
          </div>
        ))}
      </Card>

      <div className="col-span-12 md:col-span-8 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={downloadTpl}>Scarica template CSV</Button>
          <Button size="sm" onClick={() => fileRef.current?.click()} disabled={!activeListId}><Upload className="h-4 w-4" /> Importa CSV</Button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => e.target.files?.[0] && importCsv(e.target.files[0])} />
          {activeListId && <span className="text-xs text-muted-foreground ml-auto">{contacts.length} contatti</span>}
        </div>

        {activeListId ? (
          <Card className="overflow-hidden">
            <div className="overflow-auto max-h-[60vh]">
              <table className="w-full text-xs">
                <thead className="bg-muted sticky top-0">
                  <tr>
                    <th className="text-left p-2">Creator</th>
                    <th className="text-left p-2">Username</th>
                    <th className="text-left p-2">Followers</th>
                    <th className="text-left p-2">Città</th>
                    <th className="text-left p-2">Età</th>
                    <th className="text-left p-2">Gender</th>
                    <th className="text-left p-2">Milano</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="p-2">{c.creator ?? "—"}</td>
                      <td className="p-2 font-mono">@{c.username}</td>
                      <td className="p-2">{c.followers ?? "—"}</td>
                      <td className="p-2 max-w-[140px] truncate">{c.audience_city ?? "—"}</td>
                      <td className="p-2">{c.age_bucket ?? "—"}</td>
                      <td className="p-2"><Badge variant="outline">{c.gender ?? "—"}</Badge></td>
                      <td className="p-2">{c.is_milan ? "✅" : "—"}</td>
                      <td className="p-2"><Badge variant="secondary">{c.status}</Badge></td>
                    </tr>
                  ))}
                  {contacts.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">Nessun contatto. Importa il CSV.</td></tr>}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-sm text-muted-foreground">Seleziona o crea una lista per iniziare.</Card>
        )}
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nuova lista</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome lista</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="es. Creator fitness MI Q1" /></div>
            <div><Label>Pagina IG di riferimento (opzionale)</Label><Input value={page} onChange={(e) => setPage(e.target.value)} placeholder="mypersonalfit" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setNewOpen(false)}>Annulla</Button><Button onClick={createList}>Crea</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ===================== PRESETS =====================
function PresetsTab() {
  const { data: presets = [] } = useDmPresets();
  const upsert = useUpsertPreset();
  const del = useDeletePreset();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Partial<MktDmPreset> | null>(null);

  const openNew = () => { setEdit({ name: "", channel: "dm", gender: "any", city_filter: "any", age_bucket: "any", body_template: "", is_active: true }); setOpen(true); };

  const save = () => {
    if (!edit?.name || !edit?.body_template) { toast.error("Nome e template richiesti."); return; }
    upsert.mutate(edit as MktDmPreset, { onSuccess: () => { toast.success("Preset salvato."); setOpen(false); }, onError: (e: Error) => toast.error(e.message) });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Preset messaggi</h2>
          <p className="text-sm text-muted-foreground">Il sistema sceglie automaticamente il preset migliore per genere/città/età.</p>
        </div>
        <Button size="sm" onClick={openNew}><Plus className="h-4 w-4" /> Nuovo preset</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {presets.map((p) => (
          <Card key={p.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{p.name}</p>
              <div className="flex gap-1"><Badge variant="outline">{p.channel}</Badge>{!p.is_active && <Badge variant="secondary">off</Badge>}</div>
            </div>
            <div className="flex gap-1 flex-wrap text-xs">
              <Badge variant="secondary">G: {p.gender}</Badge>
              <Badge variant="secondary">{p.city_filter}</Badge>
              <Badge variant="secondary">{p.age_bucket}</Badge>
            </div>
            <p className="text-xs whitespace-pre-wrap line-clamp-4">{p.body_template}</p>
            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => { setEdit(p); setOpen(true); }}>Modifica</Button>
              <Button size="sm" variant="ghost" onClick={() => del.mutate(p.id)}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Preset</DialogTitle></DialogHeader>
          {edit && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div><Label>Nome</Label><Input value={edit.name ?? ""} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></div>
                <div>
                  <Label>Canale</Label>
                  <Select value={edit.channel} onValueChange={(v) => setEdit({ ...edit, channel: v as "dm" | "comment" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="dm">DM</SelectItem><SelectItem value="comment">Commento</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Genere</Label>
                  <Select value={edit.gender} onValueChange={(v) => setEdit({ ...edit, gender: v as "m" | "f" | "any" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="any">Qualsiasi</SelectItem><SelectItem value="m">Uomo</SelectItem><SelectItem value="f">Donna</SelectItem></SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Città</Label>
                  <Select value={edit.city_filter} onValueChange={(v) => setEdit({ ...edit, city_filter: v as "milan" | "non_milan" | "any" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="any">Qualsiasi</SelectItem><SelectItem value="milan">Milano</SelectItem><SelectItem value="non_milan">Non Milano</SelectItem></SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Età</Label>
                  <Select value={edit.age_bucket} onValueChange={(v) => setEdit({ ...edit, age_bucket: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Qualsiasi</SelectItem>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45+">45+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Testo (puoi usare {"{{creator}}"} e {"{{username}}"})</Label>
                <Textarea rows={6} value={edit.body_template ?? ""} onChange={(e) => setEdit({ ...edit, body_template: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={!!edit.is_active} onCheckedChange={(v) => setEdit({ ...edit, is_active: v })} />
                <span className="text-sm">Attivo</span>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Annulla</Button><Button onClick={save}>Salva</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ===================== RUNS =====================
function RunsTab() {
  const { data: runs = [] } = useOutreachRuns();
  const { data: lists = [] } = useOutreachLists();
  const { data: conns = [] } = useMcpConnections();
  const create = useCreateRun();
  const updateStatus = useUpdateRunStatus();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [listId, setListId] = useState<string>("");
  const [connId, setConnId] = useState<string>("");
  const [dryRun, setDryRun] = useState(true);
  const [dailyCapDm, setDailyCapDm] = useState(30);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const { data: actions = [] } = useRunActions(activeRunId);

  const createRun = () => {
    if (!name.trim() || !listId) { toast.error("Nome e lista richiesti."); return; }
    create.mutate({
      name: name.trim(), list_id: listId, mcp_connection_id: connId || null,
      config: { step_delay_min_sec: 30, step_delay_max_sec: 120, contact_delay_min_sec: 120, contact_delay_max_sec: 600, daily_cap_dm: dailyCapDm, daily_cap_follow: Math.max(50, dailyCapDm + 20), comment_strategy: "latest", dry_run: dryRun, steps: ["follow", "dm", "comment"] },
    }, {
      onSuccess: (r) => { toast.success("Campagna creata."); setOpen(false); setActiveRunId(r.id); setName(""); },
      onError: (e: Error) => toast.error(e.message),
    });
  };

  const generate = async (r: MktOutreachRun) => {
    try { const x = await generateRunActions(r.id); toast.success(`${x.created} azioni schedulate.`); } catch (e) { toast.error((e as Error).message); }
  };
  const start = (r: MktOutreachRun) => updateStatus.mutate({ id: r.id, status: "running" }, { onSuccess: () => toast.success("Campagna avviata.") });
  const pause = (r: MktOutreachRun) => updateStatus.mutate({ id: r.id, status: "paused" });

  const tick = async () => {
    try { const x = await tickRunActions(activeRunId ?? undefined); toast.success(`Eseguite ${x.executed}, fallite ${x.failed}.`); } catch (e) { toast.error((e as Error).message); }
  };

  const activeRun = runs.find((r) => r.id === activeRunId);
  const stats = useMemo(() => {
    const s = { total: actions.length, done: 0, pending: 0, failed: 0 };
    for (const a of actions) { if (a.status === "done") s.done++; else if (a.status === "pending") s.pending++; else if (a.status === "failed") s.failed++; }
    return s;
  }, [actions]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Campagne</h2>
          <p className="text-sm text-muted-foreground">Follow → DM → Commento con delay umani e rate limit IG.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={tick}><RefreshCw className="h-4 w-4" /> Esegui tick</Button>
          <Button size="sm" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Nuova campagna</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {runs.map((r) => (
          <Card key={r.id} className={`p-4 cursor-pointer ${activeRunId === r.id ? "ring-2 ring-primary" : ""}`} onClick={() => setActiveRunId(r.id)}>
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium">{r.name}</p>
              <Badge variant={r.status === "running" ? "default" : "secondary"}>{r.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Cap DM/giorno: {r.config?.daily_cap_dm ?? "—"} · {r.config?.dry_run ? "Dry-run" : "Live"}</p>
            <div className="flex gap-1 mt-2">
              <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); generate(r); }}><Sparkles className="h-3 w-3" /> Genera azioni</Button>
              {r.status !== "running" ? (
                <Button size="sm" onClick={(e) => { e.stopPropagation(); start(r); }}><Play className="h-3 w-3" /> Avvia</Button>
              ) : (
                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); pause(r); }}><Pause className="h-3 w-3" /> Pausa</Button>
              )}
            </div>
          </Card>
        ))}
        {runs.length === 0 && <p className="text-sm text-muted-foreground col-span-3">Nessuna campagna.</p>}
      </div>

      {activeRun && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{activeRun.name} — azioni</h3>
            <div className="flex gap-2 text-xs">
              <Badge>Tot: {stats.total}</Badge>
              <Badge variant="default">Fatte: {stats.done}</Badge>
              <Badge variant="secondary">Pending: {stats.pending}</Badge>
              <Badge variant="destructive">Errori: {stats.failed}</Badge>
            </div>
          </div>
          <div className="overflow-auto max-h-96">
            <table className="w-full text-xs">
              <thead className="bg-muted">
                <tr><th className="text-left p-2">Step</th><th className="text-left p-2">Quando</th><th className="text-left p-2">Status</th><th className="text-left p-2">Error</th></tr>
              </thead>
              <tbody>
                {actions.slice(0, 100).map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2"><Badge variant="outline">{a.step}</Badge></td>
                    <td className="p-2">{new Date(a.scheduled_for).toLocaleString()}</td>
                    <td className="p-2"><Badge variant={a.status === "done" ? "default" : a.status === "failed" ? "destructive" : "secondary"}>{a.status}</Badge></td>
                    <td className="p-2 text-destructive max-w-xs truncate">{a.error ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nuova campagna</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div>
              <Label>Lista</Label>
              <Select value={listId} onValueChange={setListId}>
                <SelectTrigger><SelectValue placeholder="Seleziona lista" /></SelectTrigger>
                <SelectContent>{lists.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Connessione MCP (Composio)</Label>
              <Select value={connId} onValueChange={setConnId}>
                <SelectTrigger><SelectValue placeholder="(opzionale — vuoto = solo dry-run)" /></SelectTrigger>
                <SelectContent>{conns.map((c) => <SelectItem key={c.id} value={c.id}>{c.provider} · {c.email}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2"><Switch checked={dryRun} onCheckedChange={setDryRun} /><span className="text-sm">Dry-run (consigliato per i primi test)</span></div>
            <div><Label>Daily cap DM</Label><Input type="number" value={dailyCapDm} onChange={(e) => setDailyCapDm(Number(e.target.value) || 30)} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Annulla</Button><Button onClick={createRun}>Crea</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ===================== REPLIES / ANALYTICS =====================
function RepliesTab() {
  const { data: replies = [] } = useReplies();
  const stats = useMemo(() => {
    const s = { total: replies.length, positive: 0, neutral: 0, negative: 0 };
    for (const r of replies) { if (r.sentiment === "positive") s.positive++; else if (r.sentiment === "negative") s.negative++; else s.neutral++; }
    return s;
  }, [replies]);

  const poll = async () => {
    try { const x = await pollReplies(); toast.success(`Polling: ${x.polled} contatti, ${x.new_replies} nuove risposte.`); } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Risposte</h2>
          <p className="text-sm text-muted-foreground">Sentiment via AI.</p>
        </div>
        <Button size="sm" onClick={poll}><RefreshCw className="h-4 w-4" /> Aggiorna risposte</Button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-4"><p className="text-xs text-muted-foreground">Totale</p><p className="text-2xl font-bold">{stats.total}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Positive</p><p className="text-2xl font-bold text-green-600">{stats.positive}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Neutre</p><p className="text-2xl font-bold">{stats.neutral}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Negative</p><p className="text-2xl font-bold text-red-600">{stats.negative}</p></Card>
      </div>
      <Card>
        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full text-xs">
            <thead className="bg-muted sticky top-0"><tr><th className="text-left p-2">Quando</th><th className="text-left p-2">Canale</th><th className="text-left p-2">Sentiment</th><th className="text-left p-2">Testo</th></tr></thead>
            <tbody>
              {replies.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{new Date(r.received_at).toLocaleString()}</td>
                  <td className="p-2"><Badge variant="outline">{r.channel}</Badge></td>
                  <td className="p-2"><Badge variant={r.sentiment === "positive" ? "default" : r.sentiment === "negative" ? "destructive" : "secondary"}>{r.sentiment ?? "—"}</Badge></td>
                  <td className="p-2 max-w-xl truncate">{r.text}</td>
                </tr>
              ))}
              {replies.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Nessuna risposta ancora.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ===================== ROOT PAGE =====================
export default function Outreach() {
  const [activeListId, setActiveListId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Outreach Instagram</h1>
        <p className="text-sm text-muted-foreground">Follow → DM → Commento, in modo umano-personale. Via Composio MCP.</p>
      </div>

      <Tabs defaultValue="lists">
        <TabsList>
          <TabsTrigger value="lists"><Send className="h-3 w-3" /> Liste</TabsTrigger>
          <TabsTrigger value="presets">Preset DM</TabsTrigger>
          <TabsTrigger value="runs">Campagne</TabsTrigger>
          <TabsTrigger value="replies">Risposte</TabsTrigger>
          <TabsTrigger value="mcp"><SettingsIcon className="h-3 w-3" /> MCP</TabsTrigger>
        </TabsList>
        <TabsContent value="lists" className="mt-4"><ListsTab activeListId={activeListId} setActiveListId={setActiveListId} /></TabsContent>
        <TabsContent value="presets" className="mt-4"><PresetsTab /></TabsContent>
        <TabsContent value="runs" className="mt-4"><RunsTab /></TabsContent>
        <TabsContent value="replies" className="mt-4"><RepliesTab /></TabsContent>
        <TabsContent value="mcp" className="mt-4"><McpSettingsTab /></TabsContent>
      </Tabs>
    </div>
  );
}
