import { useEffect, useMemo, useRef, useState } from "react";
import { read, utils } from "xlsx";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { parseCsv } from "../../lib/csv";
import { buildTextPreview, defaultPhaseIndex, TEXT_FIELDS, type TrackerSheet, type TextPreview } from "../../lib/contentTextUpdate";
import { useContentTextUpdate } from "../../hooks/useContentTextUpdate";
import type { MktContent, MktPlanPhase } from "../../types";

const FIELD_LABELS = { post_copy: "Testo del post", cta: "CTA", media_prompt: "Media Prompt" };
const snippet = (value: string | null | undefined) => value ? value.slice(0, 100) + (value.length > 100 ? "…" : "") : "(vuoto)";

export default function UpdateTextsDialog({ open, onClose, phases, posts, activePhaseId }: {
  open: boolean; onClose: () => void; phases: MktPlanPhase[]; posts: MktContent[]; activePhaseId: string | null;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [sheets, setSheets] = useState<TrackerSheet[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");
  const [reading, setReading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [snapshot, setSnapshot] = useState<TextPreview | null>(null);
  const update = useContentTextUpdate();
  useEffect(() => {
    if (open) { setSheets([]); setMapping({}); setFilename(""); setError(""); setCompleted(0); setSnapshot(null); update.reset(); }
  }, [open]);
  const preview = useMemo(() => snapshot ?? buildTextPreview(sheets, mapping, phases, posts), [sheets, mapping, phases, posts, snapshot]);
  const locked = reading || update.isPending || update.isSuccess;
  const loadFile = async (file: File) => {
    setReading(true); setError(""); setSnapshot(null); update.reset();
    try {
      if (!/\.(xlsx|csv)$/i.test(file.name)) throw new Error("Seleziona un file .xlsx o .csv.");
      let next: TrackerSheet[];
      if (/\.csv$/i.test(file.name)) next = [{ name: file.name, rows: parseCsv(await file.text()) }];
      else {
        const workbook = read(await file.arrayBuffer(), { type: "array" });
        next = workbook.SheetNames.map((name) => ({ name, rows: parseCsv(utils.sheet_to_csv(workbook.Sheets[name])) }));
      }
      setSheets(next); setFilename(file.name);
      setMapping(Object.fromEntries(next.map((sheet) => [sheet.name, /\.csv$/i.test(file.name) ? activePhaseId ?? "ignore" : phases.find((phase) => phase.phase_index === defaultPhaseIndex(sheet.name))?.id ?? "ignore"])));
    } catch (e) { setSheets([]); setError(e instanceof Error ? e.message : "Impossibile leggere il file."); }
    finally { setReading(false); }
  };
  const backup = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(preview.changes.map((change) => ({ id: change.id, plan_phase_id: change.phaseId, sequence_number: change.sequence, ...change.before })), null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = `backup-testi-${new Date().toISOString().slice(0, 10)}.json`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <Dialog open={open} onOpenChange={(value) => !value && !update.isPending && !reading && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" onEscapeKeyDown={(e) => locked && e.preventDefault()} onInteractOutside={(e) => locked && e.preventDefault()}>
        <DialogHeader><DialogTitle>Aggiorna testi da Excel</DialogTitle></DialogHeader>
        <div className="space-y-4 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="outline" disabled={locked} onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" />{reading ? "Lettura…" : "Seleziona Excel o CSV"}</Button>
            <span className="text-sm text-muted-foreground break-all">{filename}</span>
            <input ref={fileRef} className="hidden" type="file" accept=".xlsx,.csv" onChange={(e) => { const file = e.target.files?.[0]; if (file) void loadFile(file); e.target.value = ""; }} />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {sheets.map((sheet) => (
            <div key={sheet.name} className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center text-sm">
              <span className="break-words">{sheet.name} ({sheet.rows.length} righe)</span>
              <Select value={mapping[sheet.name] ?? "ignore"} disabled={locked} onValueChange={(value) => setMapping((old) => ({ ...old, [sheet.name]: value }))}>
                <SelectTrigger aria-label={`Fase per ${sheet.name}`}><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="ignore">Ignora foglio</SelectItem>{phases.map((phase) => <SelectItem key={phase.id} value={phase.id}>{phase.label ?? `Fase ${phase.phase_index}`}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          ))}
          {sheets.length > 0 && <>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{preview.changes.length} post da aggiornare</p>
              {phases.filter((phase) => Object.values(mapping).includes(phase.id)).map((phase) => <p key={phase.id}>{phase.label ?? `Fase ${phase.phase_index}`}: {preview.changes.filter((c) => c.phaseId === phase.id).length} post</p>)}
              <p>Invariati: {preview.unchanged} · Non trovati: {preview.notFound.length}</p>
            </div>
            <div className="max-h-64 overflow-auto border rounded-md">
              <table className="w-full text-xs"><thead className="bg-muted"><tr>{["Fase", "#", "Campo", "Prima → Dopo"].map((label) => <th key={label} className="p-2 text-left">{label}</th>)}</tr></thead>
                <tbody>{preview.changes.flatMap((change) => TEXT_FIELDS.filter((field) => field in change.patch).map((field) => <tr key={`${change.id}-${field}`} className="border-t"><td className="p-2">{change.phase}</td><td className="p-2">{change.sequence}</td><td className="p-2">{FIELD_LABELS[field]}</td><td className="p-2 break-words max-w-sm">{snippet(change.before[field])} → {snippet(change.patch[field])}</td></tr>))}</tbody>
              </table>
            </div>
            {preview.notFound.length > 0 && <div className="max-h-32 overflow-auto text-xs space-y-1"><p className="font-semibold">Righe non trovate / saltate</p>{preview.notFound.map((row, index) => <p key={index}>{row.phase} · #{row.sequence}: {row.reason}</p>)}</div>}
          </>}
          {(update.isPending || update.data) && <><Progress aria-label="Avanzamento aggiornamento testi" value={preview.changes.length ? completed / preview.changes.length * 100 : 0} /><p className="text-sm">{completed} / {preview.changes.length}</p></>}
          {update.data && <div role="status" className="text-sm space-y-2"><p>Aggiornati: {update.data.updated} · Invariati: {preview.unchanged} · Non trovati: {preview.notFound.length}</p>{update.data.failures.length > 0 && <div className="text-destructive max-h-32 overflow-auto"><p>Non aggiornati: {update.data.failures.length}</p>{update.data.failures.map((failure, index) => <p key={index}>{failure}</p>)}</div>}</div>}
          {update.error && <p role="alert" className="text-sm text-destructive">{update.error.message}</p>}
        </div>
        <DialogFooter className="gap-2 flex-wrap">
          <Button variant="outline" disabled={update.isPending || reading} onClick={onClose}>{update.isSuccess ? "Chiudi" : "Annulla"}</Button>
          {!update.isSuccess && <><Button variant="outline" disabled={locked || !preview.changes.length} onClick={backup}><Download className="h-4 w-4" />Scarica backup (JSON)</Button>
            <Button disabled={locked || !preview.changes.length} onClick={() => { setSnapshot(preview); setCompleted(0); update.mutate({ changes: preview.changes, onProgress: setCompleted }); }}>Applica modifiche</Button></>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}