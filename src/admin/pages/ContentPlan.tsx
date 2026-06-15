import { useEffect, useMemo, useState } from "react";
import { Plus, Upload, Lock, Sparkles, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContent, useCreateContent } from "../hooks/useContent";
import { usePersonas } from "../hooks/useLookups";
import { usePlanPhases, useCreatePlanPhase, useClosePlanPhase } from "../hooks/usePlanPhases";
import { schedulePhase } from "../lib/ai";
import PostEditorDialog from "../components/content/PostEditorDialog";
import CsvImportDialog from "../components/content/CsvImportDialog";
import type { MktContent, MktStatus, MktPlanPhase } from "../types";
import { it } from "../i18n/it";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const COLUMNS: MktStatus[] = ["Draft", "Approval", "Validated", "Scheduled"];

function NewPhaseDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (label: string | null, description: string | null, target: number | null) => void;
}) {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  useEffect(() => {
    if (open) { setLabel(""); setDescription(""); setTarget(""); }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{it.phase.new}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>{it.phase.label} (opzionale)</Label>
            <Input
              placeholder='es. "Fase 1 — Awareness"'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <Label>{it.phase.description} (opzionale)</Label>
            <Textarea
              placeholder="Obiettivo della fase, persona target, tono..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label>{it.phase.targetCount} (opzionale)</Label>
            <Input
              type="number"
              min={1}
              placeholder="es. 12"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{it.common.cancel}</Button>
          <Button
            onClick={() =>
              onCreate(
                label.trim() || null,
                description.trim() || null,
                target ? Number(target) : null
              )
            }
          >
            {it.common.create}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ContentPlan() {
  const { data: posts = [] } = useContent();
  const { data: personas = [] } = usePersonas();
  const { data: phases = [] } = usePlanPhases();
  const create = useCreateContent();
  const createPhase = useCreatePlanPhase();
  const closePhase = useClosePlanPhase();
  const qc = useQueryClient();

  const [editing, setEditing] = useState<MktContent | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [newPhaseOpen, setNewPhaseOpen] = useState(false);
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null);

  // Default selection: first open phase, else first phase, else null.
  useEffect(() => {
    if (activePhaseId && phases.some((m) => m.id === activePhaseId)) return;
    const first = phases.find((m) => m.status === "open") ?? phases[0];
    setActivePhaseId(first?.id ?? null);
  }, [phases, activePhaseId]);

  const activePhase: MktPlanPhase | null = useMemo(
    () => phases.find((m) => m.id === activePhaseId) ?? null,
    [phases, activePhaseId]
  );

  const phasePosts = useMemo(() => {
    if (!activePhaseId) return posts.filter((p) => !p.plan_phase_id);
    return posts.filter((p) => p.plan_phase_id === activePhaseId);
  }, [posts, activePhaseId]);

  const grouped = useMemo(() => {
    const m: Record<MktStatus, MktContent[]> = { Draft: [], Approval: [], Validated: [], Scheduled: [], Posted: [] };
    phasePosts.forEach((p) => m[p.status as MktStatus]?.push(p));
    return m;
  }, [phasePosts]);

  const personaName = (id: string | null) => personas.find((p) => p.id === id)?.name ?? "—";
  const phaseClosed = activePhase?.status === "closed";

  const aiSchedule = useMutation({
    mutationFn: async () => {
      if (!activePhaseId) throw new Error("Nessuna fase selezionata.");
      return schedulePhase(activePhaseId);
    },
    onSuccess: (r) => {
      toast.success(`${r.scheduled} post calendarizzati dall'AI.`);
      qc.invalidateQueries({ queryKey: ["mkt_content"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleCreatePhase = (label: string | null, description: string | null, target: number | null) => {
    createPhase.mutate(
      { label, description, target_post_count: target },
      {
        onSuccess: (m) => {
          setActivePhaseId(m.id);
          setNewPhaseOpen(false);
          toast.success(`${m.label} creata.`);
        },
        onError: (e: Error) => toast.error(e.message),
      }
    );
  };

  const handleClosePhase = () => {
    if (!activePhase) return;
    if (!confirm(`Chiudere "${activePhase.label}"? Diventerà read-only.`)) return;
    closePhase.mutate(activePhase.id, {
      onSuccess: () => toast.success("Fase chiusa."),
      onError: (e: Error) => toast.error(e.message),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{it.nav.contentPlan}</h1>
          <p className="text-sm text-muted-foreground">
            Produci i post in fasi sequenziali. L'AI calendarizzerà rispettando l'ordine: Fase 1 prima della Fase 2.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setImportOpen(true)} disabled={!activePhase || phaseClosed}>
            <Upload className="h-4 w-4" /> Importa template
          </Button>
          <Button
            size="sm"
            onClick={() =>
              create.mutate(
                { plan_phase_id: activePhaseId, sequence_number: (phasePosts.length ?? 0) + 1 },
                {
                  onSuccess: (p) => {
                    toast.success("Nuovo post creato.");
                    setEditing(p);
                  },
                }
              )
            }
            disabled={!activePhase || phaseClosed}
          >
            <Plus className="h-4 w-4" /> Nuovo post
          </Button>
        </div>
      </div>

      {/* Phase tabs */}
      <div className="flex items-center gap-2 flex-wrap border-b pb-2">
        {phases.length === 0 && <p className="text-sm text-muted-foreground">{it.phase.none}</p>}
        {phases.map((m) => (
          <button
            key={m.id}
            onClick={() => setActivePhaseId(m.id)}
            className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
              activePhaseId === m.id ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 hover:bg-muted"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {m.label ?? `Fase ${m.phase_index}`}
              {m.status === "closed" && <Lock className="h-3 w-3" />}
            </span>
          </button>
        ))}
        <Button variant="outline" size="sm" onClick={() => setNewPhaseOpen(true)}>
          <Plus className="h-4 w-4" /> {it.phase.new}
        </Button>
      </div>

      {activePhase && (
        <div className="flex items-center justify-between gap-3 flex-wrap text-sm">
          <div className="text-muted-foreground space-y-0.5">
            {activePhase.description && <p>{activePhase.description}</p>}
            {activePhase.target_post_count != null && (
              <p className="text-xs">Target: {phasePosts.length}/{activePhase.target_post_count} post</p>
            )}
            {phaseClosed && <Badge variant="secondary">{it.phase.closed}</Badge>}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => aiSchedule.mutate()}
              disabled={phaseClosed || aiSchedule.isPending || grouped.Validated.length === 0}
              title="L'AI assegna date future ai Validati, rispettando la sequenza globale tra le fasi."
            >
              <Sparkles className="h-4 w-4" />
              {aiSchedule.isPending ? it.phase.scheduling : it.phase.schedule}
            </Button>
            <Button size="sm" variant="outline" onClick={handleClosePhase} disabled={phaseClosed}>
              <CalendarCheck className="h-4 w-4" /> {it.phase.close}
            </Button>
          </div>
        </div>
      )}

      {/* 4-column kanban */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((status) => (
          <div key={status}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium">{it.status[status]}</h2>
              <Badge variant="secondary">{grouped[status].length}</Badge>
            </div>
            <div className="space-y-2 min-h-32">
              {grouped[status].length === 0 ? (
                <p className="text-xs text-muted-foreground p-3">Nessun post.</p>
              ) : (
                grouped[status].map((p) => (
                  <Card
                    key={p.id}
                    className="p-3 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => setEditing(p)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium line-clamp-1">
                        {p.hook || p.post_copy?.slice(0, 80) || "Nuovo post"}
                      </p>
                      {p.sequence_number != null && (
                        <Badge variant="outline" className="font-mono text-[10px] shrink-0">
                          #{p.sequence_number}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {personaName(p.persona_id)} · {p.content_format ?? "—"} · {p.funnel_stage ?? "—"}
                    </p>
                    {p.scheduled_date && (
                      <p className="text-xs text-muted-foreground mt-1">
                        📅 {p.scheduled_date} {p.scheduled_time?.slice(0, 5) ?? ""}
                      </p>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <PostEditorDialog post={editing} onClose={() => setEditing(null)} planPhase={activePhase} />
      <CsvImportDialog open={importOpen} onClose={() => setImportOpen(false)} planPhaseId={activePhaseId} />
      <NewPhaseDialog open={newPhaseOpen} onClose={() => setNewPhaseOpen(false)} onCreate={handleCreatePhase} />
    </div>
  );
}
