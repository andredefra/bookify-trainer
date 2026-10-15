import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCorners,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CalendarClock, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { it } from "../i18n/it";
import {
  CRM_PERSONAS,
  CRM_SOURCES,
  CRM_STAGES,
  CrmOpportunity,
  CrmStage,
  useCrmOpportunities,
  useDeleteOpportunity,
  useMoveOpportunity,
  useSaveOpportunity,
} from "../hooks/useCrm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import MembersTab from "../components/crm/MembersTab";
import MemberDialog from "../components/crm/MemberDialog";
import { CrmMember, lowestFreeSeat, useCrmMembers } from "../hooks/useCrmMembers";

const t = it.crm;
const eur = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d: string) => {
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
};

export default function Crm() {
  const [tab, setTab] = useState("pipeline");
  const [member, setMember] = useState<Partial<CrmMember> | null>(null);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="pipeline">{t.tabPipeline}</TabsTrigger>
          <TabsTrigger value="members">{t.tabMembers}</TabsTrigger>
        </TabsList>
        <TabsContent value="pipeline" className="mt-4">
          <Pipeline
            onOpenMember={(m) => {
              if (m.id) setTab("members");
              setMember(m);
            }}
          />
        </TabsContent>
        <TabsContent value="members" className="mt-4">
          <MembersTab onOpen={setMember} />
        </TabsContent>
      </Tabs>
      {member && <MemberDialog key={member.id ?? "new"} initial={member} onClose={() => setMember(null)} />}
    </div>
  );
}

function Pipeline({ onOpenMember }: { onOpenMember: (m: Partial<CrmMember>) => void }) {
  const { data = [], isLoading, error } = useCrmOpportunities();
  const move = useMoveOpportunity();
  const [search, setSearch] = useState("");
  const [persona, setPersona] = useState("all");
  const [editing, setEditing] = useState<Partial<CrmOpportunity> | null>(null);
  const [lostMove, setLostMove] = useState<{ id: string; sort_order: number } | null>(null);
  const [lostReason, setLostReason] = useState("");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return data.filter(
      (o) =>
        (persona === "all" || (persona === "none" ? !o.persona : o.persona === persona)) &&
        (!s || o.full_name.toLowerCase().includes(s) || (o.email ?? "").toLowerCase().includes(s))
    );
  }, [data, search, persona]);

  const byStage = useMemo(() => {
    const m: Record<string, CrmOpportunity[]> = {};
    CRM_STAGES.forEach((s) => (m[s] = []));
    filtered.forEach((o) => m[o.stage]?.push(o));
    Object.values(m).forEach((l) => l.sort((a, b) => Number(a.sort_order) - Number(b.sort_order)));
    return m;
  }, [filtered]);

  const onDragEnd = (e: DragEndEvent) => {
    const id = String(e.active.id);
    const overId = e.over ? String(e.over.id) : null;
    if (!overId) return;
    const card = data.find((o) => o.id === id);
    if (!card) return;

    // Full (unfiltered) column ordering, so sort_order stays consistent.
    const column = (stage: string) =>
      data
        .filter((o) => o.stage === stage && o.id !== id)
        .sort((a, b) => Number(a.sort_order) - Number(b.sort_order));

    let stage: CrmStage;
    let sort: number;
    if (overId.startsWith("col:")) {
      stage = overId.slice(4) as CrmStage;
      const col = column(stage);
      sort = col.length ? Number(col[col.length - 1].sort_order) + 1 : 1;
    } else {
      const target = data.find((o) => o.id === overId);
      if (!target || target.id === id) return;
      stage = target.stage;
      const col = column(stage);
      const idx = col.findIndex((o) => o.id === target.id);
      const prev = idx > 0 ? Number(col[idx - 1].sort_order) : Number(target.sort_order) - 1;
      sort = (prev + Number(target.sort_order)) / 2;
    }
    if (stage === card.stage && sort === Number(card.sort_order)) return;

    if (stage === "perso" && card.stage !== "perso") {
      setLostReason(card.lost_reason ?? "");
      setLostMove({ id, sort_order: sort });
      return;
    }
    move.mutate(
      { id, stage, sort_order: sort },
      { onError: () => toast.error(t.saveError) }
    );
  };

  const confirmLost = () => {
    if (!lostMove) return;
    move.mutate(
      { id: lostMove.id, stage: "perso", sort_order: lostMove.sort_order, lost_reason: lostReason.trim() || null },
      { onError: () => toast.error(t.saveError) }
    );
    setLostMove(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={persona} onValueChange={setPersona}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allPersonas}</SelectItem>
            {CRM_PERSONAS.map((p) => (
              <SelectItem key={p} value={p}>
                {t.personas[p]}
              </SelectItem>
            ))}
            <SelectItem value="none">{t.noPersona}</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Button onClick={() => setEditing({ stage: "nuovo", source: "other" })}>
          <Plus className="h-4 w-4 mr-1" />
          {t.newOpp}
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-destructive">{t.error}</p>
      ) : isLoading ? (
        <p className="text-sm text-muted-foreground">{it.common.loading}</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {CRM_STAGES.map((s) => (
              <Column key={s} stage={s} items={byStage[s]} onOpen={(o) => setEditing(o)} />
            ))}
          </div>
        </DndContext>
      )}

      {editing && (
        <OpportunityDialog
          initial={editing}
          onClose={() => setEditing(null)}
          onOpenMember={(m) => {
            setEditing(null);
            onOpenMember(m);
          }}
          nextSort={(stage) => {
            const col = data.filter((o) => o.stage === stage);
            return col.length ? Math.max(...col.map((o) => Number(o.sort_order))) + 1 : 1;
          }}
        />
      )}

      <Dialog open={!!lostMove} onOpenChange={(o) => !o && setLostMove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.lostTitle}</DialogTitle>
            <DialogDescription>{t.lostPrompt}</DialogDescription>
          </DialogHeader>
          <Textarea autoFocus value={lostReason} onChange={(e) => setLostReason(e.target.value)} rows={3} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setLostMove(null)}>
              {it.common.cancel}
            </Button>
            <Button onClick={confirmLost}>{it.common.confirm}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Column({ stage, items, onOpen }: { stage: CrmStage; items: CrmOpportunity[]; onOpen: (o: CrmOpportunity) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: `col:${stage}` });
  const total = items.reduce((s, o) => s + (Number(o.value_eur) || 0), 0);
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-72 shrink-0 rounded-lg border bg-muted/40 flex flex-col",
        isOver && "ring-2 ring-primary"
      )}
    >
      <div className="px-3 py-2 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{t.stages[stage]}</span>
          <Badge variant="secondary">{items.length}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{eur(total)}</p>
      </div>
      <div className="p-2 space-y-2 min-h-[120px] flex-1">
        {items.length === 0 && <p className="text-xs text-muted-foreground text-center py-6">{t.empty}</p>}
        {items.map((o) => (
          <Card key={o.id} o={o} onOpen={() => onOpen(o)} />
        ))}
      </div>
    </div>
  );
}

function Card({ o, onOpen }: { o: CrmOpportunity; onOpen: () => void }) {
  const drag = useDraggable({ id: o.id });
  const drop = useDroppable({ id: o.id });
  const overdue = !!o.next_step_date && o.next_step_date < todayStr();
  const style = drag.transform
    ? { transform: `translate3d(${drag.transform.x}px, ${drag.transform.y}px, 0)`, zIndex: 50 }
    : undefined;
  return (
    <div
      ref={(el) => {
        drag.setNodeRef(el);
        drop.setNodeRef(el);
      }}
      style={style}
      {...drag.listeners}
      {...drag.attributes}
      onClick={onOpen}
      className={cn(
        "rounded-md border bg-card p-3 text-sm shadow-sm cursor-grab active:cursor-grabbing space-y-1.5",
        drag.isDragging && "opacity-80 shadow-lg",
        drop.isOver && !drag.isDragging && "border-primary"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium leading-tight">{o.full_name}</span>
        {o.persona && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {(t.personas as any)[o.persona] ?? o.persona}
          </Badge>
        )}
      </div>
      {o.value_eur != null && <p className="text-xs font-semibold">{eur(Number(o.value_eur))}</p>}
      {(o.next_step || o.next_step_date) && (
        <div className={cn("flex items-start gap-1 text-xs", overdue ? "text-destructive" : "text-muted-foreground")}>
          <CalendarClock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span>
            {o.next_step}
            {o.next_step_date && (
              <span className={cn("ml-1", overdue && "font-semibold")}>
                · {fmtDate(o.next_step_date)}
                {overdue && ` (${t.overdue})`}
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

function OpportunityDialog({
  initial,
  onClose,
  nextSort,
  onOpenMember,
}: {
  initial: Partial<CrmOpportunity>;
  onClose: () => void;
  onOpenMember: (m: Partial<CrmMember>) => void;
  nextSort: (stage: string) => number;
}) {
  const [f, setF] = useState<Partial<CrmOpportunity>>(initial);
  const [confirmDel, setConfirmDel] = useState(false);
  const save = useSaveOpportunity();
  const del = useDeleteOpportunity();
  const { data: members = [] } = useCrmMembers();
  const linked = f.id ? members.find((m) => m.opportunity_id === f.id) : undefined;
  const set = (k: keyof CrmOpportunity, v: any) => setF((p) => ({ ...p, [k]: v }));
  const txt = (k: keyof CrmOpportunity) => ({
    value: (f[k] as any) ?? "",
    onChange: (e: any) => set(k, e.target.value === "" ? null : e.target.value),
  });

  const submit = () => {
    if (!f.full_name?.trim()) return;
    const payload: any = { ...f, full_name: f.full_name.trim() };
    payload.value_eur = f.value_eur === null || (f.value_eur as any) === "" || f.value_eur === undefined ? null : Number(f.value_eur);
    if (!f.id || f.stage !== initial.stage) payload.sort_order = nextSort(f.stage!);
    save.mutate(payload, {
      onSuccess: () => {
        toast.success(t.saved);
        onClose();
      },
      onError: () => toast.error(t.saveError),
    });
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{f.id ? t.editOpp : t.newOpp}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <Field label={`${t.fields.full_name} *`} className="col-span-2">
            <Input {...txt("full_name")} />
          </Field>
          <Field label={t.fields.email}>
            <Input type="email" {...txt("email")} />
          </Field>
          <Field label={t.fields.phone}>
            <Input {...txt("phone")} />
          </Field>
          <Field label={t.fields.city}>
            <Input {...txt("city")} />
          </Field>
          <Field label={t.fields.instagram_handle}>
            <Input {...txt("instagram_handle")} />
          </Field>
          <Field label={t.fields.persona}>
            <Select value={f.persona ?? "none"} onValueChange={(v) => set("persona", v === "none" ? null : v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t.noPersona}</SelectItem>
                {CRM_PERSONAS.map((p) => <SelectItem key={p} value={p}>{t.personas[p]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label={t.fields.source}>
            <Select value={f.source ?? "other"} onValueChange={(v) => set("source", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CRM_SOURCES.map((s) => <SelectItem key={s} value={s}>{t.sources[s]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label={t.fields.stage}>
            <Select value={f.stage ?? "nuovo"} onValueChange={(v) => set("stage", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CRM_STAGES.map((s) => <SelectItem key={s} value={s}>{t.stages[s]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label={t.fields.value_eur}>
            <Input type="number" min={0} step="1" {...txt("value_eur")} />
          </Field>
          <Field label={t.fields.next_step}>
            <Input {...txt("next_step")} />
          </Field>
          <Field label={t.fields.next_step_date}>
            <Input type="date" {...txt("next_step_date")} />
          </Field>
          {f.stage === "perso" && (
            <Field label={t.fields.lost_reason} className="col-span-2">
              <Textarea rows={2} {...txt("lost_reason")} />
            </Field>
          )}
          <Field label={t.fields.notes} className="col-span-2">
            <Textarea rows={4} {...txt("notes")} />
          </Field>
        </div>
        <DialogFooter className="sm:justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {f.id && (
              <Button variant="destructive" onClick={() => setConfirmDel(true)}>
                {it.common.delete}
              </Button>
            )}
            {f.id && linked && (
              <Button variant="link" className="px-1" onClick={() => onOpenMember(linked)}>
                {t.openMember(linked.seat_number)}
              </Button>
            )}
            {f.id && !linked && initial.stage === "firmato" && f.stage === "firmato" && (
              <Button
                variant="secondary"
                onClick={() => {
                  const seat = lowestFreeSeat(members);
                  if (seat == null) return toast.error(t.members.programmeFull);
                  onOpenMember({
                    opportunity_id: f.id,
                    seat_number: seat,
                    full_name: f.full_name ?? "",
                    email: f.email ?? null,
                    phone: f.phone ?? null,
                    city: f.city ?? null,
                    contract_status: "firmato",
                    penalty_card: "nessuno",
                  });
                }}
              >
                {t.createMember}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>{it.common.cancel}</Button>
            <Button onClick={submit} disabled={!f.full_name?.trim() || save.isPending}>{it.common.save}</Button>
          </div>
        </DialogFooter>
      </DialogContent>

      <AlertDialog open={confirmDel} onOpenChange={setConfirmDel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{it.common.delete}</AlertDialogTitle>
            <AlertDialogDescription>{t.confirmDelete}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{it.common.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                del.mutate(f.id!, {
                  onSuccess: () => { toast.success(t.deleted); onClose(); },
                  onError: () => toast.error(t.saveError),
                })
              }
            >
              {it.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
