import { useMemo, useState } from "react";
import { DndContext, useDraggable, useDroppable, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent, useUpdateContent } from "../hooks/useContent";
import { usePersonas } from "../hooks/useLookups";
import PublishingCard from "../components/calendar/PublishingCard";
import type { MktContent } from "../types";
import { it } from "../i18n/it";
import { toast } from "sonner";

function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d: Date, n: number) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function fmtDate(d: Date) { return d.toISOString().slice(0, 10); }

function DraggablePost({ post, onClick, isOverdue }: { post: MktContent; onClick: () => void; isOverdue: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: post.id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer truncate ${
        post.status === "Posted" ? "bg-emerald-100 text-emerald-900" : "bg-primary/15 text-primary"
      } ${isOverdue ? "ring-1 ring-destructive" : ""} ${isDragging ? "opacity-40" : ""}`}
      title={post.hook ?? post.post_copy ?? ""}
    >
      {post.scheduled_time?.slice(0, 5) ?? ""} {post.hook?.slice(0, 24) ?? "Post"}
    </div>
  );
}

function DayCell({ date, children }: { date: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: date });
  return (
    <div
      ref={setNodeRef}
      className={`border rounded-md p-1.5 min-h-24 bg-card ${isOver ? "ring-2 ring-primary" : ""}`}
    >
      <p className="text-[10px] text-muted-foreground mb-1">{date.slice(8)}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export default function CalendarPage() {
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [selected, setSelected] = useState<MktContent | null>(null);
  const { data: posts = [] } = useContent();
  const { data: personas = [] } = usePersonas();
  const update = useUpdateContent();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const visible = useMemo(
    () => posts.filter((p) => p.status === "Scheduled" || p.status === "Posted"),
    [posts]
  );

  const days = useMemo(() => {
    const first = startOfMonth(month);
    const dayOfWeek = (first.getDay() + 6) % 7; // Monday-first
    const result: (string | null)[] = [];
    for (let i = 0; i < dayOfWeek; i++) result.push(null);
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= last; d++) result.push(fmtDate(new Date(month.getFullYear(), month.getMonth(), d)));
    return result;
  }, [month]);

  const byDay = useMemo(() => {
    const m: Record<string, MktContent[]> = {};
    visible.forEach((p) => {
      if (!p.scheduled_date) return;
      (m[p.scheduled_date] ??= []).push(p);
    });
    return m;
  }, [visible]);

  const todayStr = fmtDate(new Date());

  const onDragEnd = (e: DragEndEvent) => {
    const postId = String(e.active.id);
    const date = e.over?.id ? String(e.over.id) : null;
    if (!date) return;
    update.mutate(
      { id: postId, patch: { scheduled_date: date } },
      { onSuccess: () => toast.success(`Spostato al ${date}`) }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{it.nav.calendar}</h1>
          <p className="text-sm text-muted-foreground">Solo post validati e pubblicati. Trascina per riprogrammare.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => setMonth(addMonths(month, -1))}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm font-medium w-32 text-center">
            {month.toLocaleDateString("it-IT", { month: "long", year: "numeric" })}
          </span>
          <Button size="icon" variant="outline" onClick={() => setMonth(addMonths(month, 1))}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="p-3">
        <div className="grid grid-cols-7 gap-1.5 text-[11px] text-muted-foreground text-center mb-1">
          {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((d) => <div key={d}>{d}</div>)}
        </div>
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d, i) =>
              d === null ? (
                <div key={i} />
              ) : (
                <DayCell key={d} date={d}>
                  {(byDay[d] ?? []).map((p) => (
                    <DraggablePost
                      key={p.id}
                      post={p}
                      onClick={() => setSelected(p)}
                      isOverdue={p.status !== "Posted" && d < todayStr}
                    />
                  ))}
                </DayCell>
              )
            )}
          </div>
        </DndContext>
      </Card>

      <div className="flex gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Badge variant="secondary" className="bg-primary/15 text-primary">Calendarizzato</Badge></span>
        <span className="flex items-center gap-1"><Badge variant="secondary" className="bg-emerald-100 text-emerald-900">Pubblicato</Badge></span>
        <span>· bordo rosso = in ritardo</span>
      </div>

      <PublishingCard post={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
