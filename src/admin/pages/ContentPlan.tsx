import { useEffect, useMemo, useState } from "react";
import { Plus, Upload, Lock, Sparkles, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContent, useCreateContent } from "../hooks/useContent";
import { usePersonas } from "../hooks/useLookups";
import { usePlanMonths, useCreatePlanMonth, useClosePlanMonth } from "../hooks/usePlanMonths";
import { scheduleMonth } from "../lib/ai";
import PostEditorDialog from "../components/content/PostEditorDialog";
import CsvImportDialog from "../components/content/CsvImportDialog";
import type { MktContent, MktStatus, MktPlanMonth } from "../types";
import { it } from "../i18n/it";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const COLUMNS: MktStatus[] = ["Draft", "Approval", "Validated", "Scheduled"];

function NewMonthDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (start: string, end: string) => void;
}) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{it.month.new}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>{it.month.startDate}</Label>
            <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <Label>{it.month.endDate}</Label>
            <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{it.common.cancel}</Button>
          <Button
            onClick={() => {
              if (!start || !end) return toast.error("Indica entrambe le date.");
              if (end < start) return toast.error("La data fine deve essere ≥ inizio.");
              onCreate(start, end);
            }}
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
  const { data: months = [] } = usePlanMonths();
  const create = useCreateContent();
  const createMonth = useCreatePlanMonth();
  const closeMonth = useClosePlanMonth();
  const qc = useQueryClient();

  const [editing, setEditing] = useState<MktContent | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [newMonthOpen, setNewMonthOpen] = useState(false);
  const [activeMonthId, setActiveMonthId] = useState<string | null>(null);

  // Default selection: first open month, else first month, else null.
  useEffect(() => {
    if (activeMonthId && months.some((m) => m.id === activeMonthId)) return;
    const first = months.find((m) => m.status === "open") ?? months[0];
    setActiveMonthId(first?.id ?? null);
  }, [months, activeMonthId]);

  const activeMonth: MktPlanMonth | null = useMemo(
    () => months.find((m) => m.id === activeMonthId) ?? null,
    [months, activeMonthId]
  );

  const monthPosts = useMemo(() => {
    if (!activeMonthId) return posts.filter((p) => !p.plan_month_id);
    return posts.filter((p) => p.plan_month_id === activeMonthId);
  }, [posts, activeMonthId]);

  const grouped = useMemo(() => {
    const m: Record<MktStatus, MktContent[]> = { Draft: [], Approval: [], Validated: [], Scheduled: [], Posted: [] };
    monthPosts.forEach((p) => m[p.status as MktStatus]?.push(p));
    return m;
  }, [monthPosts]);

  const personaName = (id: string | null) => personas.find((p) => p.id === id)?.name ?? "—";
  const monthClosed = activeMonth?.status === "closed";

  const aiSchedule = useMutation({
    mutationFn: async () => {
      if (!activeMonthId) throw new Error("Nessun mese selezionato.");
      return scheduleMonth(activeMonthId);
    },
    onSuccess: (r) => {
      toast.success(`${r.scheduled} post calendarizzati dall'AI.`);
      qc.invalidateQueries({ queryKey: ["mkt_content"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleCreateMonth = (start: string, end: string) => {
    createMonth.mutate(
      { start_date: start, end_date: end },
      {
        onSuccess: (m) => {
          setActiveMonthId(m.id);
          setNewMonthOpen(false);
          toast.success(`${m.label} creato.`);
        },
        onError: (e: Error) => toast.error(e.message),
      }
    );
  };

  const handleCloseMonth = () => {
    if (!activeMonth) return;
    if (!confirm(`Chiudere "${activeMonth.label}"? Diventerà read-only.`)) return;
    closeMonth.mutate(activeMonth.id, {
      onSuccess: () => toast.success("Mese chiuso."),
      onError: (e: Error) => toast.error(e.message),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{it.nav.contentPlan}</h1>
          <p className="text-sm text-muted-foreground">
            La factory: bozze, approvazioni, validato e calendarizzato dall'AI.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setImportOpen(true)} disabled={!activeMonth || monthClosed}>
            <Upload className="h-4 w-4" /> Importa template
          </Button>
          <Button
            size="sm"
            onClick={() =>
              create.mutate(
                { plan_month_id: activeMonthId, sequence_number: (monthPosts.length ?? 0) + 1 },
                {
                  onSuccess: (p) => {
                    toast.success("Nuovo post creato.");
                    setEditing(p);
                  },
                }
              )
            }
            disabled={!activeMonth || monthClosed}
          >
            <Plus className="h-4 w-4" /> Nuovo post
          </Button>
        </div>
      </div>

      {/* Month tabs */}
      <div className="flex items-center gap-2 flex-wrap border-b pb-2">
        {months.length === 0 && <p className="text-sm text-muted-foreground">{it.month.none}</p>}
        {months.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMonthId(m.id)}
            className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
              activeMonthId === m.id ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 hover:bg-muted"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {m.label ?? `Mese ${m.month_index}`}
              {m.status === "closed" && <Lock className="h-3 w-3" />}
            </span>
          </button>
        ))}
        <Button variant="outline" size="sm" onClick={() => setNewMonthOpen(true)}>
          <Plus className="h-4 w-4" /> {it.month.new}
        </Button>
      </div>

      {activeMonth && (
        <div className="flex items-center justify-between gap-3 flex-wrap text-sm">
          <p className="text-muted-foreground">
            {activeMonth.start_date} → {activeMonth.end_date}
            {monthClosed && <span className="ml-2"><Badge variant="secondary">{it.month.closed}</Badge></span>}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => aiSchedule.mutate()}
              disabled={monthClosed || aiSchedule.isPending || grouped.Validated.length === 0}
              title="Distribuisce i Validati nei giorni del mese rispettando la sequenza."
            >
              <Sparkles className="h-4 w-4" />
              {aiSchedule.isPending ? it.month.scheduling : it.month.schedule}
            </Button>
            <Button size="sm" variant="outline" onClick={handleCloseMonth} disabled={monthClosed}>
              <CalendarCheck className="h-4 w-4" /> {it.month.close}
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

      <PostEditorDialog post={editing} onClose={() => setEditing(null)} planMonth={activeMonth} />
      <CsvImportDialog open={importOpen} onClose={() => setImportOpen(false)} planMonthId={activeMonthId} />
      <NewMonthDialog open={newMonthOpen} onClose={() => setNewMonthOpen(false)} onCreate={handleCreateMonth} />
    </div>
  );
}
