import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { sb } from "../../lib/sb";
import { uploadToBucket, packBucketUrl, bucketAndPathFromUrl } from "../../lib/storage";
import type { MktContent, MktPlanPhase } from "../../types";

const MEDIA_RE = /\.(jpe?g|png|gif|webp|heic|avif|mp4|mov|m4v|webm)$/i;
const DEFAULT_SKIP = "1:13, 1:16, 1:24, 1:32, 1:40, 1:48, 1:54, 1:60, 1:63, 1:66";

type Group = { key: string; post: MktContent; phaseIndex: number; seq: number; files: File[] };
type Rejected = { path: string; reason: string };

const isValid = (v: string | null | undefined) => !!v && bucketAndPathFromUrl(v) !== null;

export default function ImportMediaFolderDialog({
  open, onClose, phases, posts,
}: { open: boolean; onClose: () => void; phases: MktPlanPhase[]; posts: MktContent[] }) {
  const qc = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);
  const [skipText, setSkipText] = useState(DEFAULT_SKIP);
  const [cleanInvalid, setCleanInvalid] = useState(true);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);

  const { groups, rejected } = useMemo(() => {
    const skip = new Set(skipText.split(",").map((s) => s.replace(/\s/g, "")).filter(Boolean));
    const map = new Map<string, Group>();
    const rejected: Rejected[] = [];
    for (const f of files) {
      const path = (f as any).webkitRelativePath || f.name;
      if (f.name === ".DS_Store" || !MEDIA_RE.test(f.name)) { rejected.push({ path, reason: "Non è un'immagine o un video" }); continue; }
      const parts = path.split("/");
      const phaseM = path.match(/phase\s*(\d+)/i);
      const inner = parts.length > 1 ? parts[parts.length - 2] : "";
      const postM = inner.match(/post\s*(\d+)/i);
      if (!phaseM || !postM) { rejected.push({ path, reason: "Fase o post non trovati nel percorso" }); continue; }
      const pi = Number(phaseM[1]); const seq = Number(postM[1]);
      if (skip.has(`${pi}:${seq}`)) { rejected.push({ path, reason: "Saltato (lista)" }); continue; }
      if (seq === 24 && (/ F4 /.test(path) || /- F4 -/.test(path))) { rejected.push({ path, reason: "Saltato (F4 post 24)" }); continue; }
      const phase = phases.find((p) => p.phase_index === pi);
      if (!phase) { rejected.push({ path, reason: `Fase ${pi} non presente nel piano` }); continue; }
      const post = posts.find((p) => p.plan_phase_id === phase.id && p.sequence_number === seq);
      if (!post) { rejected.push({ path, reason: `Post #${seq} non trovato in Mese ${pi}` }); continue; }
      const key = `${pi}:${seq}`;
      if (!map.has(key)) map.set(key, { key, post, phaseIndex: pi, seq, files: [] });
      map.get(key)!.files.push(f);
    }
    const groups = [...map.values()].sort((a, b) => a.phaseIndex - b.phaseIndex || a.seq - b.seq);
    groups.forEach((g) => g.files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })));
    return { groups, rejected };
  }, [files, skipText, phases, posts]);

  const invalidCount = useMemo(() => posts.reduce((n, p) => {
    const bad = (p.media_urls ?? []).filter((v) => !isValid(v)).length + (p.media_url && !isValid(p.media_url) && !(p.media_urls ?? []).includes(p.media_url) ? 1 : 0);
    return n + bad;
  }, 0), [posts]);

  const reset = () => { setFiles([]); setDone(0); setTotal(0); setSummary(null); };

  const upload = async () => {
    const jobs = groups.flatMap((g) => g.files.map((f, i) => ({ g, f, i })));
    const results = new Map<string, (string | null)[]>();
    groups.forEach((g) => results.set(g.key, new Array(g.files.length).fill(null)));
    setBusy(true); setTotal(jobs.length); setDone(0); setSummary(null);
    let errors = 0; let uploaded = 0; let next = 0;
    const worker = async () => {
      while (next < jobs.length) {
        const j = jobs[next++];
        try {
          const path = await uploadToBucket("mkt-media", j.f, j.g.post.id);
          results.get(j.g.key)![j.i] = packBucketUrl("mkt-media", path);
          uploaded++;
        } catch { errors++; }
        setDone((d) => d + 1);
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    let updated = 0;
    for (const g of groups) {
      const urls = results.get(g.key)!.filter(Boolean) as string[];
      if (!urls.length) continue;
      // Uploaded files replace the old list; with cleaning off, keep nothing else either (replace semantics).
      const { error } = await sb.from("mkt_content").update({ media_urls: urls, media_url: urls[0] }).eq("id", g.post.id);
      if (error) errors++; else updated++;
    }
    if (cleanInvalid) await cleanAll(false);
    setBusy(false);
    setSummary(`Post aggiornati: ${updated} · File caricati: ${uploaded} · Errori: ${errors}`);
    qc.invalidateQueries({ queryKey: ["mkt_content"] });
  };

  const cleanAll = async (ask = true) => {
    if (ask) {
      if (!invalidCount) { toast.info("Nessun media non valido"); return; }
      if (!confirm(`Rimuovere ${invalidCount} valori non validi ("Draft", link Drive…) dai media di tutti i post?`)) return;
    }
    let fixed = 0;
    for (const p of posts) {
      const list = p.media_urls ?? [];
      const clean = list.filter(isValid);
      const mediaBad = !!p.media_url && !isValid(p.media_url);
      if (clean.length === list.length && !mediaBad) continue;
      const { error } = await sb.from("mkt_content").update({ media_urls: clean, media_url: clean[0] ?? null }).eq("id", p.id);
      if (!error) fixed++;
    }
    qc.invalidateQueries({ queryKey: ["mkt_content"] });
    if (ask) toast.success(`Puliti ${fixed} post`);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !busy) { reset(); onClose(); } }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Importa media da cartella</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Cartella "Posts"</Label>
            <input
              type="file"
              multiple
              {...({ webkitdirectory: "", directory: "" } as any)}
              onChange={(e) => { setFiles(Array.from(e.target.files ?? [])); setSummary(null); }}
              disabled={busy}
              className="block text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label>Salta questi post (fase:post, separati da virgola)</Label>
            <Input value={skipText} onChange={(e) => setSkipText(e.target.value)} disabled={busy} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={cleanInvalid} onCheckedChange={(v) => setCleanInvalid(!!v)} disabled={busy} />
            Rimuovi 'Draft' e link non validi dai media
          </label>

          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Post trovati: {groups.length}</p>
              <div className="max-h-48 overflow-y-auto rounded border p-2 text-sm">
                {groups.map((g) => <div key={g.key}>Mese {g.phaseIndex} #{g.seq} — {g.files.length} file</div>)}
                {!groups.length && <p className="text-muted-foreground">Nessun post corrispondente</p>}
              </div>
              {rejected.length > 0 && (
                <>
                  <p className="text-sm font-medium">File non abbinati o saltati: {rejected.length}</p>
                  <div className="max-h-40 overflow-y-auto rounded border p-2 text-xs text-muted-foreground">
                    {rejected.map((r, i) => <div key={i}>{r.path} — {r.reason}</div>)}
                  </div>
                </>
              )}
            </div>
          )}

          {total > 0 && (
            <div className="space-y-1">
              <Progress value={(done / total) * 100} />
              <p className="text-xs text-muted-foreground">{done} / {total} file</p>
            </div>
          )}
          {summary && <p className="text-sm font-medium">{summary}</p>}

          <div className="border-t pt-3">
            <Button variant="outline" size="sm" onClick={() => cleanAll(true)} disabled={busy}>
              Pulisci media non validi (tutte le fasi){invalidCount ? ` — ${invalidCount}` : ""}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => { reset(); onClose(); }} disabled={busy}>Chiudi</Button>
          <Button onClick={upload} disabled={busy || !groups.length}>{busy ? "Caricamento…" : "Carica"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
